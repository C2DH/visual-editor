import { useState } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { BootstrapColumnLayout } from '../constants'
import { useSettingsStore, useStore } from '../store'

const Login = () => {
  const user = useStore((state) => state.user)
  const [credentials, setCredentials] = useState(null)
  const millerOAuthUrl = useSettingsStore((state) => state.millerOAuthUrl)
  const { isLoading, error, data } = useQuery(
    'repoData',
    () => {
      console.debug('[Login] @useQuery', credentials)
      return fetch(millerOAuthUrl).then((res) => res.json())
    },
    { enabled: credentials !== null },
  )

  console.debug(
    '[Login] \n - millerOAuthUrl:',
    millerOAuthUrl,
    '\n isLoading, error, data:',
    isLoading,
    error,
    data,
  )
  // const navigate = useNavigate()
  const location = useLocation()

  let from = location.state?.from?.pathname || '/'

  const handleSubmit = (event) => {
    event.preventDefault()

    let formData = new FormData(event.currentTarget)
    let email = formData.get('email')
    let pwd = formData.get('pwd')
    setCredentials({
      email,
      pwd,
    })
    // auth.signin(username, () => {
    //   // Send them back to the page they tried to visit when they were
    //   // redirected to the login page. Use { replace: true } so we don't create
    //   // another entry in the history stack for the login page.  This means that
    //   // when they get to the protected page and click the back button, they
    //   // won't end up back on the login page, which is also really nice for the
    //   // user experience.
    //   navigate(from, { replace: true });
    // });
  }

  if (user) {
    return <div>Already logged in! Continue to {from}</div>
  }

  return (
    <Container fluid>
      <Row>
        <Col {...BootstrapColumnLayout}>
          <p>You must log in to view the page at {from}</p>
          {error !== null && (
            <p className="text-danger">
              Error: {error.message}
              <br />
              Probably this is due to `Cross-Origin Request Blocked: The Same Origin Policy
              disallows reading the remote resource`
            </p>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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
