import type { ILoginParams, IUserInfo, IChatMessage, INotificationItem } from '../entities'

export interface IOpenWindowParams {
  moduleId: string
  route?: string
  title?: string
  width?: number
  height?: number
  query?: Record<string, string>
}

export interface IIpcContract {
  'auth:login': { input: ILoginParams; output: IUserInfo }
  'auth:logout': { input: void; output: void }
  'auth:getToken': { input: void; output: string }
  'auth:refreshToken': { input: void; output: string }

  'window:open': { input: IOpenWindowParams; output: { windowId: string } }
  'window:close': { input: { windowId?: string }; output: void }
  'window:minimize': { input: void; output: void }
  'window:maximize': { input: void; output: void }
  'window:restore': { input: void; output: void }

  'state:get': { input: { key: string }; output: unknown }
  'state:set': { input: { key: string; value: unknown }; output: void }
  'state:subscribe': { input: { key: string }; output: void }

  'db:chatHistory': { input: { roomId: string; page: number }; output: IChatMessage[] }

  'system:getVersion': { input: void; output: string }
  'system:getMachineId': { input: void; output: string }
  'system:screenshot': { input: void; output: string }
  'system:notification': { input: INotificationItem; output: void }

  'tray:updateMessages': { input: INotificationItem[]; output: void }
  'tray:setBlinking': { input: boolean; output: void }
}

export type IpcChannel = keyof IIpcContract
export type IpcInput<K extends IpcChannel> = IIpcContract[K]['input']
export type IpcOutput<K extends IpcChannel> = IIpcContract[K]['output']
