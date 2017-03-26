import React from 'react'
import { BrowserRouter, Route, IndexRoute } from 'react-router'

import App from './App'
import List from './components/List'
import AddTransaction from './components/AddTransaction'

export default (
  <BrowserRouter path='/' component={App}>
    <IndexRoute component={List} />
    <Route path='/add' component={AddTransaction} />
  </BrowserRouter>
)
