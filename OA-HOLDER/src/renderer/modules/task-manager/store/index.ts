import { create } from 'zustand'
import type { ITask, ITaskStats, ITaskFilter } from '../types'
import * as api from '../api/mock'
import type { ICreateTaskParams, IUpdateTaskParams } from '@shared/types/entities'

interface TaskManagerState {
  /** ???? */
  tasks: ITask[]
  /** ???? */
  stats: ITaskStats | null
  /** ???? */
  filter: ITaskFilter
  /** ????? */
  loading: boolean
  /** ????? */
  statsLoading: boolean

  /** ???? */
  loadTasks: () => Promise<void>
  /** ???? */
  loadStats: () => Promise<void>
  /** ????????? */
  setFilter: (filter: ITaskFilter) => void
  /** ???? */
  createTask: (params: ICreateTaskParams) => Promise<void>
  /** ???? */
  updateTask: (params: IUpdateTaskParams) => Promise<void>
  /** ???? */
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
