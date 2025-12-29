/**
 * API 请求工具
 * 使用环境配置中的 API 地址
 */
import envConfig from '@/config/env';

class Request {
  private baseURL: string;

  constructor() {
    // 使用环境配置中的 API 地址
    this.baseURL = envConfig.apiBaseUrl;
  }

  /**
   * GET 请求
   */
  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    const response = await fetch(`${this.baseURL}${url}${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }

  /**
   * POST 请求
   */
  async post<T>(url: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  /**
   * PUT 请求
   */
  async put<T>(url: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  /**
   * DELETE 请求
   */
  async delete<T>(url: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }
}

export default new Request();

