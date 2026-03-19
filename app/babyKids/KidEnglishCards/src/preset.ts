import type { WordCard } from './types';

/**
 * 预设示例卡片
 * 使用 asset: 前缀表示打包资源，在组件中解析
 */
export const PRESET_CARDS: Omit<WordCard, 'id' | 'createdAt'>[] = [
  {
    english: 'cat',
    chinese: '猫',
    imageUri: 'asset:cat',
  },
  {
    english: 'dog',
    chinese: '狗',
    imageUri: 'asset:dog',
  },
];

/**
 * 解析预设图片资源
 * 将 cat.jpg、dog.jpg 放入 assets 文件夹后可替换；当前使用 icon 占位
 */
export function getPresetImageSource(assetKey: string): number {
  const mapping: Record<string, number> = {
    cat: require('../assets/icon.png'),
    dog: require('../assets/icon.png'),
  };
  return mapping[assetKey] ?? require('../assets/icon.png');
}
