// Namespace for auth actions...
const NS = 'auth@@'

export const LOGIN = `${NS}LOGIN`
export const LOGIN_LOADING = `${NS}LOGIN_LOADING`
export const LOGIN_FAILURE = `${NS}LOGIN_FAILURE`
export const LOGIN_SUCCESS = `${NS}LOGIN_SUCCESS`

export const login = credentials => ({
  type: LOGIN,
  payload: { credentials },
})

export const CLEAR_LOGIN_ERROR = `${NS}CLEAR_LOGIN_ERROR`
export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
})

export const AUTH_WITH_TOKEN_LOADING = `${NS}AUTH_WITH_TOKEN_LOADING`
export const AUTH_WITH_TOKEN_FAILURE = `${NS}AUTH_WITH_TOKEN_FAILURE`
export const AUTH_WITH_TOKEN_SUCCESS = `${NS}AUTH_WITH_TOKEN_SUCCESS`

export const LOGOUT = `${NS}LOGOUT`

export const logout = () => ({
  type: LOGOUT,
})

export const TOKEN_REFRESHED = `${NS}TOKEN_REFRESHED`
export const tokenRefreshed = ({ accessToken, refreshToken }) => ({
  type: TOKEN_REFRESHED,
  payload: { accessToken, refreshToken }
})

export const UPDATE_USER = `${NS}UPDATE_USER`
export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
})
