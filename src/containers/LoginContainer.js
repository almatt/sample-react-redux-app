import { connect } from 'react-redux'
import Login from '../components/Login'
import {
  login,
  successLogin
} from '../actions/auth'

const mapStateToProps = store => ({
  username: store.auth.username,
  isLoading: store.auth.isLoading,
  isAuthenticated: store.auth.isAuthenticated,
  didFailed: store.auth.didFailed
})
// const mapStateToProps = store => ({
//   ...{ username, isLoading, isAuthenticated} = store.auth
// })
const mapDispatchToProps = dispatch => ({
  logIn(user) {
    dispatch(login(user))
  },
  autoLogin(username) {
    dispatch(successLogin(username))
  }
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
