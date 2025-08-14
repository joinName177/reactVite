import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { HttpMethod, ContentType } from "../types/api";
import type { RequestConfig, ApiResponse, ApiError } from "../types/api";
import { envConfig } from "../config/env";
import { message } from "antd";

/**
 * HTTP请求封装类
 * 符合RESTful标准，支持GET、POST、PUT、DELETE四种请求方式
 * 支持form和json格式参数
 */
export class HttpClient {
  private instance: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = "", timeout: number = 10000) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      timeout,
      headers: {
        "Content-Type": ContentType.JSON
      }
    });

    this.setupInterceptors();
  }

  /**
   * 设置请求和响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 添加认证token
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // 处理请求数据格式
        if (config.data && config.headers["Content-Type"] === ContentType.FORM) {
          config.data = this.convertToFormData(config.data);
        }

        console.log("🚀 Request:", config.method?.toUpperCase(), config.url, config.data);
        return config;
      },
      (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log("✅ Response:", response.status, response.config.url, response.data);

        if (response?.data?.returnCode !== 0) {
          message.error(response?.data?.returnMessage);
          return Promise.reject(response?.data?.returnMessage);
        }

        return response.data;
      },
      (error: AxiosError) => {
        console.error("❌ Response Error:", error.response?.status, error.message);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * 获取认证token
   */
  private getAuthToken(): string | null {
    return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
  }

  /**
   * 将对象转换为FormData格式
   */
  private convertToFormData(data: Record<string, unknown>): string {
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    return formData.toString();
  }

  /**
   * 处理错误响应
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // 服务器返回错误状态码
      const responseData = error.response.data as Record<string, unknown>;
      return {
        message: (responseData?.message as string) || error.message,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        config: error.config as RequestConfig
      };
    } else if (error.request) {
      // 请求已发出但没有收到响应
      return {
        message: "网络错误，请检查网络连接",
        config: error.config as RequestConfig
      };
    } else {
      // 请求配置错误
      return {
        message: error.message || "请求配置错误",
        config: error.config as RequestConfig
      };
    }
  }

  /**
   * 通用请求方法
   */
  private async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    const axiosConfig: AxiosRequestConfig = {
      method: config.method,
      url: config.url,
      params: config.params,
      data: config.data,
      headers: {
        "Content-Type": config.contentType || ContentType.JSON,
        ...config.headers
      },
      timeout: config.timeout,
      responseType: config.responseType || "json"
    };

    const response = await this.instance.request(axiosConfig);

    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers as Record<string, string>,
      config: config
    };
  }

  /**
   * GET请求
   */
  async get<T>(url: string, params?: Record<string, unknown>, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: HttpMethod.GET,
      url,
      params,
      ...config
    });
  }

  /**
   * POST请求
   */
  async post<T>(url: string, data?: unknown, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: HttpMethod.POST,
      url,
      data,
      ...config
    });
  }

  /**
   * PUT请求
   */
  async put<T>(url: string, data?: unknown, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: HttpMethod.PUT,
      url,
      data,
      ...config
    });
  }

  /**
   * DELETE请求
   */
  async delete<T>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: HttpMethod.DELETE,
      url,
      ...config
    });
  }

  /**
   * POST请求 - Form格式
   */
  async postForm<T>(url: string, data?: Record<string, unknown>, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.post<T>(url, data, {
      contentType: ContentType.FORM,
      ...config
    });
  }

  /**
   * PUT请求 - Form格式
   */
  async putForm<T>(url: string, data?: Record<string, unknown>, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.put<T>(url, data, {
      contentType: ContentType.FORM,
      ...config
    });
  }

  /**
   * 文件上传
   */
  async upload<T>(url: string, file: File, fieldName: string = "file", additionalData?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append(fieldName, file);

    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });
    }

    return this.post<T>(url, formData, {
      contentType: ContentType.MULTIPART
    });
  }

  /**
   * 设置认证token
   */
  setAuthToken(token: string, persist: boolean = true): void {
    if (persist) {
      localStorage.setItem("access_token", token);
    } else {
      sessionStorage.setItem("access_token", token);
    }
  }

  /**
   * 清除认证token
   */
  clearAuthToken(): void {
    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
  }

  /**
   * 设置请求头
   */
  setHeader(key: string, value: string): void {
    this.instance.defaults.headers.common[key] = value;
  }

  /**
   * 移除请求头
   */
  removeHeader(key: string): void {
    delete this.instance.defaults.headers.common[key];
  }
}

// 创建默认实例
export const httpClient = new HttpClient(envConfig.API_BASE_URL);
