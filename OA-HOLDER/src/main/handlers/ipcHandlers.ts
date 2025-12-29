import { ipcMain } from 'electron';
import { app } from 'electron';
import {
  createApprovalWindow,
  createMeetingWindow,
  closeAllChildWindows,
} from '../managers/windowManager';
import { updateTrayMessages, setTrayBlinking } from '../managers/trayManager';

/**
 * 注册所有 IPC 处理器
 */
export function registerIpcHandlers(): void {
  // 获取版本信息
  ipcMain.handle('get-version', () => {
    return app.getVersion();
  });

  // 打开审批窗口
  ipcMain.handle('open-approval-window', () => {
    createApprovalWindow();
    return { success: true };
  });

  // 打开会议窗口
  ipcMain.handle('open-meeting-window', () => {
    createMeetingWindow();
    return { success: true };
  });

  // 关闭所有子窗口（审批窗口和会议窗口）
  ipcMain.handle('close-all-child-windows', () => {
    closeAllChildWindows();
    return { success: true };
  });

  // 更新托盘消息列表
  ipcMain.handle('update-tray-messages', (_event, messages: any[]) => {
    updateTrayMessages(messages);
    return { success: true };
  });

  // 设置托盘闪烁
  ipcMain.handle('set-tray-blinking', (_event, blinking: boolean) => {
    setTrayBlinking(blinking);
    return { success: true };
  });
}

