import { combineReducers } from 'redux'
import transactions from './transactions'
import banks from './banks'
import auth from './auth'

const rootReducer = combineReducers({
  transactions,
  banks,
  auth
})

export default rootReducer
