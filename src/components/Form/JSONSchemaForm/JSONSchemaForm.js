import React, { Fragment, useState, memo } from 'react';
import { Field } from 'redux-form';
import { FormGroup, FormText, Alert, Collapse } from 'reactstrap';

import Input from '../Input';
import Select from '../Select';
import Textarea from '../Textarea';
import Checkbox from '../Checkbox';
import Translate from '../Translate';
import { required, matchPattern, matchMinMax } from '../validate'

import './JSONSchemaForm.css';


const AlertMissLanguage = ({ fieldName }) => (
  <Alert color="warning">
    JSON schema issue: the <i>{fieldName}</i> property does not contain any property for the current language!
  </Alert>
);

//  To format ISO data-time value
const formatDate = value => value ? value.split('T')[0] : '';

//  Normalize functions for the field
const normalize       = type => {
  switch(type) {
  case 'array':   return convertToArray;
  case 'integer': return convertToInt;
  case 'number':  return convertToFloat;
  default: return null;
  }
}
const convertToArray  = value => value ? value.split(',') : null;
const convertToInt    = value => value ? parseInt(value) : null;
const convertToFloat  = value => value ? parseFloat(value) : null;


const JSONSchemaField = ({ name, title: customTitle, properties: {
    title,
    maxLength,
    type,
    format,
    enum: options,
    minimum,
    maximum,
    description,
    pattern,
    examples,
    properties
  }, required: isRequired }) => {

  const isStringType = type === 'string';
  const isNumberType = type === 'number' || type === 'integer';
  const isCheckType = type === 'boolean';
  const isDateType = format === 'date';

  let component = Input;
  if(!maxLength && isStringType) component = Textarea;
  if(options) component = Select;
  if(isCheckType) component = Checkbox;

  let fieldType = 'text';
  if(isNumberType) fieldType = 'number';
  if(isDateType) fieldType = 'date';

  let validate = [];
  if(isRequired)          validate.push(required);
  if(pattern)             validate.push(matchPattern(new RegExp(pattern)));
  if(minimum || maximum)  validate.push(matchMinMax(minimum, maximum));

  return (
    <FormGroup check={isCheckType}>
      <Field
        type        = {fieldType}
        placeholder = {examples && `e.g. ${examples.join()}`}
        name        = {`data.${name}`}
        label       = {customTitle || title}
        options     = {options}
        component   = {component}
        maxLength   = {maxLength}
        className   = {isNumberType ? 'w-50' : ''}
        pattern     = {pattern}
        required    = {isRequired}
        parse       = {normalize(type)}
        format      = {isDateType ? formatDate : null}
        validate    = {validate}
      />
      <FormText>{description}</FormText>
    </FormGroup>
  );
}


//  Use memo to avoid unwanted rerender from redux-form
export const JSONSchemaProperty = memo(({
    name,
    properties,
    required,
    language,
    level,
    group
  }) => {

  const { type, format, title, groups } = properties;
  const isTranslatedField       = type === 'object' && format === 'translate';
  const isObjectField           = !isTranslatedField && type === 'object';

  if(group && groups && groups instanceof Array && !groups.includes(group))
    return null;

  if(isObjectField)
    return (
      <JSONSchemaObjectProperty
        name        = {name}
        properties  = {properties}
        language    = {language}
        level       = {level}
      />
    );

  if(isTranslatedField) {
    return (
      <JSONSchemaTranslatedProperty
        name        = {name}
        properties  = {properties}
        required    = {required}
        language    = {language}
      />
    );
  }

  return (
    <JSONSchemaField
      name        = {name}
      title       = {title}
      properties  = {properties}
      required    = {required}
    />
  );
});


const JSONSchemaTranslatedProperty = ({
  name,
  properties,
  required,
  language
}) => {

  const { title, properties: i18nProps } = properties;

  //  Get config properties for the field
  //  First get properties of the current language
  //  If not defined, get properties of the first available language
  //  If not defined yet, get use properties of the parent object field
  let currentLangProperties = properties;
  if(i18nProps)
    currentLangProperties  = i18nProps[language]
      || i18nProps[Object.keys(i18nProps)[0]]
      || properties;

  //  Display a warning message if the current language is not in the JSON schema
  let message = null;
  if(!i18nProps[language])
    message = <AlertMissLanguage fieldName={name} />;

  return (
    <Fragment>
      {message}
      <div className="JSONSchemaTranslatedProperty">
        <JSONSchemaField
          name        = {`${name}.${language}`}
          title       = {title}
          properties  = {currentLangProperties}
          required    = {required}
        />
        <Field
          name        = {`data.${name}`}
          component   = {Translate}
        />
      </div>
    </Fragment>
  );
}


const JSONSchemaObjectProperty = ({
    name,
    properties: {
      title,
      properties,
      required
    },
    language,
    level
  }) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle              = () => setIsOpen(!isOpen);
  const Head                = `h${level + 5}`;

  return (
    <Fragment>
      <div className={`p-2 mb-3 ${level === 0 ? 'border' : ''}`}>
        <Head onClick={toggle}>
          {level === 0 && <i className={`fa fa-caret-${isOpen ? 'down' : 'right'} mr-2`} aria-hidden="true"></i>}
          {title}
        </Head>
        <Collapse isOpen={level === 0 ? isOpen : true}>
          <JSONSchemaForm
            properties  = {properties}
            required    = {required}
            language    = {language}
            name        = {name}
            level       = {level + 1}
          />
        </Collapse>
      </div>
    </Fragment>
  );
}


export const JSONSchemaForm = ({
  properties,
  required,
  fieldNames,
  name,
  language,
  level,
  group
}) => {

  const pfxId = name ? `${name}.` : '';

  return (
    <div className="JSONSchemaForm">
      {(fieldNames || Object.keys(properties)).map(fieldName =>
        properties[fieldName] && (
          <JSONSchemaProperty
            key         = {`${pfxId}${fieldName}`}
            name        = {`${pfxId}${fieldName}`}
            properties  = {properties[fieldName]}
            required    = {required.includes(fieldName)}
            language    = {language}
            level       = {level}
            group       = {group}
          />
        )
      )}
    </div>
  );
};


JSONSchemaForm.defaultProps = {
  required: [],
  level:    0,
  namePfx:  ''
}

//  Use memo to avoid unwanted rerender from redux-form
export default memo(JSONSchemaForm);
