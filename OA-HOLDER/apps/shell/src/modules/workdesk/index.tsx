import React from 'react'
import { Card, Row, Col, Statistic, Typography, Space } from 'antd'
import {
  CheckSquare,
  FileCheck,
  MessageSquare,
  Bell,
  Target,
  TrendingUp,
} from 'lucide-react'
import { PageContainer } from '@holder/ui'

const { Title } = Typography

const StatCard: React.FC<{
  title: string
  value: number
  icon: React.ReactNode
  color: string
}> = ({ title, value, icon, color }) => (
  <Card hoverable style={{ borderRadius: 8 }}>
    <Space align="start" size={16}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color,
        }}
      >
        {icon}
      </div>
      <Statistic title={title} value={value} />
    </Space>
  </Card>
)

const Workdesk: React.FC = () => {
  return (
    <PageContainer title="工作台" subtitle="欢迎回来，这是您的工作概览">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="待处理任务"
            value={12}
            icon={<CheckSquare size={24} />}
            color="#3949AB"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="待审批"
            value={5}
            icon={<FileCheck size={24} />}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="未读消息"
            value={28}
            icon={<MessageSquare size={24} />}
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="通知公告"
            value={3}
            icon={<Bell size={24} />}
            color="#faad14"
          />
        </Col>
      </Row>

      <Title level={4} style={{ marginTop: 32 }}>快捷入口</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable style={{ borderRadius: 8 }}>
            <Space>
              <Target size={20} />
              <span>专项管理</span>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable style={{ borderRadius: 8 }}>
            <Space>
              <TrendingUp size={20} />
              <span>绩效管理</span>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable style={{ borderRadius: 8 }}>
            <Space>
              <Target size={20} />
              <span>OKR 目标</span>
            </Space>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default Workdesk
