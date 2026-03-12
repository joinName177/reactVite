import { app, BrowserWindow } from 'electron'
import { initAppLifecycle } from './core/app-lifecycle'
import { ensureSingleInstance } from './core/single-instance'
import { getAppConfig } from './core/config'
import { windowManager } from './windows/window-manager'
import { initIpcHandlers } from './ipc/ipc-hub'
import { createTray, destroyTray } from './native/tray'

const config = getAppConfig()

console.log(`[Electron] Environment: ${config.env}, NODE_ENV: ${process.env.NODE_ENV}`)

if (!ensureSingleInstance()) {
  app.quit()
} else {
  initIpcHandlers()

  app.whenReady().then(() => {
    createTray()
    windowManager.createWindow('main')

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        windowManager.createWindow('main')
      } else {
        const mainWindow = windowManager.getWindow('main')
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.show()
          mainWindow.focus()
        }
      }
    })
  })

  app.on('before-quit', () => {
    windowManager.setQuitting(true)
    windowManager.cleanup()
    destroyTray()
  })

  app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
      app.quit()
    }
  })
}
