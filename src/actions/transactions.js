export const TRANSACTIONS_REQUEST   = 'TRANSACTIONS_REQUEST'
export const TRANSACTIONS_RECEIVE   = 'TRANSACTIONS_RECEIVE'
export const TRANSACTIONS_CREATING  = 'TRANSACTIONS_CREATING'
export const TRANSACTIONS_CREATED   = 'TRANSACTIONS_CREATED'
export const TRANSACTIONS_REQUEST_FAILED  = 'TRANSACTIONS_REQUEST_FAILED'
export const TRANSACTIONS_CREATING_FAILED = 'TRANSACTIONS_CREATING_FAILED'
export const TRANSACTION_REMOVING = 'TRANSACTION_REMOVING'
export const TRANSACTION_REMOVED = 'TRANSACTION_REMOVED'

const requestTransactions = () => ({
  type: TRANSACTIONS_REQUEST
})
const receiveTransactions = transactions => ({
  type: TRANSACTIONS_RECEIVE,
  transactions
})
export const fetchTransactions = () => dispatch => {
  dispatch(requestTransactions())
  return fetch('http://localhost:3000/transactions?_expand=bank')
    .then(response => response.json())
    .then(json => dispatch(receiveTransactions(json)))
}

const creatingT = () => ({
  type: TRANSACTIONS_CREATING
})
const createdT = transaction => ({
  type: TRANSACTIONS_CREATED,
  transaction
})
const creatingTFailed = () => ({
  type: TRANSACTIONS_CREATING_FAILED
})
export const createTransaction = transaction => dispatch => {
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
          .then(json => {
            console.log('Транзакция успешно добавлена')
            dispatch(createdT(json))
          })
      } else {
        response.json()
          .then(json => {
            console.log('Ошибка добавления транзакции', json)
            dispatch(creatingTFailed())
          })
      }
    })
}

const removingItem = () => ({
  type: TRANSACTION_REMOVING
})
const removedItem = () => ({
  type: TRANSACTION_REMOVED
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
            console.log('Транзакция успешно удалена', json)
            dispatch(removedItem())
            dispatch(fetchTransactions())
          })
      } else {
        response.json()
          .then(json => {
            console.log('Ошибка удаления транзакции', json)
          })
      }
    })
}
