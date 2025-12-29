import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import loginReducer from './slices/loginSlice';
import messageReducer from './slices/messageSlice';
// 在这里导入其他 slice

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    message: messageReducer,
    // 在这里添加其他 reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

