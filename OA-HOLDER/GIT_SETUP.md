# Git 连接问题解决方案

## 当前问题
- HTTPS 连接失败：无法连接到 GitHub 端口 443
- SSH 连接失败：公钥未添加到 GitHub

## 解决方案

### 方案 1：添加 SSH 公钥到 GitHub（推荐）

**你的 SSH 公钥：**
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILAbOloH+yRflmodjkUvGsxQ02im0vbCqeKWQrlOtCoC github-key
```

**操作步骤：**
1. 访问：https://github.com/settings/ssh/new
2. Title 填写：`OA-HOLDER-Key`
3. Key 粘贴上面的公钥内容
4. 点击 "Add SSH key"

**添加完成后测试：**
```bash
ssh -T git@github.com
git pull --tags origin main
```

### 方案 2：配置代理（如果有代理）

```bash
# HTTP 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# SOCKS5 代理
git config --global http.proxy socks5://127.0.0.1:7890
git config --global https.proxy socks5://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 方案 3：使用 GitHub Desktop
下载 GitHub Desktop 客户端，使用图形界面操作。

### 方案 4：使用 GitHub CLI
```bash
# 安装 GitHub CLI
# 然后使用 gh 命令操作
gh auth login
gh repo clone joinName177/reactVite
```

## 当前 Git 配置

远程仓库已切换回 HTTPS：
```bash
git remote -v
# origin  https://github.com/joinName177/reactVite.git (fetch)
# origin  https://github.com/joinName177/reactVite.git (push)
```

如果需要切换回 SSH（添加公钥后）：
```bash
git remote set-url origin git@github.com:joinName177/reactVite.git
```

