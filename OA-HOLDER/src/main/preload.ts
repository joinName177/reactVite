import { contextBridge, ipcRenderer } from 'electron'

// 暴露受保护的方法给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取版本信息
  getVersion: () => ipcRenderer.invoke('get-version'),

  // 打开审批窗口
  openApprovalWindow: () => ipcRenderer.invoke('open-approval-window'),

  // 打开会议窗口
  openMeetingWindow: () => ipcRenderer.invoke('open-meeting-window'),

  // 关闭所有子窗口
  closeAllChildWindows: () => ipcRenderer.invoke('close-all-child-windows'),

  // 更新托盘消息列表
  updateTrayMessages: (messages: any[]) =>
    ipcRenderer.invoke('update-tray-messages', messages),

  // 设置托盘闪烁
  setTrayBlinking: (blinking: boolean) =>
    ipcRenderer.invoke('set-tray-blinking', blinking),

  // 获取机器ID（完整64位）
  getMachineId: () => ipcRenderer.invoke('get-machine-id'),

  // 获取机器ID（32位短版本）
  getShortMachineId: () => ipcRenderer.invoke('get-short-machine-id')
})
