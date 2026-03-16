import { IpcEvent } from '@shared/types/enums'
import type { BrowserWindow } from 'electron'

export class SharedStateHub {
  private state = new Map<string, unknown>()
  private subscribers = new Map<string, Set<BrowserWindow>>()

  get<T = unknown>(key: string): T | undefined {
    return this.state.get(key) as T | undefined
  }

  set<T = unknown>(key: string, value: T, windows?: BrowserWindow[]): void {
    this.state.set(key, value)
    this.notifySubscribers(key, value, windows)
  }

  subscribe(key: string, window: BrowserWindow): () => void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set())
    }
    this.subscribers.get(key)!.add(window)

    window.on('closed', () => {
      this.subscribers.get(key)?.delete(window)
    })

    return () => {
      this.subscribers.get(key)?.delete(window)
    }
  }

  private notifySubscribers(key: string, value: unknown, windows?: BrowserWindow[]): void {
    const targets = windows || Array.from(this.subscribers.get(key) || [])
    targets.forEach(win => {
      if (!win.isDestroyed()) {
        win.webContents.send(IpcEvent.SharedStateChanged, { key, value })
      }
    })
  }

  getAll(): Record<string, unknown> {
    return Object.fromEntries(this.state)
  }

  clear(): void {
    this.state.clear()
    this.subscribers.clear()
  }
}

export const sharedStateHub = new SharedStateHub()
