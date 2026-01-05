// components/Layout/index.tsx
import { Layout as AntLayout } from 'antd'
import { useUIStore } from '@/stores/zustand/uiStore'
import Header from './Header'
import Sidebar from './Sidebar'
import styles from './Layout.module.less'

const { Content } = AntLayout

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)

  return (
    <AntLayout className={styles.layout}>
      <Header />
      <AntLayout>
        <Sidebar />
        <AntLayout
          style={{
            marginLeft: sidebarOpen ? 200 : 80,
            transition: 'margin-left 0.2s',
          }}
        >
          <Content className={styles.content}>{children}</Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout

