import * as path from 'path';
import * as fs from 'fs';

// 环境判断
const isDev = process.env.NODE_ENV === 'development';

// 图标路径缓存
let cachedIconPath: string | null = null;
let cachedTrayIconPath: string | null = null;

/**
 * 获取应用图标路径（带缓存）
 * @returns 图标文件路径
 */
export function getIconPath(): string {
  // 如果已缓存，直接返回
  if (cachedIconPath) {
    return cachedIconPath;
  }

  // 计算图标路径
  // 开发环境：dist/main/utils/iconUtils.js -> ../../build/icon.ico
  // 生产环境：dist/main/utils/iconUtils.js -> ../../build/icon.ico (打包后可能在 resources 目录)
  const iconPaths = [
    // 开发环境：从 dist/main/utils 到项目根目录的 build
    isDev ? path.resolve(__dirname, '../../build/icon.ico') : path.resolve(__dirname, '../../build/icon.ico'),
    // 生产环境：打包后的路径
    path.resolve(__dirname, '../build/icon.ico'),
    // PNG 备用
    isDev ? path.resolve(__dirname, '../../build/icon.png') : path.resolve(__dirname, '../../build/icon.png'),
    path.resolve(__dirname, '../build/icon.png'),
    // 应用资源路径（打包后的路径）
    process.resourcesPath ? path.join(process.resourcesPath, 'build/icon.ico') : null,
    process.resourcesPath ? path.join(process.resourcesPath, 'build/icon.png') : null,
    // 绝对路径（从项目根目录）
    path.join(process.cwd(), 'build/icon.ico'),
    path.join(process.cwd(), 'build/icon.png'),
  ].filter((p): p is string => p !== null && p !== '');

  // 查找存在的图标文件
  for (const iconPath of iconPaths) {
    try {
      if (fs.existsSync(iconPath)) {
        console.log(`[Icon] ✓ 找到图标文件: ${iconPath}`);
        cachedIconPath = iconPath;
        return iconPath;
      }
    } catch (error) {
      // 忽略错误，继续查找下一个路径
    }
  }

  // 如果都找不到，返回默认路径（即使文件不存在也返回，让 Electron 处理）
  const defaultPath = path.resolve(__dirname, '../../build/icon.ico');
  console.warn(`[Icon] ⚠ 未找到图标文件，使用默认路径: ${defaultPath}`);
  console.warn(`[Icon] __dirname: ${__dirname}`);
  console.warn(`[Icon] process.cwd(): ${process.cwd()}`);
  console.warn(`[Icon] isDev: ${isDev}`);
  cachedIconPath = defaultPath;
  return defaultPath;
}

/**
 * 获取托盘图标路径（Windows 需要 .ico，其他平台可以用 .png）
 * @returns 托盘图标文件路径
 */
export function getTrayIconPath(): string {
  // 如果已缓存，直接返回
  if (cachedTrayIconPath) {
    return cachedTrayIconPath;
  }

  const iconPath = getIconPath();
  
  // Windows 系统优先使用 .ico，如果没有则使用 .png
  if (process.platform === 'win32') {
    const icoPath = iconPath.replace(/\.png$/, '.ico');
    if (fs.existsSync(icoPath)) {
      cachedTrayIconPath = icoPath;
      return icoPath;
    }
  }
  
  cachedTrayIconPath = iconPath;
  return iconPath;
}

