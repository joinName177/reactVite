import { create } from 'zustand'
import type { IUserInfo } from '@shared/types'

interface IUserState {
  userInfo: IUserInfo | null
  token: string | null
  isAuthenticated: boolean

  setUserInfo: (userInfo: IUserInfo) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useUserStore = create<IUserState>((set) => ({
  userInfo: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),

  setUserInfo: (userInfo) => set({ userInfo, isAuthenticated: true }),

  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ userInfo: null, token: null, isAuthenticated: false })
  },
}))
