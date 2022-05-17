import React, { useState, useEffect, useCallback } from 'react'

let logoutTimer

const AuthContext = React.createContext({
  token: '',
  user: {},
  isLoggedIn: false,
  isAdmin: false,
  login: (token, expirationTime, user) => { },
  logout: () => { },
  changeAvatar: (avatar) => { }

})

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime()
  const adjExpirationTime = new Date(expirationTime).getTime()

  const remainingDuration = adjExpirationTime - currentTime

  return remainingDuration
}

const retrieveStoredToken = () => {
  console.log('retreive')
  const storedToken = localStorage.getItem('token')
  const storedExpirationDate = localStorage.getItem('expirationTime')
  let storedUser
  try {
    storedUser = JSON.parse(localStorage.getItem('user'))
  } catch (err) {
    storedUser = null
  }
  const remainingTime = calculateRemainingTime(storedExpirationDate)

  if (remainingTime <= 60000) {
    // Treshold. If remaining time is less than 1 minute, remove token
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('user')
    return null
  }

  return {
    token: storedToken,
    duration: remainingTime,
    user: storedUser
  }
}

export const AuthContextProvider = (props) => {
  const storedData = retrieveStoredToken()

  let initialToken
  let initialUser
  if (storedData) {
    initialToken = storedData.token
    initialUser = storedData.user
  }

  const [token, setToken] = useState(initialToken)
  const [user, setUser] = useState(initialUser)

  const userIsLoggedIn = !!token && !!user
  const userIsAdmin = user?.admin === true

  const logoutHandler = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('user')

    if (logoutTimer) {
      clearTimeout(logoutTimer)
    }
  }, [])

  const loginHandler = (token, expirationTime, user) => {
    setToken(token)
    setUser(user)

    localStorage.setItem('token', token)
    localStorage.setItem('expirationTime', expirationTime)
    localStorage.setItem('user', JSON.stringify(user))

    const remainingTime = calculateRemainingTime(expirationTime)

    logoutTimer = setTimeout(logoutHandler, remainingTime)
  }

  const changeAvatarHandler = (avatar) => {
    setUser(prevState => {
      const updatedUser = { ...prevState, avatar }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return updatedUser
    })
  }

  useEffect(() => {
    if (storedData) {
      logoutTimer = setTimeout(logoutHandler, storedData.duration)
    }
    if (!userIsAdmin) {
      logoutHandler()
    }
  }, [storedData, logoutHandler, userIsAdmin])

  const contextValue = {
    token,
    user,
    isLoggedIn: userIsLoggedIn,
    isAdmin: userIsAdmin,
    login: loginHandler,
    logout: logoutHandler,
    changeAvatar: changeAvatarHandler
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
