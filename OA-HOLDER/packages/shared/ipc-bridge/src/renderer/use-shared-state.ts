import { useState, useEffect, useCallback } from 'react'
import { IpcEvent } from '@holder/shared-types/enums'
import { getElectronAPI } from './bridge'

export function useSharedState<T = unknown>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(initialValue)

  useEffect(() => {
    const api = getElectronAPI()
    if (!api) return

    api.invoke('state:get' as any, { key }).then((result: any) => {
      if (result !== undefined) {
        setValue(result as T)
      }
    })

    const cleanup = api.on(IpcEvent.SharedStateChanged as any, (data: any) => {
      if (data && typeof data === 'object' && 'key' in data && data.key === key) {
        setValue(data.value as T)
      }
    })

    return cleanup
  }, [key])

  const update = useCallback(
    async (newValue: T) => {
      const api = getElectronAPI()
      if (!api) return
      await api.invoke('state:set' as any, { key, value: newValue })
      setValue(newValue)
    },
    [key]
  )

  return [value, update] as const
}
