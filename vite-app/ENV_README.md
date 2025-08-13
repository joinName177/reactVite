# 环境配置说明

## 环境配置文件

本项目支持多环境配置，通过不同的环境变量文件来管理不同环境的配置。

### 配置文件说明

1. **`.env`** - 默认环境配置（所有环境都会加载）
2. **`.env.development`** - 开发环境配置（npm run dev 时加载）
3. **`.env.production`** - 生产环境配置（npm run build 时加载）

### 使用方法

1. 将示例文件重命名为对应的环境配置文件：
   ```bash
   # 开发环境
   copy env.development.example .env.development
   
   # 生产环境
   copy env.production.example .env.production
   
   # 默认配置
   copy env.default.example .env
   ```

2. 根据实际需求修改配置文件中的值

### 环境变量说明

- `NODE_ENV` - Node.js 环境
- `VITE_APP_TITLE` - 应用标题
- `VITE_API_BASE_URL` - API 基础地址
- `VITE_API_PREFIX` - API 路径前缀
- `VITE_APP_ENV` - 应用环境标识

### 在代码中使用

```typescript
// 在 React 组件中使用环境变量
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appTitle = import.meta.env.VITE_APP_TITLE
const appEnv = import.meta.env.VITE_APP_ENV

// 全局常量（在 vite.config.ts 中定义）
console.log(__APP_VERSION__) // 应用版本
console.log(__APP_ENV__)     // 应用环境
```

### 启动命令

```bash
# 开发环境
npm run dev

# 生产环境构建
npm run build

# 预览生产构建
npm run preview
```

### 注意事项

1. 所有以 `VITE_` 开头的环境变量都会暴露给客户端代码
2. 敏感信息不要放在环境变量中
3. 生产环境的配置文件不要提交到版本控制系统
4. 环境变量在构建时确定，运行时无法修改 