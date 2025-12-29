import { ipcMain } from 'electron';
import { app } from 'electron';
import {
  createApprovalWindow,
  createMeetingWindow,
  closeAllChildWindows,
} from '../managers/windowManager';

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
}

