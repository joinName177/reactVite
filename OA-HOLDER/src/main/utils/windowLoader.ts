import { BrowserWindow } from 'electron';
import * as path from 'path';

// 环境判断
const isDev = process.env.NODE_ENV === 'development';

/**
 * 加载窗口 URL 的通用函数
 * @param window 窗口实例
 * @param route 路由路径
 * @param openDevTools 是否打开开发者工具
 */
export function loadWindowURL(
  window: BrowserWindow,
  route: string = '',
  openDevTools: boolean = false
): void {
  if (isDev) {
    const url = `http://localhost:5173${route ? `#${route}` : ''}`;
    window.loadURL(url).catch((err) => {
      console.error('Failed to load URL:', err);
      setTimeout(() => loadWindowURL(window, route, openDevTools), 1000);
    });
    if (openDevTools) {
      window.webContents.openDevTools();
    }
  } else {
    const filePath = path.join(__dirname, '../renderer/index.html');
    window.loadFile(filePath)
      .then(() => {
        // 加载完成后设置 hash 路由
        if (route) {
          window.webContents.executeJavaScript(`window.location.hash = '${route}'`);
        }
      })
      .catch((err) => {
        console.error('Failed to load file:', err);
      });
  }
}

/**
 * 设置窗口标题并阻止 HTML 文档覆盖
 * @param window 窗口实例
 * @param title 窗口标题
 */
export function setupWindowTitle(window: BrowserWindow, title: string): void {
  // 立即设置标题
  window.setTitle(title);

  // 阻止 HTML 文档的 title 覆盖窗口标题
  window.webContents.on('page-title-updated', (event: Electron.Event) => {
    event.preventDefault();
    window.setTitle(title);
  });

  // 监听 DOM 加载完成，确保标题正确
  window.webContents.once('did-finish-load', () => {
    window.setTitle(title);
  });

  // 窗口加载完成后再次确保标题正确
  window.once('ready-to-show', () => {
    window.setTitle(title);
  });
}

