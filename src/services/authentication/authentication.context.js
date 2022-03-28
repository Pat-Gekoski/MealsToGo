import React, { useState, createContext } from 'react'
import { getAuth } from 'firebase/auth'

import { loginRequest } from './authentication.service'

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const onLogin = (email, password) => {
    setIsLoading(true)
    loginRequest(getAuth(), email, password)
      .then((userCredential) => {
        setUser(userCredential.user)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.message)
      })
  }

  return (
    <AuthenticationContext.Provider
      value={{ user, isLoading, error, onLogin, isAuthenticated: !!user }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
