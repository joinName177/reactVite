import { create } from 'zustand'
import { envConfig } from '~/config/env'

interface IUIState {
  env: string
  sidebarCollapsed: boolean

  setEnv: (env: string) => void
  toggleSidebar: () => void
}

export const useUIStore = create<IUIState>((set) => ({
  env: envConfig.env,
  sidebarCollapsed: false,

  setEnv: (env) => set({ env }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}))
