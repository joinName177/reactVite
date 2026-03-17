# pm-flow 分享包 - 安装说明

## 快速安装（两步）

### 步骤 1：安装项目级文件

将本包中的 `.cursor/` 文件夹**复制到你的项目根目录**（若已有 `.cursor`，则合并 `commands` 和 `rules` 子目录）。

包含文件：
- `commands/pm-flow.md`：执行产品经理完整流程
- `commands/pm-audit-03.md`：03 功能清单专项审查（可选）
- `rules/product-requirement-flow.mdc`：PM 流程规则

### 步骤 2：安装用户级技能

将 `pm-flow-skills.tar.gz` 解压到 Cursor 技能目录：

```bash
mkdir -p ~/.cursor/skills
cd ~/.cursor/skills
tar -xzvf /path/to/pm-flow-skills.tar.gz
```

> 若分享包中没有 `pm-flow-skills.tar.gz`，请从项目根目录获取，或在本机执行：
> `cd ~/.cursor/skills && tar -czvf pm-flow-skills.tar.gz product-manager product-expert`

### 验证

在 Cursor 中打开项目，输入 `/pm-flow`，应看到 P0 澄清问题清单。

---

## 完整说明

详见 `pm-flow-分享指南.md`（在项目根目录）。
