/* eslint-disable @typescript-eslint/no-explicit-any */
// API请求和响应的类型定义

// 请求方法枚举
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

// 请求参数格式
export enum ContentType {
  JSON = 'application/json',
  FORM = 'application/x-www-form-urlencoded',
  MULTIPART = 'multipart/form-data'
}

// 请求配置接口
export interface RequestConfig {
  method: HttpMethod;
  url: string;
  params?: Record<string, any>; // URL查询参数
  data?: any; // 请求体数据
  headers?: Record<string, string>;
  timeout?: number;
  contentType?: ContentType;
  responseType?: 'json' | 'text' | 'blob' | 'arraybuffer';
}

// 响应接口
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

// 错误响应接口
export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  data?: any;
  config?: RequestConfig;
}

// 分页参数接口
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

// 分页响应接口
export interface PaginatedResponse<T> {
  list: T[];
  pagination: PaginationParams;
}

// 通用响应格式
export interface CommonResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
} 