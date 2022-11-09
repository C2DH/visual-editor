import { ArrowDownCircle } from 'lucide-react'
import React from 'react'
import { Button, Dropdown } from 'react-bootstrap'

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Button
    variant='light'
    href=''
    ref={ref}
    onClick={(e) => {
      e.preventDefault()
      onClick(e)
    }}
  >
    <div className='me-2 d-inline-block'>{children}</div>
    <ArrowDownCircle size={16} />
  </Button>
))

const StoryModuleTypeSwitch = ({
  type = '',
  availableTypes = [],
  onChange,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        {type}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {availableTypes.map((d, i) => (
          <Dropdown.Item
            key={i}
            active={d === type}
            onClick={(e) => onChange(d)}
          >
            {d}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}
export default StoryModuleTypeSwitch
