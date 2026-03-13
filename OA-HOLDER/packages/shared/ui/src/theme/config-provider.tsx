import React from 'react'
import { ConfigProvider } from 'antd'
import type { ThemeConfig } from 'antd'
import { lightTheme } from './tokens'

interface IHolderConfigProviderProps {
  children: React.ReactNode
  customTheme?: Partial<ThemeConfig>
}

export const HolderConfigProvider: React.FC<IHolderConfigProviderProps> = ({
  children,
  customTheme,
}) => {
  const themeConfig: ThemeConfig = {
    ...lightTheme,
    ...customTheme,
    token: {
      ...lightTheme.token,
      ...customTheme?.token,
    },
    components: {
      ...lightTheme.components,
      ...customTheme?.components,
    },
  }

  return (
    <ConfigProvider theme={themeConfig}>
      {children}
    </ConfigProvider>
  )
}
