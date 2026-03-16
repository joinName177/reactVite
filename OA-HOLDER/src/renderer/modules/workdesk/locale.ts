import { LanguageType } from '@shared/i18n'

type L = Record<LanguageType, string>

export const workdeskLocale = {
  // ==================== 页面标题 ====================
  pageTitle: {
    [LanguageType.ZhCn]: '工作台',
    [LanguageType.EnGb]: 'Workdesk',
  } as L,
  pageSubtitle: {
    [LanguageType.ZhCn]: '欢迎回来，这是您的工作概览',
    [LanguageType.EnGb]: 'Welcome back, here is your work overview',
  } as L,

  // ==================== 待办统计 ====================
  pendingTasks: {
    [LanguageType.ZhCn]: '待办任务',
    [LanguageType.EnGb]: 'Pending Tasks',
  } as L,
  pendingApprovals: {
    [LanguageType.ZhCn]: '待审批',
    [LanguageType.EnGb]: 'Pending Approvals',
  } as L,
  unreadMessages: {
    [LanguageType.ZhCn]: '未读消息',
    [LanguageType.EnGb]: 'Unread Messages',
  } as L,
  notifications: {
    [LanguageType.ZhCn]: '通知',
    [LanguageType.EnGb]: 'Notifications',
  } as L,

  // ==================== 快捷入口 ====================
  shortcuts: {
    [LanguageType.ZhCn]: '快捷入口',
    [LanguageType.EnGb]: 'Quick Access',
  } as L,
  specialProject: {
    [LanguageType.ZhCn]: '专项',
    [LanguageType.EnGb]: 'Special Projects',
  } as L,
  performance: {
    [LanguageType.ZhCn]: '绩效',
    [LanguageType.EnGb]: 'Performance',
  } as L,
  okr: {
    [LanguageType.ZhCn]: 'OKR 目标',
    [LanguageType.EnGb]: 'OKR Goals',
  } as L,
} as const
