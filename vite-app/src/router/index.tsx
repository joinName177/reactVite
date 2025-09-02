// React import removed as it's not needed in this file
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
/** 首页 */
import Home from '../pages/Home';
/** 关于 */
import About from '../pages/About';
/** 联系 */
import Contact from '../pages/Contact';
/** 登录 */
import Login from '../pages/Login';
/** 表单配置 */
import FormConfiguration from '../pages/FormConfiguration';
/** 404 */
import NotFound from '../pages/NotFound';
/** 受保护的路由 */
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'form-configuration',
        element: <FormConfiguration />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);

export default router; 