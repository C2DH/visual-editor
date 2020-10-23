import React, { PureComponent, Fragment, memo } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Button, Alert } from 'reactstrap';

import Spinner from '../../components/Spinner'
import JSONSchemaForm, { JSONSchemaProperty } from '../Form/JSONSchemaForm';
import Select from '../Form/Select';

import { loadDocumentSchema } from '../../state/actions';
import {
  getDocumentSchema,
  getDocumentSchemaError,
  isDocumentSchemaLoading,
  getCurrentLanguage
} from '../../state/selectors';
import { MEDIA_TYPES } from '../../state/consts';

import './DocumentForm.css';


const AlertMissProperty = ({ fieldName }) => (
  <Alert color="warning">
    The JSON Schema doesn't not contain any <i>{fieldName}</i> property!
  </Alert>
);

const GenerateJSONFields = memo(({
  schema,
  language,
  type
}) => {

  const { properties, required }  = schema;
  const fieldNames = [
    ...Object.keys(properties).filter(name => name !== 'title' && name !== 'type')
  ];

  return (
    <Fragment>
      {!properties.title && <AlertMissProperty fieldName="title" />}
      {!properties.type && <AlertMissProperty fieldName="type" />}

      {properties.title &&
        <JSONSchemaProperty
          name        = 'title'
          properties  = {properties.title}
          required    = {required.includes('title')}
          language    = {language.code}
        />
      }

      <Row>
        {properties.type &&
          <Col md={6}>
            <JSONSchemaProperty
              name        = 'type'
              properties  = {properties.type}
              required    = {required.includes('type')}
            />
          </Col>
        }

        <Col md={6}>
          <FormGroup>
            <Label className="font-weight-bold">Media type</Label>
            <Field name="type" component={Select} className="text-capitalize">
              {MEDIA_TYPES.map(type =>
                <option key={type} value={type}>{type}</option>
              )}
            </Field>
          </FormGroup>
        </Col>
      </Row>

      <JSONSchemaForm
        fieldNames  = {fieldNames}
        properties  = {properties}
        required    = {required}
        language    = {language.code}
        group       = {type}
      />

    </Fragment>
  );

});

class DocumentForm extends PureComponent {

  componentDidMount() {
    if(!this.props.schema)
      this.props.loadDocumentSchema();
  }

  submit = doc => this.props.onSubmit(doc)
    .catch(err => {
      throw new SubmissionError({
        _error:
          Object.entries(err.response.body)
            .reduce(
              (error, [ field, messages ]) => `${error}${messages.reduce(
                (prev, message) => `${prev}${field}: ${message}\n`,
                ''
              )}`,''
            )
      });
    });

  render() {
    const {
      loading,
      schemaError,
      language,
      exitLink,
      schema,
      type,
      preview,
      title,
      handleSubmit,
      submitting,
      invalid,
      error
    } = this.props;

    if(loading && !schema) return <Spinner />;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Container fluid className="DocumentForm">

          {schemaError && <Alert color="danger">{schemaError}</Alert>}

          <Row>
            <Col md={6}>
              {schema &&
                <GenerateJSONFields
                  schema    = {schema}
                  type      = {type}
                  language  = {language}
                />
              }
            </Col>
            <Col md={6}>
              {preview &&
                <img
                  src       = {preview}
                  className = "mw-100"
                  alt       = {title}
                />
              }
            </Col>
          </Row>

          <div className="DocumentForm__Footer">
            {error &&
              <Row>
                <Col md="12">
                  <span className="text-danger">{error}</span>
                </Col>
              </Row>
            }
            <Row className="mt-2">
              <Col md="3" className="mb-1">
                <Button size="sm" block type='submit' disabled={!schema || (invalid && !error)}>Save</Button>
              </Col>
              <Col md="3">
                <Button size="sm" block tag={Link} to={exitLink}>Back</Button>
              </Col>
              <Col md="6" />
            </Row>
          </div>

        </Container>
        {submitting && <Spinner fullpage />}
      </form>
    );
  }
}

DocumentForm.propTypes = {
  exitLink:  PropTypes.string
};

const selector = formValueSelector('document');
const mapStateToProps = state => ({
  schema:     getDocumentSchema(state),
  language:   getCurrentLanguage(state),
  loading:    isDocumentSchemaLoading(state),
  type:       selector(state, 'data.type'),
  preview:    selector(state, 'data.resolutions.medium.url'),
  title:      selector(state, 'title'),
  schemaError:getDocumentSchemaError(state)
});

export default reduxForm({
  form: 'document'
})(connect(mapStateToProps, {
  loadDocumentSchema
})(DocumentForm));
