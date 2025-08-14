# HTTP请求封装使用说明

## 概述

本项目提供了一个符合RESTful标准的axios请求封装，支持GET、POST、PUT、DELETE四种请求方式，并且支持form和json格式参数。

## 特性

- ✅ 符合RESTful API标准
- ✅ 支持GET、POST、PUT、DELETE四种请求方式
- ✅ 支持JSON和Form格式参数
- ✅ 支持文件上传
- ✅ 自动token认证
- ✅ 请求和响应拦截器
- ✅ 完善的错误处理
- ✅ TypeScript类型支持
- ✅ 可扩展的API服务基类

## 文件结构

```
src/
├── types/
│   └── api.ts              # API类型定义
├── utils/
│   └── http.ts             # HTTP请求封装核心类
├── services/
│   └── api.ts              # API服务示例
└── examples/
    └── ApiUsageExample.tsx # 使用示例组件
```

## 基本使用

### 1. 导入HTTP客户端

```typescript
import { httpClient } from '../utils/http';
```

### 2. 基本请求方法

```typescript
// GET请求
const response = await httpClient.get<User[]>('/users', { page: 1, pageSize: 10 });

// POST请求（JSON格式）
const newUser = await httpClient.post<User>('/users', {
  username: 'john',
  email: 'john@example.com'
});

// PUT请求
const updatedUser = await httpClient.put<User>('/users/1', {
  username: 'john_updated'
});

// DELETE请求
await httpClient.delete('/users/1');
```

### 3. Form格式请求

```typescript
// POST请求（Form格式）
const user = await httpClient.postForm<User>('/users', {
  username: 'john',
  email: 'john@example.com'
});

// PUT请求（Form格式）
const updatedUser = await httpClient.putForm<User>('/users/1', {
  username: 'john_updated'
});
```

### 4. 文件上传

```typescript
// 上传单个文件
const file = event.target.files[0];
const response = await httpClient.upload<UploadResponse>(
  '/files/upload',
  file,
  'file',
  { description: '用户头像', category: 'avatar' }
);
```

## 高级功能

### 1. 认证Token管理

```typescript
// 设置认证token
httpClient.setAuthToken('your-jwt-token', true); // true表示持久化存储

// 清除认证token
httpClient.clearAuthToken();

// 设置自定义请求头
httpClient.setHeader('X-Custom-Header', 'custom-value');
```

### 2. 自定义配置

```typescript
// 创建自定义HTTP客户端实例
const customHttpClient = new HttpClient('https://api.example.com', 15000);

// 使用自定义配置发送请求
const response = await customHttpClient.get<User>('/users/1', undefined, {
  timeout: 5000,
  headers: { 'X-Custom': 'value' }
});
```

### 3. 错误处理

```typescript
try {
  const response = await httpClient.get<User>('/users/1');
  console.log(response.data);
} catch (error) {
  if (error.status === 401) {
    // 处理未授权错误
    console.log('用户未登录');
  } else if (error.status === 404) {
    // 处理未找到错误
    console.log('资源不存在');
  } else {
    // 处理其他错误
    console.error('请求失败:', error.message);
  }
}
```

## API服务模式

### 1. 使用预定义的服务类

```typescript
import { UserApiService } from '../services/api';

// 获取用户列表
const users = await UserApiService.getUsers(1, 20);

// 创建用户
const newUser = await UserApiService.createUser({
  username: 'john',
  email: 'john@example.com',
  password: 'password123'
});

// 用户登录
const loginResult = await UserApiService.login({
  username: 'john',
  password: 'password123'
});
```

### 2. 继承基类创建新服务

```typescript
import { BaseApiService } from '../services/api';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CreateProductRequest {
  name: string;
  price: number;
}

interface UpdateProductRequest {
  name?: string;
  price?: number;
}

class ProductApiService extends BaseApiService<Product, CreateProductRequest, UpdateProductRequest> {
  protected readonly baseUrl = '/products';
  
  // 可以添加特定的方法
  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.getList({ category });
  }
}

const productService = new ProductApiService();
```

## 环境配置

在项目根目录创建 `.env` 文件：

```env
VITE_API_BASE_URL=https://api.example.com
```

## 拦截器功能

### 请求拦截器
- 自动添加认证token
- 处理请求数据格式转换
- 请求日志记录

### 响应拦截器
- 响应日志记录
- 统一错误处理
- 响应数据格式化

## 类型安全

所有API都提供完整的TypeScript类型支持：

```typescript
// 定义响应类型
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 使用泛型确保类型安全
const response = await httpClient.get<User>('/users/1');
const user: User = response.data; // 类型安全
```

## 最佳实践

1. **统一错误处理**: 在拦截器中统一处理常见错误
2. **类型定义**: 为所有API接口定义完整的类型
3. **服务分层**: 按业务模块组织API服务
4. **参数验证**: 在发送请求前验证参数
5. **缓存策略**: 合理使用缓存减少重复请求

## 注意事项

1. 确保在组件卸载前取消未完成的请求
2. 合理设置请求超时时间
3. 敏感信息不要存储在localStorage中
4. 定期清理过期的认证token
5. 监控API请求性能

## 扩展功能

可以根据项目需求扩展以下功能：

- 请求重试机制
- 请求缓存
- 请求队列管理
- 离线支持
- 请求性能监控
- 自动刷新token

## 示例代码

完整的使用示例请参考 `src/examples/ApiUsageExample.tsx` 文件。 