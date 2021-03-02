import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import DocumentForm from '../../components/DocumentForm';
import { getNewDocument } from '../../state/selectors';
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'
import { cleanJSON } from '../../utils';

const createDocument = wrapAuthApiCall(api.createDocument)
const generateDocumentPreview = wrapAuthApiCall(api.generateDocumentPreview);

class NewDocument extends PureComponent {

  submit = doc =>
    createDocument({
      ...doc,
      data: cleanJSON(doc.data)
    })
    .then((createdDoc) =>
      doc.generate_preview || doc.snapshot_file ?
        generateDocumentPreview(createdDoc.id).then(() => createdDoc) :
        createdDoc
    );

  redirectToCreatedDocument = createdDoc =>
    this.props.history.replace(`/documents/${createdDoc.id}/edit`);

  render() {

    const { doc } = this.props;

    return (
      <div className="mt-3">
        <DocumentForm
          initialValues       = {doc}
          onSubmit            = {this.submit}
          onSubmitSuccess     = {this.redirectToCreatedDocument}
          exitLink            = "/documents/"
          enableReinitialize
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  doc: getNewDocument(state)
});

export default connect(mapStateToProps)(NewDocument);
