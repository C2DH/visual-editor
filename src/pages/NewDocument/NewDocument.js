import React, { PureComponent } from 'react';
import DocumentForm from '../../components/DocumentForm';

class NewDocument extends PureComponent {

  render() {
    return (
      <DocumentForm exitLink="/documents/" />
    );
  }
}

export default NewDocument;
