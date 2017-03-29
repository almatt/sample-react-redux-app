import { connect } from 'react-redux'
import Navbar from '../components/Navbar'
import {
  logout
} from '../actions/auth'

const mapStateToProps = store => ({
  isLoading: store.auth.isLoading,
  isAuthenticated: store.auth.isAuthenticated,
  username: store.auth.username
})

const mapDispatchToProps = dispatch => ({
  logOut() {
    dispatch(logout())
  }
})

const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)

export default NavbarContainer
