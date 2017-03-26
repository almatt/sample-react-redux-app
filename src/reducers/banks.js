import {
  BANKS_REQUEST,
  BANKS_RECEIVE
} from '../actions/banks'

const initialState = {
  isLoading: false,
  items: []
}

const banks = (state = initialState, action) => {
  switch (action.type) {
    case BANKS_REQUEST:
      return {
        ...state,
        isLoading: true
      }
    case BANKS_RECEIVE:
      return {
        ...state,
        isLoading: false,
        items: action.banks
      }
    default:
      return state
  }
}

export default banks
