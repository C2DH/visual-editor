import React from 'react'
import { Input, Label } from 'reactstrap';
import './TopSelectFilter.css'

const TopSelectFilter = ({ children = [], label, ...props }) => (
  <div className="TopSelectFilter__container">

      {label && <Label for="selectFilter">{label}</Label>}

      <Input id="selectFilter" type="select" {...props}>
        {children.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </Input>
  </div>
)

export default TopSelectFilter
