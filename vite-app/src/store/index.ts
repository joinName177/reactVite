import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import counterReducer from './slices/counterSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    // 可以在这里添加更多的 reducer
  },
  // 开发环境下的配置
  devTools: process.env.NODE_ENV !== 'production',
})

// 导出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 