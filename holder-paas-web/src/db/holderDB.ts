// db/holderDB.ts
import Dexie, { Table } from 'dexie'

export interface Message {
  id?: number
  roomId: string
  content: string
  timestamp: number
  senderId: string
}

export interface LoginInfo {
  account: string
  password: string
  loginTime: number
}

class HolderDB extends Dexie {
  messages!: Table<Message, number>
  loginInfo!: Table<LoginInfo, string>

  constructor() {
    super('HolderDB')
    
    this.version(1).stores({
      messages: '++id, roomId, timestamp, senderId',
      loginInfo: 'account, loginTime',
    })
  }
}

export const db = new HolderDB()

