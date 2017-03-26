import React, { Component, PropTypes } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom'
import { Container, Button } from 'reactstrap'
import List from './containers/TransactionsContainer'
import Login from './containers/LoginContainer'
import AddForm from './containers/AddTransactionContainer'
import Navbar from './components/Navbar'


class App extends Component {

  static propTypes: {
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    autoLogin: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { autoLogin } = this.props
    const username = localStorage.getItem('username')
    if (username)
      autoLogin(username)
  }

  render() {
    const { isAuthenticated, isLoading, username, logOut } = this.props
    return (
      <Router>
        <div>
          <Navbar
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            username={username}
          />
          <Container>
            <Switch>
              <Route exact path="/" render={() => (
                isAuthenticated ? (
                  <List />
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path="/add" render={() => (
                isAuthenticated ? (
                  <AddForm />
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path="/login" component={Login} />
              <Route path="/logout" render={() => {
                localStorage.clear()
                logOut()
                return <Redirect to="/login"/>
              }}/>
              <Route component={NoMatch}/>
            </Switch>
          </Container>
        </div>
      </Router>
    )
  }
}

const NoMatch = ({ location }) => (
  <h3>Не найдено <code>{location.pathname}</code></h3>
)

export default App
