import { useCallback } from 'react'
import type { IpcChannel, IpcInput, IpcOutput } from '@holder/shared-types/ipc'
import { getElectronAPI } from './bridge'

export function useIpc() {
  const invoke = useCallback(
    async <K extends IpcChannel>(channel: K, data: IpcInput<K>): Promise<IpcOutput<K>> => {
      const api = getElectronAPI()
      if (!api) {
        throw new Error(`[IPC] Not in Electron environment, cannot invoke "${channel}"`)
      }
      return api.invoke(channel, data)
    },
    []
  )

  const on = useCallback(
    <K extends IpcChannel>(channel: K, handler: (data: IpcOutput<K>) => void): (() => void) => {
      const api = getElectronAPI()
      if (!api) {
        console.warn(`[IPC] Not in Electron environment, cannot listen to "${channel}"`)
        return () => {}
      }
      return api.on(channel, handler)
    },
    []
  )

  return { invoke, on }
}
