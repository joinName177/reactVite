# 样式系统说明

本项目使用 Less 作为 CSS 预处理器，采用模块化的样式组织方式。

## 目录结构

```
src/styles/
├── index.less              # 主样式入口文件
├── variables.less          # 全局变量定义
├── components/             # 组件样式
│   ├── index.less         # 组件样式索引
│   ├── Layout.less        # 布局组件样式
│   ├── UserInfo.less      # 用户信息组件样式
│   └── Common.less        # 通用组件样式
└── pages/                  # 页面样式
    ├── index.less         # 页面样式索引
    ├── Login.less         # 登录页面样式
    └── Home.less          # 首页样式
```

## 样式规范

### 1. 命名规范
- 使用 BEM 命名规范（Block__Element--Modifier）
- 组件样式使用组件名作为前缀（如：`.login-container`）
- 页面样式使用页面名作为前缀（如：`.home-container`）

### 2. 变量使用
- 颜色、字体大小、间距等使用 `variables.less` 中定义的变量
- 响应式断点使用预定义的屏幕尺寸变量

### 3. 响应式设计
- 使用 Less 变量定义的断点进行响应式设计
- 支持移动端、平板和桌面端

## 使用方法

### 在组件中使用样式
```tsx
import React from 'react';
import './ComponentName.less';

const ComponentName: React.FC = () => {
  return (
    <div className="component-name">
      <div className="component-name__header">
        <h1 className="component-name__title">标题</h1>
      </div>
    </div>
  );
};
```

### 在页面中使用样式
```tsx
import React from 'react';
import './PageName.less';

const PageName: React.FC = () => {
  return (
    <div className="page-name">
      <div className="page-name__content">
        页面内容
      </div>
    </div>
  );
};
```

## 可用的 CSS 类

### 通用类
- `.loading-container` - 加载状态容器
- `.card-container` - 卡片容器样式
- `.button-group` - 按钮组样式
- `.text-center` - 文本居中
- `.text-right` - 文本右对齐
- `.mb-16`, `.mb-24` - 底部外边距
- `.mt-16`, `.mt-24` - 顶部外边距

### 登录页面类
- `.login-container` - 登录页面容器
- `.login-card` - 登录卡片
- `.login-header` - 登录头部
- `.login-form` - 登录表单
- `.login-button` - 登录按钮
- `.login-footer` - 登录底部

### 布局类
- `.app-layout` - 应用布局
- `.app-header` - 应用头部
- `.app-content` - 应用内容区
- `.app-footer` - 应用底部
- `.app-logo` - 应用 Logo
- `.app-menu` - 应用菜单
- `.user-actions` - 用户操作区

### 用户信息类
- `.user-info-card` - 用户信息卡片
- `.user-info-content` - 用户信息内容
- `.user-avatar-section` - 用户头像区域
- `.user-info-item` - 用户信息项

### 首页类
- `.home-container` - 首页容器
- `.welcome-section` - 欢迎区域
- `.section-divider` - 区域分割线
- `.section-title` - 区域标题
- `.section-description` - 区域描述

## 响应式断点

```less
@screen-xs: 480px;   // 超小屏幕
@screen-sm: 576px;   // 小屏幕
@screen-md: 768px;   // 中等屏幕
@screen-lg: 992px;   // 大屏幕
@screen-xl: 1200px;  // 超大屏幕
@screen-xxl: 1600px; // 超超大屏幕
```

## 注意事项

1. 避免在组件中使用内联样式，优先使用 CSS 类
2. 新增样式时，请在对应的样式文件中添加，并更新索引文件
3. 使用语义化的类名，便于维护和理解
4. 响应式设计要考虑移动端优先的原则 