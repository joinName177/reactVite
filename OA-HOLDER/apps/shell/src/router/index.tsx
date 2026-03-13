import { createHashRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '../layout/app-layout'
import Login from '../modules/login'
import Workdesk from '../modules/workdesk'
import Settings from '../modules/settings'
import NotFound from '../modules/not-found'
import ProtectedRoute from '../components/protected-route'
import { ModuleLoader } from './module-loader'

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
      {
        path: 'task',
        element: <ModuleLoader moduleId="task-manager" />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
