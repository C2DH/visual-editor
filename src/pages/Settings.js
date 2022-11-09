import React from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { BootstrapColumnLayout } from '../constants'
import { useSettingsStore } from '../store'

const Settings = () => {
  const { t } = useTranslation()
  // readonly
  const [basename, proxy, millerClientId, resetFromEnv] = useSettingsStore(
    (state) => [
      state.basename,
      state.proxy,
      state.millerClientId,
      state.resetFromEnv,
    ]
  )

  const millerApiUrl = useSettingsStore((state) => state.millerApiUrl)
  const millerOAuthUrl = useSettingsStore((state) => state.millerOAuthUrl)
  const mapboxAccessToken = useSettingsStore((state) => state.mapboxAccessToken)
  const mapboxStyleUrl = useSettingsStore((state) => state.mapboxStyleUrl)
  const [
    setMillerApiUrl,
    setMillerOAuthUrl,
    setMapboxAccessToken,
    setMapboxStyleUrl,
    setMillerClientId,
  ] = useSettingsStore((state) => [
    state.setMillerApiUrl,
    state.setMillerOAuthUrl,
    state.setMapboxAccessToken,
    state.setMapboxStyleUrl,
    state.setMillerClientId,
  ])

  return (
    <Container fluid>
      <Row>
        <Col {...BootstrapColumnLayout}>
          <h1>{t('pagesSettingsTitle')}</h1>
          <p>{t('pagesSettingsSubheading')}</p>
        </Col>
      </Row>
      <Row>
        <Col {...BootstrapColumnLayout}>
          <Form>
            {[
              {
                label: 'settingFieldMillerApiUrl',
                defaultValue: millerApiUrl,
                set: setMillerApiUrl,
              },
              {
                label: 'settingFieldMillerOAuthUrl',
                defaultValue: millerOAuthUrl,
                set: setMillerOAuthUrl,
              },
              {
                label: 'settingFieldMillerClientId',
                defaultValue: millerClientId,
                set: setMillerClientId,
              },
              {
                label: 'settingFieldMapboxAccessToken',
                defaultValue: mapboxAccessToken,
                set: setMapboxAccessToken,
              },
              {
                label: 'settingFieldMapboxStyleUrl',
                defaultValue: mapboxStyleUrl,
                set: setMapboxStyleUrl,
              },
            ].map((field) => (
              <Form.Group
                key={field.label}
                className='mb-3'
                controlId='formBasicEmail'
              >
                <Form.Label>{t(field.label)}</Form.Label>
                <Form.Control
                  type='url'
                  value={field.defaultValue}
                  onChange={(e) => field.set(e.target.value)}
                />
              </Form.Group>
            ))}
            <Button type='button' onClick={() => resetFromEnv()}>
              Reset (use env variables)
            </Button>
          </Form>
          <Form>
            {[
              {
                label: 'settingFieldBasename',
                defaultValue: basename,
              },
              {
                label: 'settingFieldProxy',
                defaultValue: proxy,
              },
            ].map((field) => (
              <Form.Group
                key={field.label}
                className='mb-3'
                controlId='formBasicEmail'
              >
                <Form.Label>{t(field.label)}</Form.Label>
                <Form.Control
                  type='text'
                  disabled
                  defaultValue={field.defaultValue}
                />
              </Form.Group>
            ))}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Settings
