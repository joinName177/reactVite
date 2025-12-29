# 公共静态资源目录

## 说明

`public/` 目录下的文件会被 Vite 直接复制到输出目录的根目录，不会被 Vite 处理。

## 使用方式

### 在 HTML 中直接引用

```html
<img src="/images/logo.png" alt="Logo" />
```

### 在 React 组件中使用

```tsx
const MyComponent = () => {
  return (
    <div>
      <img src="/images/logo.png" alt="Logo" />
    </div>
  );
};
```

## 适用场景

- 需要在 HTML 中直接引用的资源
- 需要固定路径的资源（如 favicon）
- 不需要被 Vite 处理的静态文件

## 注意事项

1. **路径**：使用绝对路径 `/images/xxx.png`，不要使用相对路径
2. **文件大小**：public 目录的文件会直接复制，不会优化，注意文件大小
3. **推荐**：大部分情况下，建议使用 `src/renderer/assets/` 目录，让 Vite 处理资源

