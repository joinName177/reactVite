import { app } from 'electron'

export interface AppLifecycleOptions {
  onReady?: () => void
  onBeforeQuit?: () => void
  onWindowAllClosed?: () => void
}

export function initAppLifecycle(options: AppLifecycleOptions = {}): void {
  app.on('ready', () => {
    options.onReady?.()
  })

  app.on('before-quit', () => {
    options.onBeforeQuit?.()
  })

  app.on('window-all-closed', () => {
    options.onWindowAllClosed?.()
  })

  app.on('second-instance', () => {
    const { BrowserWindow } = require('electron')
    const windows = BrowserWindow.getAllWindows()
    if (windows.length > 0) {
      const mainWindow = windows[0]
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }
  })
}
