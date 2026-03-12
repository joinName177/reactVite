export interface EnvConfig {
  env: string
  apiBaseUrl: string
  wsBaseUrl: string
  title: string
  debug: boolean
}

function getEnvConfig(): EnvConfig {
  const env = import.meta.env.VITE_APP_ENV || 'development'
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
  const wsBaseUrl = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:3000'

  return {
    env,
    apiBaseUrl,
    wsBaseUrl,
    title: import.meta.env.VITE_APP_TITLE || 'Holder 工作台',
    debug: env === 'development',
  }
}

export const envConfig = getEnvConfig()

export function isDevelopment(): boolean {
  return envConfig.env === 'development'
}

export function isRe(): boolean {
  return envConfig.env === 're'
}

export function isProduction(): boolean {
  return envConfig.env === 'production'
}
