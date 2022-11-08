import React from 'react'
import { useStore } from '../store'

const AuthContext = React.createContext(null)

export const AuthProvider = ({ children }) => {
  const setUser = useStore((state) => state.setUser)
  const user = useStore({ user })

  const signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser)
      callback()
    })
  }

  const signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null)
      callback()
    })
  }

  let value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
