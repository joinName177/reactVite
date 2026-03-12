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

const { Sider } = Layout

const iconStyle = { width: 16, height: 16 }

const menuItems = [
  {
    key: '/',
    icon: <Home style={iconStyle} />,
    label: '工作台',
  },
  {
    key: '/task',
    icon: <CheckSquare style={iconStyle} />,
    label: '任务',
  },
  {
    key: '/chat',
    icon: <MessageSquare style={iconStyle} />,
    label: '沟通',
  },
  {
    key: '/approval',
    icon: <FileCheck style={iconStyle} />,
    label: '审批',
  },
  {
    key: '/notification',
    icon: <Bell style={iconStyle} />,
    label: '通知',
  },
  {
    type: 'divider' as const,
  },
  {
    key: '/special-project',
    icon: <Target style={iconStyle} />,
    label: '专项',
  },
  {
    key: '/performance',
    icon: <BarChart3 style={iconStyle} />,
    label: '绩效',
  },
  {
    key: '/okr',
    icon: <Crosshair style={iconStyle} />,
    label: 'OKR',
  },
  {
    type: 'divider' as const,
  },
  {
    key: '/settings',
    icon: <Settings style={iconStyle} />,
    label: '设置',
  },
]

const AppSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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
      style={{ overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0 }}
    >
      <div
        style={{
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: collapsed ? 16 : 18,
          fontWeight: 600,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {collapsed ? 'H' : 'Holder'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ borderRight: 0 }}
      />
    </Sider>
  )
}

export default AppSidebar
