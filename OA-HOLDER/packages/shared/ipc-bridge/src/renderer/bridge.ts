import type { IElectronAPI } from '../types'

export function isElectronEnvironment(): boolean {
  return typeof window !== 'undefined' && 'electronAPI' in window
}

export function getElectronAPI(): IElectronAPI | null {
  if (isElectronEnvironment()) {
    return window.electronAPI
  }
  return null
}
