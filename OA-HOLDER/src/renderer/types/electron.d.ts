export interface MessageItem {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: number;
  read: boolean;
}

export interface ElectronAPI {
  getVersion: () => Promise<string>;
  openApprovalWindow: () => Promise<{ success: boolean }>;
  openMeetingWindow: () => Promise<{ success: boolean }>;
  closeAllChildWindows: () => Promise<{ success: boolean }>;
  updateTrayMessages: (messages: MessageItem[]) => Promise<{ success: boolean }>;
  setTrayBlinking: (blinking: boolean) => Promise<{ success: boolean }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

