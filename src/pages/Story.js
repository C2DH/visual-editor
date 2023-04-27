import React, { useState } from 'react'
import axios from 'axios'
import { setObject } from '../logic/utils'
// import { default as JSONSchemaForm } from '@rjsf/core'
// import validator from '@rjsf/validator-ajv8'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { BootstrapColumnLayout, MillerLanguages } from '../constants'
import { lang2Field } from '../logic/i18n'
import { useSettingsStore } from '../store'
import { queryClient } from '../logic/miller'
import ModuleText from '../components/Story/ModuleText'
import Saving from '../components/Saving'
import StoryItem from '../components/Story/StoryItem'
import StoryModule from '../components/Story/StoryModule'

const Story = () => {
  const { t, i18n } = useTranslation()
  const currentLanguage = lang2Field(i18n.language)
  // https://www.abstractapi.com/guides/react-form-validation
  const [onlyCurrentLanguage, set] = useState(false)
  const { storyId } = useParams()
  const safeStoryId = storyId.replace(/[^\dA-Za-z-_]/g, '').toLowerCase()
  const millerApiUrl = useSettingsStore((state) => state.millerApiUrl)
  const millerAuthToken = useSettingsStore((state) => state.millerAuthToken)
  const [ghostStory, setGhostStory] = useState(null)

  const {
    data: story,
    isLoading,
    isSuccess,
  } = useQuery(['story', safeStoryId], () =>
    axios
      .get(`/story/${safeStoryId}/`, {
        baseURL: millerApiUrl,
        headers: {
          Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
        },
        params: {
          parser: 'yaml',
          nocache: 'true',
        },
      })
      .then(({ data }) => {
        setGhostStory({ data: data.data }) // :D
        return data
      }),
  )

  const {
    status: mutationStatus,
    isLoading: isPatching,
    isSuccess: isPatched,
    error: mutationError,
    mutate: partiallyUpdateStory,
  } = useMutation(
    (payload) =>
      axios
        .patch(`/story/${story?.id}/`, payload, {
          baseURL: millerApiUrl,
          headers: {
            Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
          },
        })
        .then((res) => {
          console.debug('[Story] @useMutation response status:', res.status)
          return res.data
        }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['story', safeStoryId], data)
      },
    },
  )

  const onSubmitHandler = (e) => {
    e.preventDefault()
    partiallyUpdateStory(ghostStory)
  }

  const onChangeHander = (path, value) => {
    console.debug('[Story] @onChangeHander', path, value, ghostStory)
    setGhostStory(setObject({ ...ghostStory }, path, value))
  }

  if (isLoading) {
    return 'loading....'
  }
  if (!isSuccess || story === null) {
    return null
  }
  const modules = story.contents?.modules || []
  const displayLanguages = onlyCurrentLanguage ? [currentLanguage] : MillerLanguages
  return (
    <div className="Story">
      <Saving
        success={isPatched}
        isLoading={isPatching}
        status={mutationStatus}
        error={mutationError}
      >
        <span
          dangerouslySetInnerHTML={{ __html: t('pagesStorySavingDocument', { id: story.slug }) }}
        />
      </Saving>
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
                      onChange={(value) => onChangeHander(`data.${field}.${lang}`, value)}
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
        <Row>
          <Col>
            <button
              type="submit"
              onClick={onSubmitHandler}
              disabled={mutationStatus === 'loading'}
              className="btn btn-outline-dark btn-md"
            >
              {t(mutationStatus === 'loading' ? 'saving' : 'save')}
            </button>
          </Col>
        </Row>
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
