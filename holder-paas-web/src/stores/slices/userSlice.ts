// stores/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserInfo {
  id: string
  name: string
  email: string
  avatar?: string
}

interface UserState {
  userInfo: UserInfo | null
  loginToken: string | null
  loading: boolean
}

const initialState: UserState = {
  userInfo: null,
  loginToken: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
    },
    setLoginToken: (state, action: PayloadAction<string>) => {
      state.loginToken = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    clearUser: (state) => {
      state.userInfo = null
      state.loginToken = null
    },
  },
})

export const { setUserInfo, setLoginToken, setLoading, clearUser } = userSlice.actions
export default userSlice.reducer

