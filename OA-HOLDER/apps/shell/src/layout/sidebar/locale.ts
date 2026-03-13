import { LanguageType } from '@holder/i18n'

type L = Record<LanguageType, string>

export const sidebarLocale = {
  workdesk: {
    [LanguageType.ZhCn]: '工作台',
    [LanguageType.EnGb]: 'Workdesk',
  } as L,
  task: {
    [LanguageType.ZhCn]: '任务',
    [LanguageType.EnGb]: 'Task',
  } as L,
  chat: {
    [LanguageType.ZhCn]: '沟通',
    [LanguageType.EnGb]: 'Chat',
  } as L,
  approval: {
    [LanguageType.ZhCn]: '审批',
    [LanguageType.EnGb]: 'Approval',
  } as L,
  notification: {
    [LanguageType.ZhCn]: '通知',
    [LanguageType.EnGb]: 'Notification',
  } as L,
  specialProject: {
    [LanguageType.ZhCn]: '专项',
    [LanguageType.EnGb]: 'Special Project',
  } as L,
  performance: {
    [LanguageType.ZhCn]: '绩效',
    [LanguageType.EnGb]: 'Performance',
  } as L,
  okr: {
    [LanguageType.ZhCn]: 'OKR',
    [LanguageType.EnGb]: 'OKR',
  } as L,
  settings: {
    [LanguageType.ZhCn]: '设置',
    [LanguageType.EnGb]: 'Settings',
  } as L,
} as const
