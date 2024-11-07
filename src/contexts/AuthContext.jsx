import { createContext, useState, useContext, useEffect } from 'react'

export const AuthContext = createContext({
  isAuthenticated: false,
  loading: true,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  setUser: () => {}
})

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedToken = localStorage.getItem('token')
        if (storedToken) {
          setToken(storedToken)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
          setUser(null)
          setToken(null)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (newToken, userData) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
    user,
    setUser,
    token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}