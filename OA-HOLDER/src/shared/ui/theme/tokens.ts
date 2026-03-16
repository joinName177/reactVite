import type { ThemeConfig } from 'antd'

export interface HolderTheme {
  colorPrimary: string
  colorSuccess: string
  colorWarning: string
  colorError: string
  colorInfo: string
  colorTextBase: string
  colorBgBase: string
  borderRadius: number
  fontSize: number
  fontSizeHeading: number
}

export const tokens = {
  colors: {
    primary: '#3949AB',
    primaryHover: '#5c6bc0',
    primaryActive: '#283593',
    success: '#52c41a',
    warning: '#faad14',
    error: '#f5222d',
    info: '#1890ff',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 2,
    base: 4,
    md: 6,
    lg: 8,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 30,
  },
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    card: '0px 0px 26px 0px rgba(196, 207, 220, 0.32)',
  },
  animation: {
    fast: '100ms',
    normal: '200ms',
    slow: '300ms',
  },
} as const

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: tokens.colors.primary,
    colorSuccess: tokens.colors.success,
    colorWarning: tokens.colors.warning,
    colorError: tokens.colors.error,
    colorInfo: tokens.colors.info,
    borderRadius: tokens.borderRadius.base,
    fontSize: tokens.fontSize.base,
  },
  components: {
    Button: {
      colorLink: tokens.colors.primary,
      colorLinkHover: tokens.colors.primaryHover,
      colorLinkActive: tokens.colors.primaryActive,
    },
  },
}

