import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useUserStore } from '~/store'

interface IProtectedRouteProps {
  children: React.ReactElement
}

/**
 * 路由守卫：未登录时重定向到登录页，并记录来源路径以便登录后跳�?
 */
const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
