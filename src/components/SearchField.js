import React, { useLayoutEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, InputGroup } from 'react-bootstrap'
import '../styles/components/SearchField.css'

const SearchField = ({
  defaultValue,
  onSubmit,
  status = '',
  className = '',
  placeholder = '...',
}) => {
  const searchQueryRef = useRef()
  const { t } = useTranslation()

  useLayoutEffect(() => {
    if (searchQueryRef.current) {
      searchQueryRef.current.focus()
    }
  }, [status])

  return (
    <Form
      className={`mt-5 ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        if (typeof onSubmit !== 'function') {
          console.error('You forgot to add onSubmit to this form ...')
          return
        }
        if (searchQueryRef.current && searchQueryRef.current.value.length > 1) {
          onSubmit(e, searchQueryRef.current.value)
        } else {
          onSubmit(e, undefined)
        }
      }}
    >
      <InputGroup size="lg">
        <Form.Control
          placeholder={placeholder}
          aria-label={placeholder}
          aria-describedby="basic-addon2"
          defaultValue={defaultValue}
          ref={searchQueryRef}
          className="SearchField_inputSearchQuery"
        />
        <button className="btn btn-lg btn-outline-dark SearchField_inputSubmit" id="button-addon2">
          {t(status === 'loading' ? 'loading' : 'search')}
        </button>
      </InputGroup>
    </Form>
  )
}

export default SearchField
