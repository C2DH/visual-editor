import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { useSettingsStore } from '../store'
import Saving from '../components/Saving'
import AuthorItem from '../components/Author/AuthorItem'
import { Col, Container, Row } from 'react-bootstrap'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { queryClient } from '../logic/miller'
import { useTranslation } from 'react-i18next'
import { BootstrapColumnLayout, BootstrapMultiLayout, MillerLanguages } from '../constants'
import { useRef } from 'react'

const Author = () => {
  const { authorId } = useParams()
  const { t } = useTranslation()
  const safeAuthorId = authorId.replace(/[^\dA-Za-z-_]/g, '').toLowerCase()
  const millerApiUrl = useSettingsStore((state) => state.millerApiUrl)
  const millerAuthToken = useSettingsStore((state) => state.millerAuthToken)
  const bufferRef = useRef(null)

  console.debug('[Author] @useParams', { authorId, safeAuthorId })
  const {
    data: author,
    isLoading,
    error,
  } = useQuery(['author', safeAuthorId], () =>
    axios
      .get(`/author/${safeAuthorId}/`, {
        baseURL: millerApiUrl,
        headers: {
          Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
        },
      })
      .then((res) => {
        console.debug('[Author] @useQuery response status:', res.status, res)
        bufferRef.current = res.data
        return res.data
      }),
  )

  const {
    status: mutationStatus,
    isLoading: isPatching,
    isSuccess: isPatched,
    error: mutationError,
    mutate: partiallyUpdate,
  } = useMutation(
    (payload) =>
      axios
        .patch(`/author/${safeAuthorId}/`, payload, {
          baseURL: millerApiUrl,
          headers: {
            Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
          },
        })
        .then((res) => {
          console.debug('[Author] @useMutation response status:', res.status)
          return res.data
        }),
    // .catch((err) => console.error(err))
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['author', safeAuthorId], data)
      },
    },
  )

  const onChangeHandler = ({ formData, errors = [] }) => {
    if (errors.length > 0) {
      console.error('[Author] @onChange failed', errors)
      return
    }
    console.debug('[Author] @onChange', formData)
    bufferRef.current = formData
  }

  const onSubmitHandler = ({ formData, ...rest }) => {
    console.debug('[Author] @onSubmit', formData, rest)
    // send to document as patch.
    partiallyUpdate(formData)
  }
  if (isLoading) {
    return 'loading....'
  }
  if (author === null) {
    return null
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <div className="Author">
      <Saving
        success={isPatched}
        isLoading={isPatching}
        status={mutationStatus}
        error={mutationError}
      >
        <span
          dangerouslySetInnerHTML={{ __html: t('pagesAuthorSavingAuthor', { id: author.slug }) }}
        />
      </Saving>
      <Container fluid>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <h1 className="mb-5">{t('pagesAuthorTitle')}</h1>
            <AuthorItem author={author} />
          </Col>
        </Row>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <Form
              liveValidate
              schema={{
                title: '',
                type: 'object',
                required: ['fullname', 'slug'],
                properties: {
                  fullname: { type: 'string', title: t('fullname'), default: 'fullname' },
                  slug: {
                    type: 'string',
                    title: t('pagesDocFieldSlug'),
                    default: 'slug',
                    pattern: '^[0-9a-z-]+$',
                    minLength: 10,
                    maxLength: 100,
                  },
                  affiliation: { type: 'string', title: t('affilitation'), default: 'fullname' },
                },
              }}
              formData={{
                fullname: author.fullname,
                affiliation: author.affiliation,
                slug: author.slug,
              }}
              validator={validator}
              // onChange={(e) => console.log('changed', e)}
              onSubmit={onSubmitHandler}
              onChange={({ formData, errors }) => {
                if (bufferRef.current) {
                  onChangeHandler({ formData: { ...bufferRef.current, ...formData }, errors })
                }
              }}
              onError={(e) => console.log('errors', e)}
            >
              &nbsp;
            </Form>
          </Col>
        </Row>
        <Row>
          {MillerLanguages.map((lang) => (
            <Col key={lang} {...BootstrapMultiLayout}>
              <section className="me-4">
                <h2>{lang}</h2>
                <Form
                  liveValidate
                  showErrorList={false}
                  schema={{
                    title: '',
                    type: 'object',
                    required: [],
                    properties: {
                      fullname: {
                        type: 'object',
                        properties: {
                          type: 'string',
                          title: t('fullname'),
                          default: '',
                          maxLength: 100,
                        },
                      },
                      bio: {
                        type: 'object',
                        properties: {
                          [lang]: { type: 'string', title: t('bio'), default: '' },
                        },
                      },
                    },
                  }}
                  uiSchema={{
                    bio: {
                      [lang]: {
                        'ui:widget': 'textarea',
                      },
                    },
                    fullname: {
                      [lang]: {
                        'ui:widget': 'textarea',
                      },
                    },
                  }}
                  formData={{
                    ...author.data,
                  }}
                  validator={validator}
                  onChange={({ formData, errors }) => {
                    if (bufferRef.current) {
                      onChangeHandler({
                        formData: {
                          ...bufferRef.current,
                          data: {
                            ...bufferRef.current.data,
                            [lang]: formData,
                          },
                        },
                        errors,
                      })
                    } else {
                      onChangeHandler({
                        formData: {
                          data: {
                            [lang]: formData,
                          },
                        },
                        errors,
                      })
                    }
                  }}
                >
                  &nbsp;
                </Form>
              </section>
            </Col>
          ))}
        </Row>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <button
              onClick={onSubmitHandler}
              type="submit"
              disabled={mutationStatus === 'loading'}
              className="btn btn-outline-dark btn-md"
            >
              {t(mutationStatus === 'loading' ? 'saving' : 'save')}
            </button>
          </Col>
        </Row>
      </Container>
      <pre>{JSON.stringify(author, null, 2)}</pre>
    </div>
  )
}

export default Author
