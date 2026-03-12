import { create } from 'zustand'
import type { IUserInfo } from '@holder/shared-types'

interface UserState {
  userInfo: IUserInfo | null
  token: string | null
  isAuthenticated: boolean

  setUserInfo: (userInfo: IUserInfo) => void
  setToken: (token: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
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
