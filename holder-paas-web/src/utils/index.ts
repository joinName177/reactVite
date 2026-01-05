// utils/index.ts
export * from 'lodash-es'

// 导出常用工具函数
export const formatDate = (date: Date | number | string, format = 'YYYY-MM-DD HH:mm:ss') => {
  // 这里可以使用 dayjs，但为了减少依赖，先提供一个简单实现
  const d = new Date(date)
  return d.toLocaleString('zh-CN')
}

