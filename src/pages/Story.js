import { useStory } from '@c2dh/react-miller'
import React from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import ModuleText from '../components/Story/ModuleText'
import StoryItem from '../components/Story/StoryItem'
import StoryModule, { Text, TextObject } from '../components/Story/StoryModule'
import { BootstrapColumnLayout, MillerLanguages } from '../constants'

const Story = () => {
  const { t } = useTranslation()
  const { storyId } = useParams()
  const safeStoryId = storyId.replace(/[^\dA-Za-z-_]/g, '').toLowerCase()
  const [story, { isLoading, isSuccess }] = useStory(safeStoryId, {
    params: {
      parser: 'yaml',
      nocache: 'true',
    },
  })

  if (isLoading) {
    return 'loading....'
  }
  if (story === null) {
    return null
  }
  const modules = story.contents?.modules || []

  return (
    <div className='Story'>
      <Container fluid>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <h1 className='mb-5'>{t('pagesStoryTitle')}</h1>
            <StoryItem story={story} />
          </Col>
        </Row>
        {['title', 'abstract'].map((field) => {
          let langs = Object.keys(story.data[field])
          langs.sort()
          return (
            <React.Fragment key={field}>
              <Row className='mt-5'>
                <h2>{field}</h2>
              </Row>
              <Row>
                {MillerLanguages.map((lang) => (
                  <Col key={lang}>
                    <ModuleText
                      className='me-3'
                      content={story.data[field][lang]}
                      lang={lang}
                    />
                    {/* <Form.Group className='me-3'>
                      <Form.Label> {lang}</Form.Label>
                      <Form.Control as='textarea' rows={2}>
                        {story.data[field][lang]}
                      </Form.Control>
                    </Form.Group> */}
                  </Col>
                ))}
              </Row>
            </React.Fragment>
          )
        })}
      </Container>
      {modules.map((d, i) => (
        <section key={i} className='mt-3'>
          <StoryModule type={d.module} text={d.text} object={d.object} />
          {/* <pre>{JSON.stringify(d, null, 2)}</pre> */}
        </section>
      ))}
    </div>
  )
}

export default Story
