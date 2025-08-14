import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import './styles/index.less'
import router from './router'
import { store } from './store'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {import.meta.env.VITE_APP_ENV === 'production' ? (
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    ) : (
      <RouterProvider router={router} />
    )}
  </Provider>
)
