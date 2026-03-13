import { envConfig } from './env'

export interface IModuleConfig {
  /** 模块唯一标识 */
  id: string
  /** 显示名称 */
  title: string
  /** 开发环境下的 dev server 地址 */
  devUrl: string
  /** 生产环境下相对于 renderer 的路径 */
  prodPath: string
}

/** 所有独立模块的注册表 */
export const MODULE_REGISTRY: Record<string, IModuleConfig> = {
  'task-manager': {
    id: 'task-manager',
    title: '任务管理',
    devUrl: 'http://localhost:5174',
    prodPath: '../modules/task-manager/index.html',
  },
}

/**
 * 根据当前环境解析模块的加载 URL
 * - development: 指向该模块的 Vite dev server
 * - production:  指向 dist/modules/<id>/index.html
 */
export function resolveModuleUrl(moduleId: string): string | null {
  const config = MODULE_REGISTRY[moduleId]
  if (!config) return null
  return envConfig.env === 'development' ? config.devUrl : config.prodPath
}
