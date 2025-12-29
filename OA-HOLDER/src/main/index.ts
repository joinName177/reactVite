import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

// 环境判断
const isDev = process.env.NODE_ENV === 'development';
const appEnv = process.env.VITE_APP_ENV || (isDev ? 'development' : 'production');

console.log(`[Electron] 当前环境: ${appEnv}, NODE_ENV: ${process.env.NODE_ENV}`);

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (isDev) {
    // 等待 Vite 服务器就绪后再加载
    const loadDevURL = () => {
      mainWindow.loadURL('http://localhost:5173').catch((err) => {
        console.error('Failed to load URL:', err);
        // 如果加载失败，等待 1 秒后重试
        setTimeout(loadDevURL, 1000);
      });
    };
    loadDevURL();
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

// IPC 处理器
ipcMain.handle('get-version', () => {
  return app.getVersion();
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

