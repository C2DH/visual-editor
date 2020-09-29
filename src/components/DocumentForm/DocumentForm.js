import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
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
import { MEDIAT_TYPES } from '../../state/consts';

import './DocumentForm.css';


const AlertMissProperty = ({ fieldName }) => (
  <Alert color="warning">
    The JSON Schema doesn't not contain any <i>{fieldName}</i> property!
  </Alert>
);


class DocumentForm extends PureComponent {

  fieldNames = null;

  componentDidMount() {
    if(!this.props.schema)
      this.props.loadDocumentSchema();
  }

  render() {
    const { loading, error, language, exitLink, schema, type, preview, title } = this.props;

    const button = <Button size="lg" tag={Link} to={exitLink}>Back</Button>;

    if(loading && !schema) return <Spinner />;
    if(error) return <div><Alert color="danger">{error}</Alert>{button}</div>;
    if(!schema) return null;

    const { properties, required }  = schema;
    // Use class variable to avoid rerendering JSONSchemaForm when the form is filled
    this.fieldNames = this.fieldNames || [
      ...Object.keys(properties).filter(name => name !== 'title' && name !== 'type')
    ];

    return (
      <form>
        <Container fluid className="DocumentForm">

          {!properties.title && <AlertMissProperty fieldName="title" />}
          {!properties.type && <AlertMissProperty fieldName="type" />}

          <Row>
            <Col md={6}>

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
                      {MEDIAT_TYPES.map(type =>
                        <option key={type} value={type}>{type}</option>
                      )}
                    </Field>
                  </FormGroup>
                </Col>
              </Row>

              <JSONSchemaForm
                fieldNames  = {this.fieldNames}
                properties  = {properties}
                required    = {required}
                language    = {language.code}
                group       = {type}
              />

            </Col>
            <Col md={6}>
              <img
                src       = {preview}
                className = "mw-100"
                alt       = {title}
              />
            </Col>
          </Row>
        </Container>
        <Button size="lg" tag={Link} to={exitLink}>Back</Button>
      </form>
    );
  }
}

DocumentForm.propTypes = {
  exitLink:  PropTypes.string
};

const selector = formValueSelector('document');
const mapStateToProps = state => ({
  schema:   getDocumentSchema(state),
  language: getCurrentLanguage(state),
  loading:  isDocumentSchemaLoading(state),
  type:     selector(state, 'data.type'),
  preview:  selector(state, 'data.resolutions.medium.url'),
  title:    selector(state, 'title'),
  error:    getDocumentSchemaError(state)
});

export default reduxForm({
  form: 'document'
})(connect(mapStateToProps, {
  loadDocumentSchema
})(DocumentForm));
