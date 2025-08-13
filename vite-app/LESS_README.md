# Less 配置说明

本项目已成功配置Less支持，以下是详细的使用说明。

## 已安装的依赖

- `less`: Less预处理器核心包

## 配置文件

### 1. Vite配置 (vite.config.ts)

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        // 可以在这里添加全局Less变量
        // additionalData: `@import "@/styles/variables.less";`
      }
    }
  }
})
```

### 2. 全局变量文件 (src/styles/variables.less)

包含常用的设计系统变量：
- 颜色变量 (@primary-color, @success-color, @warning-color, @error-color)
- 字体大小 (@font-size-base, @font-size-lg, @font-size-sm)
- 间距变量 (@spacing-xs, @spacing-sm, @spacing-md, @spacing-lg, @spacing-xl)
- 响应式断点 (@screen-xs, @screen-sm, @screen-md, @screen-lg, @screen-xl, @screen-xxl)

## 使用方法

### 1. 创建Less文件

在组件目录下创建 `.less` 文件：

```less
@import '../styles/variables.less';

.my-component {
  background-color: @primary-color;
  padding: @spacing-md;
  
  .title {
    font-size: @font-size-lg;
    color: @primary-color;
  }
  
  &:hover {
    background-color: darken(@primary-color, 10%);
  }
}
```

### 2. 在组件中导入

```tsx
import './MyComponent.less';

function MyComponent() {
  return <div className="my-component">...</div>;
}
```

## Less特性演示

### 1. 变量使用

```less
@primary-color: #1890ff;
@spacing-md: 16px;

.button {
  background-color: @primary-color;
  padding: @spacing-md;
}
```

### 2. 嵌套规则

```less
.card {
  border: 1px solid #e8e8e8;
  
  .title {
    font-weight: bold;
    
    &:hover {
      color: @primary-color;
    }
  }
}
```

### 3. 混合(Mixins)

```less
.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

.centered-box {
  .flex-center();
  height: 100px;
}
```

### 4. 函数

```less
.button {
  background-color: @primary-color;
  
  &:hover {
    background-color: darken(@primary-color, 10%);
  }
}
```

### 5. 响应式设计

```less
@media (max-width: @screen-md) {
  .container {
    padding: @spacing-sm;
  }
}
```

## 项目结构

```
src/
├── styles/
│   ├── variables.less      # 全局变量
│   └── App.less           # App组件样式
├── components/
│   └── MyComponent.less   # 组件样式
└── App.tsx                # 主组件
```

## 开发建议

1. **使用变量**: 将常用的颜色、尺寸等定义为变量，便于维护
2. **模块化**: 为每个组件创建独立的Less文件
3. **响应式**: 使用预定义的断点变量进行响应式设计
4. **命名规范**: 使用BEM命名规范或类似的CSS命名约定

## 启动项目

```bash
npm run dev
```

现在你可以在浏览器中看到Less样式的效果，包括：
- 响应式布局
- 悬停效果
- 颜色主题
- 间距系统

Less配置完成！🎉 