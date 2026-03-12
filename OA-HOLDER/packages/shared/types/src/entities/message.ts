export type MessageType = 'text' | 'image' | 'file' | 'system' | 'notification'
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed'

export interface IChatMessage {
  id: string
  roomId: string
  senderId: string
  senderName?: string
  senderAvatar?: string
  type: MessageType
  content: string
  status: MessageStatus
  replyTo?: string
  attachments?: IAttachment[]
  createdAt: string
}

export interface IAttachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  thumbnailUrl?: string
}

export interface INotificationItem {
  id: string
  title: string
  content: string
  type: 'info' | 'warning' | 'error' | 'success'
  module?: string
  link?: string
  read: boolean
  timestamp: number
}
