import React, { Component, PropTypes } from 'react'
import { Container } from 'reactstrap'
import TransactionsContainer from './containers/TransactionsContainer'
import LoginContainer from './containers/LoginContainer'
import AddTransactionContainer from './containers/AddTransactionContainer'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

const Routing = ({ isAuthenticated }) => (
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
      <Route component={NoMatch}/>
    </Switch>
  </Container>
)

Routing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const NoMatch = ({ location }) => (
  <h3>404 Не найдено <code>{location.pathname}</code></h3>
)

export default Routing
