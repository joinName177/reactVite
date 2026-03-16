import { Tag } from 'antd'
import type { TaskStatus, TaskPriority } from '../../../types'

const STATUS_CONFIG: Record<TaskStatus, { color: string; label: string }> = {
  pending: { color: 'default', label: '待处理' },
  in_progress: { color: 'processing', label: '进行中' },
  completed: { color: 'success', label: '已完成' },
  cancelled: { color: 'error', label: '已取消' },
  overdue: { color: 'warning', label: '已逾期' },
}

const PRIORITY_CONFIG: Record<TaskPriority, { color: string; label: string }> = {
  low: { color: 'default', label: '低' },
  medium: { color: 'blue', label: '中' },
  high: { color: 'orange', label: '高' },
  urgent: { color: 'red', label: '紧急' },
}

export function StatusTag({ status }: { status: TaskStatus }) {
  const { color, label } = STATUS_CONFIG[status]
  return <Tag color={color}>{label}</Tag>
}

export function PriorityTag({ priority }: { priority: TaskPriority }) {
  const { color, label } = PRIORITY_CONFIG[priority]
  return <Tag color={color}>{label}</Tag>
}
