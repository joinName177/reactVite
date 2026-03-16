import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  invoke: (channel: string, data?: unknown) => {
    return ipcRenderer.invoke(channel, data)
  },

  on: (channel: string, handler: (...args: unknown[]) => void) => {
    const subscription = (_event: Electron.IpcRendererEvent, ...args: unknown[]) => handler(...args)
    ipcRenderer.on(channel, subscription)
    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },

  once: (channel: string, handler: (...args: unknown[]) => void) => {
    ipcRenderer.once(channel, (_event, ...args) => handler(...args))
  },

  off: (channel: string, handler: (...args: unknown[]) => void) => {
    ipcRenderer.removeListener(channel, handler as (event: Electron.IpcRendererEvent, ...args: unknown[]) => void)
  },
})
