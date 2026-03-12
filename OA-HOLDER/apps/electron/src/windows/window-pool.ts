import { BrowserWindow } from 'electron'
import * as path from 'path'

const POOL_SIZE = 2

class WindowPool {
  private pool: BrowserWindow[] = []
  private isInitialized = false

  init(): void {
    if (this.isInitialized) return
    this.isInitialized = true

    for (let i = 0; i < POOL_SIZE; i++) {
      this.createPooledWindow()
    }

    console.log(`[WindowPool] Initialized with ${POOL_SIZE} windows`)
  }

  acquire(): BrowserWindow | null {
    const win = this.pool.pop()

    if (win && !win.isDestroyed()) {
      this.createPooledWindow()
      return win
    }

    return null
  }

  drain(): void {
    this.pool.forEach(win => {
      if (!win.isDestroyed()) {
        win.destroy()
      }
    })
    this.pool = []
    this.isInitialized = false
  }

  get size(): number {
    return this.pool.filter(w => !w.isDestroyed()).length
  }

  private createPooledWindow(): void {
    const preloadPath = path.join(__dirname, '../preload/module-preload.js')

    const win = new BrowserWindow({
      show: false,
      width: 1440,
      height: 900,
      webPreferences: {
        preload: preloadPath,
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
      },
    })

    this.pool.push(win)
  }
}

export const windowPool = new WindowPool()
