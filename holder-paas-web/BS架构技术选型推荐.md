# BS 架构技术选型推荐

## 文档信息

- **项目名称**: Holder PAAS PC
- **文档版本**: 1.0.0
- **创建日期**: 2024年
- **文档类型**: 技术架构选型

---

## 目录

1. [选型原则](#选型原则)
2. [核心技术栈](#核心技术栈)
3. [详细技术选型](#详细技术选型)
4. [技术栈对比](#技术栈对比)
5. [迁移建议](#迁移建议)
6. [示例代码](#示例代码)

---

## 选型原则

### 1. 兼容性原则
- ✅ 优先考虑与现有技术栈兼容
- ✅ 降低迁移成本和风险
- ✅ 保持代码风格一致性

### 2. 成熟稳定原则
- ✅ 选择成熟稳定的技术方案
- ✅ 社区活跃，文档完善
- ✅ 长期维护支持

### 3. 性能优先原则
- ✅ 选择高性能的技术方案
- ✅ 支持代码分割和懒加载
- ✅ 优化打包体积

### 4. 开发体验原则
- ✅ 开发工具完善
- ✅ TypeScript 支持良好
- ✅ 调试方便

---

## 核心技术栈

### 推荐技术栈总览

| 技术分类 | 推荐方案 | 版本 | 说明 |
|---------|---------|------|------|
| **前端框架** | React | 18.2+ | 升级到最新稳定版 |
| **开发语言** | TypeScript | 5.0+ | 升级到最新版本 |
| **状态管理** | Redux Toolkit + Zustand | RTK 2.0+ / Zustand 4.5+ | 双状态管理方案 |
| **路由管理** | React Router | 6.20+ | 升级到 v6 |
| **UI 组件库** | Ant Design | 5.12+ | 升级到 v5 |
| **HTTP 客户端** | Axios | 1.6+ | 保持使用 |
| **WebSocket** | 原生 WebSocket + ReconnectingWebSocket | - | 自定义封装 |
| **数据存储** | Dexie.js | 3.2+ | IndexedDB 封装 |
| **构建工具** | Vite | 5.0+ | 推荐使用 Vite |
| **样式方案** | Less + CSS Modules | - | 保持现有方案 |
| **测试框架** | Vitest + React Testing Library | - | 现代化测试方案 |
| **PWA 支持** | Vite PWA Plugin | 0.17+ | PWA 支持 |

---

## 详细技术选型

### 1. 前端框架

#### 1.1 React

**推荐版本**: **React 18.2+**

**选型理由**:
- ✅ 当前使用 React 16.13.1，升级到 18.2+ 可获得：
  - Concurrent Mode（并发模式）
  - Automatic Batching（自动批处理）
  - Suspense 改进
  - 更好的性能
- ✅ 向后兼容，迁移成本低
- ✅ 社区活跃，生态完善

**迁移建议**:
```typescript
// 渐进式升级，先升级到 17.x，再升级到 18.x
// React 18 主要变化：
// 1. createRoot API
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)

// 2. 自动批处理
// 3. Suspense 改进
```

**替代方案**: 
- ❌ Vue 3（迁移成本高）
- ❌ Angular（迁移成本高）

---

### 2. 状态管理

#### 2.1 Redux Toolkit（推荐用于全局状态）

**推荐版本**: **@reduxjs/toolkit 2.0+**

**选型理由**:
- ✅ 当前项目已使用 Redux 4.0.5
- ✅ Redux Toolkit 是 Redux 官方推荐方案
- ✅ 简化 Redux 使用，减少样板代码
- ✅ 内置 Immer，支持不可变更新
- ✅ TypeScript 支持优秀

**使用场景**:
- 全局应用状态（用户信息、组织信息等）
- 需要时间旅行调试的状态
- 需要中间件的复杂状态管理

**示例代码**:
```typescript
// store/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  userInfo: UserInfo | null
  loginToken: string | null
  loading: boolean
}

const initialState: UserState = {
  userInfo: null,
  loginToken: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload
    },
    setLoginToken: (state, action: PayloadAction<string>) => {
      state.loginToken = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const { setUserInfo, setLoginToken, setLoading } = userSlice.actions
export default userSlice.reducer
```

---

#### 2.2 Zustand（推荐用于组件级状态）

**推荐版本**: **zustand 4.5+**

**选型理由**:
- ✅ 项目依赖中已有 zustand 4.5.6
- ✅ 轻量级，API 简洁
- ✅ 性能优秀，无需 Provider
- ✅ TypeScript 支持优秀
- ✅ 适合组件级状态管理

**使用场景**:
- 组件级状态管理
- 表单状态
- UI 状态（Modal、Drawer 等）
- 临时状态

**示例代码**:
```typescript
// stores/uiStore.ts
import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  currentModal: string | null
  toggleSidebar: () => void
  openModal: (modalId: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  currentModal: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modalId) => set({ currentModal: modalId }),
  closeModal: () => set({ currentModal: null }),
}))
```

---

#### 2.3 React Query（推荐用于服务端状态）

**推荐版本**: **@tanstack/react-query 5.0+**

**选型理由**:
- ✅ 专门处理服务端状态
- ✅ 内置缓存、重试、刷新机制
- ✅ 减少样板代码
- ✅ 性能优秀

**使用场景**:
- API 数据获取和缓存
- 服务端状态同步
- 数据预加载

**示例代码**:
```typescript
// hooks/useMessages.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { messageApi } from '@/api/message'

export const useMessages = (roomId: string) => {
  return useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => messageApi.getMessages(roomId),
    staleTime: 5 * 60 * 1000, // 5分钟
  })
}

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: messageApi.sendMessage,
    onSuccess: (data, variables) => {
      // 更新缓存
      queryClient.invalidateQueries({ queryKey: ['messages', variables.roomId] })
    },
  })
}
```

---

**状态管理方案总结**:

| 方案 | 使用场景 | 推荐度 |
|------|---------|--------|
| **Redux Toolkit** | 全局状态、复杂状态 | ⭐⭐⭐⭐⭐ |
| **Zustand** | 组件级状态、UI状态 | ⭐⭐⭐⭐⭐ |
| **React Query** | 服务端状态、API数据 | ⭐⭐⭐⭐⭐ |
| **Context API** | 简单状态、主题配置 | ⭐⭐⭐ |

---

### 3. 路由管理

#### 3.1 React Router

**推荐版本**: **react-router-dom 6.20+**

**选型理由**:
- ✅ 当前使用 React Router 5.1.2
- ✅ React Router 6 是官方推荐版本
- ✅ API 更简洁，性能更好
- ✅ 支持数据加载和错误处理
- ✅ TypeScript 支持优秀

**主要变化**:
```typescript
// React Router 5
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// React Router 6
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// v6 示例
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/workDesk" element={<WorkDesk />} />
    <Route path="/chat" element={<Chat />} />
  </Routes>
</BrowserRouter>
```

**迁移建议**:
- 逐步迁移，先迁移新页面
- 使用 `useNavigate` 替代 `useHistory`
- 使用 `element` 替代 `component`

---

### 4. UI 组件库

#### 4.1 Ant Design

**推荐版本**: **antd 5.12+**

**选型理由**:
- ✅ 当前使用 Ant Design 4.18.4
- ✅ Ant Design 5 性能更好，体积更小
- ✅ 设计系统完善
- ✅ TypeScript 支持优秀
- ✅ 组件丰富，文档完善

**主要变化**:
- CSS-in-JS（使用 emotion）
- 更好的 TypeScript 支持
- 性能优化
- 主题定制更灵活

**迁移建议**:
- 渐进式升级，先升级到 5.x
- 注意样式变化，可能需要调整
- 使用新的主题定制 API

---

### 5. HTTP 客户端

#### 5.1 Axios

**推荐版本**: **axios 1.6+**

**选型理由**:
- ✅ 当前项目使用 axios
- ✅ 功能完善，拦截器支持好
- ✅ 请求/响应拦截器
- ✅ 取消请求支持
- ✅ TypeScript 支持良好

**封装建议**:
```typescript
// api/request.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 30000,
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // 处理未授权
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
```

**替代方案**:
- ❌ Fetch API（功能不如 Axios 完善）
- ❌ Ky（轻量但功能有限）

---

### 6. WebSocket 客户端

#### 6.1 原生 WebSocket + ReconnectingWebSocket

**推荐方案**: **原生 WebSocket + reconnecting-websocket**

**选型理由**:
- ✅ 轻量级，无额外依赖
- ✅ 完全控制连接逻辑
- ✅ 支持自动重连
- ✅ 性能优秀

**封装示例**:
```typescript
// services/xmppClient.ts
import ReconnectingWebSocket from 'reconnecting-websocket'

class XMPPClient {
  private ws: ReconnectingWebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 10

  connect(url: string, protocols?: string[]) {
    this.ws = new ReconnectingWebSocket(url, protocols, {
      maxRetries: this.maxReconnectAttempts,
      connectionTimeout: 5000,
      maxReconnectionDelay: 10000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.3,
    })

    this.ws.addEventListener('open', this.handleOpen.bind(this))
    this.ws.addEventListener('message', this.handleMessage.bind(this))
    this.ws.addEventListener('error', this.handleError.bind(this))
    this.ws.addEventListener('close', this.handleClose.bind(this))
  }

  private handleOpen() {
    console.log('WebSocket connected')
    this.reconnectAttempts = 0
    this.startHeartbeat()
  }

  private handleMessage(event: MessageEvent) {
    const data = JSON.parse(event.data)
    // 处理消息
  }

  private handleError(error: Event) {
    console.error('WebSocket error:', error)
  }

  private handleClose() {
    console.log('WebSocket closed')
  }

  private startHeartbeat() {
    setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping' }))
      }
    }, 30000)
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  disconnect() {
    this.ws?.close()
  }
}

export const xmppClient = new XMPPClient()
```

**替代方案**:
- ❌ Socket.io（功能过多，不适合 XMPP）
- ❌ SockJS（需要服务端支持）

---

### 7. 数据存储

#### 7.1 Dexie.js（IndexedDB 封装）

**推荐版本**: **dexie 3.2+**

**选型理由**:
- ✅ IndexedDB 的最佳封装库
- ✅ API 简洁，类似 SQL
- ✅ TypeScript 支持优秀
- ✅ 支持事务和索引
- ✅ 性能优秀

**使用示例**:
```typescript
// db/holderDB.ts
import Dexie, { Table } from 'dexie'

interface Message {
  id?: number
  roomId: string
  content: string
  timestamp: number
  senderId: string
}

interface LoginInfo {
  account: string
  password: string
  loginTime: number
}

class HolderDB extends Dexie {
  messages!: Table<Message, number>
  loginInfo!: Table<LoginInfo, string>

  constructor() {
    super('HolderDB')
    
    this.version(1).stores({
      messages: '++id, roomId, timestamp, senderId',
      loginInfo: 'account, loginTime',
    })
  }
}

export const db = new HolderDB()

// 使用示例
// 查询消息
const messages = await db.messages
  .where('roomId')
  .equals(roomId)
  .sortBy('timestamp')

// 插入消息
await db.messages.add({
  roomId: 'room1',
  content: 'Hello',
  timestamp: Date.now(),
  senderId: 'user1',
})
```

**替代方案**:
- ❌ idb（API 较底层）
- ❌ localForage（功能有限）

---

### 8. 构建工具

#### 8.1 Vite（强烈推荐）

**推荐版本**: **vite 5.0+**

**选型理由**:
- ✅ 开发服务器启动极快（秒级）
- ✅ HMR 热更新速度快
- ✅ 生产构建使用 Rollup，性能优秀
- ✅ 配置简单，开箱即用
- ✅ 支持 TypeScript、Less 等
- ✅ 插件生态丰富

**配置示例**:
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    target: 'es2015',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'antd-vendor': ['antd'],
        },
      },
    },
  },
})
```

**替代方案**:
- ⚠️ Webpack 5（当前使用，但性能不如 Vite）
- ❌ Parcel（功能不如 Vite）

---

### 9. 样式方案

#### 9.1 Less + CSS Modules

**推荐方案**: **Less + CSS Modules**

**选型理由**:
- ✅ 当前项目使用 Less
- ✅ CSS Modules 提供作用域隔离
- ✅ 支持变量和嵌套
- ✅ TypeScript 支持良好

**使用示例**:
```typescript
// Component.module.less
.container {
  padding: 20px;
  
  .title {
    font-size: 18px;
    color: #333;
  }
}

// Component.tsx
import styles from './Component.module.less'

const Component = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Title</h1>
    </div>
  )
}
```

**替代方案**:
- ⚠️ Tailwind CSS（需要重构样式）
- ⚠️ Styled Components（CSS-in-JS）

---

### 10. 测试框架

#### 10.1 Vitest + React Testing Library

**推荐版本**: **vitest 1.0+ / @testing-library/react 14.0+**

**选型理由**:
- ✅ Vitest 与 Vite 集成好，速度快
- ✅ React Testing Library 是 React 测试标准
- ✅ TypeScript 支持优秀
- ✅ API 简洁

**配置示例**:
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
})
```

**替代方案**:
- ⚠️ Jest（当前使用，但速度较慢）

---

### 11. PWA 支持

#### 11.1 Vite PWA Plugin

**推荐版本**: **vite-plugin-pwa 0.17+**

**选型理由**:
- ✅ 与 Vite 集成好
- ✅ 自动生成 Service Worker
- ✅ 支持离线缓存
- ✅ 配置简单

**配置示例**:
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Holder PAAS',
        short_name: 'Holder',
        description: 'Holder PAAS Web Application',
        theme_color: '#1890ff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\./,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
            },
          },
        ],
      },
    }),
  ],
})
```

---

### 12. 其他工具库

#### 12.1 工具函数库

**推荐**: **lodash-es**（按需导入）

**选型理由**:
- ✅ 当前使用 lodash
- ✅ lodash-es 支持 Tree Shaking
- ✅ 功能丰富

**使用示例**:
```typescript
// 按需导入，支持 Tree Shaking
import { debounce, throttle } from 'lodash-es'
```

---

#### 12.2 时间处理

**推荐**: **dayjs**（替代 moment.js）

**选型理由**:
- ✅ 体积小（2KB vs moment.js 的 67KB）
- ✅ API 与 moment.js 兼容
- ✅ 性能更好

**迁移建议**:
```typescript
// moment.js
import moment from 'moment'
moment().format('YYYY-MM-DD')

// dayjs
import dayjs from 'dayjs'
dayjs().format('YYYY-MM-DD')
```

---

#### 12.3 表单处理

**推荐**: **React Hook Form**

**选型理由**:
- ✅ 性能优秀（非受控组件）
- ✅ 体积小
- ✅ TypeScript 支持优秀
- ✅ 验证库丰富

---

#### 12.4 虚拟列表

**推荐**: **@tanstack/react-virtual**

**选型理由**:
- ✅ 当前使用 react-window
- ✅ @tanstack/react-virtual 更现代
- ✅ 性能优秀
- ✅ API 更灵活

---

## 技术栈对比

### 当前技术栈 vs 推荐技术栈

| 技术分类 | 当前版本 | 推荐版本 | 迁移难度 |
|---------|---------|---------|---------|
| **React** | 16.13.1 | 18.2+ | 🟡 中等 |
| **TypeScript** | 4.9.5 | 5.0+ | 🟢 低 |
| **Redux** | 4.0.5 | Redux Toolkit 2.0+ | 🟡 中等 |
| **MobX** | 6.13.1 | 保持 / 迁移到 Zustand | 🟡 中等 |
| **React Router** | 5.1.2 | 6.20+ | 🟡 中等 |
| **Ant Design** | 4.18.4 | 5.12+ | 🟡 中等 |
| **Webpack** | 4.46.0 | Vite 5.0+ | 🟡 中等 |
| **Axios** | 0.24.0 | 1.6+ | 🟢 低 |
| **Moment.js** | 2.27.0 | dayjs 1.11+ | 🟢 低 |

---

## 迁移建议

### 阶段一：基础升级（第1-2周）

1. **升级 TypeScript** → 5.0+
2. **升级 Axios** → 1.6+
3. **替换 Moment.js** → dayjs
4. **升级构建工具** → Vite（可选，建议）

### 阶段二：框架升级（第3-4周）

1. **升级 React** → 18.2+
   - 先升级到 17.x，再升级到 18.x
   - 使用 `createRoot` API
   - 处理 Breaking Changes

2. **升级 React Router** → 6.20+
   - 逐步迁移路由配置
   - 使用新的 API

3. **升级 Ant Design** → 5.12+
   - 注意样式变化
   - 调整主题配置

### 阶段三：状态管理重构（第5-6周）

1. **迁移到 Redux Toolkit**
   - 逐步迁移 Redux 代码
   - 使用 `createSlice` 简化代码

2. **引入 Zustand**
   - 用于组件级状态
   - 逐步替换 MobX（可选）

3. **引入 React Query**
   - 用于服务端状态管理
   - 替换部分 Redux 代码

### 阶段四：新功能开发（第7周开始）

1. **IndexedDB 封装**
   - 使用 Dexie.js
   - 实现数据存储层

2. **WebSocket 客户端**
   - 封装 WebSocket
   - 实现重连机制

3. **PWA 支持**
   - 配置 Service Worker
   - 实现离线功能

---

## 示例代码

### 完整项目结构

```
holder-paas-web/
├── src/
│   ├── api/                 # API 接口
│   │   ├── request.ts       # Axios 封装
│   │   └── message.ts      # 消息 API
│   ├── components/          # 公共组件
│   ├── pages/               # 页面组件
│   ├── stores/              # 状态管理
│   │   ├── slices/         # Redux Toolkit slices
│   │   └── zustand/        # Zustand stores
│   ├── hooks/               # 自定义 Hooks
│   ├── db/                  # IndexedDB
│   │   └── holderDB.ts     # Dexie 数据库
│   ├── services/            # 服务层
│   │   └── xmppClient.ts   # XMPP 客户端
│   ├── utils/               # 工具函数
│   ├── styles/              # 全局样式
│   └── main.tsx             # 入口文件
├── public/                   # 静态资源
├── vite.config.ts           # Vite 配置
├── tsconfig.json            # TypeScript 配置
└── package.json             # 依赖配置
```

### package.json 示例

```json
{
  "name": "holder-paas-web",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "@reduxjs/toolkit": "^2.0.0",
    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.17.0",
    "antd": "^5.12.0",
    "axios": "^1.6.0",
    "dexie": "^3.2.4",
    "reconnecting-websocket": "^4.7.0",
    "dayjs": "^1.11.10",
    "lodash-es": "^4.17.21"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite-plugin-pwa": "^0.17.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0",
    "less": "^4.2.0"
  }
}
```

---

## 总结

### 推荐技术栈（最终版）

| 技术分类 | 推荐方案 | 版本 |
|---------|---------|------|
| **前端框架** | React | 18.2+ |
| **开发语言** | TypeScript | 5.0+ |
| **状态管理** | Redux Toolkit + Zustand + React Query | RTK 2.0+ / Zustand 4.5+ / RQ 5.0+ |
| **路由** | React Router | 6.20+ |
| **UI 组件库** | Ant Design | 5.12+ |
| **HTTP 客户端** | Axios | 1.6+ |
| **WebSocket** | 原生 WebSocket + ReconnectingWebSocket | - |
| **数据存储** | Dexie.js | 3.2+ |
| **构建工具** | Vite | 5.0+ |
| **样式方案** | Less + CSS Modules | - |
| **测试框架** | Vitest + React Testing Library | - |
| **PWA** | Vite PWA Plugin | 0.17+ |
| **工具库** | dayjs, lodash-es | - |

### 关键优势

1. ✅ **性能优秀**: Vite + React 18 + 代码分割
2. ✅ **开发体验好**: Vite HMR + TypeScript + 完善工具链
3. ✅ **状态管理灵活**: Redux Toolkit（全局）+ Zustand（组件）+ React Query（服务端）
4. ✅ **现代化**: 使用最新稳定版本，长期维护
5. ✅ **迁移成本可控**: 渐进式升级，降低风险

---

**文档结束**

