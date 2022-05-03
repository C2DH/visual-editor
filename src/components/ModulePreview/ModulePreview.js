import React from 'react'
import {
  Container,
  Row,
  Col,
  Badge
} from 'reactstrap'
import { toHtml } from '../../utils/markdown'
import ModulePreviewObject from './ModulePreviewObject'
import ModulePreviewDebugger from './ModulePreviewDebugger'
import './ModulePreview.css'

const ModulePreviewComponents = {
  'object': ModulePreviewObject
}

const ModulePreview = ({
  idx = -1,
  countSiblings=1,
  trans,
  moduleType="text",
  background={},
  text={},
  ...rest
}) => {
  const textContent = toHtml(trans(text, 'content'));

  const ModuleContentComponent = typeof ModulePreviewComponents[moduleType] !== 'undefined'
    ? ModulePreviewComponents[moduleType]
    : ModulePreviewDebugger

  return (
    <Container className="ModulePreview">
      <Row className="my-5">
        <Col md={{size: 8}}>
          <Badge>{moduleType}</Badge>
          <section dangerouslySetInnerHTML={{ __html: textContent }} />
          <ModuleContentComponent {...rest}/>
        </Col>
        <Col md={{size: 4}}>
          <div className="ModulePreview__actions sticky-top">
            <Badge>{idx} / {countSiblings}</Badge> Fixed content
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ModulePreview
