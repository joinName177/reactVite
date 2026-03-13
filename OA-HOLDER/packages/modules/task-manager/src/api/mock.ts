import type { ITask, ITaskStats, ITaskFilter } from '~/types'
import type { ICreateTaskParams, IUpdateTaskParams } from '@holder/shared-types/entities'
import dayjs from 'dayjs'

/** 模拟延迟 */
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

let taskIdCounter = 100

const mockTasks: ITask[] = [
  {
    id: '1',
    title: '完成产品需求文档评审',
    description: '与产品团队一起对 Q2 需求文档进行评审，确认功能边界和优先级',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'u1',
    assigneeName: '张三',
    creatorId: 'u0',
    creatorName: '我',
    dueDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    tags: ['需求', '评审'],
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
  },
  {
    id: '2',
    title: '修复登录页面样式错位问题',
    description: '在 1920×1080 分辨率下，登录表单出现偏移，需要修复',
    status: 'completed',
    priority: 'urgent',
    assigneeId: 'u2',
    assigneeName: '李四',
    creatorId: 'u0',
    creatorName: '我',
    dueDate: dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
    completedDate: dayjs().subtract(1, 'day').toISOString(),
    tags: ['Bug', '前端'],
    createdAt: dayjs().subtract(5, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
  },
  {
    id: '3',
    title: '编写单元测试覆盖核心逻辑',
    description: '为 auth、task、approval 三个模块补充单元测试，目标覆盖率 80%+',
    status: 'pending',
    priority: 'medium',
    assigneeId: 'u3',
    assigneeName: '王五',
    creatorId: 'u0',
    creatorName: '我',
    dueDate: dayjs().add(7, 'day').format('YYYY-MM-DD'),
    tags: ['测试'],
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'day').toISOString(),
  },
  {
    id: '4',
    title: '优化首页加载性能',
    description: '首页白屏时间超过 2s，需要做懒加载和 bundle 分包优化',
    status: 'overdue',
    priority: 'high',
    assigneeId: 'u1',
    assigneeName: '张三',
    creatorId: 'u0',
    creatorName: '我',
    dueDate: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
    tags: ['性能', '前端'],
    createdAt: dayjs().subtract(10, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'day').toISOString(),
  },
  {
    id: '5',
    title: '接入短信验证码登录',
    description: '集成第三方短信平台，实现手机号 + 验证码登录方式',
    status: 'pending',
    priority: 'low',
    assigneeId: 'u2',
    assigneeName: '李四',
    creatorId: 'u0',
    creatorName: '我',
    dueDate: dayjs().add(14, 'day').format('YYYY-MM-DD'),
    tags: ['功能', '后端'],
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString(),
  },
]

/** 获取任务列表 */
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

/** 获取任务统计 */
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

/** 新建任务 */
export async function createTask(params: ICreateTaskParams): Promise<ITask> {
  await delay()
  const task: ITask = {
    id: String(++taskIdCounter),
    title: params.title,
    description: params.description,
    status: 'pending',
    priority: params.priority ?? 'medium',
    assigneeId: params.assigneeId,
    assigneeName: params.assigneeId === 'u1' ? '张三' : params.assigneeId === 'u2' ? '李四' : '王五',
    creatorId: 'u0',
    creatorName: '我',
    dueDate: params.dueDate,
    tags: params.tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  mockTasks.unshift(task)
  return task
}

/** 更新任务 */
export async function updateTask(params: IUpdateTaskParams): Promise<ITask> {
  await delay()
  const idx = mockTasks.findIndex((t) => t.id === params.id)
  if (idx === -1) throw new Error('任务不存在')
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

/** 删除任务 */
export async function deleteTask(id: string): Promise<void> {
  await delay()
  const idx = mockTasks.findIndex((t) => t.id === id)
  if (idx !== -1) mockTasks.splice(idx, 1)
}
