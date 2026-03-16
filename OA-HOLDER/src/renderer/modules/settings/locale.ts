import { LanguageType } from '@shared/i18n'

type L = Record<LanguageType, string>

export const settingsLocale = {
  // ==================== 页面标题 ====================
  pageTitle: {
    [LanguageType.ZhCn]: '设置',
    [LanguageType.EnGb]: 'Settings',
  } as L,
  pageSubtitle: {
    [LanguageType.ZhCn]: '管理您的应用偏好设置',
    [LanguageType.EnGb]: 'Manage your application preferences',
  } as L,

  // ==================== 通知 ====================
  notifications: {
    [LanguageType.ZhCn]: '通知',
    [LanguageType.EnGb]: 'Notifications',
  } as L,
  desktopNotification: {
    [LanguageType.ZhCn]: '桌面通知',
    [LanguageType.EnGb]: 'Desktop Notification',
  } as L,
  autoStart: {
    [LanguageType.ZhCn]: '开机自启动',
    [LanguageType.EnGb]: 'Auto Start',
  } as L,
} as const
