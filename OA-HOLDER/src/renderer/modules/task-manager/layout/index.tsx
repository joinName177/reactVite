import { Layout, Menu } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './index.module.css'

const { Sider, Content } = Layout

const menuItems = [
  {
    key: '/task/dashboard',
    label: '工作台',
    icon: <span style={{ fontSize: 16 }}>📊</span>,
  },
  {
    key: '/task/tasks',
    label: '任务列表',
    icon: <span style={{ fontSize: 16 }}>📋</span>,
  },
]

export function ModuleLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider} width={220}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>📋</div>
          <span className={styles.logoText}>任务管理</span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          style={{ border: 'none' }}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  )
}
