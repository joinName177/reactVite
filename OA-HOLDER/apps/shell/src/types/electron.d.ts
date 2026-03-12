import type { IElectronAPI } from '@holder/ipc-bridge'

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
