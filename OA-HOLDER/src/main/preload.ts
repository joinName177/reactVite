import { contextBridge, ipcRenderer } from 'electron';

// 暴露受保护的方法给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 示例：获取版本信息
  getVersion: () => ipcRenderer.invoke('get-version'),
  
  // 可以添加更多 API
});

