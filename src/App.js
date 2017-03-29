import React, { Component, PropTypes } from 'react'
import {
  HashRouter as Router
} from 'react-router-dom'
import NavbarContainer from './containers/NavbarContainer'
import Routing from './Routing'

class App extends Component {

  static propTypes: {
    isAuthenticated: PropTypes.bool.isRequired,
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
    const { isAuthenticated, username, logOut } = this.props
    return (
      <Router>
        <div>
          <NavbarContainer
            isAuthenticated={isAuthenticated}
            username={username}
          />
          <Routing isAuthenticated={isAuthenticated}/>
        </div>
      </Router>
    )
  }
}

export default App
