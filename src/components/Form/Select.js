import React from 'react'
import { Input, Label } from 'reactstrap'
import { upperFirst } from 'lodash';

// Maybe pass down props such style or other shit...
const Select = ({
    input,
    label,
    options,
    required,
    className,
    children
  }) => (

  <React.Fragment>
    {label && <Label className={required ? 'font-weight-bold' : ''} for={input.name}>{label}</Label>}
    <Input
      id        = {input.name}
      type      = 'select'
      className = {className}
      {...input}
    >
      {options &&
        <React.Fragment>
          {!required && <option value="">- Select an option --</option>}
          {options.map(option => (
            <option value={option} key={option}>{upperFirst(option)}</option>
          ))}
        </React.Fragment>
      }
      {children}
    </Input>
  </React.Fragment>
)

export default Select
