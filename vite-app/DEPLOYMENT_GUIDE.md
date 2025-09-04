# 项目部署指南

## 概述
本指南将帮助你将React Vite项目部署到生产环境，并连接数据库和服务器。

## 1. 环境配置

### 1.1 创建生产环境配置文件
在项目根目录创建 `.env.production` 文件：

```env
# 生产环境配置
VITE_APP_TITLE=React App (Production)
VITE_API_BASE_URL=https://your-api-domain.com
VITE_APP_ENV=production
VITE_APP_VERSION=1.0.0
```

### 1.2 重新构建生产版本
```bash
# 使用生产环境配置构建
npm run build:production
```

## 2. 部署方案选择

### 方案A：静态文件托管（推荐）

#### 2.1 Vercel部署（最简单）
1. 注册 [Vercel](https://vercel.com) 账号
2. 连接GitHub仓库
3. 配置构建设置：
   - Build Command: `npm run build:production`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. 设置环境变量：
   - `VITE_API_BASE_URL`: 你的API服务器地址
5. 部署完成，获得域名如：`https://your-app.vercel.app`

#### 2.2 Netlify部署
1. 注册 [Netlify](https://netlify.com) 账号
2. 拖拽 `dist` 文件夹到Netlify
3. 或连接GitHub仓库自动部署
4. 配置环境变量和重定向规则

### 方案B：云服务器部署

#### 2.3 Nginx + 云服务器
1. 购买云服务器（阿里云/腾讯云等）
2. 安装Nginx：
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS
sudo yum install nginx
```

3. 配置Nginx：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    # 处理React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API代理
    location /api {
        proxy_pass http://your-backend-server:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. 上传文件：
```bash
# 将dist目录内容上传到服务器
scp -r dist/* user@your-server:/var/www/html/
```

## 3. 后端服务器配置

### 3.1 选择后端技术栈
- **Node.js + Express** - 适合JavaScript全栈
- **Python + FastAPI/Django** - 适合Python开发者
- **Java + Spring Boot** - 适合企业级应用
- **Go + Gin** - 高性能选择

### 3.2 数据库选择
- **MongoDB** - 文档数据库，适合快速开发
- **MySQL/PostgreSQL** - 关系型数据库，适合复杂业务
- **Redis** - 缓存数据库，提升性能

### 3.3 示例：Node.js + Express + MongoDB

#### 创建后端项目
```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv
```

#### 基础服务器代码
```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 连接数据库
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 路由
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### 环境配置
```env
# .env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/your-database
NODE_ENV=production
```

## 4. 域名和SSL配置

### 4.1 域名配置
1. 购买域名（阿里云/腾讯云等）
2. 配置DNS解析指向你的服务器IP
3. 等待DNS生效（通常几分钟到几小时）

### 4.2 SSL证书配置
```bash
# 使用Let's Encrypt免费证书
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 5. 部署检查清单

### 5.1 前端检查
- [ ] 生产环境构建成功
- [ ] 环境变量配置正确
- [ ] API地址指向正确的后端服务器
- [ ] 静态资源加载正常
- [ ] 路由跳转正常

### 5.2 后端检查
- [ ] 服务器启动正常
- [ ] 数据库连接成功
- [ ] API接口响应正常
- [ ] CORS配置正确
- [ ] 错误处理完善

### 5.3 部署检查
- [ ] 域名解析正常
- [ ] SSL证书生效
- [ ] 防火墙配置正确
- [ ] 监控和日志配置
- [ ] 备份策略

## 6. 性能优化

### 6.1 前端优化
- 启用Gzip压缩
- 配置CDN加速
- 优化图片和静态资源
- 启用浏览器缓存

### 6.2 后端优化
- 数据库索引优化
- 连接池配置
- 缓存策略
- 负载均衡

## 7. 监控和维护

### 7.1 监控工具
- **前端监控**: Sentry, LogRocket
- **后端监控**: PM2, New Relic
- **服务器监控**: 阿里云监控, 腾讯云监控

### 7.2 日志管理
```javascript
// 配置日志
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## 8. 常见问题解决

### 8.1 跨域问题
确保后端CORS配置正确：
```javascript
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true
}));
```

### 8.2 路由问题
确保Nginx配置了正确的重定向规则处理React Router。

### 8.3 环境变量问题
确保生产环境的环境变量正确配置。

## 9. 安全考虑

- 使用HTTPS
- 配置防火墙
- 定期更新依赖
- 数据库安全配置
- API接口权限控制

## 10. 备份策略

- 数据库定期备份
- 代码版本控制
- 配置文件备份
- 监控告警配置