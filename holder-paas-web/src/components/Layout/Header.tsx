// components/Layout/Header.tsx
import { Layout } from 'antd'
import { useUIStore } from '@/stores/zustand/uiStore'
import styles from './Header.module.less'

const { Header: AntHeader } = Layout

const Header: React.FC = () => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)

  return (
    <AntHeader className={styles.header}>
      <div className={styles.left}>
        <button onClick={toggleSidebar} className={styles.menuButton}>
          ☰
        </button>
        <h1 className={styles.title}>Holder PAAS</h1>
      </div>
      <div className={styles.right}>
        {/* 用户信息等 */}
      </div>
    </AntHeader>
  )
}

export default Header

