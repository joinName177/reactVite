import { Outlet } from 'react-router-dom';
import styles from './app-layout.module.css';
import AppHeader from './header';

const AppLayout = () => {
  return (
    <div className={styles.shell}>
      <AppHeader />
      <div className={styles.body}>
        <aside className={styles.left} aria-label="侧栏" />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
