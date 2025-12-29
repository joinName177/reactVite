import { BrowserWindow } from 'electron';
import { WindowConfig, WindowKey, getWindowConfig } from '../windowConfig';
import { getIconPath } from '../utils/iconUtils';
import { loadWindowURL, setupWindowTitle } from '../utils/windowLoader';
import * as path from 'path';

// 窗口管理器：存储所有窗口引用
const windows: Record<WindowKey, BrowserWindow | null> = {
  main: null,
  approval: null,
  meeting: null,
};

// 应用退出标志（由外部设置）
let isQuiting = false;

/**
 * 设置应用退出标志
 */
export function setQuiting(quiting: boolean): void {
  isQuiting = quiting;
}

/**
 * 获取窗口引用
 */
export function getWindow(key: WindowKey): BrowserWindow | null {
  return windows[key];
}

/**
 * 获取所有窗口引用
 */
export function getAllWindows(): Record<WindowKey, BrowserWindow | null> {
  return { ...windows };
}

/**
 * 通用窗口创建函数
 */
export function createWindowByConfig(config: WindowConfig): BrowserWindow | null {
  const {
    key,
    width,
    height,
    title,
    route = '',
    parent,
    openDevTools = false,
    resizable = true,
    minimizable = true,
    maximizable = true,
    skipTaskbar = false,
    hideOnClose = false,
  } = config;

  // 如果窗口已存在且未销毁，则聚焦到该窗口
  const existingWindow = windows[key];
  if (existingWindow && !existingWindow.isDestroyed()) {
    existingWindow.show();
    existingWindow.focus();
    return existingWindow;
  }

  // 获取图标路径
  const iconPath = getIconPath();
  console.log(`[Window] 创建窗口 ${key}，图标路径: ${iconPath}, skipTaskbar: ${skipTaskbar}`);

  // 创建新窗口
  // 注意：如果要让窗口在任务栏独立显示，不要设置 parent 属性
  const newWindow = new BrowserWindow({
    width,
    height,
    title,
    autoHideMenuBar: true,
    icon: iconPath,
    // 移除 parent 属性，让子窗口在任务栏独立显示
    // parent: parent || undefined, // 注释掉，让窗口独立显示
    resizable,
    minimizable,
    maximizable,
    skipTaskbar: skipTaskbar, // false = 在任务栏显示，true = 不在任务栏显示
    minWidth: config.minWidth,
    minHeight: config.minHeight,
    maxWidth: config.maxWidth,
    maxHeight: config.maxHeight,
    show: false, // 先不显示，等加载完成后再显示
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // 存储窗口引用
  windows[key] = newWindow;

  // 加载 URL
  loadWindowURL(newWindow, route, openDevTools);

  // 设置窗口标题
  setupWindowTitle(newWindow, title);

  // 窗口加载完成后显示
  newWindow.once('ready-to-show', () => {
    newWindow.show();
    if (openDevTools && process.env.NODE_ENV === 'development') {
      newWindow.webContents.openDevTools();
    }
  });

  // 监听关闭事件
  if (hideOnClose) {
    newWindow.on('close', (event: Electron.Event) => {
      // 如果不是强制退出，则隐藏窗口
      if (!isQuiting) {
        event.preventDefault();
        newWindow.hide();
      }
    });
  } else {
    // 正常关闭时清理引用
    newWindow.on('closed', () => {
      windows[key] = null;
    });
  }

  return newWindow;
}

/**
 * 创建主窗口
 */
export function createMainWindow(): void {
  createWindowByConfig(getWindowConfig('main'));
}

/**
 * 创建审批窗口（独立窗口，在任务栏独立显示）
 */
export function createApprovalWindow(): void {
  // 不传递 parent，让窗口在任务栏独立显示
  createWindowByConfig(getWindowConfig('approval'));
}

/**
 * 创建会议窗口（独立窗口，在任务栏独立显示）
 */
export function createMeetingWindow(): void {
  // 不传递 parent，让窗口在任务栏独立显示
  createWindowByConfig(getWindowConfig('meeting'));
}

/**
 * 关闭所有子窗口（审批窗口和会议窗口）
 */
export function closeAllChildWindows(): void {
  if (windows.approval && !windows.approval.isDestroyed()) {
    windows.approval.close();
  }
  if (windows.meeting && !windows.meeting.isDestroyed()) {
    windows.meeting.close();
  }
}

/**
 * 清理所有窗口监听器
 */
export function cleanupWindows(): void {
  Object.values(windows).forEach((win) => {
    if (win && !win.isDestroyed()) {
      win.removeAllListeners('closed');
      win.removeAllListeners('close');
      win.removeAllListeners('minimize');
    }
  });
}

