import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BootstrapColumnLayout } from '../constants'

const Stories = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Row>
        <Col {...BootstrapColumnLayout}>
          <h1>{t('pagesStoriesTitle')}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Stories
