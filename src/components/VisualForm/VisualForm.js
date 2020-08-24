import React, { memo } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Spinner from '../Spinner'
import BackgroundPreview from '../BackgroundPreview'
import './VisualForm.css'

const VisualForm = memo(({ children, bottomForm, onSubmit, saving = false }) => (
  <form onSubmit={onSubmit}>
    <Container fluid className="margin-r-l-20">
      <Row>{children}</Row>
    </Container>
    {bottomForm}
    {saving && <Spinner fullpage />}
  </form>
))

export const SideContainer = memo(({ children }) => (
  <Col md={3}>
    <div className="VisualForm__SideContainer">{children}</div>
  </Col>
))

export const SideForm = memo(({ children }) => (
  <div className="VisualForm__SideContainer__SideForm">{children}</div>
))

export const SideActions = memo(({ children }) => (
  <div className="VisualForm__SideContainer__SideActions">
    <hr />
    {children}
  </div>
))

export const PreviewContainer = memo((props) => (
  <Col md={9}>
    <BackgroundPreview {...props} />
  </Col>
))

export const GenericPreviewContainer = memo(({ className, ...props }) => (
  <Col md={9}>
    <div className={`VisualForm__GenericPreviewContainer ${className ? className : ''}`} {...props} />
  </Col>
))

PreviewContainer.defaultProps = {
  containerClassName: "VisualForm__PreviewContainer__Background-container",
  overlayClassName: "VisualForm__PreviewContainer__Background-overlay",
}

export default VisualForm
