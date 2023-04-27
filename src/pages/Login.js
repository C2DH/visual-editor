import axios from 'axios'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { BootstrapColumnLayout } from '../constants'
import { useSettingsStore } from '../store'

const Login = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const millerAuthToken = useSettingsStore((state) => state.millerAuthToken)
  const millerOAuthUrl = useSettingsStore((state) => state.millerOAuthUrl)
  const millerClientId = useSettingsStore((state) => state.millerClientId)
  const setMillerAuthToken = useSettingsStore((state) => state.setMillerAuthToken)

  const { isLoading, isError, error, data, mutate } = useMutation({
    mutationFn: (credentials) => {
      console.debug('[Login] @useQuery', credentials)
      return axios
        .post(
          millerOAuthUrl,
          new URLSearchParams({
            client_id: millerClientId,
            grant_type: 'password',
            ...credentials,
          }),
        )
        .then((res) => {
          console.debug('[Login] @useQuery res:', res)
          if (res.ok === false) {
            console.error('[Login] @useQuery error:', res)
            throw new Error(res.statusText)
          }
          return res
        })
    },
    onSuccess: (res) => {
      console.debug('[Login] @useQuery success!', res.data)
      setMillerAuthToken(res.data)
      navigate(from, { replace: true })
    },
  })

  console.debug(
    '[Login] \n - millerOAuthUrl:',
    millerOAuthUrl,
    '\n isLoading, error, data:',
    isLoading,
    error,
    data,
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    let formData = new FormData(event.currentTarget)
    let username = formData.get('username')
    let password = formData.get('pwd')
    // validate somehow before sending
    mutate({
      username,
      password,
    })
  }

  if (millerAuthToken) {
    return <div>Already logged in! Continue to {from}</div>
  }

  return (
    <Container fluid>
      <Row>
        <Col {...BootstrapColumnLayout}>
          <p>You must log in to view the page at {from}</p>
          {isError && (
            <p className="text-danger">
              {error.code === 'ERR_BAD_REQUEST' && t('checkCredentials')}
              <pre className="text-muted border border-danger">{error.message}</pre>
            </p>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" type="text" placeholder="Enter email" />
              <Form.Text className="text-muted">Ask someone for the credentials.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="pwd">
              <Form.Label>Password</Form.Label>
              <Form.Control name="pwd" type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login