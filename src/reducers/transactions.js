import {
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_RECEIVE,
  TRANSACTIONS_CREATING,
  TRANSACTIONS_CREATED,
  TRANSACTIONS_REQUEST_FAILED,
  TRANSACTIONS_CREATING_FAILED
} from '../actions/transactions'

const initialState = {
  isLoading: false,
  isCreating: false,
  isFailedCreate: false,
  didCreated: false,
  items: []
}

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case TRANSACTIONS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case TRANSACTIONS_RECEIVE:
      return {
        ...state,
        isLoading: false,
        didCreated: false,
        items: action.transactions
      }
    case TRANSACTIONS_CREATING:
      return {
        ...state,
        isCreating: true
      }
    case TRANSACTIONS_CREATED:
      return {
        ...state,
        isCreating: false,
        didCreated: true
      }
    case TRANSACTIONS_CREATING_FAILED:
      return {
        ...state,
        isCreating: false,
        isFailedCreate: true
      }
    default:
      return state
  }
}

export default transactions
