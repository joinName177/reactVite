---
name: "原型设计SKILL"
description: "依据需求分析SKILL Step6 输出含设计交互的高保真原型(单文件HTML)并提供预览；界面风格采用 Ant Design；完成Step6确认后调用。"
---

# 原型设计SKILL

本技能用于将已确认的设计文档（需求分析SKILL的 Step6 输出）转化为可直接预览演示的高保真原型（单文件HTML），覆盖关键设计交互。

## 技能目标
- 输出含设计交互的高保真原型（单文件HTML）
- 覆盖页面切换、弹窗显隐、表单校验、按钮态、数据填充
- 将规则说明通过 备注框 绑定到控件，便于评审与演示

## 调用时机
- 完成并确认 Step6 设计文档后
- 需要快速演示关键路径交互时
- 需要对外交付原型文件进行评审/报价时

## 输入参数
- 设计文档：来源于 Step6 的最终确认版（页面、字段、按钮、交互与规则）
- 视觉与品牌（可选）：色板、字体、组件风格偏好
- 预览配置（可选）：端口(默认5500)、文件名(默认 prototype.html)
- 路径约束：原型文件与引用的需求分析文档（Step6 PRD）必须位于同一目录（同一地址），以确保相对路径引用、规则批量注入与 Tooltip 绑定正常工作；不建议跨盘符或跨目录放置。

## 执行流程
- 解析设计文档：抽取页面结构、字段/按钮清单、交互与校验规则
- 页面与组件映射：以单页应用结构组织页面与弹窗，映射为DOM结构
- 生成单文件HTML：整合 HTML/CSS/JS 于一个文件（可分发、无依赖）
- 规则提示绑定：将字段校验、默认值、逻辑规则绑定为 Tooltip 悬浮说明
- 交互实现：页面/弹窗显隐、按钮态（hover/focus/active）、Mock数据填充
- 预览启动：本地HTTP服务启动并返回可点击预览URL

## 生成规范
- 单文件交付：仅一个 .html 文件，包含样式与脚本
- 高保真视觉：现代CSS（Flexbox/Grid、阴影、圆角），还原品牌风格
- 交互逻辑：非跳转视图切换；完整按钮/表单状态；Mock数据模拟
- 规则说明：Tooltip/备注框覆盖关键控件，展示校验与默认值；半透明背景、移开消失
- 性能与可用性：基础缓存、空态、加载态；键盘可达与无障碍提示

### Ant Design 风格约定
- 设计语言：遵循 Ant Design 的色彩、间距、排版与组件交互规范
- 视觉Token：primary #1890ff、success #52c41a、warning #faad14、error #f5222d
- 组件拟态：按钮、输入框、选择器、抽屉/对话框、表格等采用 AntD 风格的圆角、阴影、hover/focus/active/disabled 状态
- 实现方式：不引入外部库；通过 CSS/HTML 拟态 AntD 视觉与交互

## 交互覆盖清单
- 视图管理：页面/弹窗显隐、返回与前进路径
- 表单校验：必填、长度/格式、提交前去空格、错误提示
- 按钮状态：hover/focus/active/disabled 的视觉与行为一致性
- 数据填充：Mock数据用于列表、详情、表单默认值
- 规则提示：字段级 Tooltip/备注框 展示校验/默认值/逻辑规则

## 质量验收清单
- 关键路径可用：从入口到主要完成动作无阻塞
- P0 功能闭环：涉及的页面、控件、交互均可演示
- 规则可见：所有关键字段具备清晰的 Tooltip 说明
- 视觉一致：色板、间距、圆角、阴影统一且符合品牌
- 可预览交付：单文件可在浏览器直接运行并可本地预览

## 输出示例结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>Prototype</title>
<style>
  :root { --brand:#2f80ed; --text:#333; --bg:#f6f8fa; }
  * { box-sizing:border-box; } body { margin:0; font:14px/1.6 system-ui,Segoe UI; color:var(--text); background:var(--bg); }
  nav { display:flex; gap:16px; padding:12px 20px; background:#fff; box-shadow:0 1px 4px rgba(0,0,0,.06); position:sticky; top:0; }
  .btn { padding:8px 12px; border-radius:6px; background:var(--brand); color:#fff; border:0; cursor:pointer; }
  .btn:hover { opacity:.9; } .btn:active { transform:translateY(1px); }
  .page { display:none; padding:20px; } .active { display:block; }
  .card { background:#fff; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,.08); padding:16px; }
  .field-group { display:flex; flex-direction:column; gap:6px; margin:10px 0; }
  .tooltip-container { position:relative; display:inline-block; }
  .tooltip-text {
    visibility:hidden; position:absolute; z-index:10; left:0; top:100%;
    background:#333; color:#fff; padding:6px 8px; border-radius:6px; opacity:0; transition:opacity .2s;
    max-width:320px; box-shadow:0 4px 12px rgba(0,0,0,.2);
  }
  .tooltip-container:hover .tooltip-text { visibility:visible; opacity:1; }
</style>
</head>
<body>
  <nav>
    <button class="btn" onclick="show('list')">列表</button>
    <button class="btn" onclick="show('detail')">详情</button>
    <button class="btn" onclick="openModal('create')">新建</button>
  </nav>

  <div id="page-list" class="page active">
    <div class="card">
      <div class="field-group tooltip-container">
        <label>用户名称*</label>
        <input id="username" type="text" placeholder="请输入...">
        <span class="tooltip-text">规则：必填；最大长度20；默认空；提交时需去除首尾空格</span>
      </div>
      <button class="btn" onclick="submit()">提交</button>
    </div>
  </div>

  <div id="page-detail" class="page">
    <div class="card">详情页内容（Mock数据填充）</div>
  </div>

  <div id="modal-create" class="page card">新建弹窗（通过JS显隐控制）</div>

<script>
  const mock = { username: "示例用户" };
  function show(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${id}`).classList.add('active');
  }
  function openModal(id) { show(id); }
  function submit() {
    const val = document.getElementById('username').value.trim();
    if (!val || val.length > 20) { alert('用户名必填且不超过20字符'); return; }
    alert('提交成功：' + val);
  }
</script>
</body>
</html>
```

## 预览启动（Windows）
- Python HTTP 服务：

```powershell
cd f:\工作文件\PLAN B
python -m http.server 5500
# 浏览器访问：http://localhost:5500/prototype.html
```
- 注意：prototype.html 与 Step6_PRD.md 需在同一目录；使用浏览器或本地服务访问时，相对引用与规则映射方可生效。

- Live Server：

```powershell
cd f:\工作文件\PLAN B
npx live-server --port=5500 --open=prototype.html
```

## 使用方式
- 当需求分析SKILL的 Step6 设计文档完成并确认后，调用本技能生成原型并启动预览
- 若设计文档更新，复用本技能重新生成，确保原型与最新规则一致
- 路径建议：将 Step6_PRD.md 与 prototype.html 放置在同一文件夹，并采用相对路径引用，便于迁移与评审交付。

## 自动生成器（可选）
- 从 Step6 PRD Markdown 自动生成含规则 Tooltip 的 HTML 原型：

```powershell
python f:\工作文件\PLAN B\tools\generate_prototype.py --prd f:\工作文件\PLAN B\Step6_PRD.md --out f:\工作文件\PLAN B\prototype.html
```
- 或使用相对路径（推荐，同目录）：
```powershell
python .\tools\generate_prototype.py --prd .\Step6_PRD.md --out .\prototype.html
```

- 说明：
  - 支持解析“字段/按钮/筛选”的表格/段落结构，生成组件与规则 Tooltip 初稿
  - 支持 Shift+单击就地编辑 Tooltip 文本（不持久化，需保存源文件）
  - 生成后按上文“预览启动”直接打开浏览器查看
