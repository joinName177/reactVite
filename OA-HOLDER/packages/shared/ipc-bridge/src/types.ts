import type { IIpcContract, IpcChannel, IpcInput, IpcOutput } from '@holder/shared-types/ipc'

export type { IIpcContract, IpcChannel, IpcInput, IpcOutput }

export interface IElectronAPI {
  invoke<K extends IpcChannel>(channel: K, data: IpcInput<K>): Promise<IpcOutput<K>>
  on<K extends IpcChannel>(channel: K, handler: (data: IpcOutput<K>) => void): () => void
  once<K extends IpcChannel>(channel: K, handler: (data: IpcOutput<K>) => void): void
  off<K extends IpcChannel>(channel: K, handler: (data: IpcOutput<K>) => void): void
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
