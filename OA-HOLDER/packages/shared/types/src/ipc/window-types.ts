export type WindowKey = 'main' | 'approval' | 'meeting' | string

export interface IWindowConfig {
  key: WindowKey
  width: number
  height: number
  title: string
  route?: string
  resizable?: boolean
  minimizable?: boolean
  maximizable?: boolean
  skipTaskbar?: boolean
  hideOnClose?: boolean
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

export interface IWindowState {
  id: string
  key: WindowKey
  title: string
  isVisible: boolean
  isFocused: boolean
  isMaximized: boolean
  isMinimized: boolean
}
