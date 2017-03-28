import React, { Component, PropTypes } from 'react'
import {
  HashRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom'
import { Container, Button } from 'reactstrap'
import TransactionsContainer from './containers/TransactionsContainer'
import LoginContainer from './containers/LoginContainer'
import AddTransactionContainer from './containers/AddTransactionContainer'
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
                  <TransactionsContainer />
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path="/add" render={() => (
                isAuthenticated ? (
                  <AddTransactionContainer />
                ) : (
                  <Redirect to="/login"/>
                )
              )}/>
              <Route path="/login" component={LoginContainer} />
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
  <h3>404 Не найдено <code>{location.pathname}</code></h3>
)

export default App
