// React import removed as it's not needed in this file
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
/** 首页 */
import Home from '../pages/Home';
/** 关于 */
import About from '../pages/About';
/** 联系 */
import Contact from '../pages/Contact/index';
/** 登录 */
import Login from '../pages/Login';
/** 表单配置 */
import FormConfiguration from '../pages/FormConfiguration';
/** 权限配置 */
import PermissionConfiguration from '../pages/PermissionConfiguration';
/** 404 */
import NotFound from '../pages/404/NotFound';
/** 受保护的路由 */
import ProtectedRoute from '../components/ProtectedRoute';
/** Home子页面 */
import ExcelToImg from '../pages/Home/components/ExcelToImg';
/**漫游引导 */
import Tour from '../pages/Tour';
/** 表单 */
import Form from '../pages/Form';
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
        element: <Navigate to="/home" replace />,
      },
      {
        path: 'home',
        element: <Home />,
        children: [
          {
            index: true,
            element: <Navigate to="/home/excelToImg" replace />,
          },
          {
            path: 'excelToImg',
            element: <ExcelToImg />,
          },
          {
            path: 'imgToExcel',
            element: <div>imgToExcel</div>,
          },
        ],
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
        path: 'permission-configuration',
        element: <PermissionConfiguration />,
      },
      {
        path: 'tour',
        element: <Tour />,
      },
      {
        path: 'form',
        element: <Form />,
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