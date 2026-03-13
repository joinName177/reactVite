import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { lightTheme } from '@holder/ui/theme'

export default function App() {
  return (
    <ConfigProvider locale={zhCN} theme={lightTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
