import React, { Suspense, lazy } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import { Spin } from 'antd'
import AppLayout from '../layout/app-layout'
import ProtectedRoute from '../components/protected-route'

// 路由懒加载：首屏仅加载 Login，其余按需加载
const Login = lazy(() => import('../modules/login'))
const Workdesk = lazy(() => import('../modules/workdesk'))
const Settings = lazy(() => import('../modules/settings'))
const NotFound = lazy(() => import('../modules/not-found'))
const TaskModule = lazy(() => import('../modules/task-manager'))

/** 路由懒加载时的占位组件 */
function RouteFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
      <Spin tip="加载中..." />
    </div>
  )
}

/** 用 Suspense 包裹懒加载组件 */
function withSuspense(Element: React.ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{Element}</Suspense>
}

const router = createHashRouter([
  {
    path: '/login',
    element: withSuspense(<Login />),
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
        element: withSuspense(<Workdesk />),
      },
      {
        path: 'settings',
        element: withSuspense(<Settings />),
      },
      {
        path: 'task',
        element: withSuspense(<TaskModule />),
      },
      {
        path: '*',
        element: withSuspense(<NotFound />),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(<NotFound />),
  },
])

const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />
}

export default AppRouter
