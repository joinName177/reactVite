// services/xmppClient.ts
import ReconnectingWebSocket from 'reconnecting-websocket'

class XMPPClient {
  private ws: ReconnectingWebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 10
  private heartbeatInterval: number | null = null

  connect(url: string, protocols?: string[]) {
    this.ws = new ReconnectingWebSocket(url, protocols, {
      maxRetries: this.maxReconnectAttempts,
      connectionTimeout: 5000,
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.3,
    })

    this.ws.addEventListener('open', this.handleOpen.bind(this))
    this.ws.addEventListener('message', this.handleMessage.bind(this))
    this.ws.addEventListener('error', this.handleError.bind(this))
    this.ws.addEventListener('close', this.handleClose.bind(this))
  }

  private handleOpen() {
    console.log('WebSocket connected')
    this.reconnectAttempts = 0
    this.startHeartbeat()
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data = JSON.parse(event.data)
      // 处理消息
      this.onMessage?.(data)
    } catch (error) {
      console.error('Failed to parse message:', error)
    }
  }

  private handleError(error: Event) {
    console.error('WebSocket error:', error)
  }

  private handleClose() {
    console.log('WebSocket closed')
    this.stopHeartbeat()
  }

  private startHeartbeat() {
    this.stopHeartbeat()
    this.heartbeatInterval = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, 30000)
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval !== null) {
      clearInterval(this.heartbeatInterval)
      this.heartbeatInterval = null
    }
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.warn('WebSocket is not connected')
    }
  }

  disconnect() {
    this.stopHeartbeat()
    this.ws?.close()
    this.ws = null
  }

  // 消息回调
  onMessage?: (data: any) => void
}

export const xmppClient = new XMPPClient()

