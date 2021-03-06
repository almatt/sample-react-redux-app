import { connect } from 'react-redux'
import App from '../App'
import {
  successLogin,
  logout
} from '../actions/auth'

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  username: store.auth.username
})

const mapDispatchToProps = dispatch => ({
  autoLogin(username) {
    dispatch(successLogin(username))
  }
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
