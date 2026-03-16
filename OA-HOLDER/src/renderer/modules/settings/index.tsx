import React, { useCallback } from 'react'
import { Card, Switch, Typography, Space } from 'antd'
import { Bell, Monitor } from 'lucide-react'
import { PageContainer } from '@shared/ui'
import { useI18n } from '@shared/i18n'
import { settingsLocale } from './locale'
import styles from './index.module.css'

const { Text, Title } = Typography

const Settings: React.FC = () => {
  const { chooseLanguage } = useI18n()

  const t = useCallback(
    (key: keyof typeof settingsLocale) => chooseLanguage({ tmpl: settingsLocale[key] }),
    [chooseLanguage],
  )

  return (
    <PageContainer title={t('pageTitle')} subtitle={t('pageSubtitle')}>
      <Card className={styles.card}>
        <Title level={5}>{t('notifications')}</Title>
        <Space className={styles.row}>
          <Space>
            <Bell size={18} />
            <Text>{t('desktopNotification')}</Text>
          </Space>
          <Switch defaultChecked />
        </Space>

        <div className={styles.dividerItem}>
          <Space className={styles.row}>
            <Space>
              <Monitor size={18} />
              <Text>{t('autoStart')}</Text>
            </Space>
            <Switch defaultChecked />
          </Space>
        </div>
      </Card>
    </PageContainer>
  )
}

export default Settings
