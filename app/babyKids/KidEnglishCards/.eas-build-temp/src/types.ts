/**
 * 单词卡片数据类型
 */
export interface WordCard {
  id: string;
  english: string;
  chinese: string;
  imageUri: string;
  createdAt: string;
}

/**
 * 存储数据结构（含版本号，用于数据迁移）
 */
export interface StorageData {
  storageVersion: number;
  cards: WordCard[];
}

/**
 * 设置项
 */
export interface AppSettings {
  speechRate: number; // 语速 0.5 - 2.0，默认 0.8
}
