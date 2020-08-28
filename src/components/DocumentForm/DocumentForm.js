import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap';

class DocumentForm extends PureComponent {

  render() {
    const { exitLink } = this.props;

    return (
      <form>
        <Button size="lg" tag={Link} to={exitLink}>Back</Button>
      </form>
    );
  }
}

DocumentForm.propTypes = {
  exitLink:  PropTypes.string
};

export default DocumentForm;
