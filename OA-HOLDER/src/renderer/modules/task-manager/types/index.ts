import type { ITask, TaskStatus, TaskPriority } from '@shared/types/entities'

/** 任务筛选条�?*/
export interface ITaskFilter {
  keyword?: string
  status?: TaskStatus
  priority?: TaskPriority
  assigneeId?: string
}

/** 任务统计数据 */
export interface ITaskStats {
  total: number
  pending: number
  inProgress: number
  completed: number
  overdue: number
  completionRate: number
}

/** 表单提交数据（新�?编辑共用�?*/
export interface ITaskFormValues {
  title: string
  description?: string
  priority: TaskPriority
  assigneeId: string
  dueDate?: string
  tags?: string[]
}

export type { ITask, TaskStatus, TaskPriority }
