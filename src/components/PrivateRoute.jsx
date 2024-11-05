import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { HomeLayout } from '../layouts/Home/Home'

export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  ) : (
    <Navigate to='/login' />
  )
}
