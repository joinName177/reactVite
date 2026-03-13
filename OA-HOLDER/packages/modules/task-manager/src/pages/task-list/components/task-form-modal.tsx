import { useEffect } from 'react'
import { Modal, Form, Input, Select, DatePicker, Space, Tag } from 'antd'
import type { ITask, ITaskFormValues } from '~/types'
import dayjs from 'dayjs'

interface TaskFormModalProps {
  open: boolean
  editingTask: ITask | null
  onSubmit: (values: ITaskFormValues) => Promise<void>
  onCancel: () => void
}

const PRIORITY_OPTIONS = [
  { value: 'low', label: '低优先级' },
  { value: 'medium', label: '中优先级' },
  { value: 'high', label: '高优先级' },
  { value: 'urgent', label: '紧急' },
]

const ASSIGNEE_OPTIONS = [
  { value: 'u1', label: '张三' },
  { value: 'u2', label: '李四' },
  { value: 'u3', label: '王五' },
]

const TAG_OPTIONS = ['需求', '前端', '后端', 'Bug', '测试', '设计', '性能', '文档']

export function TaskFormModal({ open, editingTask, onSubmit, onCancel }: TaskFormModalProps) {
  const [form] = Form.useForm<ITaskFormValues>()
  const isEdit = !!editingTask

  useEffect(() => {
    if (open) {
      if (editingTask) {
        form.setFieldsValue({
          title: editingTask.title,
          description: editingTask.description,
          priority: editingTask.priority,
          assigneeId: editingTask.assigneeId,
          dueDate: editingTask.dueDate,
          tags: editingTask.tags,
        })
      } else {
        form.resetFields()
        form.setFieldValue('priority', 'medium')
      }
    }
  }, [open, editingTask, form])

  const handleOk = async () => {
    const values = await form.validateFields()
    await onSubmit(values)
  }

  return (
    <Modal
      title={isEdit ? '编辑任务' : '新建任务'}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      okText={isEdit ? '保存' : '创建'}
      cancelText="取消"
      width={560}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item
          name="title"
          label="任务标题"
          rules={[{ required: true, message: '请输入任务标题' }, { max: 100 }]}
        >
          <Input placeholder="简洁描述这个任务要做什么" allowClear />
        </Form.Item>

        <Form.Item name="description" label="任务描述">
          <Input.TextArea
            rows={3}
            placeholder="详细说明任务背景、目标或注意事项（可选）"
            allowClear
          />
        </Form.Item>

        <Space style={{ width: '100%' }} size={16}>
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true }]}
            style={{ flex: 1, marginBottom: 0 }}
          >
            <Select options={PRIORITY_OPTIONS} placeholder="选择优先级" />
          </Form.Item>

          <Form.Item
            name="assigneeId"
            label="负责人"
            rules={[{ required: true, message: '请选择负责人' }]}
            style={{ flex: 1, marginBottom: 0 }}
          >
            <Select options={ASSIGNEE_OPTIONS} placeholder="选择负责人" />
          </Form.Item>
        </Space>

        <Form.Item name="dueDate" label="截止日期" style={{ marginTop: 16 }}>
          <DatePicker
            style={{ width: '100%' }}
            placeholder="选择截止日期"
            disabledDate={(d) => d.isBefore(dayjs().startOf('day'))}
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item name="tags" label="标签">
          <Select
            mode="tags"
            placeholder="选择或输入标签"
            options={TAG_OPTIONS.map((t) => ({ value: t, label: t }))}
            tagRender={({ label, closable, onClose }) => (
              <Tag closable={closable} onClose={onClose} style={{ marginRight: 4 }}>
                {label}
              </Tag>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
