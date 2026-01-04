// import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import 'antd/dist/reset.css' // Ant Design 5.x 使用 reset.css
import { tools } from './utils/tools'
import request from './utils/request'
import { Maths } from './utils/math'

// 将工具函数挂载到全局，可以在任何地方直接使用，无需 import
if (typeof window !== 'undefined') {
  // 挂载工具函数到 window 对象
  ;(window as any).$tools = tools

  // 挂载 API 请求工具到 window 对象
  ;(window as any).holderApi = request

  // 挂载数学工具到 window 对象
  ;(window as any).Maths = Maths

  // 挂载到 globalThis（支持所有环境）
  ;(globalThis as any).$tools = tools
  ;(globalThis as any).holderApi = request
  ;(globalThis as any).Maths = Maths

  // 为了兼容性，也挂载到全局作用域（浏览器环境）
  // 注意：这需要在非严格模式下才能工作，或者通过 window 访问
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
