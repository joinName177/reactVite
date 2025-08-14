import type { Middleware } from '@reduxjs/toolkit'
import type { RootState } from '../index'

// Redux 状态持久化中间件
export const persistMiddleware: Middleware<object, RootState> = (store) => (next) => (action) => {
  const result = next(action)
  
  // 保存状态到 localStorage
  localStorage.setItem('redux-state', JSON.stringify(store.getState()))
  
  return result
}

// 从 localStorage 恢复状态
export const loadPersistedState = (): Partial<RootState> | undefined => {
  try {
    const serializedState = localStorage.getItem('redux-state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.warn('Failed to load persisted state:', err)
    return undefined
  }
} 