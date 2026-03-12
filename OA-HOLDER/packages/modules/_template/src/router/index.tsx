import { createHashRouter, Navigate } from 'react-router-dom'
import { HomePage } from '../pages/home'

export const router = createHashRouter([
  { path: '/', element: <Navigate to="/home" replace /> },
  { path: '/home', element: <HomePage /> },
])
