// 环境配置管理

interface EnvConfig {
  API_BASE_URL: string;
  APP_TITLE: string;
  APP_VERSION: string;
  DEV_MODE: boolean;
  LOG_LEVEL: 'debug' | 'info' | 'warn' | 'error';
}

// 从环境变量获取配置
export const envConfig: EnvConfig = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  APP_TITLE: import.meta.env.VITE_APP_TITLE || 'React Vite App',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  DEV_MODE: import.meta.env.VITE_DEV_MODE === 'true' || import.meta.env.DEV,
  LOG_LEVEL: (import.meta.env.VITE_LOG_LEVEL as EnvConfig['LOG_LEVEL']) || 'info',
};

// 开发环境配置
export const devConfig = {
  API_TIMEOUT: 10000,
  ENABLE_MOCK: true,
  LOG_REQUESTS: true,
  LOG_RESPONSES: true,
};

// 生产环境配置
export const prodConfig = {
  API_TIMEOUT: 30000,
  ENABLE_MOCK: false,
  LOG_REQUESTS: false,
  LOG_RESPONSES: false,
};

// 根据环境获取配置
export const getConfig = () => {
  return envConfig.DEV_MODE ? devConfig : prodConfig;
};

// 验证环境配置
export const validateEnvConfig = (): void => {
  const requiredVars = ['VITE_API_BASE_URL'];
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.warn(`⚠️ 缺少环境变量: ${missingVars.join(', ')}`);
    console.warn('请检查 .env 文件配置');
  }
};

// 导出默认配置
export default envConfig; 