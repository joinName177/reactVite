import { LanguageType } from '@shared/i18n'

type L = Record<LanguageType, string>

export const routerLocale = {
  loading: {
    [LanguageType.ZhCn]: '加载中...',
    [LanguageType.EnGb]: 'Loading...',
  } as L,
} as const
