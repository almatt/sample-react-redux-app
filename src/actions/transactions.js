import { fetchBanks } from './banks'

export const TRANSACTIONS_REQUEST   = 'TRANSACTIONS_REQUEST'
export const TRANSACTIONS_RECEIVE   = 'TRANSACTIONS_RECEIVE'
export const TRANSACTIONS_CREATING  = 'TRANSACTIONS_CREATING'
export const TRANSACTIONS_CREATED   = 'TRANSACTIONS_CREATED'
export const TRANSACTIONS_REQUEST_FAILED  = 'TRANSACTIONS_REQUEST_FAILED'
export const TRANSACTIONS_CREATING_FAILED = 'TRANSACTIONS_CREATING_FAILED'
export const TRANSACTION_REMOVING = 'TRANSACTION_REMOVING'
export const TRANSACTION_REMOVED  = 'TRANSACTION_REMOVED'

const requestTransactions = () => ({
  type: TRANSACTIONS_REQUEST
})
const receiveTransactions = (transactions, banks) => ({
  type: TRANSACTIONS_RECEIVE,
  transactions,
  banks
})
export const fetchTransactions = () => (dispatch, getState) => {
  dispatch(requestTransactions())
  return fetch('http://localhost:3000/transactions')
    .then(response => response.json())
    .then(transactions => {
      if (!getState().banks.items.length) {
        dispatch(fetchBanks())
          .then(q => dispatch(receiveTransactions(transactions, q.banks)))
      } else {
        dispatch(receiveTransactions(transactions, getState().banks.items))
      }
    })
}

const creatingT = () => ({
  type: TRANSACTIONS_CREATING
})
const createdT = (transaction, banks) => ({
  type: TRANSACTIONS_CREATED,
  transaction,
  banks
})
const creatingTFailed = () => ({
  type: TRANSACTIONS_CREATING_FAILED
})
export const createTransaction = transaction => (dispatch, getState) => {
  dispatch(creatingT())
  fetch('http://localhost:3000/transactions', {
    headers: {
      "Content-type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify(transaction)
  })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(transaction => {
            dispatch(createdT(transaction, getState().banks.items))
          })
      }
    })
    .catch(() => dispatch(creatingTFailed()))
}

const removingItem = () => ({
  type: TRANSACTION_REMOVING
})
const removedItem = id => ({
  type: TRANSACTION_REMOVED,
  id
})
export const removeItem = id => dispatch => {
  dispatch(removingItem())
  fetch(`http://localhost:3000/transactions/${id}`, {
    headers: {
      "Content-type": "application/json"
    },
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => {
            dispatch(removedItem(id))
          })
      }
    })
}
