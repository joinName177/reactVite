export type AppEnv = 'development' | 're' | 'production'

export interface AppConfig {
  env: AppEnv
  isDev: boolean
  isProd: boolean
  isRe: boolean
  devServerUrl: string
  appTitle: string
}

export function getAppConfig(): AppConfig {
  const isDev = process.env.NODE_ENV === 'development'
  const env = (process.env.VITE_APP_ENV || (isDev ? 'development' : 'production')) as AppEnv

  return {
    env,
    isDev,
    isProd: env === 'production',
    isRe: env === 're',
    devServerUrl: 'http://localhost:5173',
    appTitle: 'Holder 工作台',
  }
}
