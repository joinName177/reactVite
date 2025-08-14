import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// 用户状态接口
interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  profile: string | null;
  account: string | null;
  refresh_token: string | null;
  access_token: string | null;
}

// 从 localStorage 恢复初始状态
const getInitialState = (): UserState => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      return {
        ...userData,
        loading: false,
        error: null
      };
    }
  } catch (error) {
    console.error("Failed to parse stored user data:", error);
  }

  return {
    id: null,
    username: null,
    email: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    profile: null,
    account: null,
    refresh_token: null,
    access_token: null
  };
};

// 初始状态
const initialState: UserState = getInitialState();

// 创建 slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 设置用户信息
    setUser: (state, action: PayloadAction<{ id: number; username: string; email: string; profile: string; account: string; refresh_token: string; access_token: string }>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      state.error = null;
      state.profile = action.payload.profile;
      state.account = action.payload.account;
      state.refresh_token = action.payload.refresh_token;
      state.access_token = action.payload.access_token;
      // 保存到 localStorage
      try {
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: action.payload.id,
            username: action.payload.username,
            email: action.payload.email,
            isLoggedIn: true,
            profile: action.payload.profile,
            account: action.payload.account,
            refresh_token: action.payload.refresh_token,
            access_token: action.payload.access_token
          })
        );
      } catch (error) {
        console.error("Failed to save user data to localStorage:", error);
      }
    },
    // 清除用户信息
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.isLoggedIn = false;
      state.error = null;
      state.refresh_token = null;
      state.access_token = null;
      state.profile = null;
      state.account = null;
      // 从 localStorage 清除
      try {
        localStorage.removeItem("user");
      } catch (error) {
        console.error("Failed to remove user data from localStorage:", error);
      }
    },
    // 设置加载状态
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // 设置错误信息
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    // 清除错误信息
    clearError: (state) => {
      state.error = null;
    }
  }
});

// 导出 actions
export const { setUser, clearUser, setLoading, setError, clearError } = userSlice.actions;

// 导出 reducer
export default userSlice.reducer;

// 导出选择器
export const selectUser = (state: { user: UserState }) => state.user;
export const selectIsLoggedIn = (state: { user: UserState }) => state.user.isLoggedIn;
export const selectUserInfo = (state: { user: UserState }) => ({
  id: state.user.id,
  username: state.user.username,
  email: state.user.email
});
export const selectLoading = (state: { user: UserState }) => state.user.loading;
export const selectError = (state: { user: UserState }) => state.user.error;
