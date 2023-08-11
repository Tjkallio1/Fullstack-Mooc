import { Form, Button } from 'react-bootstrap'

const LoginForm = (props) => {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <div>
            <Form.Label>Username</Form.Label>
            <input
              id="username"
              type="text"
              value={props.username}
              name="Username"
              onChange={props.handleUserChange}
            />
          </div>
          <div>
            <Form.Label>Password</Form.Label>
            <input
              id="password"
              type="password"
              value={props.password}
              name="Password"
              onChange={props.handlePasswordChange}
            />
            <Button variant="primary" type="submit">
                Login
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
