---
name: "交互式规则标注SKILL"
description: "为每个组件增加可拖动的“≡”备注按钮，鼠标悬停展示可拖动备注框，用于规则编写与说明（支持就地编辑与轻量持久）。"
---

# 交互式规则标注 SKILL

本技能旨在帮助研发人员在不查看文档的情况下，直接在原型 UI 上通过鼠标悬停“≡”备注按钮获取详细的业务规则与逻辑说明，并以可移动备注框进行编写与维护。

## 核心能力
1. 初稿生成：依据 Step6 PRD 的字段/按钮/筛选信息，为每个组件生成规则描述初稿（可编辑）。
2. 备注按钮：为目标组件生成可拖动的“≡”备注按钮。
3. 悬停展示：鼠标移上“≡”展示备注框；备注框可拖动、可缩放、可编辑。
4. 批量绑定：统一为页面内组件添加规则属性并注入备注按钮。
5. 轻量持久：关闭备注框时写回 data-note-detail，并尝试写入本地存储。

## 适用场景
- 用户指令：“给这个输入框加个校验规则”、“添加悬浮说明”、“注明业务逻辑”。
- 场景：交付高保真 HTML 原型时，需将 PRD 中的详细规则绑定到 UI 元素上。

## 实现标准

### 1. 样式 (注入到 `<style>`)
```css
.note-btn {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: #3b82f6;
  color: #fff;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,.2);
  cursor: pointer;
  user-select: none;
  z-index: 800;
}
.note-btn--in-modal {
  z-index: 2200;
}
.note-box {
  position: absolute;
  width: 360px;
  min-width: 240px;
  min-height: 120px;
  background: #fff;
  border: 1px solid #d9d9d9;
  box-shadow: 0 6px 20px rgba(0,0,0,.15);
  border-radius: 4px;
  z-index: 2300;
  resize: both;
  overflow: hidden;
}
.note-box-header {
  height: 28px;
  line-height: 28px;
  background: #9e9e9e;
  color: #fff;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: move;
  user-select: none;
}
.note-box-body {
  padding: 10px;
  height: calc(100% - 28px);
  overflow: auto;
}
.note-textarea {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 13px;
  line-height: 1.6;
  resize: none;
}
```

### 2. HTML 属性 (添加到目标元素)
- `data-note-detail`：备注内容（优先使用）
- `data-rule-detail`：规则详情文本（作为备注初始内容的回退）

示例：
```html
<button class="btn" data-note-detail="按钮用于提交。成功：提示并清空，失败：展示错误并允许重试。" data-rule-detail="动作：提交；前置：字段校验；副作用：刷新列表">提交</button>
```

### 3. 规则初稿生成（模板与启发式）
依据 Step6 PRD 与控件类型生成初稿，便于后续人工修订：

- 输入框/字段
  - 模板：
    - 必填/可选；长度范围/格式要求；默认值；异常提示；提交前处理（如去空格）
  - 启发式：
    - 标签含“*” → 必填；占位符含“手机号/邮箱”等 → 格式校验；字段说明含“最大长度N” → 长度校验；有“默认值” → 写明默认
- 按钮/操作
  - 模板：
    - 动作；前置条件；成功反馈；失败反馈；副作用（导航/刷新/弹窗）
  - 启发式：
    - “保存/提交/创建/删除/导出” → 对应常见动作与反馈；涉及“确认弹窗” → 写明二次确认与异常处理
- 筛选/选择控件
  - 模板：
    - 可多选/单选；默认选项；联动关系；生效时机（实时/需点击“应用”）；清空规则
  - 启发式：
    - 出现“多选/标签” → 多选；“级联/联动” → 写明依赖；“分页/排序/搜索” → 合并到列表规则
- 列表/详情
  - 模板：
    - 分页/排序/筛选；空态/加载态；点击行为（进入详情/打开菜单）
  - 启发式：
    - “每页N条/按更新时间排序” → 明确分页与排序；“无数据时展示引导” → 空态说明

生成示例（字段）：
```html
<input type="text" class="input" data-note-detail="必填；最大长度20；默认空；提交前去除首尾空格；错误提示详尽" data-rule-detail="必填；最大长度20；默认空；提交前去除首尾空格；错误：不满足校验时提示具体原因">
```

### 4. JS 注入与交互
将以下脚本注入到页面底部，实现备注按钮的生成、悬停展示备注框、拖拽与轻量持久：

```html
<script>
  (function(){
    function isInModal(node){
      var cur = node;
      while(cur && cur.nodeType === 1){
        var role = cur.getAttribute && cur.getAttribute('role');
        var ariaModal = cur.getAttribute && cur.getAttribute('aria-modal');
        if(role === 'dialog' || ariaModal === 'true') return cur;
        var cls = cur.className || '';
        if(typeof cls === 'string' && /(modal|dialog|popup|drawer|mask|ant-modal|el-dialog)/i.test(cls)) return cur;
        cur = cur.parentElement;
      }
      return null;
    }
    function createNoteBtn(target){
      const btn = document.createElement('div');
      const modalContainer = isInModal(target);
      btn.className = modalContainer ? 'note-btn note-btn--in-modal' : 'note-btn';
      btn.title = '备注';
      btn.textContent = '≡';
      const rect = target.getBoundingClientRect();
      btn.style.left = (window.scrollX + rect.left + rect.width - 10) + 'px';
      btn.style.top = (window.scrollY + rect.top - 10) + 'px';
      btn.addEventListener('mouseenter', function(){
        openNoteBox(target, btn);
      });
      document.body.appendChild(btn);
      target.__noteInjected = true;
    }
    function openNoteBox(target, anchorBtn){
      const rect = target.getBoundingClientRect();
      let box = target.__noteBox;
      if(!box){
        box = document.createElement('div');
        box.className = 'note-box';
        box.innerHTML = '<div class="note-box-header"><span>说明</span><span style="cursor:pointer">✖</span></div><div class="note-box-body"><textarea class="note-textarea"></textarea></div>';
        const header = box.querySelector('.note-box-header');
        const closeBtn = header.lastElementChild;
        const textarea = box.querySelector('.note-textarea');
        const initial = target.getAttribute('data-note-detail') || target.getAttribute('data-rule-detail') || '';
        textarea.value = initial;
        let dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
        header.addEventListener('mousedown', function(e){
          dragging = true; sx = e.clientX; sy = e.clientY; ox = box.offsetLeft; oy = box.offsetTop; e.preventDefault();
        });
        document.addEventListener('mousemove', function(e){
          if(!dragging) return;
          const nx = ox + (e.clientX - sx);
          const ny = oy + (e.clientY - sy);
          box.style.left = nx + 'px';
          box.style.top = ny + 'px';
        });
        document.addEventListener('mouseup', function(){ dragging = false; });
        const state = { hoverBtn: true, hoverBox: false, box };
        target.__noteHover = state;
        function scheduleHide(){
          setTimeout(function(){
            if(!state.hoverBtn && !state.hoverBox){
              box.style.display = 'none';
            }
          }, 120);
        }
        closeBtn.addEventListener('click', function(){
          const text = textarea.value || '';
          target.setAttribute('data-note-detail', text);
          try {
            const key = 'note:' + (target.id || target.name || target.placeholder || target.tagName);
            localStorage.setItem(key, text);
          } catch(e){}
          box.style.display = 'none';
        });
        anchorBtn.addEventListener('mouseleave', function(){
          state.hoverBtn = false;
          scheduleHide();
        });
        box.addEventListener('mouseenter', function(){
          state.hoverBox = true;
        });
        box.addEventListener('mouseleave', function(){
          state.hoverBox = false;
          scheduleHide();
        });
        document.body.appendChild(box);
        target.__noteBox = box;
      } else {
        if(target.__noteHover) target.__noteHover.hoverBtn = true;
      }
      box.style.display = 'block';
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sw = window.scrollX;
      const sh = window.scrollY;
      const bw = box.offsetWidth || 360;
      const bh = box.offsetHeight || 120;
      const btnRect = anchorBtn.getBoundingClientRect();
      let x = sw + btnRect.right + 8;
      let y = sh + btnRect.top + 8;
      if (x + bw > sw + vw) x = sw + btnRect.left - bw - 8;
      if (x < sw) x = sw + 8;
      if (y + bh > sh + vh) y = sh + btnRect.bottom - bh - 8;
      if (y < sh) y = sh + 8;
      box.style.left = x + 'px';
      box.style.top = y + 'px';
    }
    function injectNotes(){
      document.querySelectorAll('[data-rule-detail],[data-note-detail]').forEach(function(el){
        if(!el.__noteInjected) createNoteBtn(el);
      });
      const observer = new MutationObserver(function(mutations){
        mutations.forEach(function(m){
          m.addedNodes && m.addedNodes.forEach(function(node){
            if(node.nodeType === 1){
              if(node.matches && (node.matches('[data-rule-detail],[data-note-detail]'))){
                if(!node.__noteInjected) createNoteBtn(node);
              }
              node.querySelectorAll && node.querySelectorAll('[data-rule-detail],[data-note-detail]').forEach(function(el){
                if(!el.__noteInjected) createNoteBtn(el);
              });
            }
          });
        });
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
    document.addEventListener('DOMContentLoaded', injectNotes);
  })();
</script>
```

### 5. 定位与越界约束
- 初始定位优先目标右下；若越界自动改为左侧或上方，并限定在可视区域内。
- 拖动备注框时限制在页面可视区域内，不允许越界。
 - 非弹窗页面的备注图标置于所有弹窗之下；弹窗内元素也自动注入备注图标。

## 执行步骤
1. 识别目标：确定需添加规则的 HTML 元素。
2. 生成初稿：依据模板与启发式从 Step6 PRD 提取规则，形成初稿文本。
3. 注入样式：插入本技能的样式代码。
4. 批量绑定：为目标元素添加 `data-note-detail`，并可携带 `data-rule-detail` 作为初始值。
5. 注入脚本：添加备注按钮与备注框交互脚本（悬停触发）。
6. 人工修订与验收：逐个组件核对规则文本并检查交互覆盖。

## 可编辑流程
- 直接编辑：在 HTML 中修改 `data-note-detail` 或 `data-rule-detail` 的内容，支持换行。
- 就地编辑（轻量JS）：
```html
<script>
  document.addEventListener('click', function(e){
    if(e.shiftKey && e.target){
      if(e.target.hasAttribute('data-note-detail') || e.target.hasAttribute('data-rule-detail')){
        var cur = e.target.getAttribute('data-note-detail') || e.target.getAttribute('data-rule-detail') || '';
        var next = prompt('编辑备注/规则（支持\\n换行）', cur);
        if(next !== null){
          e.target.setAttribute('data-note-detail', next);
        }
      }
    }
  });
</script>
```
- 使用说明：Shift+单击带规则的元素，弹出编辑框；修改后即可即时预览（不持久化，需保存到源文件）。

## 质量验收清单
- 关键控件均注入可拖动备注按钮“≡”，悬停展示备注框
- 文本清晰简洁，包含必填与格式说明、默认值、反馈与异常处理
- 视觉统一：按钮与备注框样式一致、遮挡少、性能平滑
- 关键路径规则可见：主路径均能通过悬停“≡”查看规则备注
- 与 Step6 PRD 一致：用词与约束不偏离已确认设计
- 不包含黑色悬浮说明框与抽屉式“规则”呈现
 - 弹窗适配：弹窗内元素均注入“≡”按钮；页面元素的备注图标不会遮挡弹窗内容

## 批量注入示例（片段）
```html
<!-- 字段 -->
<div class="field-group">
  <label data-note-detail="必填；长度20；默认空；与输入框一致" data-rule-detail="标签含*：必填；长度20；默认空">用户名称*</label>
  <input type="text" data-note-detail="必填；最大长度20；提交前去除首尾空格；错误提示详尽" data-rule-detail="必填；最大长度20；提交前去除首尾空格；错误提示：用户名必填且不超过20字符">
</div>
<!-- 按钮 -->
<button class="btn" data-note-detail="动作：提交；成功：提示并清空；失败：展示错误信息" data-rule-detail="动作：提交；前置：字段均校验通过；成功：提示并清空；失败：展示错误信息">提交</button>
<!-- 筛选 -->
<select data-note-detail="单选；默认“全部”；选择后点击“应用”生效；支持清空" data-rule-detail="单选；默认“全部”；选择后需点击“应用”生效；支持清空">状态</select>
```
