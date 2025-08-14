# Redux 配置说明

## 文件结构

```
src/store/
├── index.ts          # Redux store 主配置
├── hooks.ts          # 类型安全的 Redux hooks
├── slices/           # Redux slices 目录
│   └── userSlice.ts  # 用户状态管理示例
└── README.md         # 本说明文档
```

## 使用方法

### 1. 在组件中使用 Redux

```tsx
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setUser, clearUser } from '../store/slices/userSlice'

const MyComponent = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  
  const handleLogin = () => {
    dispatch(setUser({ id: '1', username: 'user', email: 'user@example.com' }))
  }
  
  const handleLogout = () => {
    dispatch(clearUser())
  }
  
  return (
    <div>
      {user.isLoggedIn ? (
        <p>欢迎, {user.username}!</p>
      ) : (
        <p>请登录</p>
      )}
    </div>
  )
}
```

### 2. 创建新的 Slice

```tsx
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

### 3. 在 store 中添加新的 reducer

```tsx
// src/store/index.ts
import counterReducer from './slices/counterSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer, // 添加新的 reducer
  },
})
```

## 类型安全

- 使用 `useAppDispatch` 替代 `useDispatch`
- 使用 `useAppSelector` 替代 `useSelector`
- 这些 hooks 已经包含了正确的类型信息

## 开发工具

在开发环境中，Redux DevTools 会自动启用，你可以在浏览器中查看状态变化。

## 异步操作

对于异步操作，可以使用 Redux Toolkit 的 `createAsyncThunk`：

```tsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`)
    return response.json()
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
``` 