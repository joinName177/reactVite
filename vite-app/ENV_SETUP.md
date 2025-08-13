# 环境变量配置说明

## 概述

本项目使用 Vite 7.x 的标准环境变量配置方式，支持多环境配置。

## 环境变量文件

### 1. `.env` - 默认环境配置
所有环境都会加载的默认配置：
```
VITE_APP_TITLE=React App
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_ENV=development
```

### 2. `.env.development` - 开发环境配置
运行 `npm run dev` 时加载：
```
VITE_APP_TITLE=React App (Dev)
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_ENV=development
```

### 3. `.env.staging` - 预发布环境配置
运行 `npm run build:staging` 时加载：
```
VITE_APP_TITLE=React App (Staging)
VITE_API_BASE_URL=https://api.staging.com
VITE_APP_ENV=staging
```

### 4. `.env.production` - 生产环境配置
运行 `npm run build:production` 时加载：
```
VITE_APP_TITLE=React App (Production)
VITE_API_BASE_URL=https://api.production.com
VITE_APP_ENV=production
```

## 使用方法

### 在代码中访问环境变量
```typescript
// 在 React 组件中
console.log('App Title:', import.meta.env.VITE_APP_TITLE)
console.log('API URL:', import.meta.env.VITE_API_BASE_URL)
console.log('Environment:', import.meta.env.VITE_APP_ENV)
```

### 构建命令
```bash
# 开发模式
npm run dev

# 默认构建（使用 .env 文件）
npm run build

# 预发布环境构建
npm run build:staging

# 生产环境构建
npm run build:production
```

## 重要说明

1. **NODE_ENV 限制**：Vite 7.x 不支持在 `.env` 文件中设置 `NODE_ENV`，如果需要设置，请在 `vite.config.ts` 中配置。

2. **环境变量前缀**：所有环境变量必须以 `VITE_` 开头才能在客户端代码中访问。

3. **优先级**：特定环境的配置文件会覆盖默认的 `.env` 文件中的同名变量。

4. **安全性**：不要将包含敏感信息的 `.env` 文件提交到版本控制系统。

## 添加新环境

要添加新的环境（如测试环境），只需：

1. 创建 `.env.test` 文件
2. 在 `package.json` 中添加对应的构建脚本：
   ```json
   "build:test": "tsc -b && vite build --mode test"
   ```
3. 在 `vite.config.ts` 中处理新的环境模式

## 最佳实践

1. 使用有意义的默认值
2. 为不同环境使用不同的 API 端点
3. 在团队中共享 `.env.example` 文件
4. 定期检查和更新环境配置 