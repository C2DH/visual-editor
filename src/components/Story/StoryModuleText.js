import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { MillerLanguages } from '../../constants'
import ModuleText from './ModuleText'

const StoryModuleText = ({
  text = {},
  ...rest
  // footnotes
}) => {
  // quick check for our modules
  const position = ['left', 'center', 'right'].includes(text.position)
    ? text.position
    : 'left'
  const color = text.color ?? '#000'
  const content = text.content
  if (!typeof content === 'object') {
    throw new Error('StoryModuleText not valid')
  }
  const langs = Object.keys(content)
  // check against miller languages

  // langs.sort()

  return (
    <Container fluid>
      {/* <p>position: {position}</p>
      <p>color: {color}</p> */}
      {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
      <Row>
        {MillerLanguages.map((lang) => (
          <Col key={lang}>
            <ModuleText className='me-3' lang={lang} content={content[lang]} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default StoryModuleText
