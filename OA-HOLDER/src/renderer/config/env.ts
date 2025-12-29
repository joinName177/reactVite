/**
 * 环境配置
 * 通过 VITE_APP_ENV 区分不同环境，自动加载对应的配置
 */
import { env as envConfigs } from './dev.config';

export type EnvMode = 'development' | 're' | 'production';

// 环境变量配置接口
interface EnvVariables {
  VERBOSE: string;
  PRODUCT_NAME_CH: string;
  PRODUCT_NAME: string;
  API_PROTOCOL: string;
  API_HOST: string;
  API_FILE_HOST: string;
  MANAGE_SERVICE?: string;
  BOSH_SERVICE: string;
  ROOM_SERVICE: string;
  IPSUFFIX: string;
  API_BASE_PATH: string;
  CLOUDDISK_SERVICE: string;
  SOCKET_SERVER?: string;
  ORG_URL: string;
  ODOO_MY_APP: string;
  UPGRADE_URL: string;
  WEBSOCKET_URL: string;
  PLAN_WS_URL: string;
  PLAN_WS_URL_BETA: string;
  PART_UPDATE_URL: string;
  CRM_SALES_SERVICE: string;
  KEYCLOAK_SERVICE: string;
  KEYCLOAK_REALM: string;
  KEYCLOAK_CLIENT: string;
  OUTSIDE_EMB_SERVICE: string;
  ORG_SELECT_SERVICE: string;
  DOC_PLAN_URL: string;
  TRACK_SERVICE?: string;
  CRASH_REPORT_SERVICE: string;
  METABASE_URL?: string;
}

interface EnvConfig {
  env: EnvMode;
  variables: EnvVariables;
  // 便捷属性
  title: string;
  apiBaseUrl: string;
  wsUrl: string;
  debug: boolean;
}

// 获取环境变量，支持 development、re、production
const getEnvMode = (): EnvMode => {
  const env = import.meta.env.VITE_APP_ENV || import.meta.env.MODE;
  
  // 将 re 环境映射为 production 模式（Vite 只支持 development 和 production）
  if (env === 're') {
    return 're';
  }
  
  if (env === 'production' || import.meta.env.PROD) {
    return 'production';
  }
  
  return 'development';
};

const envMode = getEnvMode();

// 根据环境选择对应的配置
const getEnvConfig = (): EnvVariables => {
  switch (envMode) {
    case 're':
      return envConfigs.re.variables;
    case 'production':
      return envConfigs.prod.variables;
    case 'development':
    default:
      return envConfigs.dev.variables;
  }
};

const variables = getEnvConfig();

// 构建完整的 API URL
const buildApiBaseUrl = (): string => {
  const protocol = variables.API_PROTOCOL || 'https://';
  const host = variables.API_HOST || '';
  const basePath = variables.API_BASE_PATH || '';
  return `${protocol}${host}${basePath}`;
};

const config: EnvConfig = {
  env: envMode,
  variables,
  // 便捷属性
  title: variables.PRODUCT_NAME_CH || 'OA-HOLDER',
  apiBaseUrl: buildApiBaseUrl(),
  wsUrl: variables.WEBSOCKET_URL || '',
  debug: import.meta.env.VITE_DEBUG === 'true' || envMode === 'development',
};

export default config;

// 导出便捷方法
export const isDevelopment = () => config.env === 'development';
export const isRe = () => config.env === 're';
export const isProduction = () => config.env === 'production';

// 导出变量配置（方便直接访问）
export const envVariables = variables;

