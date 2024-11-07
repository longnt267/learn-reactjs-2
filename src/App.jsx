import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Navigate, Route, Routes } from 'react-router'
import { PublicRoute } from './components/PublicRoute'
import { PrivateRoute } from './components/PrivateRoute'
import { privateRoutes, publicRoutes } from './routes/routes'
import { Box, CircularProgress } from '@mui/material' // Giả sử bạn dùng MUI
import { useAuth } from './hooks/useAuth'
import { AuthProvider } from './contexts/AuthContext'

export const LoadingScreen = () => (
  <Box display='flex' justifyContent='center' alignItems='center' minHeight='100vh'>
    <CircularProgress />
  </Box>
)

const AppRoutes = () => {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      <ToastContainer position='top-right' autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          {publicRoutes.map((route) => {
            return <Route key={route.path} path={route.path} element={route.element} />
          })}
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          {privateRoutes.map((route) => {
            if (route.children) {
              return (
                <Route key={route.path} path={route.path}>
                  {route.children.map((child) => (
                    <Route key={child.path} path={child.path} element={child.element} />
                  ))}
                </Route>
              )
            }
            return <Route key={route.path} path={route.path} element={route.element} />
          })}
        </Route>

        {/* Redirect to login by default */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <>
        <ToastContainer closeButton={false} />
        <AppRoutes />
      </>
    </AuthProvider>
  )
}

export default App
