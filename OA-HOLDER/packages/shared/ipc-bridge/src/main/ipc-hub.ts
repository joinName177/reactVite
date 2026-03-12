import type { IpcChannel, IpcInput, IpcOutput } from '@holder/shared-types/ipc'
import type { IpcMainInvokeEvent, IpcMain, BrowserWindow } from 'electron'

type IpcHandler<K extends IpcChannel> = (
  input: IpcInput<K>,
  event: IpcMainInvokeEvent
) => Promise<IpcOutput<K>> | IpcOutput<K>

export class IpcHub {
  private handlers = new Map<string, IpcHandler<IpcChannel>>()
  private ipcMain: IpcMain | null = null

  init(ipcMain: IpcMain): void {
    this.ipcMain = ipcMain
    this.handlers.forEach((handler, channel) => {
      this.registerHandler(channel, handler)
    })
  }

  handle<K extends IpcChannel>(channel: K, handler: IpcHandler<K>): void {
    this.handlers.set(channel, handler as unknown as IpcHandler<IpcChannel>)
    if (this.ipcMain) {
      this.registerHandler(channel, handler as unknown as IpcHandler<IpcChannel>)
    }
  }

  private registerHandler(channel: string, handler: IpcHandler<IpcChannel>): void {
    this.ipcMain!.handle(channel, async (event: IpcMainInvokeEvent, input: unknown) => {
      try {
        return await handler(input as IpcInput<IpcChannel>, event)
      } catch (error) {
        console.error(`[IPC] Error handling "${channel}":`, error)
        throw error
      }
    })
  }

  removeHandler(channel: IpcChannel): void {
    this.handlers.delete(channel)
    if (this.ipcMain) {
      this.ipcMain.removeHandler(channel)
    }
  }

  broadcast(channel: string, data: unknown, windows: BrowserWindow[]): void {
    windows.forEach(win => {
      if (!win.isDestroyed()) {
        win.webContents.send(channel, data)
      }
    })
  }
}

export const ipcHub = new IpcHub()
