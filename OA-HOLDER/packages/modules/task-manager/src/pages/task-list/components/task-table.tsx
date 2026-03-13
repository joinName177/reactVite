import { Table, Button, Dropdown, Space, Avatar, Typography, Popconfirm } from 'antd'
import type { TableColumnsType } from 'antd'
import type { ITask, TaskStatus } from '~/types'
import { StatusTag, PriorityTag } from './status-tag'

const { Text } = Typography

interface TaskTableProps {
  tasks: ITask[]
  loading: boolean
  onEdit: (task: ITask) => void
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: TaskStatus) => void
}

const STATUS_ACTIONS: { key: TaskStatus; label: string }[] = [
  { key: 'pending', label: '设为待处理' },
  { key: 'in_progress', label: '设为进行中' },
  { key: 'completed', label: '设为已完成' },
  { key: 'cancelled', label: '设为已取消' },
]

export function TaskTable({ tasks, loading, onEdit, onDelete, onStatusChange }: TaskTableProps) {
  const columns: TableColumnsType<ITask> = [
    {
      title: '任务标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: '30%',
      render: (title: string, record) => (
        <div>
          <Text strong style={{ display: 'block' }}>
            {title}
          </Text>
          {record.description && (
            <Text type="secondary" style={{ fontSize: 12 }} ellipsis={{ tooltip: record.description }}>
              {record.description}
            </Text>
          )}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: TaskStatus) => <StatusTag status={status} />,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 90,
      render: (priority) => <PriorityTag priority={priority} />,
    },
    {
      title: '负责人',
      dataIndex: 'assigneeName',
      key: 'assigneeName',
      width: 100,
      render: (name: string) => (
        <Space size={6}>
          <Avatar size={24} style={{ backgroundColor: '#3949ab', fontSize: 12 }}>
            {name?.[0]}
          </Avatar>
          <Text style={{ fontSize: 13 }}>{name}</Text>
        </Space>
      ),
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
      render: (date: string | undefined) =>
        date ? (
          <Text style={{ fontSize: 13 }} type={isOverdue(date) ? 'danger' : undefined}>
            {date}
          </Text>
        ) : (
          <Text type="secondary" style={{ fontSize: 13 }}>
            —
          </Text>
        ),
    },
    {
      title: '操作',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size={4}>
          <Button type="link" size="small" onClick={() => onEdit(record)} style={{ padding: '0 4px' }}>
            编辑
          </Button>
          <Dropdown
            menu={{
              items: STATUS_ACTIONS.filter((a) => a.key !== record.status).map((a) => ({
                key: a.key,
                label: a.label,
                onClick: () => onStatusChange(record.id, a.key),
              })),
            }}
          >
            <Button type="link" size="small" style={{ padding: '0 4px' }}>
              状态
            </Button>
          </Dropdown>
          <Popconfirm
            title="确认删除此任务？"
            onConfirm={() => onDelete(record.id)}
            okText="删除"
            cancelText="取消"
            okType="danger"
          >
            <Button type="link" size="small" danger style={{ padding: '0 4px' }}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={tasks}
      rowKey="id"
      loading={loading}
      pagination={{
        pageSize: 10,
        showSizeChanger: false,
        showTotal: (total) => `共 ${total} 条`,
      }}
      size="middle"
    />
  )
}

function isOverdue(dateStr: string) {
  return new Date(dateStr) < new Date(new Date().toDateString())
}
