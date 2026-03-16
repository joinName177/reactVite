import React, { useCallback } from 'react'
import { Card, Row, Col, Statistic, Typography, Space } from 'antd'
import {
  CheckSquare,
  FileCheck,
  MessageSquare,
  Bell,
  Target,
  TrendingUp,
} from 'lucide-react'
import { PageContainer } from '@shared/ui'
import { useI18n } from '@shared/i18n'
import { workdeskLocale } from './locale'
import styles from './index.module.css'

const { Title } = Typography

interface IStatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

const StatCard: React.FC<IStatCardProps> = ({ title, value, icon, color }) => (
  <Card hoverable className={styles.statCard}>
    <Space align="start" size={16}>
      <div
        className={styles.statIconWrapper}
        style={{ background: `${color}15`, color }}
      >
        {icon}
      </div>
      <Statistic title={title} value={value} />
    </Space>
  </Card>
)

const Workdesk: React.FC = () => {
  const { chooseLanguage } = useI18n()

  const t = useCallback(
    (key: keyof typeof workdeskLocale) => chooseLanguage({ tmpl: workdeskLocale[key] }),
    [chooseLanguage],
  )

  return (
    <PageContainer title={t('pageTitle')} subtitle={t('pageSubtitle')}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('pendingTasks')}
            value={12}
            icon={<CheckSquare size={24} />}
            color="#3949AB"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('pendingApprovals')}
            value={5}
            icon={<FileCheck size={24} />}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('unreadMessages')}
            value={28}
            icon={<MessageSquare size={24} />}
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title={t('notifications')}
            value={3}
            icon={<Bell size={24} />}
            color="#faad14"
          />
        </Col>
      </Row>

      <Title level={4} className={styles.sectionTitle}>{t('shortcuts')}</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className={styles.shortcutCard}>
            <Space>
              <Target size={20} />
              <span>{t('specialProject')}</span>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className={styles.shortcutCard}>
            <Space>
              <TrendingUp size={20} />
              <span>{t('performance')}</span>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card hoverable className={styles.shortcutCard}>
            <Space>
              <Target size={20} />
              <span>{t('okr')}</span>
            </Space>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default Workdesk
