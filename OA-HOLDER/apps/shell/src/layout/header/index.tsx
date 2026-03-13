import React, { useCallback } from 'react'
import { Layout, Space, Avatar, Dropdown, Badge, Tag } from 'antd'
import type { MenuProps } from 'antd'
import { Bell, User, LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '@holder/i18n'
import { useUserStore, useUIStore } from '~/store'
import { headerLocale } from './locale'
import styles from './index.module.css'

const { Header } = Layout

const AppHeader: React.FC = () => {
  const navigate = useNavigate()
  const { chooseLanguage } = useI18n()
  const userInfo = useUserStore(state => state.userInfo)
  const logout = useUserStore(state => state.logout)
  const env = useUIStore(state => state.env)

  const t = useCallback(
    (key: keyof typeof headerLocale) => chooseLanguage({ tmpl: headerLocale[key] }),
    [chooseLanguage],
  )

  const getEnvTag = useCallback(() => {
    const envMap: Record<string, { color: string; text: string }> = {
      development: { color: 'blue', text: 'DEV' },
      re: { color: 'orange', text: 'RE' },
      production: { color: 'green', text: 'PROD' },
    }
    const info = envMap[env] ?? { color: 'default', text: 'UNKNOWN' }
    return <Tag color={info.color}>{info.text}</Tag>
  }, [env])

  const handleMenuClick = useCallback<NonNullable<MenuProps['onClick']>>(
    ({ key }) => {
      if (key === 'logout') {
        logout()
        navigate('/login', { replace: true })
      } else if (key === 'settings') {
        navigate('/settings')
      }
    },
    [logout, navigate],
  )

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'settings',
      icon: <Settings size={14} />,
      label: t('settings'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogOut size={14} />,
      label: t('logout'),
      danger: true,
    },
  ]

  return (
    <Header className={styles.header}>
      <div className={styles.leftSection}>
        {getEnvTag()}
      </div>

      <Space size={16}>
        <Badge count={0} size="small">
          <Bell size={18} className={styles.bellIcon} />
        </Badge>

        <Dropdown
          menu={{ items: userMenuItems, onClick: handleMenuClick }}
          placement="bottomRight"
        >
          <Space className={styles.userMenu}>
            <Avatar size="small" icon={<User size={14} />} />
            <span>{userInfo?.nickname ?? t('defaultUser')}</span>
          </Space>
        </Dropdown>
      </Space>
    </Header>
  )
}

export default AppHeader
