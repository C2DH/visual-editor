import React, { PureComponent, Fragment, memo } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Row, Col, FormGroup, Label, Button, Alert } from 'reactstrap';

import Spinner from '../../components/Spinner'
import JSONSchemaForm, { JSONSchemaProperty } from '../Form/JSONSchemaForm';
import Select from '../Form/Select';
import File from '../Form/File';
import Checkbox from '../Form/Checkbox';

import { loadDocumentSchema } from '../../state/actions';
import {
  getDocumentSchema,
  getDocumentSchemaError,
  isDocumentSchemaLoading,
  getCurrentLanguage
} from '../../state/selectors';
import {
  MEDIA_TYPES,
  CONTENT_ACCEPTED_FILES,
  CONTENT_MAX_SIZE,
  PREVIEW_ACCEPTED_FILES,
  PREVIEW_MAX_SIZE
} from '../../state/consts';

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

  state = {};

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
              (error, [ field, messages ]) => `${error}${Array.isArray(messages)
                ? messages.reduce(
                  (prev, message) => `${prev}${field}: ${message}\n`,
                  ''
                ) : messages
              }`,''
            )
      });
    });

  setAttachmentStatus = status =>
    this.setState({ attachmentStatus: status });

  setPreviewStatus = status =>
    this.setState({ previewStatus: status });

  //  Custom validation for attachment
  validateAttachment = value =>
    this.state.attachmentStatus === 'error_file_size' ? 'File too big!' : undefined;

  //  Custom validation for preview
  validatePreview = value =>
    this.state.previewStatus === 'error_file_size' ? 'File too big!' : undefined;

  componentDidUpdate = () => {
    // Force field validation for File components
    if(!this.props.error)
      this.props.change('_validationHack', Date.now());
  }

  render() {
    const {
      loading,
      schemaError,
      language,
      exitLink,
      schema,
      type,
      preview,
      generatePreview,
      title,
      handleSubmit,
      submitting,
      invalid,
      error,
      change
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
              <FormGroup>
                <Field
                  label         = "Content"
                  name          = "attachment"
                  component     = {File}
                  change        = {change}
                  accept        = {CONTENT_ACCEPTED_FILES}
                  maxSize       = {CONTENT_MAX_SIZE}
                  changeStatus  = {this.setAttachmentStatus}
                  validate      = {this.validateAttachment}
                />
              </FormGroup>

              <FormGroup>
                <Field
                  label         = "Preview"
                  name          = "snapshot"
                  component     = {File}
                  showDropzone  = {!generatePreview}
                  change        = {change}
                  accept        = {PREVIEW_ACCEPTED_FILES}
                  maxSize       = {PREVIEW_MAX_SIZE}
                  changeStatus  = {this.setPreviewStatus}
                  validate      = {this.validatePreview}
                >
                  <FormGroup check={true}>
                    <Field
                      name          = "generate_preview"
                      component     = {Checkbox}
                      label         = "Generate preview from content"
                    />
                  </FormGroup>
                </Field>
              </FormGroup>

              {preview &&
                <FormGroup>
                  <img
                    src       = {preview}
                    className = "mw-100"
                    alt       = {title}
                  />
                </FormGroup>
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
  schema:           getDocumentSchema(state),
  language:         getCurrentLanguage(state),
  loading:          isDocumentSchemaLoading(state),
  type:             selector(state, 'data.type'),
  preview:          selector(state, 'snapshot'),
  title:            selector(state, 'title'),
  generatePreview:  selector(state, 'generate_preview'),
  schemaError:      getDocumentSchemaError(state)
});

export default reduxForm({
  form: 'document'
})(connect(mapStateToProps, {
  loadDocumentSchema
})(DocumentForm));
