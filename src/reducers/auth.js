import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from '../actions/auth'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  didFailed: false,
  username: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        didFailed: false
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        username: action.username,
        didFailed: false
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        username: '',
        didFailed: true
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: '',
        didFailed: false
      }
    default:
      return state
  }
}

export default auth
