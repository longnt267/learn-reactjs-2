import React from 'react'
import { ToastContainer } from 'react-toastify'
import { Navigate, Route, Routes } from 'react-router'
import { PublicRoute } from './components/PublicRoute'
import { PrivateRoute } from './components/PrivateRoute'
import { privateRoutes, publicRoutes } from './routes/routes'
const App = () => {
  return (
    <>
      <ToastContainer closeButton={false} />
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

export default App
