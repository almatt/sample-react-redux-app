import {
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_RECEIVE,
  TRANSACTIONS_CREATING,
  TRANSACTIONS_CREATED,
  TRANSACTIONS_REQUEST_FAILED,
  TRANSACTIONS_CREATING_FAILED,
  TRANSACTION_REMOVING,
  TRANSACTION_REMOVED
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
        isLoading: true,
        didCreated: false,
        isFailedCreate: false,
        isCreating: false,
      }
    case TRANSACTIONS_RECEIVE:
      return {
        ...state,
        isLoading: false,
        items: action.transactions.map(transaction => {
          let bank = action.banks.find(bank => transaction.bankId === bank.id)
          return {
            ...transaction,
            bankName: bank.name
          }
        })
      }
    case TRANSACTIONS_CREATING:
      return {
        ...state,
        isCreating: true,
        isFailedCreate: false
      }
    case TRANSACTIONS_CREATED:
      return {
        ...state,
        isCreating: false,
        didCreated: true,
        isFailedCreate: false,
        items: [
          ...state.items,
          {
            ...action.transaction,
            bankName: action.banks.find(bank => action.transaction.bankId === bank.id).name
          }
        ]
      }
    case TRANSACTIONS_CREATING_FAILED:
      return {
        ...state,
        isCreating: false,
        isFailedCreate: true
      }
    case TRANSACTION_REMOVING:
      return {
        ...state,
        didCreated: false,
        isLoading: true
      }
    case TRANSACTION_REMOVED:
      return {
        ...state,
        isLoading: false,
        items: state.items.filter(transaction => transaction.id !== action.id)
      }
    default:
      return state
  }
}

export default transactions
