---
name: "验收SKILL"
description: "梳理并执行产品验收：对比HTML原型与规则标注，生成可用于测试用例与产品验收的清单与用例骨架。进入验收阶段或需从原型生成验收清单时调用。"
---

# 产品验收SKILL

本技能用于将“HTML原型 + 规则内容（RULE_DICT/data-rule-*）”转化为可执行的验收清单与测试用例骨架，并提供量化门槛与结论口径，支持产品验收决策与自动化用例选型。

## 适用时机
- 进入产品验收阶段，需要依据原型与规则对齐进行一致性校验。
- 需要从HTML原型自动/半自动生成验收清单与Gherkin测试用例骨架。
- 需要统一验收标准、缺陷分级与结论口径，并形成可审计证据链。

## 输入
- HTML原型页面（含交互/状态/空/错/加载态）
- 规则标注（data-rule-id/data-rule-detail）与 RULE_DICT（集中规则描述）
- 设计tokens（颜色/字号/间距/阴影/圆角等）
- 需求清单（需求ID与模块映射，可为空）

## 输出
- 验收清单（CSV/Markdown）：覆盖内容与规则一致性、交互一致性、UI样式还原度
- Gherkin测试用例骨架（.feature 初稿）
- 缺陷分级与结论口径（通过/不通过/部分通过）及SLA/回归范围

## 执行流程

### Step1：验收前置准备
- 对齐基线：需求文档、功能清单、高保真原型、交互说明与规则字典
- 明确范围与标准：验收范围、优先级、异常/边界场景与量化门槛
- 产出《验收Checklist》模板与可追溯矩阵（需求→原型→用例→证据）

### Step2：功能完整性验收
- 逐条对照功能清单：是否存在、是否可用、是否符合描述
- 基础组件：字段、按钮、弹窗、列表、分页、搜索、筛选等
- 记录未实现/实现错误/缺漏项，形成问题清单

### Step3：交互与体验验收
- 跳转、加载、提交反馈、错误提示、空状态的一致性校验
- 点击、输入、选择、悬浮提示等交互对齐原型
- 走查操作路径：排查卡顿/歧义/误导与可访问性关键项

### Step4：业务逻辑与边界场景验收
- 必填项、长度限制、格式校验、防重与幂等
- 权限、状态流转、数据联动、计算规则
- 边界覆盖：空数据、极端值、越权操作、弱网/超时、并发

### Step5：视觉与还原度验收
- 布局、间距、字体、颜色、按钮样式、图标、阴影与圆角
- 响应式与不同屏幕表现的一致性
- 记录视觉偏差、错位、遮挡、样式错乱问题

### Step6：问题汇总与验收结论
- 《验收问题清单》：问题描述、优先级、截图/复现步骤、期望结果
- 结论：通过 / 不通过（需修复） / 部分通过
- 不通过需明确修复要求、SLA、回归范围与再次验收时间

## 量化门槛与分级
- 严重度分级：P0（阻断/安全/合规）、P1（核心路径受影响）、P2（次要路径）、P3（轻微视觉/文案）
- 通过阈值：P0=0；P1≤阈值且有SLA与回归计划；需求实现率=100%；关键路径无阻断
- 视觉容忍度：尺寸/间距≤2px；图标对齐≤1px；颜色落入设计token误差范围

## 自动/半自动生成（从原型与规则）

### 浏览器脚本（在原型页面控制台执行，生成CSV与Gherkin骨架）
```javascript
function getUniqueSelector(el){const parts=[];while(el&&el.nodeType===1){let s=el.tagName.toLowerCase();if(el.id){s+="#"+el.id;parts.unshift(s);break}else{const cls=(el.className||"").toString().trim().split(/\s+/).filter(Boolean).slice(0,2);if(cls.length)s+="."+cls.join(".");const p=el.parentNode;const sibs=p?Array.from(p.children).filter(n=>n.tagName===el.tagName):[];if(sibs.length>1){const idx=sibs.indexOf(el)+1;s+=`:nth-of-type(${idx})`}parts.unshift(s);el=p}}return parts.join(" > ")}
function getStyleTokens(el){const s=getComputedStyle(el);return [`color:${s.color}`,`bg:${s.backgroundColor}`,`font:${s.fontSize}`,`radius:${s.borderRadius}`,`shadow:${s.boxShadow}`,`margin:${s.marginTop}/${s.marginRight}/${s.marginBottom}/${s.marginLeft}`,`padding:${s.paddingTop}/${s.paddingRight}/${s.paddingBottom}/${s.paddingLeft}`].join(";")}
function deriveCases(rule){const t=rule?.type;const p=rule?.params||{};const d=rule?.description||"";const cases=[];if(t==="required"){cases.push({pre:"字段为空",data:"''",steps:"提交",expect:"出现必填错误提示"});cases.push({pre:"正常值",data:p.sample||"有效值",steps:"提交",expect:"成功提交并反馈"})}
else if(t==="length"){const {min=0,max=10}=p;cases.push({pre:"min-1",data:"a".repeat(Math.max(min-1,0)),steps:"提交",expect:"长度错误"});cases.push({pre:"min",data:"a".repeat(min),steps:"提交",expect:"通过"});cases.push({pre:"max",data:"a".repeat(max),steps:"提交",expect:"通过"});cases.push({pre:"max+1",data:"a".repeat(max+1),steps:"提交",expect:"长度错误"})}
else if(t==="format"){cases.push({pre:"非法格式",data:p.invalid||"@@@",steps:"提交",expect:"格式错误"});cases.push({pre:"合法格式",data:p.valid||"abc-123",steps:"提交",expect:"通过"})}
else if(t==="permission"){cases.push({pre:"越权用户",data:"role=guest",steps:"访问/操作",expect:p.behavior||"不可见/禁用/403"});cases.push({pre:"有权用户",data:"role=admin",steps:"访问/操作",expect:"正常"})}
else if(t==="state"){cases.push({pre:"非法流转",data:`${p.from}->${p.invalidTo}`,steps:"流转",expect:"被拦截并提示"});cases.push({pre:"合法流转",data:`${p.from}->${p.to}`,steps:"流转",expect:"成功并反馈"})}
else if(t==="compute"){cases.push({pre:"样例计算",data:JSON.stringify(p.sample||{a:1,b:2}),steps:"计算/保存",expect:`结果=${p.expected||"按口径计算"}`})}
else {cases.push({pre:"通用",data:p.sample||"",steps:"执行核心操作",expect:d||"符合原型与规则"})}
return cases;}
function generateCSVAndGherkin(){
  const dict=window.RULE_DICT||{};
  const csvHeader=["用例ID","需求ID","页面","组件","选择器","规则ID","规则描述","前置条件","数据集","步骤(Given/When)","期望(Then)","交互反馈","视觉tokens","严重度","优先级","自动化候选","定位器","证据","状态","备注"].join(",");
  const csv=[csvHeader]; const gherkin=[];
  const page=(document.title||location.pathname.split("/").pop());
  document.querySelectorAll("[data-rule-id],[data-rule-detail]").forEach((el,idx)=>{
    const component=el.getAttribute("data-component")||el.tagName.toLowerCase();
    const selector=getUniqueSelector(el);
    const ruleId=el.getAttribute("data-rule-id")||"";
    const rule=ruleId?dict[ruleId]:{description:el.getAttribute("data-rule-detail")||""};
    const tokens=getStyleTokens(el);
    const cases=deriveCases(rule);
    cases.forEach((c,ci)=>{
      const id=`TC-${page}-${idx+1}-${ci+1}`;
      const row=[id,"",page,component,selector,ruleId,(rule?.description||""),c.pre,c.data,`Given ${c.pre} When ${c.steps}`,`Then ${c.expect}`,"",tokens,"P2","中","Y",selector,"","未执行",""];
      csv.push(row.map(x=>String(x).replace(/,/g,";")).join(","));
      gherkin.push(`Feature: ${page}-${component}\nScenario: ${ruleId||component} - ${c.pre}\n  Given ${c.pre}\n  When ${c.steps}\n  Then ${c.expect}\n`);
    });
  });
  return {csv:csv.join("\n"),gherkin:gherkin.join("\n")};
}
const out=generateCSVAndGherkin();console.log(out.csv);console.log("\n---\n");console.log(out.gherkin);
```

## 模板

### CSV 清单（头部）
```csv
用例ID,需求ID,页面,组件,选择器,规则ID,规则描述,前置条件,数据集,步骤(Given/When),期望(Then),交互反馈,视觉tokens,严重度,优先级,自动化候选,定位器,证据,状态,备注
```

### Markdown 表格清单（建议字段）

| 用例ID | 需求ID | 页面 | 组件 | 选择器 | 规则ID | 规则描述 | 前置条件 | 数据集 | 步骤(Given/When) | 期望(Then) | 交互反馈 | 视觉tokens | 严重度 | 优先级 | 自动化候选 | 定位器 | 证据 | 状态 | 备注 | 验收结果 |
|-------|--------|------|------|--------|--------|----------|----------|--------|------------------|------------|----------|------------|--------|--------|------------|--------|------|------|------|----------|
| TC-账期配置-001 | DEMO-1 | 账期配置页 | 输入框 | #deadline-input | rule_deadline | 不得早于当前日期 | 用户已登录 | 2025-01-01 | Given 正常值 When 提交 | Then 成功并反馈 | 成功Toast | color:#000;font:14px;shadow:... | P2 | 中 | Y | #deadline-input | 截图/日志 | 未执行 |  | 通过/不通过 |
| TC-账期配置-002 | DEMO-1 | 账期配置页 | 输入框 | #deadline-input | rule_deadline | 不得早于当前日期 | 用户已登录 | 空 | Given 字段为空 When 提交 | Then 必填错误提示 | 错误提示 | color:#000;font:14px;shadow:... | P1 | 高 | Y | #deadline-input | 截图/日志 | 未执行 |  | 通过/不通过

## 结论与管控
- 合规项为硬约束：任何合规风险视为P0
- 冻结与回归：在验收窗口内冻结需求变更，明确回归范围与时间
- 可审计：证据与结论留存，支持复核与抽查

## 使用方式
- 全流程执行：Step1→Step6
- 快速生成：在原型页面运行脚本，生成CSV与Gherkin初稿，再补充需求ID/证据/门槛
- 联动测试：标记自动化候选，用唯一定位器与断言点驱动自动化回归

## 用户侧验收（无需技术操作）
- 使用对象：产品经理/业务方，直接基于系统界面与原型清单进行验收，无需打开控制台或使用脚本。
- 准备事项
  - 账号与权限：准备至少两类账号（有权/无权），覆盖关键角色
  - 环境与数据：明确验收环境地址，准备正常/边界/异常样例数据
  - 原型与清单：打印或打开原型页面与本“表格清单”
- 验收步骤
  - 按模块依次执行清单中的“前置条件→操作步骤→期望结果”
  - 在“验收结果”列选择“通过/不通过”，并在“实际结果/备注”中简述差异
  - 为不通过项在“证据”列附上截图或复现描述，记录缺陷级别（阻断/核心/次要/视觉）
- 判定与结论
  - 合规/阻断类问题（P0）为不通过
  - 关键路径问题（P1）需修复并回归后再验收
  - 汇总通过率与问题清单，形成“验收结论：通过/不通过/部分通过”
- 用户友好表格（建议用于实际验收记录）

| 模块/页面 | 场景名称 | 前置条件 | 操作步骤 | 期望结果 | 实际结果 | 判定 | 截图/证据 | 备注 |
|---|---|---|---|---|---|---|---|---|
| 账期配置 | 设置截止日期（正常） | 已登录/有权限 | 打开账期配置页→输入有效日期→提交 | 成功提示且保存成功 |  | 通过/不通过 |  |  |
| 账期配置 | 必填校验（异常） | 已登录/有权限 | 不输入日期→提交 | 显示必填错误提示 |  | 通过/不通过 |  |  |
| 权限控制 | 越权用户不可见 | 未授权账户 | 打开账期配置页 | 关键操作不可见或禁用 |  | 通过/不通过 |  |  |
| 弱网处理 | 提交超时反馈 | 网络不佳 | 提交配置 | 显示超时/重试提示，可恢复 |  | 通过/不通过 |  |  |

> 提示：实际验收时，将上表复制为你项目的模块清单并逐条填写；无需任何技术脚本即可完成用户侧验收记录。
