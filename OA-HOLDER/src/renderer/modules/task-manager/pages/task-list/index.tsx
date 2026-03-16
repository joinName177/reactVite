import { useEffect, useState } from 'react'
import { Button, Input, Select, Space, Card } from 'antd'
import { PageContainer } from '@shared/ui'
import { useTaskStore } from '../../store'
import type { ITask, ITaskFormValues, TaskStatus, TaskPriority } from '../../types'
import { TaskTable } from './components/task-table'
import { TaskFormModal } from './components/task-form-modal'
import type { ICreateTaskParams, IUpdateTaskParams } from '@shared/types/entities'
import dayjs from 'dayjs'

const STATUS_OPTIONS = [
  { value: '', label: '全部' },
  { value: 'pending', label: '待处理' },
  { value: 'in_progress', label: '进行中' },
  { value: 'completed', label: '已完成' },
  { value: 'overdue', label: '已逾期' },
  { value: 'cancelled', label: '已取消' },
]

const PRIORITY_OPTIONS = [
  { value: '', label: '全部优先级' },
  { value: 'urgent', label: '紧急' },
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
]

export function TaskListPage() {
  const { tasks, loading, filter, loadTasks, setFilter, createTask, updateTask, deleteTask } =
    useTaskStore()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<ITask | null>(null)

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const handleKeywordChange = (value: string) => {
    setFilter({ ...filter, keyword: value || undefined })
  }

  const handleStatusChange = (value: string) => {
    setFilter({ ...filter, status: (value || undefined) as TaskStatus | undefined })
  }

  const handlePriorityChange = (value: string) => {
    setFilter({ ...filter, priority: (value || undefined) as TaskPriority | undefined })
  }

  const handleOpenCreate = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (task: ITask) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleSubmit = async (values: ITaskFormValues) => {
    const dueDate = values.dueDate
      ? dayjs(values.dueDate).format('YYYY-MM-DD')
      : undefined

    if (editingTask) {
      const params: IUpdateTaskParams = {
        id: editingTask.id,
        title: values.title,
        description: values.description,
        priority: values.priority,
        assigneeId: values.assigneeId,
        dueDate,
        tags: values.tags,
      }
      await updateTask(params)
    } else {
      const params: ICreateTaskParams = {
        title: values.title,
        description: values.description,
        priority: values.priority,
        assigneeId: values.assigneeId,
        dueDate,
        tags: values.tags,
      }
      await createTask(params)
    }
    setModalOpen(false)
  }

  const handleStatusChange2 = async (id: string, status: TaskStatus) => {
    await updateTask({ id, status })
  }

  return (
    <PageContainer
      title="任务列表"
      subtitle="管理您的任务"
      extra={
        <Button type="primary" onClick={handleOpenCreate}>
          + 新建
        </Button>
      }
    >
      <Card style={{ marginBottom: 16 }} styles={{ body: { padding: '12px 16px' } }}>
        <Space wrap>
          <Input.Search
            placeholder="搜索任务标题或描述"
            allowClear
            style={{ width: 240 }}
            onSearch={handleKeywordChange}
            onChange={(e) => !e.target.value && handleKeywordChange('')}
          />
          <Select
            options={STATUS_OPTIONS}
            defaultValue=""
            style={{ width: 130 }}
            onChange={handleStatusChange}
          />
          <Select
            options={PRIORITY_OPTIONS}
            defaultValue=""
            style={{ width: 130 }}
            onChange={handlePriorityChange}
          />
        </Space>
      </Card>

      <Card styles={{ body: { padding: 0 } }}>
        <TaskTable
          tasks={tasks}
          loading={loading}
          onEdit={handleOpenEdit}
          onDelete={deleteTask}
          onStatusChange={handleStatusChange2}
        />
      </Card>

      <TaskFormModal
        open={modalOpen}
        editingTask={editingTask}
        onSubmit={handleSubmit}
        onCancel={() => setModalOpen(false)}
      />
    </PageContainer>
  )
}
