import { createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Login from '@/pages/Login';
import Approval from '@/pages/Approval';
import Meeting from '@/pages/Meeting';
import ProtectedRoute from '@/components/ProtectedRoute';

const router = createHashRouter([
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
    ],
  },
  {
    path: '/approval',
    element: <Approval />,
  },
  {
    path: '/meeting',
    element: <Meeting />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

