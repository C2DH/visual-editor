import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DocumentForm from '../../components/DocumentForm';
import Spinner from '../../components/Spinner'
import {
  makeTranslator,
  getDocument,
  isDocumentLoading
} from '../../state/selectors';
import {
  loadDocument,
  unloadDocument
} from '../../state/actions';
import './DocumentEdit.css';

class DocumentEdit extends PureComponent {

  componentDidMount() {
    this.props.loadDocument(this.props.match.params.documentId);
  }

  componentWillUnmount() {
    this.props.unloadDocument();
  }

  render() {

    const { doc, loading } = this.props;

    if (loading && !doc) return <Spinner />;
    if (!doc) return null;

    return (
      <div>
        <div className="DocumentDetail__Top">
          {doc.title}
        </div>
        <DocumentForm exitLink="/documents/" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trans:    makeTranslator(state),
  doc:      getDocument(state),
  loading:  isDocumentLoading(state)
});

export default connect(mapStateToProps, {
  loadDocument,
  unloadDocument
})(DocumentEdit);
