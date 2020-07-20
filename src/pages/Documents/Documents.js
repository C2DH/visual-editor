import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import HeadingRow from '../../components/HeadingRow';
import {
  loadDocuments,
  unloadDocuments
} from '../../state/actions';

class Documents extends PureComponent {

  render() {

    return (
      <Container fluid className="margin-r-l-20">
        <HeadingRow title="Documents">
        </HeadingRow>
      </Container>
    );
  }
}

export default Documents;
