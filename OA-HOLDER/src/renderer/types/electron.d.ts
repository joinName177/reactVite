import type { IElectronAPI } from '@shared/ipc-bridge'

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
