import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  import.meta.env.VITE_APP_ENV === 'production' ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
)
