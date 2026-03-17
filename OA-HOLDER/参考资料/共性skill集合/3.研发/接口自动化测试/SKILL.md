---
name: 后端接口自动化测试
description: 基于pytest执行后端接口自动化测试，支持团餐管理平台API测试，并能上报测试结果。在执行接口自动化测试时使用。
---

# 后端接口自动化测试

基于pytest执行后端接口自动化测试，支持团餐管理平台API测试。

## 何时使用

- 执行接口自动化测试
- 编写API测试用例
- 集成测试验证

## 技术栈

- **框架**: pytest
- **请求**: requests
- **结构**: 团餐管理平台集成测试框架

## 项目测试结构

```
tests/
├── conftest.py              # 全局fixture（base_url, platform_token, auth_headers）
├── integration/
│   ├── platform/
│   │   ├── test_login_api.py      # 登录接口测试
│   │   ├── test_env_config_api.py # 环境配置接口测试
│   │   └── ...
│   └── ...
└── ...
```

## 核心Fixture

### conftest.py 提供的fixture

```python
# base_url - API基础地址（从环境变量 BASE_URL 获取）
# platform_token - 团餐平台JWT token（自动登录获取）
# auth_headers - 带认证的请求头
```

## 测试用例编写

### 基础测试类

```python
# tests/integration/platform/test_xxx_api.py
import pytest
import requests
import logging

logger = logging.getLogger("tests.integration")

class TestXxxAPI:
    """XXX接口测试"""
    
    def test_list_success(self, base_url, auth_headers):
        """GET /v1/xxx 列表查询成功"""
        url = f"{base_url}/v1/xxx"
        resp = requests.get(url, headers=auth_headers, timeout=15)
        
        logger.info("GET %s -> %s", url, resp.status_code)
        assert resp.status_code == 200
        
        data = resp.json()
        assert data.get("code") == 20000
        assert "data" in data
```

### 常用断言模式

```python
# 成功响应
data = resp.json()
assert data.get("code") == 20000
assert "data" in data

# 列表响应
assert isinstance(data["data"]["items"], list)
assert data["data"]["total"] >= 0

# 详情响应
assert data["data"]["id"] == expected_id

# 错误响应
assert data.get("code") != 20000
assert "msg" in data
```

## 环境变量配置

```bash
# 测试环境配置
export BASE_URL="http://127.0.0.1:7777"  # 团餐平台API地址
export PLATFORM_USER="admin"              # 平台登录账号
export PLATFORM_PASSWORD="12345678"       # 平台登录密码
```

## 执行测试

```bash
# 执行所有测试
pytest tests/integration/ -v

# 执行特定模块
pytest tests/integration/platform/ -v

# 执行特定测试
pytest tests/integration/platform/test_login_api.py::TestLoginAPI::test_login_success -v

# 生成报告
pytest tests/integration/ --html=report.html --self-contained-html
```

## 何时使用

用户提到「接口测试」「自动化测试」「API测试」「pytest」或需要执行接口自动化测试时，自动应用本技能。
