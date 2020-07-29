import React from 'react'
import { Input } from 'reactstrap';
import './TopSearchInput.css'

const TopSearchInput = ({className='', ...props}) => (
  <div className={`TopSearchInput__container ${className}`}>
      <Input placeholder="Search" {...props} />
  </div>
)

export default TopSearchInput
