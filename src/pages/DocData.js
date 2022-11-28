import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import axios from 'axios'
import { ArrowBigRight } from 'lucide-react'
import { useQuery } from 'react-query'
import { useSettingsStore } from '../store'

const DocDataDefaultJsonSchema = {
  title: 'default data',
  type: 'object',
  required: ['type'],
  properties: {
    type: {
      type: 'string',
      title: 'type of this document, e.g. "letter"',
      default: 'doc',
    },
  },
}

const DocData = ({ doc }) => {
  const millerDocumentSchemaRootUrl = useSettingsStore((state) => state.millerDocumentSchemaRootUrl)
  const schemaUrl = `${millerDocumentSchemaRootUrl}/payload.${doc.data.type}.json`

  const { data: remoteJsonSchema, isSuccess } = useQuery({
    queryKey: ['schema', doc.type],
    queryFn: () => {
      console.debug('[DocData] @useQuery', schemaUrl)
      return axios.get(schemaUrl).then(({ data }) => data)
    },
  })
  console.debug('[DocData] schema url:', schemaUrl, remoteJsonSchema)
  // load schema based on payload
  const schema = isSuccess ? remoteJsonSchema : DocDataDefaultJsonSchema
  return (
    <div>
      <p className="mb-3">
        Source of the JSON Schema used for the validation:
        <br />
        <a href={schemaUrl} target="_blank" rel="noreferrer">
          <ArrowBigRight size={16} />
          <span className="ms-2">{schemaUrl}</span>
        </a>
      </p>
      <hr />
      <Form
        schema={schema}
        formData={doc.data}
        validator={validator}
        onChange={(e) => console.log('changed', e)}
        onSubmit={(e) => console.log('submitted', e)}
        onError={(e) => console.log('errors', e)}
      />
    </div>
  )
}

export default DocData
