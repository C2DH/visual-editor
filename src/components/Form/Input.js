import React from 'react'
import { Input, Label } from 'reactstrap'

// Maybe pass down props such style or other shit...
const FormInput = ({
    input: {
      value,
      ...input
    },
    label,
    type,
    maxLength,
    className,
    required,
    placeholder,
    meta: {
      touched,
      error
    }
  }) => (

  <React.Fragment>
    {label &&
      <Label className={required ? 'font-weight-bold' : ''} for={input.name}>{label}</Label>
    }
    <Input
      id        = {input.name}
      type      = {type}
      maxLength = {maxLength}
      className = {className}
      value     = {value || ''}
      placeholder = {placeholder}
      {...input}
    />
    {touched && error &&
      <span className="text-danger">{error}</span>
    }
  </React.Fragment>
)

export default FormInput
