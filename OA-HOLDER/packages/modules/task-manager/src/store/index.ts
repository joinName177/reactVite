import { create } from 'zustand'
import type { ITask, ITaskStats, ITaskFilter } from '~/types'
import * as api from '~/api/mock'
import type { ICreateTaskParams, IUpdateTaskParams } from '@holder/shared-types/entities'

interface TaskManagerState {
  /** 任务列表 */
  tasks: ITask[]
  /** 统计数据 */
  stats: ITaskStats | null
  /** 当前筛选条件 */
  filter: ITaskFilter
  /** 列表加载中 */
  loading: boolean
  /** 统计加载中 */
  statsLoading: boolean

  /** 加载任务列表 */
  loadTasks: () => Promise<void>
  /** 加载统计数据 */
  loadStats: () => Promise<void>
  /** 设置筛选条件（自动重新加载） */
  setFilter: (filter: ITaskFilter) => void
  /** 新建任务 */
  createTask: (params: ICreateTaskParams) => Promise<void>
  /** 更新任务 */
  updateTask: (params: IUpdateTaskParams) => Promise<void>
  /** 删除任务 */
  deleteTask: (id: string) => Promise<void>
}

export const useTaskStore = create<TaskManagerState>((set, get) => ({
  tasks: [],
  stats: null,
  filter: {},
  loading: false,
  statsLoading: false,

  loadTasks: async () => {
    set({ loading: true })
    try {
      const tasks = await api.fetchTasks(get().filter)
      set({ tasks })
    } finally {
      set({ loading: false })
    }
  },

  loadStats: async () => {
    set({ statsLoading: true })
    try {
      const stats = await api.fetchTaskStats()
      set({ stats })
    } finally {
      set({ statsLoading: false })
    }
  },

  setFilter: (filter) => {
    set({ filter })
    get().loadTasks()
  },

  createTask: async (params) => {
    await api.createTask(params)
    await get().loadTasks()
    await get().loadStats()
  },

  updateTask: async (params) => {
    await api.updateTask(params)
    await get().loadTasks()
    await get().loadStats()
  },

  deleteTask: async (id) => {
    await api.deleteTask(id)
    await get().loadTasks()
    await get().loadStats()
  },
}))
