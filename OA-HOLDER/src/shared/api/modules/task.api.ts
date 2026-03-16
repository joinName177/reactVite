import type { HttpClient } from '../client'
import type {
  ITask,
  ICreateTaskParams,
  IUpdateTaskParams,
  IPaginationParams,
  IPaginatedResponse,
} from '@shared/types'

export class TaskApi {
  constructor(private client: HttpClient) {}

  getList(params: IPaginationParams & { status?: string; projectId?: string }): Promise<IPaginatedResponse<ITask>> {
    return this.client.get('/tasks', params)
  }

  getById(id: string): Promise<ITask> {
    return this.client.get(`/tasks/${id}`)
  }

  create(params: ICreateTaskParams): Promise<ITask> {
    return this.client.post('/tasks', params)
  }

  update(params: IUpdateTaskParams): Promise<ITask> {
    const { id, ...data } = params
    return this.client.patch(`/tasks/${id}`, data)
  }

  delete(id: string): Promise<void> {
    return this.client.delete(`/tasks/${id}`)
  }

  batchUpdate(ids: string[], data: Partial<IUpdateTaskParams>): Promise<void> {
    return this.client.patch('/tasks/batch', { ids, ...data })
  }
}
