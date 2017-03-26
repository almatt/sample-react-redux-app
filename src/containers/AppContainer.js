import { connect } from 'react-redux'
import App from '../App'
import {
  successLogin,
  logout
} from '../actions/auth'

const mapStateToProps = store => ({
  isAuthenticated: store.auth.isAuthenticated,
  username: store.auth.username,
  isLoading: store.auth.isLoading
})

const mapDispatchToProps = dispatch => ({
  autoLogin(username) {
    dispatch(successLogin(username))
  },
  logOut() {
    dispatch(logout())
  }
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
