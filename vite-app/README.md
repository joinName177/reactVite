# React + Vite + TypeScript + Ant Design 项目

这是一个使用现代技术栈构建的 React 应用程序。

## 功能特性

- 🚀 基于 Vite 的快速开发体验
- ⚛️ React 19 + TypeScript 支持
- 🎨 Ant Design 5.x 组件库
- 🛣️ React Router 7 路由管理
- 🔄 Redux Toolkit 状态管理
- 📱 响应式设计

## 登录功能

### 演示账号
- **用户名**: `admin`
- **密码**: `123456`

### 功能说明
1. 访问 `/login` 路径进入登录页面
2. 使用演示账号登录
3. 登录成功后自动跳转到首页
4. 未登录用户访问受保护页面会自动重定向到登录页
5. 可以通过右上角的"退出登录"按钮退出

### 路由保护
- 首页 (`/`)
- 关于页面 (`/about`)
- 联系页面 (`/contact`)

这些页面都需要登录后才能访问。

### Redux 状态管理
- 用户登录状态和用户信息存储在 Redux store 中
- 支持页面刷新后状态持久化（通过 localStorage）
- 提供完整的用户状态管理（登录、退出、错误处理等）
- 可以在首页查看 Redux 状态管理示例

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
src/
├── components/          # 组件
│   ├── Layout.tsx      # 主布局组件
│   ├── ProtectedRoute.tsx # 路由保护组件
│   └── ...
├── pages/              # 页面
│   ├── Home.tsx        # 首页
│   ├── Login.tsx       # 登录页
│   ├── About.tsx       # 关于页
│   ├── Contact.tsx     # 联系页
│   └── NotFound.tsx    # 404页面
├── router/             # 路由配置
│   └── index.tsx
├── store/              # Redux 状态管理
├── styles/             # 样式文件
└── main.tsx            # 应用入口
```

## 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 7
- **语言**: TypeScript 5.8
- **UI 组件库**: Ant Design 5.27
- **路由**: React Router 7
- **状态管理**: Redux Toolkit
- **样式**: CSS-in-JS + Less
