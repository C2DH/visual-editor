import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MillerLanguages } from '../../constants'
import ModuleText from './ModuleText'

const StoryModuleTextObject = ({ text = {}, object = {}, ...rest }) => {
  const content = text.content
  if (!typeof content === 'object') {
    throw new Error('StoryModuleText not valid')
  }
  return (
    <Container fluid>
      {/* <p>position: {position}</p>
      <p>color: {color}</p> */}
      {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
      <Row>
        <Col>OBJECT</Col>
        <Col>
          {MillerLanguages.map((lang) => (
            <ModuleText
              key={lang}
              className='me-3'
              lang={lang}
              content={content[lang]}
            />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default StoryModuleTextObject
