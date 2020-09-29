import React from 'react';
import { Input, Label } from 'reactstrap';

const FormCheckbox = ({
    input,
    label,
    required
  }) => (

  <React.Fragment>
    <Input type="checkbox" id={input.name} {...input} checked={input.value} />
    {label &&
      <Label className={required ? 'font-weight-bold' : ''} for={input.name}>{label}</Label>
    }
  </React.Fragment>
)

export default FormCheckbox;
