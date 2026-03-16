export interface WebSocketConfig {
  url: string
  protocols?: string | string[]
  reconnectInterval?: number
  maxReconnectAttempts?: number
  heartbeatInterval?: number
  getToken?: () => string | null
  onOpen?: () => void
  onClose?: (event: CloseEvent) => void
  onError?: (error: Event) => void
  debug?: boolean
}

export interface WebSocketMessage<T = unknown> {
  type: string
  data: T
  timestamp?: number
}

type MessageHandler<T = unknown> = (message: WebSocketMessage<T>) => void

export class WebSocketClient {
  private ws: WebSocket | null = null
  private config: WebSocketConfig
  private reconnectAttempts = 0
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null
  private handlers = new Map<string, Set<MessageHandler>>()
  private isManualClose = false

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectInterval: 3000,
      maxReconnectAttempts: 10,
      heartbeatInterval: 30000,
      ...config,
    }
  }

  connect(): void {
    this.isManualClose = false
    const url = this.buildUrl()

    if (this.config.debug) {
      console.log('[WS] Connecting to:', url)
    }

    this.ws = new WebSocket(url, this.config.protocols)

    this.ws.onopen = () => {
      this.reconnectAttempts = 0
      this.startHeartbeat()
      this.config.onOpen?.()
      if (this.config.debug) console.log('[WS] Connected')
    }

    this.ws.onmessage = (event: MessageEvent) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data)
        this.dispatchMessage(message)
      } catch {
        if (this.config.debug) console.warn('[WS] Invalid message:', event.data)
      }
    }

    this.ws.onclose = (event: CloseEvent) => {
      this.stopHeartbeat()
      this.config.onClose?.(event)
      if (!this.isManualClose) {
        this.tryReconnect()
      }
    }

    this.ws.onerror = (error: Event) => {
      this.config.onError?.(error)
      if (this.config.debug) console.error('[WS] Error:', error)
    }
  }

  disconnect(): void {
    this.isManualClose = true
    this.stopHeartbeat()
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  send<T = unknown>(type: string, data: T): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage<T> = { type, data, timestamp: Date.now() }
      this.ws.send(JSON.stringify(message))
    } else {
      console.warn('[WS] Not connected, cannot send message')
    }
  }

  on<T = unknown>(type: string, handler: MessageHandler<T>): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set())
    }
    this.handlers.get(type)!.add(handler as MessageHandler)
    return () => this.off(type, handler)
  }

  off<T = unknown>(type: string, handler: MessageHandler<T>): void {
    this.handlers.get(type)?.delete(handler as MessageHandler)
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN
  }

  private buildUrl(): string {
    const token = this.config.getToken?.()
    if (token) {
      const separator = this.config.url.includes('?') ? '&' : '?'
      return `${this.config.url}${separator}token=${token}`
    }
    return this.config.url
  }

  private dispatchMessage(message: WebSocketMessage): void {
    const handlers = this.handlers.get(message.type)
    if (handlers) {
      handlers.forEach(handler => handler(message))
    }

    const wildcardHandlers = this.handlers.get('*')
    if (wildcardHandlers) {
      wildcardHandlers.forEach(handler => handler(message))
    }
  }

  private tryReconnect(): void {
    const maxAttempts = this.config.maxReconnectAttempts ?? 10
    if (this.reconnectAttempts >= maxAttempts) {
      console.error('[WS] Max reconnect attempts reached')
      return
    }

    this.reconnectAttempts++
    const interval = this.config.reconnectInterval ?? 3000

    if (this.config.debug) {
      console.log(`[WS] Reconnecting (${this.reconnectAttempts}/${maxAttempts}) in ${interval}ms`)
    }

    this.reconnectTimer = setTimeout(() => {
      this.connect()
    }, interval)
  }

  private startHeartbeat(): void {
    const interval = this.config.heartbeatInterval
    if (!interval) return

    this.heartbeatTimer = setInterval(() => {
      this.send('heartbeat', { timestamp: Date.now() })
    }, interval)
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }
}
