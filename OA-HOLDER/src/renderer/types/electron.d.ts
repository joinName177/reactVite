export interface ElectronAPI {
  getVersion: () => Promise<string>;
  openApprovalWindow: () => Promise<{ success: boolean }>;
  openMeetingWindow: () => Promise<{ success: boolean }>;
  closeAllChildWindows: () => Promise<{ success: boolean }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

