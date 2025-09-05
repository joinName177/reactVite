/**
 * 图片路径工具函数
 */

/**
 * 动态导入表单控件图标
 * @param type 控件类型
 * @returns Promise<string> 图片URL
 */
export async function getFormIconAsync(type: string): Promise<string> {
  try {
    const imageModule = await import(`../assets/images/form/${type}.png`);
    return imageModule.default;
  } catch (error) {
    console.warn(`Failed to load image for ${type}:`, error);
    // 返回默认图片或空字符串
    return '';
  }
}

/**
 * 获取表单控件图标路径（使用相对路径）
 * @param type 控件类型
 * @returns 图片路径
 */
export function getFormIconRelativePath(type: string): string {
  return `../assets/images/form/${type}.png`;
}

/**
 * 获取表单控件图标路径（使用public目录）
 * @param type 控件类型
 * @returns 图片路径
 */
export function getFormIconPublicPath(type: string): string {
  return `/form/${type}.png`;
}

/**
 * 获取任意图片路径
 * @param category 图片分类目录
 * @param filename 文件名（不包含扩展名）
 * @param extension 文件扩展名，默认为png
 * @returns 图片路径
 */
export function getImagePath(category: string, filename: string, extension: string = 'png'): string {
  return `/src/assets/images/${category}/${filename}.${extension}`;
}

/**
 * 动态导入任意图片
 * @param category 图片分类目录
 * @param filename 文件名（不包含扩展名）
 * @param extension 文件扩展名，默认为png
 * @returns Promise<string> 图片URL
 */
export async function getImageAsync(category: string, filename: string, extension: string = 'png'): Promise<string> {
  try {
    const imageModule = await import(`../assets/images/${category}/${filename}.${extension}`);
    return imageModule.default;
  } catch (error) {
    console.warn(`Failed to load image for ${category}/${filename}.${extension}:`, error);
    return '';
  }
} 

/**
 * 获取轮播图图片路径
 * @param filename 文件名（不包含扩展名）
 * @returns 图片路径
 */
export async function getCarouselImageAsync(filename: string): Promise<string> {
  try {
    const imageModule = await import(`../assets/images/carousel/${filename}.jpg`);
    return imageModule.default;
  } catch (error) {
    console.warn(`Failed to load image for ${filename}.jpg:`, error);
    return '';
  }
}

/**
 * 获取mp4视频路径
 * @param filename 文件名（不包含扩展名）
 * @returns 视频路径
 */
export async function getMp4VideoAsync(filename: string): Promise<string> {
  try {
    const videoModule = await import(`../assets/videos/${filename}.mp4`);
    return videoModule.default;
  } catch (error) {
    console.warn(`Failed to load video for ${filename}.mp4:`, error);
    return '';
  }
}