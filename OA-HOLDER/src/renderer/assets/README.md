# 静态资源目录说明

## 目录结构

```
assets/
├── images/     # 图片资源（PNG, JPG, GIF, WebP 等）
└── icons/      # 图标资源（SVG, ICO 等）
```

## 使用方式

### 方式一：在 React 组件中导入（推荐）

```tsx
import React from 'react';
import logoImage from '@/assets/images/logo.png';
import userIcon from '@/assets/icons/user.svg';

const MyComponent = () => {
  return (
    <div>
      <img src={logoImage} alt="Logo" />
      <img src={userIcon} alt="User Icon" />
    </div>
  );
};
```

### 方式二：在 CSS/Less 中使用

```less
.logo {
  background-image: url('@/assets/images/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
}
```

### 方式三：动态导入

```tsx
const imagePath = require('@/assets/images/logo.png');
// 或
const imagePath = new URL('@/assets/images/logo.png', import.meta.url).href;
```

## 注意事项

1. **文件大小**：建议图片文件大小控制在合理范围内，大图片建议压缩
2. **文件格式**：
   - 图标：优先使用 SVG（矢量图，可缩放）
   - 照片：使用 JPG/WebP（文件小）
   - 透明背景：使用 PNG
3. **命名规范**：使用小写字母和连字符，如 `user-avatar.png`
4. **路径别名**：使用 `@/` 别名指向 `src/renderer/` 目录

