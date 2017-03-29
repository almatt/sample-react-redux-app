import React, { Component } from 'react'
import { Alert, Row, Col, Form, FormGroup, Label, Button } from 'reactstrap'

class Login extends Component {

  static propTypes: {
    username: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    didFailed: PropTypes.bool.isRequired,
    logIn: PropTypes.func.isRequired,
    autoLogin: PropTypes.func.isRequired,
  }

  handleSubmit(e) {
    e.preventDefault()
    const { logIn } = this.props
    logIn({
      username: e.target.username.value,
      password: e.target.password.value
    })
    e.target.username.value = ''
    e.target.password.value = ''
  }

  render() {
    const { isLoading, didFailed, isAuthenticated, error } = this.props
    return (
      <Row className="justify-content-center">
        <Col sm="6" lg="4">
          <h4 className="page__title">Вход</h4>
          {didFailed
            &&
            <Alert color="danger">
              {error}
            </Alert>
          }
          {isAuthenticated
            &&
            <Alert color="success">
              <strong>Вы</strong> успешно вошли.
            </Alert>
          }
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormGroup>
              <Label for="username">Имя пользователя</Label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                placeholder="Ваше имя"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="pwdLabel">Пароль</Label>
              <input
                type="password"
                name="password"
                id="pwdLabel"
                className="form-control"
                placeholder="Ваш пароль"
                required
              />
            </FormGroup>
            <Button type="submit" outline color="primary" block>
              {isLoading ? 'Подождите' : 'Вход'}
            </Button>
          </Form>
        </Col>
      </Row>
    )
  }
}

export default Login
