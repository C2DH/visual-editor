import { useDocument } from '@c2dh/react-miller'
import validator from '@rjsf/validator-ajv8'
import { useParams } from 'react-router-dom'
import Form from '@rjsf/core'
import { BootstrapColumnLayout } from '../constants'
import DocItem from '../components/Doc/DocItem'
import { Col, Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const schema = {
  title: 'person',
  type: 'object',
  required: ['title', 'slug'],
  definitions: {
    life_events: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        date: {
          title: 'death date',
          type: 'string',
          format: 'date-time',
        },
      },
      required: ['name'],
    },
  },
  properties: {
    title: { type: 'string', title: 'Title', default: 'title' },
    slug: { type: 'string', title: 'unique identifier', default: 'slug' },
    data: {
      type: 'object',
      description: 'basic info',
      title: 'person metadata',
      required: ['first_name', 'last_name'],
      additionalProperties: false,
      properties: {
        first_name: {
          title: 'First name',
          type: 'string',
        },
        last_name: {
          title: 'Last name',
          type: 'string',
        },
        last_name_at_birth: {
          title: 'Last name at birth',
          type: 'string',
        },
        name_notes: {
          title: 'Notes on name',
          type: 'string',
        },
        birth_date: {
          title: 'Birth date',
          type: 'string',
          format: 'date-time',
        },
        birth_country: {
          title: 'Birth country',
          type: 'string',
        },
        death_date: {
          title: 'death date',
          type: 'string',
          format: 'date-time',
        },
        death_country: {
          title: 'death country',
          type: 'string',
        },
        notes: {
          title: 'Notes on name, birth date etc...',
          type: 'string',
        },
        households: {
          type: 'array',
          items: { title: 'household identifier', type: 'string' },
        },
        events: {
          type: 'array',
          items: {
            $ref: '#/definitions/life_events',
          },
        },
      },
    },
  },
}

const Doc = () => {
  const { t } = useTranslation()
  const { docId } = useParams()
  const safeDocId = docId.replace(/[^\dA-Za-z-_]/g, '').toLowerCase()
  const [doc, { isLoading }] = useDocument(safeDocId, {
    params: {
      nocache: 'true',
    },
  })
  if (isLoading) {
    return 'loading....'
  }
  if (doc === null) {
    return null
  }

  return (
    <div className="Doc">
      <Container fluid>
        <Row>
          <Col {...BootstrapColumnLayout}>
            <h1 className="mb-5">{t('pagesDocTitle')}</h1>
            <DocItem doc={doc} />
          </Col>
        </Row>
        <Row>
          <Col {...BootstrapColumnLayout} className="mt-5">
            <Form
              schema={schema}
              formData={doc}
              validator={validator}
              onChange={(e) => console.log('changed', e)}
              onSubmit={(e) => console.log('submitted', e)}
              onError={(e) => console.log('errors', e)}
            />
          </Col>
          <Col></Col>
        </Row>
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
      </Container>
    </div>
  )
}

export default Doc
