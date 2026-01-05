# Holder PAAS Web

Holder PAAS PC 端 Web 应用

## 技术栈

- **前端框架**: React 18.2+
- **开发语言**: TypeScript 5.0+
- **状态管理**: Redux Toolkit + Zustand + React Query
- **路由**: React Router 6.20+
- **UI 组件库**: Ant Design 5.12+
- **HTTP 客户端**: Axios 1.6+
- **构建工具**: Vite 5.0+
- **样式方案**: Less + CSS Modules

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发

```bash
npm run dev
```

### 构建

```bash
npm run build
```

### 预览

```bash
npm run preview
```

## 项目结构

```
holder-paas-web/
├── src/
│   ├── api/                 # API 接口
│   ├── components/          # 公共组件
│   ├── pages/               # 页面组件
│   ├── stores/              # 状态管理
│   │   ├── slices/         # Redux Toolkit slices
│   │   └── zustand/        # Zustand stores
│   ├── hooks/               # 自定义 Hooks
│   ├── db/                  # IndexedDB
│   ├── services/            # 服务层
│   ├── utils/               # 工具函数
│   ├── styles/              # 全局样式
│   └── main.tsx             # 入口文件
├── public/                   # 静态资源
├── vite.config.ts           # Vite 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 依赖配置
```

## 环境变量

复制 `.env.example` 为 `.env` 并配置相应的环境变量：

```bash
cp .env.example .env
```

## 开发规范

- 使用 TypeScript 进行类型检查
- 使用 ESLint 进行代码检查
- 组件使用函数式组件 + Hooks
- 样式使用 Less + CSS Modules
- 遵循 React 最佳实践

## License

MIT

