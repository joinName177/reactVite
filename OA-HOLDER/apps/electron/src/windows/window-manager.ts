import { BrowserWindow, screen } from 'electron'
import * as path from 'path'
import { getAppConfig } from '../core/config'
import { getWindowConfigs, WindowKey, WindowConfig } from './window-config'

class WindowManager {
  private windows = new Map<string, BrowserWindow>()
  private isQuitting = false

  setQuitting(value: boolean): void {
    this.isQuitting = value
  }

  getWindow(key: string): BrowserWindow | undefined {
    return this.windows.get(key)
  }

  getAllWindows(): Map<string, BrowserWindow> {
    return new Map(this.windows)
  }

  createWindow(key: WindowKey): BrowserWindow | null {
    const existing = this.windows.get(key)
    if (existing && !existing.isDestroyed()) {
      existing.show()
      existing.focus()
      return existing
    }

    const configs = getWindowConfigs()
    const config = configs[key]
    if (!config) {
      console.error(`[WindowManager] Unknown window key: ${key}`)
      return null
    }

    const size = this.calculateSize(config)
    const appConfig = getAppConfig()

    const preloadPath = path.join(__dirname, '../preload/main-preload.js')

    const win = new BrowserWindow({
      width: size.width,
      height: size.height,
      minWidth: size.minWidth,
      minHeight: size.minHeight,
      title: config.title,
      autoHideMenuBar: true,
      icon: this.getIconPath(),
      resizable: config.resizable ?? true,
      minimizable: config.minimizable ?? true,
      maximizable: config.maximizable ?? true,
      skipTaskbar: config.skipTaskbar ?? false,
      show: false,
      webPreferences: {
        preload: preloadPath,
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: false,
      },
    })

    this.windows.set(key, win)
    this.loadContent(win, config.route || '', appConfig)
    this.setupWindowEvents(win, key, config)

    return win
  }

  closeWindow(key: string): void {
    const win = this.windows.get(key)
    if (win && !win.isDestroyed()) {
      win.close()
    }
  }

  closeAllChildWindows(): void {
    this.windows.forEach((win, key) => {
      if (key !== 'main' && !win.isDestroyed()) {
        win.close()
      }
    })
  }

  cleanup(): void {
    this.windows.forEach(win => {
      if (!win.isDestroyed()) {
        win.removeAllListeners('closed')
        win.removeAllListeners('close')
      }
    })
  }

  private calculateSize(config: WindowConfig) {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width: screenWidth, height: screenHeight } = primaryDisplay.size

    let width = config.width ?? 1440
    let height = config.height ?? 900
    let minWidth = config.minWidth ?? width
    let minHeight = config.minHeight ?? height

    if (screenWidth < 1440) {
      width = Math.min(width, 1334)
      minWidth = width
      const calculatedHeight = screenHeight < 920 ? screenHeight - 80 : 840
      height = Math.max(calculatedHeight, 600)
      minHeight = height
    }

    return { width, height, minWidth, minHeight }
  }

  private getIconPath(): string {
    const basePath = path.join(__dirname, '../../build')
    return process.platform === 'win32'
      ? path.join(basePath, 'icon.ico')
      : path.join(basePath, 'icon.png')
  }

  private loadContent(win: BrowserWindow, route: string, config: ReturnType<typeof getAppConfig>): void {
    if (config.isDev) {
      const url = route
        ? `${config.devServerUrl}/#/${route}`
        : config.devServerUrl
      win.loadURL(url)
    } else {
      const indexPath = path.join(__dirname, '../renderer/index.html')
      if (route) {
        win.loadFile(indexPath, { hash: `/${route}` })
      } else {
        win.loadFile(indexPath)
      }
    }
  }

  private setupWindowEvents(win: BrowserWindow, key: string, config: WindowConfig): void {
    win.once('ready-to-show', () => {
      win.show()
      const appConfig = getAppConfig()
      if (appConfig.isDev && config.openDevTools) {
        win.webContents.openDevTools()
      }
    })

    if (config.hideOnClose) {
      win.on('close', (event) => {
        if (!this.isQuitting) {
          event.preventDefault()
          win.hide()
        }
      })
    } else {
      win.on('closed', () => {
        this.windows.delete(key)
      })
    }
  }
}

export const windowManager = new WindowManager()
