export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'overdue'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface ITask {
  id: string
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId: string
  assigneeName?: string
  creatorId: string
  creatorName?: string
  startDate?: string
  dueDate?: string
  completedDate?: string
  tags?: string[]
  parentId?: string
  projectId?: string
  createdAt: string
  updatedAt: string
}

export interface ICreateTaskParams {
  title: string
  description?: string
  priority?: TaskPriority
  assigneeId: string
  startDate?: string
  dueDate?: string
  tags?: string[]
  parentId?: string
  projectId?: string
}

export interface IUpdateTaskParams extends Partial<ICreateTaskParams> {
  id: string
  status?: TaskStatus
}
