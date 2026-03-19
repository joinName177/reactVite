# KidEnglishCards（宝宝英语卡）

面向 2-8 岁儿童的英语单词学习 App，支持图片展示、中英文显示、语音播放（TTS）、添加/编辑/删除卡片，数据本地存储。

## 环境要求

- **Node.js**：建议 v20+（LTS）
- **npm** 或 **yarn**
- **EAS CLI**（打包 APK 时使用）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 开发调试

```bash
npx expo start
```

使用 Expo Go 扫描二维码，在手机上预览。

### 3. 打包 APK

```bash
# 首次需配置 EAS 并登录
npm install -g eas-cli
eas login

# 构建 APK
npm run build:apk
```

构建完成后，从 Expo 提供的链接下载 APK 安装到 Android 手机。

## 预设示例图片

首次启动时，App 会添加「猫」「狗」两张示例卡片。当前使用 `assets/icon.png` 作为占位图。

若要使用真实猫狗图片，请将 `cat.jpg`、`dog.jpg` 放入 `assets` 文件夹，并修改 `src/preset.ts` 中的 `getPresetImageSource` 映射。

## 功能清单

- [x] 图片展示（本地 + 用户自定义）
- [x] 中英文显示
- [x] 语音播放（英文/中文 TTS）
- [x] 添加新单词
- [x] 编辑卡片
- [x] 删除卡片（含本地图片清理）
- [x] 本地存储（AsyncStorage + FileSystem）
- [x] 卡片切换（上一个/下一个）
- [x] 预设示例
- [x] 空状态引导
- [x] 设置页（语速调节）
- [x] 图片压缩（800px 宽，JPEG 80%）

## 技术栈

- React Native + Expo SDK 55
- TypeScript
- AsyncStorage、expo-file-system、expo-image-picker、expo-speech、expo-image-manipulator
