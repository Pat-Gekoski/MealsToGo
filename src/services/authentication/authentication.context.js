import React, { useState, createContext } from 'react'
import { getAuth } from 'firebase/auth'

import {
  loginRequest,
  registerRequest,
  logoutRequest,
} from './authentication.service'

export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  getAuth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  })

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

  const onLogout = () => {
    setUser(null)
    logoutRequest().catch((err) => setError(err.message))
  }

  const onRegister = (email, password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      setError('Error: passwords do not match')
      return
    }
    setIsLoading(true)
    registerRequest(getAuth(), email, password)
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
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
