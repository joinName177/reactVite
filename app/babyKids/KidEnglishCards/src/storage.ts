import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  documentDirectory,
  getInfoAsync,
  deleteAsync,
  makeDirectoryAsync,
  moveAsync,
} from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import type { WordCard, StorageData, AppSettings } from './types';
import {
  STORAGE_KEY,
  SETTINGS_KEY,
  STORAGE_VERSION,
  IMAGE_MAX_WIDTH,
  IMAGE_JPEG_QUALITY,
  DEFAULT_SPEECH_RATE,
} from './constants';

/**
 * 获取所有卡片（按添加时间倒序）
 */
export async function getCards(): Promise<WordCard[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const data: StorageData = JSON.parse(raw);
    if (data.storageVersion !== STORAGE_VERSION) {
      // 后续可在此做数据迁移
      return data.cards ?? [];
    }

    const cards = data.cards ?? [];
    return cards.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * 保存所有卡片
 */
export async function saveCards(cards: WordCard[]): Promise<void> {
  const data: StorageData = {
    storageVersion: STORAGE_VERSION,
    cards,
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * 添加新卡片
 */
export async function addCard(card: Omit<WordCard, 'id' | 'createdAt'>): Promise<WordCard> {
  const cards = await getCards();
  const newCard: WordCard = {
    ...card,
    id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  cards.unshift(newCard);
  await saveCards(cards);
  return newCard;
}

/**
 * 更新卡片
 */
export async function updateCard(id: string, updates: Partial<WordCard>): Promise<void> {
  const cards = await getCards();
  const index = cards.findIndex((c) => c.id === id);
  if (index === -1) return;

  cards[index] = { ...cards[index], ...updates };
  await saveCards(cards);
}

/**
 * 删除卡片，并删除本地图片文件
 */
export async function deleteCard(card: WordCard): Promise<void> {
  const cards = await getCards().then((list) => list.filter((c) => c.id !== card.id));
  await saveCards(cards);

  // 删除本地图片（仅处理 file:// 路径，不删除 bundle 资源）
  if (card.imageUri.startsWith('file://')) {
    try {
      const info = await getInfoAsync(card.imageUri);
      if (info.exists) {
        await deleteAsync(card.imageUri);
      }
    } catch {
      // 忽略删除失败
    }
  }
}

/**
 * 压缩并保存图片到应用私有目录
 */
export async function compressAndSaveImage(uri: string): Promise<string> {
  const dir = documentDirectory;
  if (!dir) throw new Error('documentDirectory is not available');

  const dirPath = `${dir}kidEnglishCards/`;
  const dirInfo = await getInfoAsync(dirPath);
  if (!dirInfo.exists) {
    await makeDirectoryAsync(dirPath, { intermediates: true });
  }

  const filename = `card-${Date.now()}.jpg`;
  const destUri = `${dirPath}${filename}`;

  const manipulated = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: IMAGE_MAX_WIDTH } }],
    { compress: IMAGE_JPEG_QUALITY, format: ImageManipulator.SaveFormat.JPEG }
  );

  await moveAsync({ from: manipulated.uri, to: destUri });
  return destUri;
}

/**
 * 获取设置
 */
export async function getSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    if (!raw) return { speechRate: DEFAULT_SPEECH_RATE };
    return JSON.parse(raw);
  } catch {
    return { speechRate: DEFAULT_SPEECH_RATE };
  }
}

/**
 * 保存设置
 */
export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
