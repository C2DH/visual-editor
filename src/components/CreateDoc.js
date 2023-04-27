import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useSettingsStore, useStore } from '../store'
import Form from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'

import '../styles/components/CreateDoc.css'
import { useRef } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import Saving from './Saving'

const CreateDoc = () => {
  const doc = useRef(null)
  const formRef = useRef()
  const millerApiUrl = useSettingsStore((state) => state.millerApiUrl)
  const millerAuthToken = useSettingsStore((state) => state.millerAuthToken)
  const [modalCreateDocOpen, setModalCreateDocOpen] = useStore((state) => [
    state.modalCreateDocOpen,
    state.setModalCreateDocOpen,
  ])
  const { t } = useTranslation()

  const {
    status: mutationStatus,
    isLoading: isPatching,
    isSuccess: isPatched,
    error: mutationError,
    mutate: partiallyUpdateDocument,
  } = useMutation(
    (payload) =>
      axios
        .post(
          '/document/',
          { ...payload, data: {} },
          {
            baseURL: millerApiUrl,
            headers: {
              Authorization: `${millerAuthToken?.token_type} ${millerAuthToken?.access_token}`,
            },
          },
        )
        .then((res) => {
          console.debug('[Doc] @useMutation response status:', res.status)
          return res.data
        }),
    // .catch((err) => console.error(err))
    {
      onSuccess: (data) => {
        console.debug('[CreateDoc] success!', data)
        // queryClient.setQueryData(['doc', safeDocId], data)
      },
    },
  )

  const handleClose = () => setModalCreateDocOpen(false)
  const onChangeHandler = ({ formData }) => {
    console.debug('[CreateDoc] @change')
    doc.current = formData
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    if (formRef.current.validateForm()) {
      console.debug('[CreateDoc] @submit doc:', doc.current)
      partiallyUpdateDocument(doc.current)
    }
  }

  return (
    <>
      <Saving
        success={isPatched}
        isLoading={isPatching}
        status={mutationStatus}
        error={mutationError}
      >
        <span dangerouslySetInnerHTML={{ __html: t('pagesDocSavingDocument', { id: doc.slug }) }} />
      </Saving>
      <Modal className="CreateDoc" show={modalCreateDocOpen} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{t('createDoc')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            schema={{
              title: '',
              type: 'object',
              required: ['type', 'data', 'title', 'slug'],
              properties: {
                title: {
                  type: 'string',
                  title: t('pagesDocFieldTitle'),
                  minLength: 3,
                  maxLength: 100,
                  default: 'title',
                },
                slug: {
                  type: 'string',
                  title: t('pagesDocFieldSlug'),
                  default: 'slug',
                  pattern: '^[0-9a-z-]+$',
                  minLength: 3,
                  maxLength: 100,
                },
                type: {
                  type: 'string',
                  title: t('pagesDocFieldType'),
                  default: 'image',
                  enum: ['entity', 'image', 'video', 'audio'],
                },
                data: {
                  required: ['type'],
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      title: t('pagesDocFieldDataType'),
                      default: 'image',
                      enum: ['event', 'person', 'image'],
                    },
                  },
                },
              },
            }}
            ref={formRef}
            formData={{ title: null, slug: null }}
            validator={validator}
            onChange={(e) => onChangeHandler(e)}
            onSubmit={onSubmitHandler}
            onError={(e) => console.log('errors', e)}
          >
            &nbsp;
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-primary" size="sm" onClick={onSubmitHandler}>
            create document
          </Button>
          <Button variant="outline-primary" onClick={onSubmitHandler}>
            create and continue edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateDoc
