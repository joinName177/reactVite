import { app, BrowserWindow } from 'electron';
import { registerIpcHandlers } from './handlers/ipcHandlers';
import { createTray, destroyTray } from './managers/trayManager';
import {
  createMainWindow,
  getWindow,
  cleanupWindows,
  setQuiting,
} from './managers/windowManager';

// 环境判断
const isDev = process.env.NODE_ENV === 'development';
const appEnv = process.env.VITE_APP_ENV || (isDev ? 'development' : 'production');

console.log(`[Electron] 当前环境: ${appEnv}, NODE_ENV: ${process.env.NODE_ENV}`);

// 注册 IPC 处理器
registerIpcHandlers();

// 应用启动
app.whenReady().then(() => {
  createTray(); // 先创建系统托盘
  createMainWindow(); // 再创建主窗口

  app.on('activate', () => {
    // macOS: 点击 Dock 图标时显示窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    } else {
      // 如果有窗口但被隐藏，则显示
      const mainWindow = getWindow('main');
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.show();
        mainWindow.focus();
      }
    }
  });
});

// 应用退出前清理资源
app.on('before-quit', () => {
  setQuiting(true);
  cleanupWindows();
  destroyTray();
});

// 窗口全部关闭时的处理
app.on('window-all-closed', () => {
  // Windows 和 Linux: 关闭所有窗口时不退出应用，保留托盘图标
  // macOS: 关闭所有窗口时退出应用
  if (process.platform === 'darwin') {
    app.quit();
  }
  // 其他平台保持应用运行，用户可以通过托盘图标重新打开窗口
});

