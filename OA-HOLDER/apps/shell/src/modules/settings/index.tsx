import React from 'react'
import { Card, Switch, Typography, Space, Divider } from 'antd'
import { Moon, Sun, Bell, Monitor } from 'lucide-react'
import { useTheme } from '@holder/ui/theme'
import { PageContainer } from '@holder/ui'

const { Text, Title } = Typography

const Settings: React.FC = () => {
  const { mode, toggleTheme } = useTheme()

  return (
    <PageContainer title="设置" subtitle="管理您的应用偏好设置">
      <Card style={{ borderRadius: 8, maxWidth: 600 }}>
        <Title level={5}>外观</Title>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            {mode === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            <Text>深色模式</Text>
          </Space>
          <Switch checked={mode === 'dark'} onChange={toggleTheme} />
        </Space>

        <Divider />

        <Title level={5}>通知</Title>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Bell size={18} />
            <Text>桌面通知</Text>
          </Space>
          <Switch defaultChecked />
        </Space>

        <div style={{ marginTop: 16 }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Space>
              <Monitor size={18} />
              <Text>开机自启动</Text>
            </Space>
            <Switch defaultChecked />
          </Space>
        </div>
      </Card>
    </PageContainer>
  )
}

export default Settings
