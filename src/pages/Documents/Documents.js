import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { debounce, isNull } from 'lodash';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import HeadingRow from '../../components/HeadingRow';
import AddButton from '../../components/AddButton'
import TopSearchInput from '../../components/TopSearchInput';
import TopSelectFilter from '../../components/TopSelectFilter';
import DocumentCard from '../../components/cards/DocumentCard';
import Spinner from '../../components/Spinner';
import './Documents.css';

import {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments,
  deleteDocument
} from '../../state/actions';
import {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  areDocumentsLoading,
  getDocumentsTypes
} from '../../state/selectors';

const TYPE_FACET = 'data__type';
const ORDER_BY_ID_DESC = '-id';
const DEFAULT_PARAMS = { facets: TYPE_FACET, orderby: ORDER_BY_ID_DESC };

class Documents extends PureComponent {

  state = {
    docToDelete:  null
  };

  searchString :string;
  typeFilter = [];

  constructor(props) {
    super(props);
    this.searchDocuments = debounce(this.searchDocuments, 200);
  }

  componentDidMount() {
    this.props.loadDocuments(DEFAULT_PARAMS);
  }

  componentWillUnmount() {
    this.props.unloadDocuments();
  }

	//	--------------------------------------------------------------------------------
	//	Business methods
	//	--------------------------------------------------------------------------------

  searchDocuments() {
    this.props.loadDocuments(this.getFilterParams());
  }

  getFilterParams() {
    let params = { orderby: DEFAULT_PARAMS.orderby };

    if(this.searchString)
      params.q = `${this.searchString}*`;

    if(this.typeFilter.length)
      params.filters = { data__type__in: this.typeFilter };

    return params;
  }

  askDeleteDoc(doc) {
    this.setState({ docToDelete: doc });
  }



	//	--------------------------------------------------------------------------------
	//	Callback methods
	//	--------------------------------------------------------------------------------

  loadMore_clickHandler = () => {
    this.props.loadMoreDocuments(this.getFilterParams());
  }

  search_changeHandler = ({ target: { value } }) => {
    this.searchString = value;
    this.searchDocuments();
  }

  typeFilter_changeHandler = typeFilter => {
    this.typeFilter = typeFilter;
    this.searchDocuments();
  }

  clearDeleteDocModal = () => this.setState({ docToDelete: null });

  deleteTheme_clickHandler = () => {
    this.props.deleteDocument(this.state.docToDelete.id);
    this.setState({ docToDelete: null })
  }


  render() {
    const { documents, canLoadMore, count, loading, types, deleting } = this.props;

    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title={`Documents ${count ? `(${count})` : ''}`} className="Documents__StickyHeader">

          {loading && <Spinner noPadding x={2} />}

          <div className="Documents__Header-toolbar">
            {types &&
              <TopSelectFilter
                label     = "Select type"
                onChange  = {this.typeFilter_changeHandler}
                options   = {types}
              />
            }
            <TopSearchInput onChange={this.search_changeHandler} />
          </div>
        </HeadingRow>

        <div className="Documents__List">
          <Row>
            <Col md="3" className="Documents__AddButton-container">
              <AddButton label="Add document" tag={Link} to={'/documents/new'} />
            </Col>
            {documents && documents.map((doc) => (
              <Col md="3" key={doc.id}>
                <Link to={`/documents/${doc.id}/edit`} style={deleting[doc.id] && { pointerEvents: 'none' }}>
                  <div style={deleting[doc.id] ? { opacity: 0.5 } : undefined}>
                    <DocumentCard
                      slug              = {doc.slug}
                      type              = {`${doc.data.type !== doc.type ? `${doc.data.type} / ` : ""}${doc.type}`}
                      title             = {doc.title}
                      showDeleteButton  = {true}
                      onClick           = {e => { e.preventDefault(); this.askDeleteDoc(doc); }}
                      cover             = {
                        doc.data.resolutions
                          ? doc.data.resolutions.thumbnail.url
                          : doc.attachment
                        }
                    />
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>

        {canLoadMore && count > 0 && !loading && (
          <div className="Documents__LoadMoreBtn">
            <Button onClick={this.loadMore_clickHandler}>Load more</Button>
          </div>
        )}

        <Modal isOpen={!isNull(this.state.docToDelete)} toggle={this.clearDeleteDocModal}>
          <ModalHeader>Delete document</ModalHeader>
          <ModalBody>
            Delete document {this.state.docToDelete && this.state.docToDelete.title}?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.clearDeleteDocModal}>Undo</Button>
            <Button color="danger" onClick={this.deleteTheme_clickHandler}>Delete</Button>
          </ModalFooter>
        </Modal>

      </Container>
    );
  }
}

const mapStateToProps = state => ({
  types: getDocumentsTypes(state),
  documents: getDocuments(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  loading: areDocumentsLoading(state),
  deleting: state.documents.deleting
});

export default connect(mapStateToProps, {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments,
  deleteDocument
})(Documents);
