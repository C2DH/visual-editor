import React from 'react'
import { Input, Label } from 'reactstrap'

// TODO: Handle meta props in an irrealistic future...
const Textarea = ({ 
    input,
    label,
    required,
    meta: {
      touched,
      error
    }
  }) => (

  <React.Fragment>
    {label &&
      <Label className={required ? 'font-weight-bold' : ''} for={input.name}>{label}</Label>
    }
    <Input type='textarea' id={input.name} {...input} />
    {touched && error &&
      <span className="text-danger">{error}</span>
    }
  </React.Fragment>
)

export default Textarea
