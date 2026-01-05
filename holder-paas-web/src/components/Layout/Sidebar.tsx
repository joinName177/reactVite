// components/Layout/Sidebar.tsx
import { Layout, Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { HomeOutlined, DesktopOutlined, MessageOutlined } from '@ant-design/icons'
import { useUIStore } from '@/stores/zustand/uiStore'
import styles from './Sidebar.module.less'

const { Sider } = Layout

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/workDesk',
      icon: <DesktopOutlined />,
      label: '工作台',
    },
    {
      key: '/chat',
      icon: <MessageOutlined />,
      label: '聊天',
    },
  ]

  return (
    <Sider
      width={sidebarOpen ? 200 : 80}
      collapsed={!sidebarOpen}
      className={styles.sidebar}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  )
}

export default Sidebar

