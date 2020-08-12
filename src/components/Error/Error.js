import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { isNull } from 'lodash';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { closeErrorMessage } from '../../state/actions'

const Error = ({ error, closeErrorMessage }) => (
  <Modal isOpen={!isNull(error)} toggle={closeErrorMessage}>
    <ModalHeader>Error</ModalHeader>
    <ModalBody>
      {error}
    </ModalBody>
    <ModalFooter>
      <Button color="danger" onClick={closeErrorMessage}>OK</Button>
    </ModalFooter>
  </Modal>
);

const mapStateToProps = state => ({
  error: state.ui.error
});

export default connect(mapStateToProps, { closeErrorMessage })(Error);
