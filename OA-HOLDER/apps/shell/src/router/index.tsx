import { createHashRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '../layout/app-layout'
import Login from '../modules/login'
import Workdesk from '../modules/workdesk'
import Settings from '../modules/settings'
import ProtectedRoute from '../components/protected-route'

const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Workdesk />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
])

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
