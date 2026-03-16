import { LanguageType } from '@shared/i18n'

type L = Record<LanguageType, string>

export const headerLocale = {
  settings: {
    [LanguageType.ZhCn]: '设置',
    [LanguageType.EnGb]: 'Settings',
  } as L,
  logout: {
    [LanguageType.ZhCn]: '退出登录',
    [LanguageType.EnGb]: 'Logout',
  } as L,
  defaultUser: {
    [LanguageType.ZhCn]: '用户',
    [LanguageType.EnGb]: 'User',
  } as L,
} as const
