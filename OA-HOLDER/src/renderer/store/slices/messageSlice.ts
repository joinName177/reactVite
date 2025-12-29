import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MessageItem {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: number;
  read: boolean;
}

export interface MessageState {
  messages: MessageItem[];
  unreadCount: number;
  isBlinking: boolean; // 是否正在闪烁
}

const initialState: MessageState = {
  messages: [],
  unreadCount: 0,
  isBlinking: false,
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    // 添加消息
    addMessage: (state, action: PayloadAction<Omit<MessageItem, 'id' | 'timestamp' | 'read'>>) => {
      const newMessage: MessageItem = {
        ...action.payload,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        read: false,
      };
      state.messages.unshift(newMessage); // 新消息添加到前面
      state.unreadCount += 1;
      state.isBlinking = true; // 触发闪烁
    },
    // 添加多条消息
    addMessages: (state, action: PayloadAction<Omit<MessageItem, 'id' | 'timestamp' | 'read'>[]>) => {
      const newMessages: MessageItem[] = action.payload.map((msg) => ({
        ...msg,
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        read: false,
      }));
      state.messages.unshift(...newMessages);
      state.unreadCount += newMessages.length;
      state.isBlinking = true;
    },
    // 标记消息为已读
    markAsRead: (state, action: PayloadAction<string>) => {
      const message = state.messages.find((msg) => msg.id === action.payload);
      if (message && !message.read) {
        message.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    // 标记所有消息为已读
    markAllAsRead: (state) => {
      state.messages.forEach((msg) => {
        msg.read = true;
      });
      state.unreadCount = 0;
      state.isBlinking = false;
    },
    // 删除消息
    removeMessage: (state, action: PayloadAction<string>) => {
      const index = state.messages.findIndex((msg) => msg.id === action.payload);
      if (index !== -1) {
        const message = state.messages[index];
        if (!message.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.messages.splice(index, 1);
      }
    },
    // 清空所有消息
    clearAllMessages: (state) => {
      state.messages = [];
      state.unreadCount = 0;
      state.isBlinking = false;
    },
    // 设置闪烁状态
    setBlinking: (state, action: PayloadAction<boolean>) => {
      state.isBlinking = action.payload;
    },
  },
});

export const {
  addMessage,
  addMessages,
  markAsRead,
  markAllAsRead,
  removeMessage,
  clearAllMessages,
  setBlinking,
} = messageSlice.actions;

export default messageSlice.reducer;

