# 全新架构设计方案

> 分析日期：2026-03-11
> 当前技术栈：Electron 13.6 + React 16.13 + Webpack 4.46 + Redux 4.0
> 目标：评估当前架构合理性，输出全新架构设计

---

## 一、当前架构评估

### 1.1 现有架构全景图

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Electron Main Process                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ app-init │ │ windows  │ │ database │ │  update  │ │   ipc    │ │
│  │          │ │ manager  │ │ handler  │ │ (full +  │ │ forward  │ │
│  │ 单例锁   │ │ 多窗口   │ │ SQLite   │ │  incr.)  │ │ business │ │
│  │ 托盘     │ │ 管理     │ │ 操作     │ │          │ │ user-auth│ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│         ↕ IPC (ipcMain / ipcRenderer)                              │
├─────────────────────────────────────────────────────────────────────┤
│                    Renderer Process (单体)                          │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  index.tsx → app.tsx → AppRouter → 40+ Route Modules        │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  page-resource.ts: 50+ 动态 import 入口                     │   │
│  │  auto-routes.ts: require.context 扫描 views/**/routes.ts    │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  Redux Store (全局单一)                                      │   │
│  │  ├── 24 个 action 文件 (auto-reducer 自动加载)               │   │
│  │  ├── chat / task / approval / workplan / okr / special ...  │   │
│  │  └── 共享：用户信息 / 权限 / UI 状态                         │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │  UI 层                                                       │   │
│  │  ├── Ant Design 4.18 + Bootstrap 3.4 + PrimeReact 7.2      │   │
│  │  ├── echarts + bpmn-js + fullcalendar + handsontable        │   │
│  │  ├── quill + draft-js + react-summernote (3 套富文本)        │   │
│  │  ├── react-dnd + react-beautiful-dnd (2 套拖拽)             │   │
│  │  └── react-virtualized + react-window (2 套虚拟滚动)        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│         ↕ HTTP / WebSocket                                         │
├─────────────────────────────────────────────────────────────────────┤
│                       Backend Services                              │
│  Keycloak SSO + REST API + WebSocket                               │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 架构问题诊断

#### 问题 1：技术栈严重老化（风险等级：极高）

| 组件 | 当前版本 | 最新稳定版 | 落后程度 | 影响 |
|------|---------|-----------|---------|------|
| Electron | 13.6.9 (2021) | 34.x (2026) | 落后 21 个大版本 | 安全漏洞、Chromium 内核过旧、新 API 不可用 |
| React | 16.13 (2020) | 19.x (2025) | 落后 3 个大版本 | 缺少 Concurrent Mode、Suspense、Server Components |
| Webpack | 4.46 (2021) | 5.x (成熟) | 落后 1 个大版本 | 缺少 Module Federation、持久缓存、Tree Shaking 增强 |
| react-router | 5.x (2019) | 7.x (2025) | 落后 2 个大版本 | 缺少数据路由、类型安全路由 |
| antd | 4.18 (2022) | 5.x (2024) | 落后 1 个大版本 | 依赖 moment.js、缺少 CSS-in-JS 优化 |
| Redux | 4.0 (2018) | 5.x + RTK 2.x | 落后 1 代 | 缺少 RTK、缺少 RTK Query 等现代特性 |
| Node.js (Electron 内置) | 14.x | 22.x LTS | 落后 4 个 LTS | 性能、安全、API 支持 |

#### 问题 2：单体渲染进程架构（风险等级：高）

- 40+ 模块编译为同一 renderer，代码量约 1,800+ 文件
- 开发时需 6GB 内存配额，编译速度慢
- 全局 Redux store 包含所有模块状态，单个模块无法独立运行
- 模块间隐式耦合难以察觉（通过全局 `$store`、`$tools`、`$api` 等全局变量）

#### 问题 3：UI 框架混用（风险等级：高）

| 类别 | 同时存在的库 | 问题 |
|------|------------|------|
| UI 组件库 | Ant Design + Bootstrap + PrimeReact + @holder-design/ui | 4 套 UI 体系，样式冲突、包体积膨胀 |
| 富文本编辑器 | quill + draft-js + react-summernote | 3 套编辑器，功能重叠 |
| 拖拽 | react-dnd + react-beautiful-dnd + @dnd-kit（未使用） | 3 套拖拽方案 |
| 虚拟滚动 | react-virtualized + react-window + react-virtuoso（未使用） | 3 套虚拟滚动 |
| 日期处理 | moment.js（224 文件引用）| 体积大、已停止维护 |

#### 问题 4：全局变量滥用（风险等级：中高）

```typescript
// 通过 DefinePlugin 注入的全局变量（build/webpack.config.base.ts）
$mainApi    // 主进程 API
$api        // 渲染进程 API
$store      // Redux store
$tools      // 工具函数集
$configs    // 配置
```

这些全局变量使得：
- 模块无法独立测试（依赖运行时全局环境）
- TypeScript 类型检查不完整（通过 `declare global` 声明）
- 模块间耦合隐蔽（任何代码都可随时访问全局状态）

#### 问题 5：状态管理混乱（风险等级：中）

- 主要用 Redux（24 个 action 文件，auto-reducer 自动加载）
- 部分模块用 Zustand（okr/taskLookBoard/kpi）
- 极少量用 MobX（camera-scanner）
- 部分用普通 TS 模块存状态（workDeskStore.ts）
- 中控窗口通过 IPC 分发 Redux action

### 1.3 当前架构合理性总结

| 维度 | 评分 (1-10) | 评语 |
|------|------------|------|
| 可维护性 | 3/10 | 单体庞大，技术栈老化，新人上手困难 |
| 可扩展性 | 3/10 | 新模块只能往单体里塞，构建越来越慢 |
| 性能 | 4/10 | 内存占用高，缺少现代优化手段 |
| 可测试性 | 2/10 | 全局变量依赖导致单元测试极其困难 |
| 安全性 | 3/10 | Electron 13 已停止安全更新，Chromium 内核漏洞未修复 |
| 开发效率 | 4/10 | 编译慢、热更新慢、调试困难 |
| 技术债务 | 2/10 | 大量过时依赖、重复库、废弃代码 |

**总体评估：当前架构已不适合继续大规模迭代，需要进行系统性重构。**

---

## 二、全新架构设计

### 2.1 架构设计目标

| 目标 | 具体指标 |
|------|---------|
| 模块化 | 功能模块可独立开发、构建、部署、测试 |
| 高性能 | 主进程内存 < 200MB，模块加载 < 500ms |
| 可维护 | 单模块文件数 < 100，职责清晰 |
| 可测试 | 核心逻辑单元测试覆盖率 > 60% |
| 安全 | 使用受支持的 Electron 版本，开启上下文隔离 |
| 开发效率 | 热更新 < 1s，全量构建 < 3min |

### 2.2 新架构全景图

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                           Electron Main Process                                 │
│                           (Electron 30+ / Node 20+)                            │
│                                                                                 │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────┐  │
│  │  App Core   │  │  Window      │  │  Shared      │  │  Native Modules     │  │
│  │             │  │  Manager     │  │  State Hub   │  │                     │  │
│  │ • 生命周期   │  │ • 窗口池     │  │ • 用户信息    │  │ • SQLite (Drizzle)  │  │
│  │ • 单例锁    │  │ • 预加载     │  │ • 权限数据    │  │ • Auto Update       │  │
│  │ • 托盘      │  │ • 回收策略   │  │ • 全局配置    │  │ • USB               │  │
│  │ • 配置      │  │ • 多显示器   │  │ • 通知计数    │  │ • 截图              │  │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  └──────────┬──────────┘  │
│         │                │                  │                     │              │
│  ┌──────┴──────────────┬─┴──────────────────┴─────────────────────┴──────────┐  │
│  │                     IPC Hub (类型安全、双向通讯)                            │  │
│  │  • electron-trpc / typed-ipc                                              │  │
│  │  • 请求-响应 / 事件订阅 / 状态同步 三种模式                                 │  │
│  └──────┬────────────────────────────────┬───────────────────────────────────┘  │
│         │                                │                                      │
├─────────┼────────────────────────────────┼──────────────────────────────────────┤
│         ▼                                ▼                                      │
│  ┌─────────────────────┐  ┌──────────────────────────────────────────────────┐  │
│  │   Shell Window      │  │           Module Windows (按需创建)               │  │
│  │   (主窗口/壳)       │  │                                                  │  │
│  │                     │  │  ┌──────────┐ ┌──────────┐ ┌──────────┐         │  │
│  │  ┌───────────────┐  │  │  │ 专项模块  │ │ 绩效模块  │ │ OKR模块  │  ...   │  │
│  │  │ Navigation    │  │  │  │          │ │          │ │          │         │  │
│  │  │ (侧边栏+顶栏)  │  │  │  │ 独立入口  │ │ 独立入口  │ │ 独立入口  │         │  │
│  │  ├───────────────┤  │  │  │ 独立状态  │ │ 独立状态  │ │ 独立状态  │         │  │
│  │  │ Core Modules  │  │  │  │ 独立构建  │ │ 独立构建  │ │ 独立构建  │         │  │
│  │  │ • 登录        │  │  │  └──────────┘ └──────────┘ └──────────┘         │  │
│  │  │ • 工作台      │  │  │                                                  │  │
│  │  │ • 聊天沟通    │  │  │  技术选型：                                       │  │
│  │  │ • 任务管理    │  │  │  • React 19 + TypeScript 5.5                     │  │
│  │  │ • 审批        │  │  │  • Zustand / Jotai（模块级状态）                  │  │
│  │  │ • 通知/公告   │  │  │  • TanStack Query（服务端状态）                   │  │
│  │  ├───────────────┤  │  │  • Ant Design 5.x                                │  │
│  │  │ Shared Deps   │  │  │  • Vite 6.x（独立构建）                          │  │
│  │  │ (Module Fed.) │  │  │                                                  │  │
│  │  └───────────────┘  │  └──────────────────────────────────────────────────┘  │
│  └─────────────────────┘                                                        │
│                                                                                 │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                        Shared Layer (共享层)                              │   │
│  │                                                                          │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │   │
│  │  │ @holder/ui   │  │ @holder/api  │  │ @holder/     │  │ @holder/    │  │   │
│  │  │              │  │              │  │ shared-types │  │ ipc-bridge  │  │   │
│  │  │ 统一UI组件库  │  │ API客户端    │  │ 共享类型定义  │  │ IPC通讯SDK  │  │   │
│  │  │ • 基础组件   │  │ • REST       │  │ • 实体类型   │  │ • 类型安全  │  │   │
│  │  │ • 业务组件   │  │ • WebSocket  │  │ • API 类型   │  │ • 事件总线  │  │   │
│  │  │ • 主题系统   │  │ • 拦截器     │  │ • 枚举常量   │  │ • 状态同步  │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └─────────────┘  │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
│                                                                                 │
│         ↕ HTTP / WebSocket                                                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│                           Backend Services                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  API Gateway  │  │  Auth (SSO)  │  │  WebSocket   │  │  Microservices   │   │
│  │  (REST)       │  │  Keycloak    │  │  Server      │  │  (业务服务)       │   │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘   │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 分层架构详解

#### 层级 1：Electron Main Process（主进程层）

```
app/
└── electron/
    ├── main.ts                      # 主进程入口
    ├── core/
    │   ├── app-lifecycle.ts         # 应用生命周期管理
    │   ├── single-instance.ts       # 单例锁
    │   └── config.ts                # 应用配置
    ├── windows/
    │   ├── window-manager.ts        # 窗口生命周期管理
    │   ├── window-pool.ts           # 窗口池（预创建隐藏窗口）
    │   └── window-config.ts         # 窗口配置定义
    ├── ipc/
    │   ├── ipc-hub.ts               # IPC 总线（类型安全）
    │   ├── shared-state.ts          # 共享状态中心
    │   └── handlers/                # 按领域分类的 IPC 处理器
    │       ├── auth.handler.ts
    │       ├── database.handler.ts
    │       ├── update.handler.ts
    │       └── system.handler.ts
    ├── database/
    │   ├── client.ts                # SQLite 连接
    │   ├── schema.ts                # Drizzle ORM Schema
    │   └── migrations/              # 数据库迁移
    ├── native/
    │   ├── auto-update.ts           # 自动更新
    │   ├── tray.ts                  # 系统托盘
    │   └── screenshot.ts            # 截图
    └── preload/
        ├── main-preload.ts          # 主窗口 preload
        └── module-preload.ts        # 独立模块 preload
```

**关键改进**：
- 开启 `contextIsolation: true`，通过 preload 暴露安全 API
- 使用 `electron-trpc` 实现类型安全的 IPC 通讯
- 窗口池化：预创建 2-3 个隐藏窗口，模块打开时直接复用，减少创建延迟

#### 层级 2：Shell Window（壳窗口/主窗口层）

```
packages/
└── shell/
    ├── src/
    │   ├── index.tsx                # 壳应用入口
    │   ├── app.tsx                  # 根组件
    │   ├── router/
    │   │   ├── index.tsx            # 路由配置（仅核心模块）
    │   │   └── module-loader.tsx    # 独立模块加载器
    │   ├── layout/
    │   │   ├── app-layout.tsx       # 主布局
    │   │   ├── sidebar/             # 侧边栏
    │   │   └── header/              # 顶部栏
    │   ├── modules/                 # 内嵌核心模块
    │   │   ├── login/
    │   │   ├── workdesk/
    │   │   ├── chat/
    │   │   ├── task/
    │   │   ├── approval/
    │   │   ├── notification/
    │   │   └── settings/
    │   ├── store/                   # 壳应用状态
    │   │   ├── user.store.ts        # Zustand
    │   │   ├── ui.store.ts
    │   │   └── notification.store.ts
    │   └── hooks/
    │       ├── use-ipc.ts           # IPC 通讯 Hook
    │       ├── use-shared-state.ts  # 共享状态 Hook
    │       └── use-module.ts        # 模块管理 Hook
    ├── vite.config.ts               # Vite 构建配置
    └── package.json
```

**核心职责**：
- 提供应用外壳（侧边栏 + 顶栏 + 内容区）
- 内嵌高频核心模块（登录、工作台、聊天、任务、审批等）
- 管理独立模块窗口的打开/关闭/通讯
- 维护全局 UI 状态和用户状态

#### 层级 3：Independent Modules（独立模块层）

```
packages/
└── modules/
    ├── special-project/             # 专项管理
    │   ├── src/
    │   │   ├── index.tsx            # 模块入口
    │   │   ├── app.tsx              # 模块根组件
    │   │   ├── router/              # 模块内路由
    │   │   ├── pages/               # 页面组件
    │   │   │   ├── project-list/
    │   │   │   ├── gantt/
    │   │   │   ├── workflow/
    │   │   │   └── members/
    │   │   ├── components/          # 模块私有组件
    │   │   ├── store/               # 模块级状态 (Zustand)
    │   │   ├── api/                 # 模块 API 调用
    │   │   └── types/               # 模块类型定义
    │   ├── vite.config.ts
    │   └── package.json
    │
    ├── performance/                 # 绩效管理
    │   └── (同上结构)
    │
    ├── okr/                         # OKR 目标管理
    │   └── (同上结构)
    │
    ├── plan/                        # 规划脑图
    │   └── (同上结构)
    │
    ├── file-manage/                 # 档案管理
    │   └── (同上结构)
    │
    ├── kpi/                         # 指标管理
    │   └── (同上结构)
    │
    └── normal-task/                 # 常规任务(BPMN)
        └── (同上结构)
```

#### 层级 4：Shared Layer（共享层）

```
packages/
└── shared/
    ├── ui/                          # @holder/ui - 统一组件库
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── button/
    │   │   │   ├── modal/
    │   │   │   ├── table/
    │   │   │   ├── form/
    │   │   │   ├── upload/
    │   │   │   ├── select-member/
    │   │   │   ├── rich-editor/     # 统一富文本编辑器（替代3套）
    │   │   │   ├── virtual-list/    # 统一虚拟列表（替代3套）
    │   │   │   └── dnd/             # 统一拖拽方案（替代3套）
    │   │   ├── theme/               # 主题系统
    │   │   └── hooks/               # 通用 Hooks
    │   └── package.json
    │
    ├── api/                         # @holder/api - API 客户端
    │   ├── src/
    │   │   ├── client.ts            # HTTP 客户端 (Axios/ky)
    │   │   ├── ws-client.ts         # WebSocket 客户端
    │   │   ├── interceptors/        # 请求/响应拦截器
    │   │   └── modules/             # 按业务域分类的 API
    │   │       ├── auth.api.ts
    │   │       ├── task.api.ts
    │   │       ├── approval.api.ts
    │   │       └── ...
    │   └── package.json
    │
    ├── types/                       # @holder/shared-types
    │   ├── src/
    │   │   ├── entities/            # 业务实体类型
    │   │   │   ├── user.ts
    │   │   │   ├── task.ts
    │   │   │   ├── approval.ts
    │   │   │   └── ...
    │   │   ├── api/                 # API 请求/响应类型
    │   │   ├── ipc/                 # IPC 消息类型
    │   │   └── enums/               # 枚举常量
    │   └── package.json
    │
    └── ipc-bridge/                  # @holder/ipc-bridge
        ├── src/
        │   ├── bridge.ts            # IPC 通讯桥
        │   ├── shared-state.ts      # 共享状态订阅
        │   └── events.ts            # 事件定义
        └── package.json
```

---

## 三、技术选型方案

### 3.1 核心技术栈升级

| 类别 | 当前 | 目标 | 升级理由 |
|------|------|------|---------|
| **Runtime** | Electron 13.6 | **Electron 33+** | 安全更新、Chromium 130+、Node 20+、上下文隔离 |
| **Framework** | React 16.13 | **React 19** | Concurrent Mode、Suspense、自动批处理、RSC |
| **Build** | Webpack 4.46 | **Vite 6.x** | 开发启动 <1s、HMR <100ms、ESBuild/Rolldown |
| **Language** | TypeScript 4.x | **TypeScript 5.5+** | 装饰器、satisfies、const 类型参数 |
| **Router** | react-router 5 | **TanStack Router** 或 **react-router 7** | 类型安全路由、数据加载 |
| **State** | Redux 4 + Zustand + MobX | **Zustand 5** (模块) + **Jotai** (原子) | 统一方案、轻量、类型安全 |
| **Server State** | 手动 fetch + Redux | **TanStack Query 5** | 缓存、重试、乐观更新、请求去重 |
| **UI** | antd 4 + Bootstrap + PrimeReact | **Ant Design 5.x** (统一) | CSS-in-JS、dayjs、主题定制 |
| **Date** | moment.js | **dayjs** (antd 5 内置) | 体积减少 95%、不可变 |
| **Utility** | lodash (全量) | **es-toolkit** 或 lodash-es | 原生替代 + ESM tree-shaking |
| **Rich Editor** | quill + draft-js + summernote | **TipTap 2** (统一) | 现代架构、可扩展、协同编辑支持 |
| **DnD** | react-dnd + react-beautiful-dnd | **@dnd-kit** (统一) | 维护活跃、可访问性、性能好 |
| **Virtual List** | react-virtualized + react-window | **TanStack Virtual** (统一) | 框架无关、功能全面 |
| **Chart** | echarts 4 | **echarts 5** | 包体积优化、暗色主题、无障碍 |
| **ORM** | better-sqlite3 (原始 SQL) | better-sqlite3 + **Drizzle ORM** | 类型安全、迁移管理、查询构建器 |
| **Monorepo** | 单仓单包 | **pnpm Workspace** + **Turborepo** | 依赖共享、并行构建、增量构建 |
| **Test** | Jest (极少) | **Vitest** + **Testing Library** | 与 Vite 集成、速度快 |
| **Lint** | ESLint | **Biome** 或 ESLint 9 flat config | 速度提升 10x、统一格式化 |
| **Icons** | antd-icons + remixicon + 1050 SVG/PNG + iconfont | **Lucide React** (统一) | 体积减少 92%、风格统一、按需引入 |
| **CSS 方案** | Less 全局样式 + 3 套 UI 框架 | **CSS Modules** + **CSS Variables** (Token) | 消除全局污染、支持主题切换 |
| **Design Token** | 无（颜色硬编码） | **CSS Custom Properties** 三层 Token | 颜色/字号/间距/圆角统一管理 |

### 3.2 Monorepo 项目结构

```
holder-paas-pc/
├── apps/
│   ├── electron/                    # Electron 主进程
│   │   ├── src/
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── shell/                       # 壳应用（主窗口渲染进程）
│       ├── src/
│       ├── vite.config.ts
│       └── package.json
│
├── packages/
│   ├── modules/                     # 独立功能模块
│   │   ├── special-project/
│   │   ├── performance/
│   │   ├── okr/
│   │   ├── plan/
│   │   ├── file-manage/
│   │   ├── kpi/
│   │   └── normal-task/
│   ├── shared/                      # 共享包
│   │   ├── ui/                      # @holder/ui
│   │   ├── api/                     # @holder/api
│   │   ├── types/                   # @holder/shared-types
│   │   └── ipc-bridge/              # @holder/ipc-bridge
│   └── tools/                       # 工具包
│       ├── build-utils/             # 构建工具
│       └── testing-utils/           # 测试工具
│
├── pnpm-workspace.yaml              # Monorepo 配置
├── turbo.json                       # Turborepo 构建编排
├── biome.json                       # 代码风格
├── tsconfig.base.json               # 共享 TS 配置
└── package.json
```

### 3.3 IPC 通讯架构（类型安全）

```typescript
// packages/shared/types/src/ipc/ipc-contract.ts

/** IPC 通讯契约，主进程和渲染进程共享同一份类型定义 */
export interface IIpcContract {
  // 认证相关
  'auth:login': { input: ILoginParams; output: IUserInfo }
  'auth:logout': { input: void; output: void }
  'auth:getToken': { input: void; output: string }

  // 窗口管理
  'window:open': { input: IOpenWindowParams; output: void }
  'window:close': { input: { windowId: string }; output: void }
  'window:minimize': { input: void; output: void }

  // 数据库操作
  'db:query': { input: { sql: string; params: unknown[] }; output: unknown[] }
  'db:chatHistory': { input: { roomId: string; page: number }; output: IChatMessage[] }

  // 共享状态
  'state:get': { input: { key: string }; output: unknown }
  'state:set': { input: { key: string; value: unknown }; output: void }
  'state:subscribe': { input: { key: string }; output: void }

  // 系统
  'system:screenshot': { input: void; output: string }
  'system:notification': { input: INotificationParams; output: void }
}

// preload.ts 中暴露类型安全的 API
contextBridge.exposeInMainWorld('electronAPI', {
  invoke: <K extends keyof IIpcContract>(
    channel: K,
    data: IIpcContract[K]['input']
  ): Promise<IIpcContract[K]['output']> => {
    return ipcRenderer.invoke(channel, data)
  },
  on: <K extends keyof IIpcContract>(
    channel: K,
    handler: (data: IIpcContract[K]['output']) => void
  ): void => {
    ipcRenderer.on(channel, (_, data) => handler(data))
  },
})
```

### 3.4 状态管理新架构

```
┌─────────────────────────────────────────────────────────────┐
│                     状态管理分层架构                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: Shared State（跨窗口/跨模块）                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  主进程 SharedStateHub                               │    │
│  │  • 用户信息 / Token                                  │    │
│  │  • 权限数据                                          │    │
│  │  • 全局配置（主题/语言）                              │    │
│  │  • 通知计数                                          │    │
│  │  同步方式：IPC 事件广播 + 渲染进程本地缓存             │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Layer 2: Server State（服务端数据）                         │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  TanStack Query                                      │    │
│  │  • 任务列表 / 审批列表 / OKR 列表 ...                │    │
│  │  • 自动缓存 + 自动失效 + 后台刷新                     │    │
│  │  • 乐观更新 + 重试策略                                │    │
│  │  每个模块独立 QueryClient（进程隔离）                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Layer 3: Client State（模块级 UI 状态）                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Zustand（模块级 Store）                              │    │
│  │  • 表单临时数据                                      │    │
│  │  • 筛选/排序/分页状态                                 │    │
│  │  • UI 展开/折叠状态                                   │    │
│  │  模块卸载时自动清理                                   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Layer 4: Component State（组件级）                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  React useState / useReducer                         │    │
│  │  • 输入框值                                          │    │
│  │  • 弹窗开关                                          │    │
│  │  • 动画状态                                          │    │
│  │  最小化状态范围                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 四、构建与开发体验架构

### 4.1 Vite + Turborepo 构建体系

```
turbo.json:
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {}
  }
}

构建流程：
  pnpm build
    ├── @holder/shared-types     ──┐
    ├── @holder/ipc-bridge       ──┤ 并行构建（无依赖）
    ├── @holder/api              ──┘
    │                               │
    ├── @holder/ui               ←──┘ 依赖 shared-types
    │                               │
    ├── apps/shell               ←──┤ 依赖 ui + api + types
    ├── packages/modules/*       ←──┤ 依赖 ui + api + types
    │                               │
    └── apps/electron            ←──┘ 最后构建主进程

预期构建时间：
  当前全量构建：3-5 分钟
  新架构全量构建：1.5-2.5 分钟（Vite + 并行）
  增量构建：10-30 秒（仅改动模块）
```

### 4.2 开发体验对比

| 维度 | 当前 | 新架构 |
|------|------|--------|
| 开发启动 | 30-60s（Webpack 全量编译） | 1-3s（Vite 按需编译） |
| HMR 速度 | 2-8s | < 200ms |
| 内存占用（开发） | 6GB heap limit | 2-3GB（分模块开发） |
| 单模块开发 | 不支持（必须启动全量） | 支持独立启动任意模块 |
| TypeScript 检查 | 慢（全量） | 快（增量 + project references） |
| 测试执行 | 慢（Jest） | 快（Vitest，复用 Vite transform） |

---

## 五、迁移路线图

### 5.1 迁移策略：渐进式迁移（Strangler Fig Pattern）

```
Phase 1 (Month 1-2): 基础设施 + 新壳
  ┌──────────────────────────────────┐
  │  新 Shell (Vite + React 19)      │
  │  ├── 侧边栏                      │
  │  ├── 登录（新写）                 │
  │  └── iframe 加载旧 renderer      │──→ 旧 renderer (Webpack 4)
  └──────────────────────────────────┘     │ 所有旧模块仍在这里

Phase 2 (Month 3-4): 逐步迁移核心模块
  ┌──────────────────────────────────┐
  │  Shell                           │
  │  ├── 工作台（新写/迁移）          │
  │  ├── 聊天（新写/迁移）            │
  │  ├── 任务（新写/迁移）            │
  │  └── iframe 加载旧模块            │──→ 旧 renderer（模块减少中）
  └──────────────────────────────────┘

Phase 3 (Month 5-6): 拆分独立模块
  ┌──────────────────────────────────┐
  │  Shell（核心模块已迁移完成）       │
  │  ├── 工作台 / 聊天 / 任务 / 审批  │
  │  └── 通知 / 公告 / 通讯录         │
  └──────────────────────────────────┘
  独立模块窗口：
  ├── specialProject (新架构)
  ├── performance (新架构)
  ├── okr (新架构)
  └── ... (逐步迁移)

Phase 4 (Month 7-8): 清理旧代码 + 优化
  • 移除旧 Webpack 配置
  • 移除旧 Redux store
  • 移除 moment.js / Bootstrap / PrimeReact 等旧依赖
  • 性能调优 + 监控体系建设
```

### 5.2 详细阶段计划

#### Phase 1：基础设施建设（第 1-2 月）

| 周次 | 任务 | 产出 | 人力 |
|------|------|------|------|
| W1-W2 | Monorepo 搭建 + pnpm workspace + Turborepo 配置 | 基础项目结构可运行 | 1 人 |
| W2-W3 | @holder/shared-types 提取（从现有 typescript/ 目录迁移） | 共享类型包 | 1 人 |
| W3-W4 | @holder/ipc-bridge 开发（类型安全 IPC 通讯） | IPC SDK | 1 人 |
| W4-W5 | @holder/api 客户端封装（从现有 core/api 迁移） | API 客户端包 | 1 人 |
| W5-W6 | @holder/ui 基础组件库搭建 + 主题系统 | UI 组件库骨架 | 1-2 人 |
| W6-W7 | Electron 主进程升级（13 → 33+，开启 contextIsolation） | 新主进程 | 1 人 |
| W7-W8 | Shell 壳应用 + Vite 配置 + 旧模块 iframe 兼容层 | 新壳可加载旧模块 | 1-2 人 |

**阶段里程碑**：新壳应用启动，通过 iframe/webview 加载旧渲染进程，功能完全兼容。

#### Phase 2：核心模块迁移（第 3-4 月）

| 模块 | 迁移策略 | 工作量 | 说明 |
|------|---------|--------|------|
| 登录 | 重写 | 3 天 | 页面简单，适合作为第一个迁移模块验证流程 |
| 工作台 | 重写 | 5-7 天 | 主页面入口，需迁移各 Widget 组件 |
| 通知/公告 | 重写 | 3 天 | 相对独立，页面简单 |
| 聊天沟通 | 迁移+重构 | 7-10 天 | 核心模块，WebSocket 逻辑需仔细处理 |
| 任务管理 | 迁移+重构 | 7-10 天 | 与多模块有数据交互，需设计好 API |
| 审批 | 迁移 | 5-7 天 | 与其他模块联动多 |

**阶段里程碑**：6 个核心模块在新架构中运行，旧 iframe 中剩余模块数量降至 50% 以下。

#### Phase 3：独立模块拆分（第 5-6 月）

按优先级迁移独立模块为独立窗口：

| 模块 | 工作量 | 备注 |
|------|--------|------|
| specialProject（专项） | 10-15 天 | 最大模块，需要子域拆分 |
| performance（绩效） | 7-10 天 | 注意与专项的接口依赖 |
| okr（OKR） | 5-7 天 | 已用 Zustand，迁移成本低 |
| plan（规划脑图） | 5-7 天 | mind-map 引擎需适配 |
| file-manage（档案管理） | 5-7 天 | 图片扫描引擎需适配 |
| kpi（指标） | 3-5 天 | 已用 Zustand |
| normal-task（常规任务） | 5-7 天 | bpmn-js 需适配 |

#### Phase 4：清理与优化（第 7-8 月）

| 任务 | 工作量 |
|------|--------|
| 移除 Webpack 4 配置 | 2 天 |
| 移除 Redux（替换为 Zustand + TanStack Query） | 5-7 天 |
| 移除 Bootstrap / PrimeReact / jQuery | 3-5 天 |
| 统一富文本编辑器为 TipTap | 5-7 天 |
| 统一拖拽方案为 @dnd-kit | 3-5 天 |
| 统一虚拟列表为 TanStack Virtual | 2-3 天 |
| moment.js → dayjs（antd 5 自动完成大部分） | 3-5 天 |
| lodash → es-toolkit/原生替代 | 5-7 天 |
| 性能监控 Dashboard 建设 | 3-5 天 |
| E2E 测试体系 | 5-7 天 |

---

## 六、新旧架构对比

| 维度 | 当前架构 | 新架构 | 提升 |
|------|---------|--------|------|
| **Electron** | 13.6 (2021, EOL) | 33+ (安全更新中) | 安全性 ★★★★★ |
| **渲染框架** | React 16 (Class 为主) | React 19 (Hooks + Concurrent) | 性能 ★★★★☆ |
| **构建工具** | Webpack 4 (30-60s 启动) | Vite 6 (<1s 启动) | 开发效率 ★★★★★ |
| **代码组织** | 单体 (1,800+ 文件) | Monorepo (模块独立) | 可维护性 ★★★★★ |
| **状态管理** | Redux 全局单 store | 分层 (Zustand + Query) | 可维护性 ★★★★☆ |
| **UI 框架** | 4 套混用 | Ant Design 5 统一 | 一致性 ★★★★★ |
| **类型安全** | 弱 (全局变量 + any) | 强 (端到端类型安全) | 可靠性 ★★★★★ |
| **可测试性** | 极差 (全局依赖) | 好 (DI + 模块隔离) | 质量 ★★★★☆ |
| **模块隔离** | 无 (共享进程) | 进程级隔离 | 稳定性 ★★★★★ |
| **包体积** | 大 (重复依赖多) | 精简 (统一 + tree-shake) | 性能 ★★★★☆ |
| **安全性** | 低 (无上下文隔离) | 高 (contextIsolation) | 安全性 ★★★★★ |

---

## 七、风险评估与应对

| 风险 | 概率 | 影响 | 应对策略 |
|------|------|------|---------|
| 迁移周期过长，业务等不及 | 高 | 高 | 渐进式迁移 + iframe 兼容层，新旧并存不影响功能 |
| Electron 大版本升级 Breaking Changes | 中 | 高 | 先升级到 LTS 版本，逐步适配 API 变更；利用 electron-compat 兼容层 |
| React 16 → 19 组件不兼容 | 中 | 中 | 独立模块直接用 React 19 新写，核心模块渐进迁移 |
| 团队技术栈学习成本 | 中 | 中 | 提前培训 Vite/Zustand/TanStack Query；文档先行 |
| 新旧架构并存期间维护成本翻倍 | 高 | 中 | 严格限制旧模块新增功能，新功能只在新架构中开发 |
| 性能回归 | 低 | 高 | 建立性能基准线，每次迁移前后对比内存/启动时间/FPS |
| 用户习惯变化（多窗口 vs 单窗口） | 低 | 低 | 模块窗口可内嵌也可独立，由用户自行选择 |

---

## 八、投入产出总结

### 总投入预估

| 阶段 | 时间 | 人力 | 说明 |
|------|------|------|------|
| Phase 1: 基础设施 | 2 个月 | 2-3 人 | Monorepo + 共享包 + 新壳 |
| Phase 2: 核心迁移 | 2 个月 | 3-4 人 | 6 个核心模块迁移 |
| Phase 3: 模块拆分 | 2 个月 | 2-3 人 | 7 个独立模块迁移 |
| Phase 4: 清理优化 | 2 个月 | 2-3 人 | 旧代码清理 + 监控 |
| **总计** | **~8 个月** | **2-4 人** | **渐进式，不停止业务开发** |

### 预期长期收益

| 维度 | 量化收益 |
|------|---------|
| 开发效率 | 开发启动 30x 提速、HMR 20x 提速、构建 2x 提速 |
| 运行性能 | 主进程内存降低 50-60%、模块加载提速 30% |
| 维护成本 | 新人上手时间缩短 50%、Bug 定位速度提升 60% |
| 安全性 | 消除已知 CVE 漏洞、开启现代安全策略 |
| 包体积 | 减少 30-40%（统一依赖 + tree-shaking） |
| 可扩展性 | 新模块可独立开发部署，不影响现有功能 |
| 团队协作 | 多人并行开发不同模块，代码冲突减少 70% |

### 是否推荐全新架构重构？

| 场景 | 建议 |
|------|------|
| 产品还将持续迭代 2 年以上 | **强烈推荐** — 技术债务已到临界点，越拖成本越高 |
| 有 2-4 人可投入半年以上 | **推荐** — 渐进式迁移方案可保障业务不中断 |
| 只有 1 人维护且业务压力大 | **暂缓** — 优先执行构建优化方案（T-01 ~ T-09），获取即时收益 |
| 计划 1 年内产品下线 | **不推荐** — 投入无法回收 |

---

## 九、方案对比（微前端拆分 vs 全新架构）

| 维度 | 方案一：微前端拆分 | 方案二：全新架构 |
|------|------------------|----------------|
| 投入周期 | 2-3 个月 | 6-8 个月 |
| 人力需求 | 1-2 人 | 2-4 人 |
| 风险等级 | 中（架构不变，仅拆分） | 中高（全面升级） |
| 内存优化 | 40-50% | 50-60% |
| 开发体验提升 | 中（编译范围缩小） | 极大（Vite + 模块化） |
| 技术债清理 | 不清理（保留旧栈） | 彻底清理 |
| 长期维护成本 | 降低 20-30% | 降低 60-70% |
| 适用场景 | 短期见效，过渡方案 | 长期投资，根本性解决 |

**建议策略**：先执行方案一（微前端拆分）快速获取性能收益，同时启动方案二的基础设施建设（Phase 1），两者并行推进。方案一的拆分成果可直接作为方案二中独立模块的输入，不会产生浪费。

---

## 十、样式体系与图标统一方案

### 10.1 当前样式与图标问题全景

#### 图标生态现状（5 套方案并存）

```
当前图标资源分布：

📦 @ant-design/icons          → ~160+ 个文件引用
   引用方式: import { XxxOutlined } from '@ant-design/icons'
   问题: antd 4 全量打包 ~60KB gzip，无法有效 tree-shake

📦 remixicon (v2.3.0)         → 全局 CSS 引入
   引用方式: className="ri-xxx-line"
   入口: styles/index.less → @import '~remixicon/fonts/remixicon.css'
   问题: 全量字体文件 ~200KB，实际使用率 <10%

📂 assets/images/ (1,050+ 文件) → CSS background-image 引用
   格式: SVG (~700+) + PNG (~350+)
   引用方式: background-image: url(.../icon.svg)
   问题: 大量 normal/hover 成对图标、命名不规范、散落各目录
   典型: icon.less 文件 475 行全是 background-image 图标定义

📂 views 内联 SVG (~75 文件)  → 模块内 import 引用
   分布: file-manage (~30) + camera-scanner (~20) + 其他模块
   问题: 模块私有、不可跨模块复用

📦 iconfont 自定义字体        → plan 模块专属
   文件: plan/assets/icon-font/ (woff2/ttf/woff/css)
   问题: 仅 1 个模块使用，需单独维护字体文件

总资源体积估算：~790KB+（图标相关）
```

#### 样式问题诊断

| 问题 | 详情 | 严重度 |
|------|------|--------|
| **CSS 预处理器混用** | Less（主要）+ Sass（少量）+ 纯 CSS | 中 |
| **UI 框架样式冲突** | antd 4 + Bootstrap 3.4 + PrimeReact 7.2 三套全局样式并存 | 高 |
| **颜色硬编码** | 大量 `#1890ff`、`#ff4d4f` 等散落在各 .less 文件中 | 高 |
| **缺少 Design Token** | 无统一的颜色/字号/间距/圆角变量体系 | 高 |
| **全局 CSS 类污染** | `icon.less` 定义大量全局类名（`.delIcon`、`.downIcon` 等） | 中 |
| **hover 状态双图维护** | 每个 CSS 图标需维护 normal + hover 两份资源 | 中 |
| **无主题切换能力** | 无 CSS Variables 体系，无法支持明暗主题 | 中 |

### 10.2 新架构样式体系设计

#### 10.2.1 Design Token 体系

```
┌─────────────────────────────────────────────────────────────┐
│                     Design Token 分层架构                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: Global Tokens（全局基础令牌）                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  颜色色板（blue-1 ~ blue-10, red-1 ~ red-10 ...）    │    │
│  │  字号阶梯（12/14/16/20/24/30px）                     │    │
│  │  间距阶梯（4/8/12/16/24/32/48px）                    │    │
│  │  圆角阶梯（2/4/6/8/16px）                            │    │
│  │  阴影阶梯（sm/base/md/lg/xl）                        │    │
│  │  动画时长（100/200/300ms）                           │    │
│  └─────────────────────────────────────────────────────┘    │
│                          ↓ 映射                              │
│  Layer 2: Semantic Tokens（语义化令牌）                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  --color-primary / --color-success / --color-error   │    │
│  │  --color-text-primary / --color-text-secondary       │    │
│  │  --color-bg-base / --color-bg-container              │    │
│  │  --color-border / --color-border-secondary           │    │
│  │  --font-size-body / --font-size-heading              │    │
│  │  --spacing-component / --spacing-section             │    │
│  │  --radius-button / --radius-card / --radius-modal    │    │
│  └─────────────────────────────────────────────────────┘    │
│                          ↓ 映射                              │
│  Layer 3: Component Tokens（组件级令牌）                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  --button-bg / --button-color / --button-radius      │    │
│  │  --input-border / --input-bg / --input-color         │    │
│  │  --card-bg / --card-shadow / --card-radius           │    │
│  │  --table-header-bg / --table-border-color            │    │
│  │  --sidebar-bg / --sidebar-width                      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  主题切换：修改 Layer 1 的变量值即可全局生效                    │
│  Light Theme ↔ Dark Theme ↔ Custom Theme                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 10.2.2 CSS 方案选型

| 方案 | 新架构选择 | 说明 |
|------|-----------|------|
| 预处理器 | **CSS Modules**（`.module.less`） | 模块级作用域，消除全局污染 |
| 变量体系 | **CSS Custom Properties** | 原生支持、运行时可切换主题 |
| UI 框架 | **Ant Design 5** (CSS-in-JS) | 内置 Token 体系，`ConfigProvider` 统一主题 |
| 工具类 | 可选引入 **Tailwind CSS**（或不引入） | 快速开发，但需评估与 antd 5 的配合 |
| 图标 | **Lucide React** | 统一 SVG 图标方案 |

### 10.3 图标统一方案：全面迁移至 Lucide Icons

#### 10.3.1 Lucide 选型理由

| 评估维度 | Lucide Icons | 说明 |
|---------|-------------|------|
| **图标数量** | 1,500+ | 覆盖通用 UI + 业务场景 |
| **按需引入体积** | 每个图标 ~200 Bytes | 200 个图标仅 ~40KB gzip |
| **React 组件** | `lucide-react` 原生 | `<Search size={16} />` 直接使用 |
| **Tree-shaking** | ESM 完美支持 | Vite/Webpack 5 自动优化 |
| **可定制** | `size` / `color` / `strokeWidth` | 用 CSS 即可控制颜色和 hover 状态 |
| **风格统一** | 统一 24x24 描边风格 | 可调节 `strokeWidth` 适配粗细 |
| **SVG 输出** | 纯 SVG | 可访问性好、缩放无损、SSR 友好 |
| **维护活跃** | GitHub 7k+ stars，持续更新 | 社区活跃 |
| **TypeScript** | 完整类型定义 | 自动补全 + 类型安全 |

#### 10.3.2 新架构中的图标方案

```typescript
// packages/shared/ui/src/components/icon/index.tsx

/**
 * @holder/ui 统一图标导出
 *
 * 使用方式：
 *   import { Search, Plus, Trash2 } from '@holder/ui/icons'
 *   <Search size={16} className="text-gray-500" />
 *
 * 优势：
 *   1. 按需引入，每个图标仅 ~200B
 *   2. 统一风格，可通过 size/color/strokeWidth 定制
 *   3. 无需维护 normal/hover 双图，用 CSS 控制状态
 *   4. TypeScript 类型安全 + 编辑器自动补全
 */

// 按语义分组导出，便于查找
// ── 通用操作 ──
export {
  Plus, Minus, X, Check, Search, Filter,
  Download, Upload, Trash2, Pencil, Copy,
  ExternalLink, Link, MoreHorizontal, MoreVertical,
  ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  RefreshCw, RotateCw, Move, GripVertical,
} from 'lucide-react'

// ── 文件与文档 ──
export {
  File, FileText, FilePlus, FileCheck, FileX,
  FolderOpen, FolderPlus, FolderClosed,
  Image, Paperclip, FileSpreadsheet, FileCode,
} from 'lucide-react'

// ── 消息与通讯 ──
export {
  MessageSquare, MessageCircle, Bell, BellRing, BellOff,
  Send, Phone, Video, Mic, MicOff, Volume2, VolumeX,
} from 'lucide-react'

// ── 用户与权限 ──
export {
  User, UserPlus, UserMinus, UserCheck, Users,
  Shield, ShieldCheck, Lock, Unlock, Key,
  LogIn, LogOut,
} from 'lucide-react'

// ── 日程与时间 ──
export {
  Calendar, CalendarDays, CalendarPlus, CalendarCheck,
  Clock, Timer, History, Hourglass,
} from 'lucide-react'

// ── 任务与工作流 ──
export {
  CheckSquare, Square, ListTodo, ListChecks,
  Kanban, Target, Crosshair, Flag, FlagTriangleRight,
  Star, Bookmark, Pin, Milestone,
  CircleDot, CircleCheck, CircleX, Circle,
  GitBranch, GitMerge, Workflow,
} from 'lucide-react'

// ── 数据与图表 ──
export {
  BarChart3, BarChart2, TrendingUp, TrendingDown,
  PieChart, LineChart, Activity,
} from 'lucide-react'

// ── 导航与布局 ──
export {
  Home, Layout, LayoutDashboard, Grid, Grid3x3,
  Menu, Sidebar, PanelLeft, PanelRight,
  Maximize2, Minimize2, Fullscreen,
} from 'lucide-react'

// ── 系统与状态 ──
export {
  Settings, Cog, SlidersHorizontal,
  AlertCircle, AlertTriangle, Info, HelpCircle,
  CheckCircle, XCircle,
  Eye, EyeOff, ZoomIn, ZoomOut,
  Loader2, LoaderCircle,
  Power, Monitor, Smartphone,
} from 'lucide-react'

// ── 富文本编辑 ──
export {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Quote, Code, Heading,
  Undo2, Redo2, Type,
} from 'lucide-react'

// ── 导出 Lucide 类型，供自定义图标保持一致 ──
export type { LucideProps } from 'lucide-react'
```

#### 10.3.3 自定义业务图标规范

Lucide 无法覆盖的业务专有图标，统一收归 `@holder/ui` 管理，遵循与 Lucide 相同的接口规范：

```typescript
// packages/shared/ui/src/components/icon/custom-icons.tsx

import React from 'react'
import type { LucideProps } from 'lucide-react'

/**
 * 自定义业务图标
 * 接口与 Lucide 保持一致（size / color / strokeWidth / className）
 * 确保在项目中与 Lucide 图标无缝混用
 */

/** 任务类型 - 目标任务 */
export const TaskTagTarget: React.FC<LucideProps> = ({
  size = 24, color = 'currentColor', strokeWidth = 2, className, ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    className={className} {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
)

/** 任务类型 - 临时任务 */
export const TaskTagTemp: React.FC<LucideProps> = ({
  size = 24, color = 'currentColor', strokeWidth = 2, className, ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    className={className} {...props}>
    <path d="M12 2L22 22H2L12 2Z" />
  </svg>
)

/** 窗口控制 - 最小化（Electron 窗口专用） */
export const WinMinimize: React.FC<LucideProps> = ({
  size = 24, color = 'currentColor', strokeWidth = 2, className, ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    className={className} {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

// ... 其他业务特有图标
```

#### 10.3.4 替换前后对比

```
──────────────── 替换前（CSS 背景图标）────────────────

// CSS (icon.less)
.download-icon {
  width: 14px;
  height: 14px;
  cursor: pointer;
  background: url(.../file_download.svg) no-repeat center;
  &:hover {
    background: url(.../file_download_h.svg) no-repeat center;
  }
}

// JSX
<span className="download-icon" onClick={handleDownload} />

需维护：file_download.svg + file_download_h.svg 两份文件

──────────────── 替换后（Lucide React）────────────────

// JSX
import { Download } from 'lucide-react'

<Download
  size={14}
  className="cursor-pointer text-gray-500 hover:text-blue-500 transition-colors"
  onClick={handleDownload}
/>

需维护：0 份图标文件，hover 效果由 CSS 控制
```

```
──────────────── 替换前（antd icons）────────────────

import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'

<DeleteOutlined style={{ fontSize: 14, color: '#ff4d4f' }} />
<EditOutlined style={{ fontSize: 14 }} />
<PlusOutlined />

──────────────── 替换后（Lucide React）────────────────

import { Trash2, Pencil, Plus } from 'lucide-react'

<Trash2 size={14} className="text-red-500" />
<Pencil size={14} />
<Plus size={16} />
```

### 10.4 图标迁移路线（融入新架构 Phase 计划）

| 阶段 | 时间 | 内容 | 产出 |
|------|------|------|------|
| **Phase 1 W3**（基础设施） | 2 天 | 安装 `lucide-react`，创建 `@holder/ui/icons` 统一导出 + 映射表 | 图标基础设施 |
| **Phase 1 W5-W6**（组件库） | 3 天 | `@holder/ui` 基础组件全面使用 Lucide，建立自定义图标规范 | 组件库图标统一 |
| **Phase 2**（核心模块迁移） | 与模块迁移同步 | 迁移核心模块时同步替换 antd/remixicon 图标为 Lucide | 核心模块图标统一 |
| **Phase 3**（独立模块） | 与模块拆分同步 | 独立模块新架构中直接使用 Lucide | 独立模块图标统一 |
| **Phase 4 W1-W2**（清理） | 5 天 | 卸载 remixicon / 清理 @ant-design/icons / 删除冗余 SVG+PNG / 精简 icon.less | 旧资源清零 |

### 10.5 样式迁移量化收益

| 维度 | 当前 | 新架构后 | 提升 |
|------|------|---------|------|
| **图标资源总体积** | ~790KB+ | ~60KB | ↓92% |
| **图标方案数量** | 5 套并存 | 1 套（Lucide + 少量自定义） | 统一 |
| **icon.less 代码量** | 475 行 | 删除（不再需要） | ↓100% |
| **hover 图标维护** | ~200 对 normal/hover 文件 | 0（CSS 控制） | ↓100% |
| **UI 框架样式冲突** | 3 套框架并存 | 1 套 (antd 5 CSS-in-JS) | 消除冲突 |
| **颜色硬编码数量** | 数百处 | 0（全部 Token 化） | ↓100% |
| **主题切换能力** | 无 | 支持明暗主题 + 自定义主题 | 全新能力 |
| **新人上手图标选择** | 需查 5 个库 | 查 1 个 lucide.dev | ↓80% |
