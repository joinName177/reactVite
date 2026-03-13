import React from 'react'
import { HolderConfigProvider } from '@holder/ui/theme'
import { I18nProvider } from '@holder/i18n'
import AppRouter from './router'

const App: React.FC = () => {
  return (
    <I18nProvider>
      <HolderConfigProvider>
        <AppRouter />
      </HolderConfigProvider>
    </I18nProvider>
  )
}

export default App
