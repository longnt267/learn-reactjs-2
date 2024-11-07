import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LoadingScreen } from '../App'

export const PublicRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  // Nếu đã authenticated, redirect về /home
  if (isAuthenticated) {
    return <Navigate to='/home' replace />
  }

  // Nếu chưa authenticated, cho phép truy cập route
  return <Outlet />
}