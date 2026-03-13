import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  CheckSquare,
  MessageSquare,
  FileCheck,
  Bell,
  Settings,
  Target,
  BarChart3,
  Crosshair,
} from 'lucide-react'
import { useI18n } from '@holder/i18n'
import { sidebarLocale } from './locale'
import styles from './index.module.css'

const { Sider } = Layout

const iconStyle = { width: 16, height: 16 }

const AppSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { chooseLanguage } = useI18n()

  const t = (key: keyof typeof sidebarLocale) =>
    chooseLanguage({ tmpl: sidebarLocale[key] })

  const menuItems = [
    {
      key: '/',
      icon: <Home style={iconStyle} />,
      label: t('workdesk'),
    },
    {
      key: '/task',
      icon: <CheckSquare style={iconStyle} />,
      label: t('task'),
    },
    {
      key: '/chat',
      icon: <MessageSquare style={iconStyle} />,
      label: t('chat'),
    },
    {
      key: '/approval',
      icon: <FileCheck style={iconStyle} />,
      label: t('approval'),
    },
    {
      key: '/notification',
      icon: <Bell style={iconStyle} />,
      label: t('notification'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: '/special-project',
      icon: <Target style={iconStyle} />,
      label: t('specialProject'),
    },
    {
      key: '/performance',
      icon: <BarChart3 style={iconStyle} />,
      label: t('performance'),
    },
    {
      key: '/okr',
      icon: <Crosshair style={iconStyle} />,
      label: t('okr'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: '/settings',
      icon: <Settings style={iconStyle} />,
      label: t('settings'),
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme="dark"
      width={200}
      className={styles.sider}
    >
      <div className={`${styles.logo} ${collapsed ? styles.logoCollapsed : styles.logoExpanded}`}>
        {collapsed ? 'H' : 'Holder'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        className={styles.menu}
      />
    </Sider>
  )
}

export default AppSidebar
