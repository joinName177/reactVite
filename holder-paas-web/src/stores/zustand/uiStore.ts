// stores/zustand/uiStore.ts
import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  currentModal: string | null
  toggleSidebar: () => void
  openModal: (modalId: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  currentModal: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modalId) => set({ currentModal: modalId }),
  closeModal: () => set({ currentModal: null }),
}))

