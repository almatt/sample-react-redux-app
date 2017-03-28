import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  ERR_CONNECTION
} from '../actions/auth'

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  didFailed: false,
  username: '',
  error: ''
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        didFailed: false,
        error: ''
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        username: action.username,
        didFailed: false,
        error: ''
      }
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        username: '',
        didFailed: true,
        error: 'Неправильное имя пользователя или пароль'
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        username: '',
        didFailed: false,
        error: ''
      }
    case ERR_CONNECTION:
      return {
        ...state,
        isAuthenticated: false,
        username: '',
        didFailed: true,
        error: 'Ошибка соединения'
      }
    default:
      return state
  }
}

export default auth
