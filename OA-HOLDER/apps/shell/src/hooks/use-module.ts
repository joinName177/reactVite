import { useCallback } from 'react'
import { getElectronAPI, isElectronEnvironment } from '@holder/ipc-bridge/renderer'

export function useModule() {
  const openModule = useCallback(async (moduleId: string, options?: {
    route?: string
    title?: string
    width?: number
    height?: number
  }) => {
    if (!isElectronEnvironment()) {
      console.warn('[Module] Not in Electron environment')
      return
    }

    const api = getElectronAPI()
    if (!api) return

    await api.invoke('window:open', {
      moduleId,
      ...options,
    })
  }, [])

  const closeModule = useCallback(async (windowId: string) => {
    if (!isElectronEnvironment()) return

    const api = getElectronAPI()
    if (!api) return

    await api.invoke('window:close', { windowId })
  }, [])

  return { openModule, closeModule }
}
