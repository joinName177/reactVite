import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

/**
 * 路由守卫组件
 * 检查用户是否已登录，未登录则重定向到登录页
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLogin = useAppSelector((state) => state.login.isLogin);
  const location = useLocation();

  // 如果未登录，重定向到登录页，并保存当前路径以便登录后返回
  if (!isLogin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

