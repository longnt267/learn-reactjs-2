import { createContext, useState, useContext, useEffect } from 'react'
import { userApi } from '../apis/user.js'


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
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token')
      
      if (storedToken) {
        try {
          setToken(storedToken)
          // Gọi API để lấy thông tin user
          const userData = await userApi.getLogin(storedToken)
          setUser(userData)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Auth initialization failed:', error)
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
        setUser(null)
        setToken(null)
      }
      setLoading(false)
    }

    initializeAuth()
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