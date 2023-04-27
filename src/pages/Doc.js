import { useParams } from 'react-router-dom'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import {
  BootstrapColumnLayout,
  ViewParamName,
  ViewParamValueForm,
  ViewParamValueDiff,
  ViewParamValueBasic,
} from '../constants'
import DocItem from '../components/Doc/DocItem'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useQueryParam, withDefault } from 'use-query-params'
import { EnumParam } from '../logic/params'
import DocData from './DocData'
import axios from 'axios'
import { useSettingsStore } from '../store'
import { useMutation, useQuery } from 'react-query'
import Saving from '../components/Saving'
import { queryClient } from '../logic/miller'

const AvailableViewParamValues = [ViewParamValueBasic, ViewParamValueForm, ViewParamValueDiff]

// https://tanstack.com/query/v4/docs/guides/updates-from-mutation-responses
const Doc = () => {
  const { t } = useTranslation()
  const { docId } = useParams()
  const safeDocId = docId.replace(/[^\dA-Za-z-_]/g, '').toLowerCase()
  const millerApiUrl = useSettingsStore((state) => state.millerApiUrl)
  const millerAuthToken = useSettingsStore((state) => state.millerAuthToken)
  const [view, setView] = useQueryParam(
    ViewParamName,
    withDefault(EnumParam(AvailableViewParamValues), ViewParamValueBasic),
  )

  const {
    data: doc,
    isLoading,
    isSuccess,
  } = useQuery(['doc', safeDocId], () =>
    axios
      .get(`/document/${safeDocId}/`, {
        baseURL: millerApiUrl,
        headers: {
          Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
        },
      })
      .then(({ data }) => data),
  )

  const {
    status: mutationStatus,
    isLoading: isPatching,
    isSuccess: isPatched,
    error: mutationError,
    mutate: partiallyUpdateDocument,
  } = useMutation(
    (payload) =>
      axios
        .patch(`/document/${safeDocId}/`, payload, {
          baseURL: millerApiUrl,
          headers: {
            Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
          },
        })
        .then((res) => {
          console.debug('[Doc] @useMutation response status:', res.status)
          return res.data
        }),
    // .catch((err) => console.error(err))
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['doc', safeDocId], data)
      },
    },
  )

  const onSubmitHandler = ({ formData, ...rest }) => {
    console.debug('[Doc] @onSubmit', formData, rest)
    // send to document as post.
    partiallyUpdateDocument(formData)
    // withToken(token, request.patch(`/api/document/${doc.id}/`))
    // .field({
    //   type:       doc.type,
    //   data:       JSON.stringify(doc.data)
    // })
    // .field(!doc.attachment ? {attachment: ''} : {}) //  Send an empty string to remove the file
    // .field(!doc.snapshot ? {snapshot: ''} : {}) //  Send an empty string to remove the file
    // .attach('attachment', doc.attachment_file || undefined)
    // .attach('snapshot', doc.snapshot_file || undefined)
    // .then(extractBody);
  }
  if (isLoading) {
    return 'loading....'
  }
  if (doc === null) {
    return null
  }

  console.debug('[Doc] using document:', doc)

  return (
    <div className="Doc">
      <Saving
        success={isPatched}
        isLoading={isPatching}
        status={mutationStatus}
        error={mutationError}
      >
        <span dangerouslySetInnerHTML={{ __html: t('pagesDocSavingDocument', { id: doc.slug }) }} />
      </Saving>
      <Container fluid>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <h1 className="mb-5">
              {t('pagesDocTitle')} {view}
            </h1>
            <DocItem doc={doc} />
          </Col>
        </Row>
        <Row className="my-3">
          <Col {...BootstrapColumnLayout}>
            <ul className="nav nav-tabs">
              {AvailableViewParamValues.map((d) => (
                <li className="nav-item" key={d}>
                  <a
                    className={`nav-link ${d === view ? 'active' : ''}`}
                    aria-current="page"
                    onClick={(e) => {
                      setView(d)
                    }}
                  >
                    {t(d)}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
        {view === ViewParamValueBasic && isSuccess && (
          <Row>
            <Col {...BootstrapColumnLayout}>
              <Form
                schema={{
                  title: '',
                  type: 'object',
                  required: ['title', 'slug'],
                  properties: {
                    title: { type: 'string', title: t('pagesDocFieldTitle'), default: 'title' },
                    slug: {
                      type: 'string',
                      title: t('pagesDocFieldSlug'),
                      default: 'slug',
                      pattern: '^[0-9a-z-]+$',
                      minLength: 10,
                      maxLength: 100,
                    },
                  },
                }}
                formData={{ title: doc.title, slug: doc.slug }}
                validator={validator}
                // onChange={(e) => console.log('changed', e)}
                onSubmit={onSubmitHandler}
                onError={(e) => console.log('errors', e)}
              >
                <button
                  type="submit"
                  disabled={mutationStatus === 'loading'}
                  className="btn btn-outline-dark btn-md"
                >
                  {t(mutationStatus === 'loading' ? 'saving' : 'save')}
                </button>
              </Form>
            </Col>
            <Col></Col>
          </Row>
        )}
        {view === ViewParamValueForm && isSuccess && (
          <Row>
            <Col {...BootstrapColumnLayout}>
              <DocData doc={doc} onSubmit={onSubmitHandler} />
            </Col>
          </Row>
        )}

        {view === ViewParamValueDiff && isSuccess && (
          <Row>
            <Col>
              <h2>Original data</h2>
              <pre className="bg-white border border-dark box-shadow p-3">
                {JSON.stringify(doc, null, 2)}
              </pre>
            </Col>
            <Col>
              <h2>Changed data</h2>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  )
}

export default Doc
