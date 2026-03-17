---
name: 后端测试结果上报
description: 将后端接口自动化测试结果上报到团餐管理平台，支持测试报告生成、结果汇总等。在需要上报测试结果时使用。
---

# 后端测试结果上报

将接口自动化测试结果上报到团餐管理平台。

## 何时使用

- 测试结果上报平台
- 生成测试报告
- 测试进度同步

## 上报方式

### 1. 测试报告文件生成

```bash
# 生成JUnit XML报告（用于CI/CD和平台导入）
pytest tests/integration/ --junitxml=report.xml

# 生成HTML报告
pytest tests/integration/ --html=report.html --self-contained-html

# 生成JSON报告
pytest tests/integration/ --json-report --json-report-file=report.json
```

### 2. 上报数据格式

```json
{
  "test_suite": "后端接口测试",
  "test_run_id": "20250115-001",
  "timestamp": "2025-01-15T10:00:00Z",
  "summary": {
    "total": 50,
    "passed": 48,
    "failed": 2,
    "skipped": 0,
    "success_rate": "96%"
  },
  "details": [
    {
      "test_name": "test_login_success",
      "test_class": "TestLoginAPI",
      "status": "passed",
      "duration": 0.5,
      "message": ""
    },
    {
      "test_name": "test_create_order",
      "test_class": "TestOrderAPI",
      "status": "failed",
      "duration": 1.2,
      "message": "断言失败: code != 20000"
    }
  ]
}
```

### 3. 上报脚本示例

```python
# tests/utils/report_uploader.py
import requests
import json
from datetime import datetime

def upload_report(report_data, base_url, token):
    """上传测试报告到团餐平台"""
    url = f"{base_url}/v1/test-reports"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "suite_name": report_data["test_suite"],
        "run_id": report_data["test_run_id"],
        "executed_at": datetime.now().isoformat(),
        "summary": report_data["summary"],
        "results": report_data["details"]
    }
    
    resp = requests.post(url, headers=headers, json=payload)
    return resp.json()
```

## 上报触发时机

| 时机 | 上报内容 | 方式 |
|------|----------|------|
| 每日定时 | 全量回归测试结果 | 自动上报 |
| 提测时 | 提测范围测试结果 | CI/CD上报 |
| 上线前 | 核心接口验证结果 | 手动上报 |
| 故障后 | 相关接口回归结果 | 手动上报 |

## 上报检查清单

- [ ] 测试用例执行完成
- [ ] 报告文件已生成
- [ ] 报告格式符合平台要求
- [ ] 成功连接到平台API
- [ ] 上报结果已确认

## 何时使用

用户提到「测试上报」「报告上传」「平台同步」「测试报告」或需要上报测试结果时，自动应用本技能。
