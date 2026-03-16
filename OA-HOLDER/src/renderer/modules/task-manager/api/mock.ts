import type { ITask, ITaskStats, ITaskFilter } from '../types'
import type { ICreateTaskParams, IUpdateTaskParams } from '@shared/types/entities'
import dayjs from 'dayjs'

/** ???? */
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

let taskIdCounter = 100

const mockTasks: ITask[] = [
  {
    id: '1',
    title: '?? Q2 ??????',
    description: '???????????? Q2 ??????????',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'u1',
    assigneeName: '??',
    creatorId: 'u0',
    creatorName: '???',
    dueDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    tags: ['??', '??'],
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
  },
  {
    id: '2',
    title: '??????????',
    description: '? 1920ù1080 ???????????',
    status: 'completed',
    priority: 'urgent',
    assigneeId: 'u2',
    assigneeName: '??',
    creatorId: 'u0',
    creatorName: '???',
    dueDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    completedDate: dayjs().subtract(1, 'day').toISOString(),
    tags: ['Bug', '??'],
    createdAt: dayjs().subtract(5, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
  },
  {
    id: '3',
    title: '?? auth/task/approval ??????',
    description: '?? auth?task?approval ???????????? 80%+',
    status: 'pending',
    priority: 'medium',
    assigneeId: 'u3',
    assigneeName: '??',
    creatorId: 'u0',
    creatorName: '???',
    dueDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
    tags: ['??'],
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'day').toISOString(),
  },
  {
    id: '4',
    title: '????????',
    description: '????????? 2s ???? bundle ??',
    status: 'overdue',
    priority: 'high',
    assigneeId: 'u1',
    assigneeName: '??',
    creatorId: 'u0',
    creatorName: '???',
    dueDate: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
    tags: ['??', '??'],
    createdAt: dayjs().subtract(10, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'day').toISOString(),
  },
  {
    id: '5',
    title: '?????????',
    description: '?????? + ???????????',
    status: 'pending',
    priority: 'low',
    assigneeId: 'u2',
    assigneeName: '??',
    creatorId: 'u0',
    creatorName: '???',
    dueDate: dayjs().add(14, 'day').format('YYYY-MM-DD'),
    tags: ['??', '??'],
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
  },
]

/** ?????? */
export async function fetchTasks(filter?: ITaskFilter): Promise<ITask[]> {
  await delay()
  let result = [...mockTasks]
  if (filter?.keyword) {
    const kw = filter.keyword.toLowerCase()
    result = result.filter(
      (t) => t.title.toLowerCase().includes(kw) || t.description?.toLowerCase().includes(kw),
    )
  }
  if (filter?.status) result = result.filter((t) => t.status === filter.status)
  if (filter?.priority) result = result.filter((t) => t.priority === filter.priority)
  if (filter?.assigneeId) result = result.filter((t) => t.assigneeId === filter.assigneeId)
  return result
}

/** ?????? */
export async function fetchTaskStats(): Promise<ITaskStats> {
  await delay(200)
  const total = mockTasks.length
  const pending = mockTasks.filter((t) => t.status === 'pending').length
  const inProgress = mockTasks.filter((t) => t.status === 'in_progress').length
  const completed = mockTasks.filter((t) => t.status === 'completed').length
  const overdue = mockTasks.filter((t) => t.status === 'overdue').length
  return {
    total,
    pending,
    inProgress,
    completed,
    overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  }
}

/** ???? */
export async function createTask(params: ICreateTaskParams): Promise<ITask> {
  await delay()
  const task: ITask = {
    id: String(++taskIdCounter),
    title: params.title,
    description: params.description,
    status: 'pending',
    priority: params.priority ?? 'medium',
    assigneeId: params.assigneeId,
    assigneeName: params.assigneeId === 'u1' ? '??' : params.assigneeId === 'u2' ? '??' : '??',
    creatorId: 'u0',
    creatorName: '???',
    dueDate: params.dueDate,
    tags: params.tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockTasks.unshift(task)
  return task
}

/** ???? */
export async function updateTask(params: IUpdateTaskParams): Promise<ITask> {
  await delay()
  const idx = mockTasks.findIndex((t) => t.id === params.id)
  if (idx === -1) throw new Error('?????')
  const updated: ITask = {
    ...mockTasks[idx],
    ...params,
    updatedAt: new Date().toISOString(),
    completedDate:
      params.status === 'completed' ? new Date().toISOString() : mockTasks[idx].completedDate,
  }
  mockTasks[idx] = updated
  return updated
}

/** ???? */
export async function deleteTask(id: string): Promise<void> {
  await delay()
  const idx = mockTasks.findIndex((t) => t.id === id)
  if (idx !== -1) mockTasks.splice(idx, 1)
}
