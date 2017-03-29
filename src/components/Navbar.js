import React, { Component } from 'react'
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem, Button } from 'reactstrap'
import { NavLink, Redirect, Link } from 'react-router-dom'

class MyNavbar extends Component {

  static propTypes: {
    isLoading: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    logOut: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout(e) {
    e.preventDefault()
    const { logOut, isAuthenticated } = this.props
    localStorage.clear()
    if (isAuthenticated)
      logOut()
  }

  render() {
    const { isAuthenticated, isLoading, username } = this.props
    return (
      <Navbar color="faded" light toggleable>
        <Container>
          <NavbarToggler right onClick={this.toggle} />
          <Link to="/" className="navbar-brand">Transactions</Link>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated &&
                <NavLink to="/add" className="nav-link">Добавить</NavLink>
              }
              {isAuthenticated
                ? <NavLink to="/" className="nav-link">{username}</NavLink>
                : !isLoading && <NavLink to="/login" className="nav-link">Вход</NavLink>
              }
              {isAuthenticated &&
                <a className="nav-link" href="#" onClick={this.handleLogout.bind(this)}>
                  Выйти
                </a>
              }
              {isLoading && '.....'}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default MyNavbar
