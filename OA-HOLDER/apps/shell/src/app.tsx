import React from 'react'
import { HolderConfigProvider } from '@holder/ui/theme'
import AppRouter from './router'

const App: React.FC = () => {
  return (
    <HolderConfigProvider>
      <AppRouter />
    </HolderConfigProvider>
  )
}

export default App
