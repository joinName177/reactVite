export type WindowKey = 'main' | 'approval' | 'meeting'

export interface WindowConfig {
  title: string
  route?: string
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
  resizable?: boolean
  minimizable?: boolean
  maximizable?: boolean
  skipTaskbar?: boolean
  hideOnClose?: boolean
  openDevTools?: boolean
}

const isDev = process.env.NODE_ENV === 'development'

export function getWindowConfigs(): Record<WindowKey, WindowConfig> {
  return {
    main: {
      title: 'Holder 工作台',
      width: 1440,
      height: 900,
      hideOnClose: true,
      openDevTools: isDev,
    },
    approval: {
      title: '审批管理',
      route: 'approval',
      width: 1440,
      height: 900,
      hideOnClose: false,
    },
    meeting: {
      title: '会议管理',
      route: 'meeting',
      width: 1440,
      height: 900,
      hideOnClose: false,
    },
  }
}
