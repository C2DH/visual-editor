import { useStory } from '@c2dh/react-miller'
import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import ModuleText from '../components/Story/ModuleText'
import StoryItem from '../components/Story/StoryItem'
import StoryModule from '../components/Story/StoryModule'
import { BootstrapColumnLayout, MillerLanguages } from '../constants'
import { lang2Field } from '../logic/i18n'

const Story = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = lang2Field(i18n.language)
  // https://www.abstractapi.com/guides/react-form-validation
  const [onlyCurrentLanguage, set] = useState(false)
  const { storyId } = useParams()
  const safeStoryId = storyId.replace(/[^\dA-Za-z-_]/g, '').toLowerCase()
  const [story, { isLoading }] = useStory(safeStoryId, {
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
  const displayLanguages = onlyCurrentLanguage ? [currentLanguage] : MillerLanguages
  return (
    <div className="Story">
      <Container fluid>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <h1 className="mb-5">{t('pagesStoryTitle')}</h1>
            <StoryItem story={story} />
            <Form>
              <Form.Check type="switch">
                <Form.Check.Input
                  defaultChecked={onlyCurrentLanguage}
                  onChange={(e) => {
                    set(e.target.checked)
                  }}
                  type="checkbox"
                />
                <Form.Check.Label>use current language</Form.Check.Label>
              </Form.Check>
            </Form>
          </Col>
        </Row>
        {['title', 'abstract'].map((field) => {
          return (
            <React.Fragment key={field}>
              <Row className="mt-5">
                <h2>{field}</h2>
              </Row>
              <Row>
                {displayLanguages.map((lang) => (
                  <Col key={lang}>
                    <ModuleText
                      memo={displayLanguages.join('')}
                      className="me-3"
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
        <section key={i} className="mt-3 pt-2 me-3">
          <h2>
            paragraph {i + 1} of {modules.length}
          </h2>
          <StoryModule
            displayLanguages={displayLanguages}
            type={d.module}
            text={d.text}
            object={d.object}
          />
          {/* <pre>{JSON.stringify(d, null, 2)}</pre> */}
        </section>
      ))}
    </div>
  )
}

export default Story
