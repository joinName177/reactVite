export enum AppEnvironment {
  Development = 'development',
  Re = 're',
  Production = 'production',
}

export enum ModuleId {
  Workdesk = 'workdesk',
  Chat = 'chat',
  Task = 'task',
  Approval = 'approval',
  Notification = 'notification',
  Settings = 'settings',
  SpecialProject = 'special-project',
  Performance = 'performance',
  OKR = 'okr',
  Plan = 'plan',
  FileManage = 'file-manage',
  KPI = 'kpi',
  NormalTask = 'normal-task',
}

export enum IpcEvent {
  SharedStateChanged = 'shared-state:changed',
  WindowCreated = 'window:created',
  WindowClosed = 'window:closed',
  NotificationReceived = 'notification:received',
  UserLoggedIn = 'user:logged-in',
  UserLoggedOut = 'user:logged-out',
  ThemeChanged = 'theme:changed',
}
