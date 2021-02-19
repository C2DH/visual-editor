import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DocumentForm from '../../components/DocumentForm';
import Spinner from '../../components/Spinner'
import * as api from '../../api'
import { wrapAuthApiCall } from '../../state'
import {
  makeTranslator,
  getDocument,
  isDocumentLoading,
  getCurrentLanguage
} from '../../state/selectors';
import {
  loadDocument,
  loadDocumentSchema,
  unloadDocument,
  documentUpdated
} from '../../state/actions';
import { cleanJSON } from '../../utils';
import './DocumentEdit.css';

const updateDocument = wrapAuthApiCall(api.updateDocument);
const generateDocumentPreview = wrapAuthApiCall(api.generateDocumentPreview);
const fetchDocument = wrapAuthApiCall(api.getDocument);

class DocumentEdit extends PureComponent {

  componentDidMount() {
    this.props.loadDocument(this.props.match.params.documentId);
  }

  componentWillUnmount() {
    this.props.unloadDocument();
  }

  submit = doc =>
    updateDocument({
      ...doc,
      data: cleanJSON(doc.data)
    })
    .then(() => (doc.generate_preview || doc.snapshot_file) && generateDocumentPreview(doc.id))
    .then(() => fetchDocument(doc.id));

  //  Update document in entities state
  documentUpdated = (doc) => this.props.documentUpdated(doc);

  render() {

    const { doc, loading, language } = this.props;

    if (loading && !doc) return <Spinner />;
    if (!doc) return null;

    return (
      <div>
        <div className="DocumentDetail__Top">
          {doc.data.title && doc.data.title[language.code]} ({doc.slug})
        </div>
        <DocumentForm
          initialValues   = {doc}
          onSubmit        = {this.submit}
          onSubmitSuccess = {this.documentUpdated}
          exitLink        = "/documents/"
          enableReinitialize
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trans:    makeTranslator(state),
  doc:      getDocument(state),
  loading:  isDocumentLoading(state),
  language: getCurrentLanguage(state)
});

export default connect(mapStateToProps, {
  loadDocument,
  loadDocumentSchema,
  unloadDocument,
  documentUpdated
})(DocumentEdit);
