import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import { Container, Row, Col, Button } from 'reactstrap';
import HeadingRow from '../../components/HeadingRow';
import TopSearchInput from '../../components/TopSearchInput';
import TopSelectFilter from '../../components/TopSelectFilter';
import DocumentCard from '../../components/cards/DocumentCard';
import Spinner from '../../components/Spinner';
import './Documents.css';

import {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments
} from '../../state/actions';
import {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  areDocumentsLoading,
  getDocumentsTypes
} from '../../state/selectors';

const TYPE_FACET = 'data__type';
const DEFAULT_PARAMS = { facets: TYPE_FACET };
const TYPE_ALL = 'all';

class Documents extends PureComponent {

  state = {
    searchString: "",
    typeFilter: TYPE_ALL
  };

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
    let params = {};

    if(this.state.searchString)
      params.q = `${this.state.searchString}*`;

    if(this.state.typeFilter != TYPE_ALL)
      params.filters = { data__type: this.state.typeFilter }

    return params;
  }


	//	--------------------------------------------------------------------------------
	//	Callback methods
	//	--------------------------------------------------------------------------------

  loadMore_clickHandler = () => {
    this.props.loadMoreDocuments(this.getFilterParams());
  }

  search_changeHandler = ({ target: { value: searchString } }) => {
    this.setState({ searchString }, this.searchDocuments);
  }

  typeFilter_changeHandler = ({ target: { value: typeFilter } }) => {
    this.setState({ typeFilter }, this.searchDocuments);
  }

  render() {
    const { documents, canLoadMore, count, loading, types } = this.props;

    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Documents" className="Documents__StickyHeader">

          {loading && <Spinner noPadding x={2} />}

          {types &&
            <TopSelectFilter
              label     = "Type"
              value     = {this.state.typeFilter}
              onChange  = {this.typeFilter_changeHandler}
            >
              {[TYPE_ALL, ...types]}
            </TopSelectFilter>
          }

          <TopSearchInput
            value     = {this.state.searchString}
            onChange  = {this.search_changeHandler}
            className = "search-input"
          />
        </HeadingRow>

        <div className="Documents__List">
          <Row>
            {documents && documents.map((doc) => (
              <Col md="3" key={doc.id}>
                <DocumentCard
                  type={doc.type}
                  title={doc.title}
                  cover={
                    doc.data.resolutions
                      ? doc.data.resolutions.thumbnail.url
                      : doc.attachment
                    }
                />
              </Col>
            ))}
          </Row>
        </div>

        {canLoadMore && count > 0 && !loading && (
          <div className="Documents__LoadMoreBtn">
            <Button onClick={this.loadMore_clickHandler}>Load more</Button>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  types: getDocumentsTypes(state),
  documents: getDocuments(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  loading: areDocumentsLoading(state)
});

export default connect(mapStateToProps, {
  loadDocuments,
  loadMoreDocuments,
  unloadDocuments
})(Documents);
