import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
  token: string | null;
  isLogin: boolean;
}

// 从 localStorage 读取初始状态（如果存在）
const getInitialToken = (): string | null => {
  try {
    return localStorage.getItem('token');
  } catch {
    return null;
  }
};

const initialState: LoginState = {
  token: getInitialToken(),
  isLogin: !!getInitialToken(),
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // 设置 token 并标记为已登录
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLogin = true;
      // 保存到 localStorage
      try {
        localStorage.setItem('token', action.payload);
      } catch (error) {
        console.error('Failed to save token to localStorage:', error);
      }
    },
    // 清除 token 并标记为未登录
    clearToken: (state) => {
      state.token = null;
      state.isLogin = false;
      // 从 localStorage 删除
      try {
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Failed to remove token from localStorage:', error);
      }
    },
  },
});

export const { setToken, clearToken } = loginSlice.actions;
export default loginSlice.reducer;

