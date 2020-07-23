import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import HeadingRow from '../../components/HeadingRow';
import DocumentCard from '../../components/cards/DocumentCard';
import Spinner from "../../components/Spinner";
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
  areDocumentsLoading
} from '../../state/selectors';

class Documents extends PureComponent {

  componentDidMount() {
    this.props.loadDocuments();
  }

  componentWillUnmount() {
    this.props.unloadDocuments();
  }

  loadMore = () => {
    this.props.loadMoreDocuments();
  }

  render() {
    const { documents, canLoadMore, count, loading } = this.props;

    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Documents" className="Documents__StickyHeader">
          {loading && <Spinner noPadding x={2} />}
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
            <Button onClick={this.loadMore}>Load more</Button>
          </div>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
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
