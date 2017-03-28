import React, { Component } from 'react'
import { Container, Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap'
import { NavLink, Link } from 'react-router-dom'

class MyNavbar extends Component {

  static propTypes: {
    isAuthenticated: PropTypes.bool.isRequired
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
                : <NavLink to="/login" className="nav-link">Вход</NavLink>
              }
              {isAuthenticated &&
                <NavLink to="/logout" className="nav-link">Выйти</NavLink>
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
