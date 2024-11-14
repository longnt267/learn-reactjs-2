import MainLayout from '../layouts/MainLayout'
import { Home } from '../pages/Home/Home'
import { Order } from '../pages/Order/Order'

export const publicRoutes = [
  {
    path: '/login',
    element: <MainLayout />
  }
]

export const privateRoutes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/order',
    element: <Order />
  }
  // {
  //   path: '/dashboard',
  //   element: <Dashboard />,
  // },
  // {
  //   path: '/settings',
  //   element: <Settings />,
  // },
  // {
  //   path: '/products',
  //   children: [
  //     {
  //       path: '',
  //       element: <Products />,
  //     },
  //     {
  //       path: ':id',
  //       element: <Products.Detail />,
  //     },
  //     {
  //       path: 'create',
  //       element: <Products.Create />,
  //     },
  //   ],
  // },
]
