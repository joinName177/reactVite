import { useEffect } from 'react'
import { Row, Col, Card, Statistic, Progress, List, Badge, Typography, Skeleton } from 'antd'
import { PageContainer } from '@holder/ui'
import { useTaskStore } from '~/store'
import { StatusTag, PriorityTag } from '../task-list/components/status-tag'

const { Text } = Typography

export function DashboardPage() {
  const { stats, tasks, statsLoading, loading, loadStats, loadTasks } = useTaskStore()

  useEffect(() => {
    loadStats()
    loadTasks()
  }, [loadStats, loadTasks])

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const urgentTasks = tasks.filter(
    (t) => (t.priority === 'urgent' || t.priority === 'high') && t.status !== 'completed' && t.status !== 'cancelled',
  )

  return (
    <PageContainer
      title="数据看板"
      subtitle="任务整体进度一览"
    >
      {/* 统计卡片区 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card styles={{ body: { padding: '20px 24px' } }}>
            <Skeleton loading={statsLoading} paragraph={false} active>
              <Statistic
                title="全部任务"
                value={stats?.total ?? 0}
                valueStyle={{ color: '#3949ab', fontSize: 28 }}
                suffix="个"
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card styles={{ body: { padding: '20px 24px' } }}>
            <Skeleton loading={statsLoading} paragraph={false} active>
              <Statistic
                title="进行中"
                value={stats?.inProgress ?? 0}
                valueStyle={{ color: '#1890ff', fontSize: 28 }}
                suffix="个"
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card styles={{ body: { padding: '20px 24px' } }}>
            <Skeleton loading={statsLoading} paragraph={false} active>
              <Statistic
                title="已完成"
                value={stats?.completed ?? 0}
                valueStyle={{ color: '#52c41a', fontSize: 28 }}
                suffix="个"
              />
            </Skeleton>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card styles={{ body: { padding: '20px 24px' } }}>
            <Skeleton loading={statsLoading} paragraph={false} active>
              <Statistic
                title="已逾期"
                value={stats?.overdue ?? 0}
                valueStyle={{ color: '#f5222d', fontSize: 28 }}
                suffix="个"
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* 完成率 */}
        <Col xs={24} lg={8}>
          <Card title="整体完成率" style={{ height: '100%' }}>
            <Skeleton loading={statsLoading} active>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0' }}>
                <Progress
                  type="circle"
                  percent={stats?.completionRate ?? 0}
                  strokeColor={{ '0%': '#3949ab', '100%': '#5c6bc0' }}
                  size={140}
                  format={(p) => (
                    <span style={{ fontSize: 24, fontWeight: 600, color: '#3949ab' }}>{p}%</span>
                  )}
                />
                <div style={{ marginTop: 20, width: '100%' }}>
                  {[
                    { label: '待处理', value: stats?.pending ?? 0, color: '#d9d9d9' },
                    { label: '进行中', value: stats?.inProgress ?? 0, color: '#1890ff' },
                    { label: '已完成', value: stats?.completed ?? 0, color: '#52c41a' },
                    { label: '已逾期', value: stats?.overdue ?? 0, color: '#f5222d' },
                  ].map((item) => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                        <Text style={{ fontSize: 13 }}>{item.label}</Text>
                      </span>
                      <Text strong style={{ fontSize: 13 }}>{item.value} 个</Text>
                    </div>
                  ))}
                </div>
              </div>
            </Skeleton>
          </Card>
        </Col>

        {/* 高优先级待办 */}
        <Col xs={24} lg={8}>
          <Card title="高优先级待办" style={{ height: '100%' }}>
            <Skeleton loading={loading} active>
              {urgentTasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 0', color: '#bbb' }}>
                  暂无高优先级任务 🎉
                </div>
              ) : (
                <List
                  dataSource={urgentTasks}
                  renderItem={(task) => (
                    <List.Item
                      style={{ padding: '8px 0' }}
                      extra={<PriorityTag priority={task.priority} />}
                    >
                      <List.Item.Meta
                        title={
                          <Text ellipsis style={{ fontSize: 13, maxWidth: 160 }}>
                            {task.title}
                          </Text>
                        }
                        description={
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {task.assigneeName} · {task.dueDate ?? '无截止日'}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Skeleton>
          </Card>
        </Col>

        {/* 最近更新 */}
        <Col xs={24} lg={8}>
          <Card title="最近更新" style={{ height: '100%' }}>
            <Skeleton loading={loading} active>
              <List
                dataSource={recentTasks}
                renderItem={(task) => (
                  <List.Item
                    style={{ padding: '8px 0' }}
                    extra={<StatusTag status={task.status} />}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge
                          dot
                          color={task.status === 'overdue' ? 'red' : task.status === 'completed' ? 'green' : 'blue'}
                          offset={[-2, 2]}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              background: '#f0f2f8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 14,
                              color: '#3949ab',
                              fontWeight: 600,
                            }}
                          >
                            {task.assigneeName?.[0]}
                          </div>
                        </Badge>
                      }
                      title={
                        <Text ellipsis style={{ fontSize: 13, maxWidth: 140 }}>
                          {task.title}
                        </Text>
                      }
                      description={
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {task.assigneeName}
                        </Text>
                      }
                    />
                  </List.Item>
                )}
              />
            </Skeleton>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}
