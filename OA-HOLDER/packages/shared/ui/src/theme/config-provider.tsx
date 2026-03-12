import React, { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { ConfigProvider, theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'
import { lightTheme, darkTheme } from './tokens'

type ThemeMode = 'light' | 'dark'

interface ThemeContextValue {
  mode: ThemeMode
  toggleTheme: () => void
  setTheme: (mode: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

interface HolderConfigProviderProps {
  children: React.ReactNode
  defaultMode?: ThemeMode
  customTheme?: Partial<ThemeConfig>
}

export const HolderConfigProvider: React.FC<HolderConfigProviderProps> = ({
  children,
  defaultMode = 'light',
  customTheme,
}) => {
  const [mode, setMode] = useState<ThemeMode>(defaultMode)

  const toggleTheme = useCallback(() => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode)
  }, [])

  const themeConfig = useMemo<ThemeConfig>(() => {
    const baseTheme = mode === 'light' ? lightTheme : darkTheme
    return {
      ...baseTheme,
      ...customTheme,
      algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        ...baseTheme.token,
        ...customTheme?.token,
      },
      components: {
        ...baseTheme.components,
        ...customTheme?.components,
      },
    }
  }, [mode, customTheme])

  const contextValue = useMemo(
    () => ({ mode, toggleTheme, setTheme }),
    [mode, toggleTheme, setTheme]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <ConfigProvider theme={themeConfig}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
