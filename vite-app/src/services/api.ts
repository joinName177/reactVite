import { httpClient } from "../utils/http";
// import type { PaginatedResponse } from "../types/api";

// 用户相关接口
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
}

interface CurrentUserResponse {
  account: string;
  email: string;
  id: number;
  phoneNumber: string;
  profile: string;
  sex: number;
  username: string;
}

// 用户API服务
export class UserApiService {
  private static readonly BASE_URL = "/auth/admin/realms/paas";

  // 获取当前登录用户信息
  static async getCurrentUser(params: { phoneOrEmail: string; type: number }): Promise<CurrentUserResponse> {
    const response = await httpClient.postForm<CurrentUserResponse>(`${this.BASE_URL}/enterpriseUser/findUser`, params);
    return response.data;
  }

  /**
   * 用户登出
   */
  static async logout(): Promise<void> {
    await httpClient.post("/auth/logout");
    httpClient.clearAuthToken();
  }

  /**
   * 使用Form格式创建用户（示例）
   */
  static async createUserForm(userData: CreateUserRequest): Promise<User> {
    const response = await httpClient.postForm<User>(this.BASE_URL, userData as unknown as Record<string, unknown>);
    return response.data;
  }
}

// 文件上传API服务
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export class FileApiService {
  private static readonly BASE_URL = "/files";

  /**
   * 上传单个文件
   */
  static async uploadFile(file: File, additionalData?: Record<string, unknown>): Promise<UploadResponse> {
    const response = await httpClient.upload<UploadResponse>(`${this.BASE_URL}/upload`, file, "file", additionalData);
    return response.data;
  }

  /**
   * 删除文件
   */
  static async deleteFile(filename: string): Promise<void> {
    await httpClient.delete(`${this.BASE_URL}/${filename}`);
  }
}

// 通用CRUD API服务基类
export abstract class BaseApiService<T, CreateRequest, UpdateRequest> {
  protected abstract readonly baseUrl: string;

  async getList(params?: Record<string, unknown>): Promise<T[]> {
    const response = await httpClient.get<T[]>(this.baseUrl, params);
    return response.data;
  }

  async getById(id: number | string): Promise<T> {
    const response = await httpClient.get<T>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async create(data: CreateRequest): Promise<T> {
    const response = await httpClient.post<T>(this.baseUrl, data);
    return response.data;
  }

  async update(id: number | string, data: UpdateRequest): Promise<T> {
    const response = await httpClient.put<T>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async delete(id: number | string): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${id}`);
  }
}

// 导出默认实例
export { httpClient };
