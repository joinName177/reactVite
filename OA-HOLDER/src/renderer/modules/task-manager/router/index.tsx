import { createHashRouter, Navigate } from 'react-router-dom'
import { ModuleLayout } from '~/layout'
import { DashboardPage } from '~/pages/dashboard'
import { TaskListPage } from '~/pages/task-list'

export const router = createHashRouter([
  {
    path: '/',
    element: <ModuleLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'tasks', element: <TaskListPage /> },
    ],
  },
])
