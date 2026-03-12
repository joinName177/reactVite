import { create } from 'zustand'

interface ModuleState {
  loading: boolean
  setLoading: (loading: boolean) => void
}

export const useModuleStore = create<ModuleState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
}))
