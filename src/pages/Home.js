import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BootstrapColumnLayout } from '../constants'

const Home = () => {
  const { t } = useTranslation()
  return (
    <Container>
      <Row>
        <Col {...BootstrapColumnLayout}>
          <h1 className="my-5">{t('pagesHomeTitle')}</h1>
          <p>{t('pagesHomeSubheading')}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
