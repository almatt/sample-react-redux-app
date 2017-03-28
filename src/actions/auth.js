export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'
export const ERR_CONNECTION = 'ERR_CONNECTION'

const requestLogin = () => ({
  type: LOGIN_REQUEST
})
export const successLogin = username => ({
  type: LOGIN_SUCCESS,
  username
})
const failedLogin = () => ({
  type: LOGIN_FAILED
})
const errConnection = () => ({
  type: ERR_CONNECTION
})
export const login = user => dispatch => {
  dispatch(requestLogin())
  fetch(`http://localhost:3000/users?username=${user.username}&password=${user.password}`)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => {
            if(json.length) {
              dispatch(successLogin(user.username))
              localStorage.setItem('username', json[0].username)
            } else {
              dispatch(failedLogin())
            }
          })
      }
    })
    .catch(() => dispatch(errConnection()))
}

export const logout = () => ({
  type: LOGOUT
})
