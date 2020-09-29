import React, { PureComponent } from 'react';
import DocumentForm from '../../components/DocumentForm';

class NewDocument extends PureComponent {

  render() {
    return (
      <div className="mt-3">
        <DocumentForm exitLink="/documents/" />
      </div>
    );
  }
}

export default NewDocument;
