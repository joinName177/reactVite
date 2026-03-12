import { create } from 'zustand'

type ThemeMode = 'light' | 'dark'

interface UIState {
  env: string
  sidebarCollapsed: boolean
  themeMode: ThemeMode

  setEnv: (env: string) => void
  toggleSidebar: () => void
  setThemeMode: (mode: ThemeMode) => void
}

export const useUIStore = create<UIState>((set) => ({
  env: import.meta.env.VITE_APP_ENV || 'development',
  sidebarCollapsed: false,
  themeMode: 'light',

  setEnv: (env) => set({ env }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setThemeMode: (mode) => set({ themeMode: mode }),
}))
