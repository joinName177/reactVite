// api/message.ts
import apiClient from './request'

export interface Message {
  id: string
  roomId: string
  content: string
  timestamp: number
  senderId: string
}

export interface GetMessagesParams {
  roomId: string
  page?: number
  pageSize?: number
}

export interface SendMessageParams {
  roomId: string
  content: string
}

export const messageApi = {
  // 获取消息列表
  getMessages: (params: GetMessagesParams) => {
    return apiClient.get<Message[]>('/messages', { params })
  },

  // 发送消息
  sendMessage: (data: SendMessageParams) => {
    return apiClient.post<Message>('/messages', data)
  },

  // 删除消息
  deleteMessage: (messageId: string) => {
    return apiClient.delete(`/messages/${messageId}`)
  },
}

