import { app } from 'electron'

export function ensureSingleInstance(): boolean {
  const gotTheLock = app.requestSingleInstanceLock()

  if (!gotTheLock) {
    console.log('[Electron] Another instance is already running, quitting...')
    return false
  }

  app.on('second-instance', (_event, _commandLine, _workingDirectory) => {
    const { BrowserWindow } = require('electron')
    const windows = BrowserWindow.getAllWindows()
    if (windows.length > 0) {
      const mainWindow = windows[0]
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }
  })

  return true
}
