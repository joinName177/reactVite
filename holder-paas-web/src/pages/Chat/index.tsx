// pages/Chat/index.tsx
import { Card, Input, Button, List } from 'antd'
import { useState } from 'react'
import { useMessages, useSendMessage } from '@/hooks/useMessages'

const Chat: React.FC = () => {
  const [roomId] = useState('room1')
  const [message, setMessage] = useState('')
  const { data: messages, isLoading } = useMessages(roomId)
  const sendMessage = useSendMessage()

  const handleSend = () => {
    if (!message.trim()) return
    sendMessage.mutate(
      { roomId, content: message },
      {
        onSuccess: () => {
          setMessage('')
        },
      }
    )
  }

  return (
    <Card title="聊天">
      <div style={{ height: 400, overflow: 'auto', marginBottom: 16 }}>
        <List
          loading={isLoading}
          dataSource={messages || []}
          renderItem={(item) => (
            <List.Item>
              <div>
                <strong>{item.senderId}:</strong> {item.content}
              </div>
            </List.Item>
          )}
        />
      </div>
      <Input.Group compact>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleSend}
          placeholder="输入消息..."
          style={{ width: 'calc(100% - 80px)' }}
        />
        <Button type="primary" onClick={handleSend}>
          发送
        </Button>
      </Input.Group>
    </Card>
  )
}

export default Chat

