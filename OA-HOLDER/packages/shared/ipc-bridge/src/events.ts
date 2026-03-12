import { IpcEvent } from '@holder/shared-types/enums'

export { IpcEvent }

export type EventHandler<T = unknown> = (data: T) => void

export interface IEventBus {
  emit<T = unknown>(event: string, data: T): void
  on<T = unknown>(event: string, handler: EventHandler<T>): () => void
  off<T = unknown>(event: string, handler: EventHandler<T>): void
  once<T = unknown>(event: string, handler: EventHandler<T>): void
}

export class EventBus implements IEventBus {
  private handlers = new Map<string, Set<EventHandler>>()

  emit<T = unknown>(event: string, data: T): void {
    const eventHandlers = this.handlers.get(event)
    if (eventHandlers) {
      eventHandlers.forEach(handler => handler(data))
    }
  }

  on<T = unknown>(event: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set())
    }
    this.handlers.get(event)!.add(handler as EventHandler)
    return () => this.off(event, handler)
  }

  off<T = unknown>(event: string, handler: EventHandler<T>): void {
    const eventHandlers = this.handlers.get(event)
    if (eventHandlers) {
      eventHandlers.delete(handler as EventHandler)
      if (eventHandlers.size === 0) {
        this.handlers.delete(event)
      }
    }
  }

  once<T = unknown>(event: string, handler: EventHandler<T>): void {
    const wrapper: EventHandler<T> = (data) => {
      this.off(event, wrapper)
      handler(data)
    }
    this.on(event, wrapper)
  }

  removeAllListeners(event?: string): void {
    if (event) {
      this.handlers.delete(event)
    } else {
      this.handlers.clear()
    }
  }
}

export const globalEventBus = new EventBus()
