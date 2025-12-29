import { app, Tray, Menu, nativeImage } from 'electron';
import * as fs from 'fs';
import { getTrayIconPath } from '../utils/iconUtils';
import {
  getWindow,
  getAllWindows,
  createMainWindow,
  setQuiting,
} from './windowManager';

let tray: Tray | null = null;
let trayIcon: ReturnType<typeof nativeImage.createFromPath> | null = null; // 保存原始图标
let blinkingInterval: NodeJS.Timeout | null = null; // 闪烁定时器
let messages: Array<{ id: string; title: string; content: string; type: string; timestamp: number; read: boolean }> = [];

/**
 * 创建系统托盘
 */
export function createTray(): void {
  // 如果托盘已存在，先销毁
  if (tray) {
    console.log('[Tray] 托盘已存在，先销毁');
    tray.destroy();
    tray = null;
  }

  const iconPath = getTrayIconPath();
  console.log(`[Tray] 尝试创建托盘，图标路径: ${iconPath}`);

  try {
    // 创建托盘图标
    let icon = nativeImage.createFromPath(iconPath);

    // 如果图标无效，尝试其他路径
    if (icon.isEmpty()) {
      console.warn('[Tray] ⚠ 图标文件无效，图标路径:', iconPath);
      
      // 尝试使用 .ico 格式
      const icoPath = iconPath.replace(/\.png$/, '.ico');
      if (icoPath !== iconPath && fs.existsSync(icoPath)) {
        console.log(`[Tray] 尝试使用 .ico 格式: ${icoPath}`);
        icon = nativeImage.createFromPath(icoPath);
      }
      
      // 如果还是无效，尝试使用应用图标
      if (icon.isEmpty()) {
        const appIconPath = iconPath.replace(/tray|Tray/, '').replace(/\.png$/, '.ico');
        if (fs.existsSync(appIconPath)) {
          console.log(`[Tray] 尝试使用应用图标: ${appIconPath}`);
          icon = nativeImage.createFromPath(appIconPath);
        }
      }
      
      // 如果仍然无效，记录错误但不阻止创建（使用空图标）
      if (icon.isEmpty()) {
        console.error('[Tray] ✗ 无法加载图标文件，将使用空图标');
        // 创建一个最小的图标（1x1 像素）
        icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==');
      }
    } else {
      console.log('[Tray] ✓ 图标加载成功');
    }

    // Windows 系统需要设置图标大小
    if (process.platform === 'win32') {
      icon.setTemplateImage(false);
    }

    tray = new Tray(icon);

    // 设置托盘菜单
    const contextMenu = Menu.buildFromTemplate([
      { type: 'separator' },
      {
        label: '退出',
        click: () => {
          setQuiting(true);
          // 关闭所有窗口
          const allWindows = getAllWindows();
          Object.values(allWindows).forEach((win) => {
            if (win && !win.isDestroyed()) {
              win.destroy();
            }
          });
          // 清理托盘
          destroyTray();
          app.quit();
        },
      },
    ]);

    // 保存原始图标
    trayIcon = icon;

    tray.setToolTip('holder');
    tray.setContextMenu(contextMenu);

    // 点击托盘图标显示/隐藏主窗口
    tray.on('click', () => {
      const mainWindow = getWindow('main');
      if (mainWindow) {
        if (mainWindow.isVisible()) {
          mainWindow.hide();
        } else {
          mainWindow.show();
          mainWindow.focus();
        }
      } else {
        createMainWindow();
      }
    });

    // 鼠标悬停时显示消息列表
    tray.on('mouse-enter', () => {
      updateTrayTooltip();
    });

    console.log('[Tray] 系统托盘已创建');
  } catch (error) {
    console.error('[Tray] 创建系统托盘失败:', error);
  }
}

/**
 * 更新托盘提示信息（显示消息列表）
 */
function updateTrayTooltip(): void {
  if (!tray) return;

  const unreadCount = messages.filter((msg) => !msg.read).length;
  
  if (messages.length === 0) {
    tray.setToolTip('holder\n暂无消息');
    return;
  }

  // 构建工具提示文本
  const tooltipLines = [
    `holder (${unreadCount > 0 ? `${unreadCount}条未读` : '全部已读'})`,
    '━━━━━━━━━━━━━━━━',
  ];

  // 显示最近5条消息
  const recentMessages = messages.slice(0, 5);
  recentMessages.forEach((msg, index) => {
    const readMark = msg.read ? '✓' : '●';
    const time = new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    tooltipLines.push(`${readMark} [${time}] ${msg.title}`);
  });

  if (messages.length > 5) {
    tooltipLines.push(`...还有 ${messages.length - 5} 条消息`);
  }

  tray.setToolTip(tooltipLines.join('\n'));
}

/**
 * 更新托盘消息列表
 */
export function updateTrayMessages(newMessages: Array<{ id: string; title: string; content: string; type: string; timestamp: number; read: boolean }>): void {
  messages = newMessages;
  updateTrayTooltip();
}

/**
 * 设置托盘闪烁
 */
export function setTrayBlinking(blinking: boolean): void {
  if (!tray || !trayIcon) return;

  // 清除现有闪烁定时器
  if (blinkingInterval) {
    clearInterval(blinkingInterval);
    blinkingInterval = null;
  }

  if (!blinking) {
    // 停止闪烁，恢复原始图标
    tray.setImage(trayIcon);
    return;
  }

  // 创建闪烁效果（交替显示图标和空图标）
  let isVisible = true;
  blinkingInterval = setInterval(() => {
    if (!tray || !trayIcon) {
      if (blinkingInterval) {
        clearInterval(blinkingInterval);
        blinkingInterval = null;
      }
      return;
    }

    if (isVisible) {
      // 显示原始图标
      tray.setImage(trayIcon);
    } else {
      // 创建半透明图标（闪烁效果）
      const emptyIcon = nativeImage.createEmpty();
      tray.setImage(emptyIcon);
    }
    isVisible = !isVisible;
  }, 500); // 每500ms切换一次
}

/**
 * 销毁系统托盘
 */
export function destroyTray(): void {
  // 清除闪烁定时器
  if (blinkingInterval) {
    clearInterval(blinkingInterval);
    blinkingInterval = null;
  }

  if (tray) {
    tray.destroy();
    tray = null;
  }

  trayIcon = null;
  messages = [];
}

