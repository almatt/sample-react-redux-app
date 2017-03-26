export const BANKS_REQUEST   = 'BANKS_REQUEST'
export const BANKS_RECEIVE   = 'BANKS_RECEIVE'

const requestBanks = () => ({
  type: BANKS_REQUEST
})
const receiveBanks = banks => ({
  type: BANKS_RECEIVE,
  banks
})
export const fetchBanks = () => dispatch => {
  dispatch(requestBanks())
  return fetch('http://localhost:3000/banks')
    .then(response => response.json())
    .then(json => dispatch(receiveBanks(json)))
}
