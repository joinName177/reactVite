import { BrowserWindow } from 'electron'
import { IpcEvent } from '@shared/types'

class SharedState {
  private state = new Map<string, unknown>()

  get<T = unknown>(key: string): T | undefined {
    return this.state.get(key) as T | undefined
  }

  set<T = unknown>(key: string, value: T): void {
    this.state.set(key, value)
    this.broadcast(key, value)
  }

  delete(key: string): void {
    this.state.delete(key)
    this.broadcast(key, undefined)
  }

  getAll(): Record<string, unknown> {
    return Object.fromEntries(this.state)
  }

  clear(): void {
    this.state.clear()
  }

  private broadcast(key: string, value: unknown): void {
    const windows = BrowserWindow.getAllWindows()
    windows.forEach(win => {
      if (!win.isDestroyed()) {
        win.webContents.send(IpcEvent.SharedStateChanged, { key, value })
      }
    })
  }
}

export const sharedState = new SharedState()
