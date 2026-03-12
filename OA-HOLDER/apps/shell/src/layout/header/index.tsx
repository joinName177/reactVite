import React from 'react'
import { Layout, Space, Avatar, Dropdown, Badge, Tag } from 'antd'
import type { MenuProps } from 'antd'
import { Bell, User, LogOut, Settings, Moon, Sun } from 'lucide-react'
import { useTheme } from '@holder/ui/theme'
import { useUserStore } from '../../store/user.store'
import { useUIStore } from '../../store/ui.store'

const { Header } = Layout

const AppHeader: React.FC = () => {
  const { mode, toggleTheme } = useTheme()
  const userInfo = useUserStore(state => state.userInfo)
  const env = useUIStore(state => state.env)

  const getEnvTag = () => {
    const envMap: Record<string, { color: string; text: string }> = {
      development: { color: 'blue', text: 'DEV' },
      re: { color: 'orange', text: 'RE' },
      production: { color: 'green', text: 'PROD' },
    }
    const info = envMap[env] || { color: 'default', text: 'UNKNOWN' }
    return <Tag color={info.color}>{info.text}</Tag>
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <Settings size={14} />,
      label: '设置',
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut size={14} />,
      label: '退出登录',
      danger: true,
    },
  ]

  return (
    <Header
      style={{
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: mode === 'dark' ? '#141414' : '#fff',
        borderBottom: `1px solid ${mode === 'dark' ? '#303030' : '#f0f0f0'}`,
        height: 48,
        lineHeight: '48px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {getEnvTag()}
      </div>

      <Space size={16}>
        <span
          onClick={toggleTheme}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </span>

        <Badge count={0} size="small">
          <Bell size={18} style={{ cursor: 'pointer' }} />
        </Badge>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
          <Space style={{ cursor: 'pointer' }}>
            <Avatar size="small" icon={<User size={14} />} />
            <span>{userInfo?.nickname || '用户'}</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  )
}

export default AppHeader
