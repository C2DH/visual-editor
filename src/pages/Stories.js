import { useStories } from '@c2dh/react-miller'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import StoryItem from '../components/Story/StoryItem'
import { BootstrapColumnLayout } from '../constants'

const Stories = () => {
  const { t } = useTranslation()

  const [{ count = -1, results = [] } = {}, { isLoading, isSuccess }] =
    useStories({
      params: {
        limit: 60,
      },
    })

  console.debug('[Stories] test', count)
  return (
    <Container fluid>
      <Row>
        <Col {...BootstrapColumnLayout}>
          <h1 className='mb-5'>{t('pagesStoriesTitle')}</h1>
        </Col>
      </Row>
      {isLoading && <p>loading</p>}
      <Row>
        {isSuccess &&
          results.map((d) => (
            <Col {...BootstrapColumnLayout} key={d.id}>
              <StoryItem story={d} className='mb-5' />
            </Col>
          ))}
      </Row>
    </Container>
  )
}

export default Stories
