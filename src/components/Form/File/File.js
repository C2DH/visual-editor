import React, { PureComponent, Fragment } from 'react';
import { Label, Button, FormText } from 'reactstrap';
import Dropzone from 'react-dropzone-uploader';
import { last } from 'lodash';

import 'react-dropzone-uploader/dist/styles.css';
import './File.css';

class FormFile extends PureComponent {

  fileWithMetas = [];

  handleChangeStatus = (fileWithMeta, status, fileWithMetas) => {

    this.props.changeStatus(status);

    switch(status) {
    case 'done': this.props.change(`${this.props.input.name}_file`, fileWithMeta.file); break;
    case 'removed': this.props.change(`${this.props.input.name}_file`); break;
    default:
    }

    this.fileWithMetas = fileWithMetas;
  }

  // Remove all files in the dropzone
  cleanDropzone = () => {
    this.fileWithMetas.forEach(file => file.remove());
  }

  // Toggle delete state of the url
  toggleDelete = () => {

    const { value, onChange } = this.props.input;
    const { initial, error }  = this.props.meta;

    this.cleanDropzone();
    onChange(!value || error ? initial : null);
  }

  inputContent = (files, extra) =>
    extra.reject ?
      `${this.props.accept.split(',').map(type =>
        type.split('/').reduce((prev, item) => item === "*" ? prev : item )
      ).join(', ')} files only` :
      'Drag files or click to browse'

  componentDidUpdate = () =>
    !this.props.showDropzone && this.cleanDropzone();

  render() {

    const { label, accept, maxSize, showDropzone, children } = this.props;
    const { input: { value, name }} = this.props;
    const { meta: { error, initial }} = this.props;

    return (
      <div className="File">
        {label &&
          <Label for={name}>{label}</Label>
        }

        {initial &&
          <div className={`d-flex mb-2 ${!value ? 'delete' : ''}`}>
            <a
              href      = {initial}
              target    = "_blank"
              rel       = "noopener noreferrer"
            >
              {last(initial.split('/'))}
            </a>
            <Button onClick={this.toggleDelete} className="tiny-btn flex-right">
              <i className="fa fa-remove"></i>
            </Button>
          </div>
        }

        {!value &&
          <Fragment>

            {children}

            {showDropzone &&
              <Fragment>
                <Dropzone
                  maxFiles        = {1}
                  maxSizeBytes    = {maxSize ? maxSize * 1024 * 1024 : undefined}
                  addClassNames   = {{dropzone: 'overflow-auto', dropzoneReject: 'dzu-dropzoneReject'}}
                  onChangeStatus  = {this.handleChangeStatus}
                  inputContent    = {this.inputContent}
                  accept          = {accept}
                />
                <FormText>
                  {maxSize !== 0 && <span>Maximum size: {maxSize} MB</span>}
                </FormText>
              </Fragment>
            }

          </Fragment>
        }

        {error &&
          <span className="text-danger">{error}</span>
        }
      </div>
    )
  }
}

FormFile.defaultProps = {
  showDropzone: true
}

export default FormFile;
