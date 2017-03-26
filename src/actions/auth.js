export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT = 'LOGOUT'

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
export const login = user => dispatch => {
  dispatch(requestLogin())
  fetch(`http://localhost:3000/users?username=${user.username}&password=${user.password}`)
    .then(response => {
      if (response.ok) {
        response.json()
          .then(json => {
            if(json.length) {
              dispatch(successLogin(user.username))
              console.log('Авторизация успешно')
              localStorage.setItem('username', json[0].username)
            } else {
              dispatch(failedLogin())
              console.log('Неправильный имя пользователя или пароль', json)
            }
          })
      } else {
        response.json()
          .then(json => console.log('Ошибка сети', json))
      }
    })
}

export const logout = () => ({
  type: LOGOUT
})
