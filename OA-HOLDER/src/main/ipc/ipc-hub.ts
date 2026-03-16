import { ipcMain, app, BrowserWindow } from 'electron'
import { windowManager } from '../windows/window-manager'
import { updateTrayMessages, setTrayBlinking } from '../native/tray'
import { getMachineId } from '../utils/machine-id'

export function initIpcHandlers(): void {
  ipcMain.handle('system:getVersion', () => {
    return app.getVersion()
  })

  ipcMain.handle('system:getLocale', () => {
    return app.getLocale()
  })

  ipcMain.handle('system:getMachineId', async () => {
    try {
      return await getMachineId()
    } catch (error) {
      console.error('[IPC] getMachineId failed:', error)
      throw error
    }
  })

  ipcMain.handle('window:open', (_event, params: { moduleId: string; route?: string; title?: string }) => {
    const key = params.moduleId as 'main' | 'approval' | 'meeting'
    windowManager.createWindow(key)
    return { windowId: key }
  })

  ipcMain.handle('window:close', (_event, params?: { windowId?: string }) => {
    if (params?.windowId) {
      windowManager.closeWindow(params.windowId)
    }
  })

  ipcMain.handle('window:minimize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    win?.minimize()
  })

  ipcMain.handle('window:maximize', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender)
    if (win?.isMaximized()) {
      win.unmaximize()
    } else {
      win?.maximize()
    }
  })

  ipcMain.handle('tray:updateMessages', (_event, messages: unknown[]) => {
    updateTrayMessages(messages)
  })

  ipcMain.handle('tray:setBlinking', (_event, blinking: boolean) => {
    setTrayBlinking(blinking)
  })
}
