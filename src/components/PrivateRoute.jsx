import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { HomeLayout } from '../layouts/Home/Home'
import { LoadingScreen } from '../App' // Import từ App.jsx hoặc nơi bạn định nghĩa

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  // Redirect về login nếu chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  )
}