/**
 * Axios RESTful API 请求工具
 * 符合 RESTful 标准，支持完整的 HTTP 方法
 */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  CancelTokenSource
} from 'axios'
import { message } from 'antd'
import envConfig from '@/config/env'

// 响应数据接口
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
  success?: boolean
}

// 请求配置扩展
export interface RequestConfig extends AxiosRequestConfig {
  // 是否显示错误提示（默认 true）
  showError?: boolean
  // 是否显示成功提示（默认 false）
  showSuccess?: boolean
  // 成功提示消息
  successMessage?: string
  // 是否取消重复请求（默认 false）
  cancelRepeat?: boolean
  // 是否将 JSON 数据转换为 FormData（默认 false，使用 JSON 格式）
  isFormData?: boolean
}

// 请求取消控制器映射
const cancelTokenMap = new Map<string, CancelTokenSource>()

class Request {
  private instance: AxiosInstance
  private baseURL: string

  constructor() {
    this.baseURL = envConfig.apiBaseUrl
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: 30000, // 30秒超时
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  /**
   * 设置请求和响应拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // 添加 Token
        const token = this.getToken()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // 处理 FormData：删除 Content-Type，让浏览器自动设置（包含 boundary）
        // 注意：这里只处理已经是 FormData 的情况，转换逻辑在方法内部完成
        if (config.data instanceof FormData && config.headers) {
          delete config.headers['Content-Type']
        }

        // 处理取消重复请求
        const requestKey = this.getRequestKey(config)
        const requestConfig = config as RequestConfig

        if (requestConfig.cancelRepeat) {
          // 取消之前的相同请求
          const cancelToken = cancelTokenMap.get(requestKey)
          if (cancelToken) {
            cancelToken.cancel('请求被取消：重复请求')
          }

          // 创建新的取消令牌
          const source = axios.CancelToken.source()
          config.cancelToken = source.token
          cancelTokenMap.set(requestKey, source)
        }

        // 开发环境打印请求信息
        if (envConfig.debug) {
          console.log('🚀 请求:', {
            url: config.url,
            method: config.method,
            params: config.params,
            data: config.data
          })
        }

        return config
      },
      (error: AxiosError) => {
        console.error('请求错误:', error)
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const config = response.config as RequestConfig
        const requestKey = this.getRequestKey(config)

        // 清除取消令牌
        if (config.cancelRepeat) {
          cancelTokenMap.delete(requestKey)
        }

        const { data } = response
        const requestConfig = config as RequestConfig

        // 开发环境打印响应信息
        if (envConfig.debug) {
          console.log('✅ 响应:', {
            url: config.url,
            data
          })
        }

        // 根据业务状态码处理
        if (data.code !== undefined) {
          // 业务错误处理
          if (data.code !== 200 && data.code !== 0) {
            const errorMessage = data.message || '请求失败'

            if (requestConfig.showError !== false) {
              message.error(errorMessage)
            }

            return Promise.reject(new Error(errorMessage))
          }

          // 成功提示
          if (requestConfig.showSuccess && requestConfig.successMessage) {
            message.success(requestConfig.successMessage)
          }

          return data.data !== undefined ? data.data : data
        }

        // 如果没有业务状态码，直接返回 data
        return data
      },
      (error: AxiosError<ApiResponse>) => {
        const config = error.config as RequestConfig | undefined
        const requestKey = config ? this.getRequestKey(config) : ''

        // 清除取消令牌
        if (config?.cancelRepeat) {
          cancelTokenMap.delete(requestKey)
        }

        // 处理取消请求
        if (axios.isCancel(error)) {
          console.log('请求已取消:', error.message)
          return Promise.reject(error)
        }

        // 处理 HTTP 错误
        this.handleError(error, config)
        return Promise.reject(error)
      }
    )
  }

  /**
   * 获取请求唯一标识
   */
  private getRequestKey(config: AxiosRequestConfig): string {
    return `${config.method}-${config.url}-${JSON.stringify(
      config.params
    )}-${JSON.stringify(config.data)}`
  }

  /**
   * 获取 Token
   */
  private getToken(): string | null {
    try {
      return localStorage.getItem('token')
    } catch {
      return null
    }
  }

  /**
   * 处理错误
   */
  private handleError(
    error: AxiosError<ApiResponse>,
    config?: RequestConfig
  ): void {
    const showError = config?.showError !== false

    if (error.response) {
      // 服务器返回了错误状态码
      const { status, data } = error.response
      let errorMessage = '请求失败'

      switch (status) {
        case 400:
          errorMessage = data?.message || '请求参数错误'
          break
        case 401:
          errorMessage = '未授权，请重新登录'
          // 清除 token 并跳转到登录页
          this.handleUnauthorized()
          break
        case 403:
          errorMessage = data?.message || '拒绝访问'
          break
        case 404:
          errorMessage = data?.message || '请求的资源不存在'
          break
        case 500:
          errorMessage = data?.message || '服务器内部错误'
          break
        case 502:
          errorMessage = '网关错误'
          break
        case 503:
          errorMessage = '服务不可用'
          break
        case 504:
          errorMessage = '网关超时'
          break
        default:
          errorMessage = data?.message || `请求失败 (${status})`
      }

      if (showError) {
        message.error(errorMessage)
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      const errorMessage = '网络错误，请检查网络连接'
      if (showError) {
        message.error(errorMessage)
      }
    } else {
      // 其他错误
      const errorMessage = error.message || '请求失败'
      if (showError) {
        message.error(errorMessage)
      }
    }
  }

  /**
   * 处理未授权（401）
   */
  private handleUnauthorized(): void {
    try {
      localStorage.removeItem('token')
      // 如果使用 Redux，可以在这里 dispatch clearToken
      // dispatch(clearToken());

      // 跳转到登录页
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('处理未授权错误:', error)
    }
  }

  /**
   * 将 JSON 对象转换为 FormData
   * @param data JSON 对象
   * @returns FormData 对象
   */
  private convertToFormData(data: Record<string, any>): FormData {
    const formData = new FormData()

    const appendValue = (key: string, value: any) => {
      if (value === null || value === undefined) {
        return
      }

      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        // 数组处理：可以按需选择追加方式
        value.forEach((item, index) => {
          if (item instanceof File || item instanceof Blob) {
            formData.append(key, item)
          } else if (typeof item === 'object' && item !== null) {
            formData.append(`${key}[${index}]`, JSON.stringify(item))
          } else {
            formData.append(`${key}[${index}]`, String(item))
          }
        })
      } else if (typeof value === 'object') {
        // 对象处理：转换为 JSON 字符串或展开
        formData.append(key, JSON.stringify(value))
      } else {
        formData.append(key, String(value))
      }
    }

    Object.keys(data).forEach(key => {
      appendValue(key, data[key])
    })

    return formData
  }

  /**
   * GET 请求 - 获取资源
   * @param url 请求地址
   * @param params 查询参数
   * @param config 请求配置
   */
  get<T = any>(
    url: string,
    params?: Record<string, any>,
    config?: RequestConfig
  ): Promise<T> {
    return this.instance.get<T>(url, {
      params,
      ...config
    }) as Promise<T>
  }

  /**
   * POST 请求 - 创建资源
   * 根据配置决定数据格式：
   * - isFormData = true: 将 JSON 对象转换为 FormData
   * - isFormData = false 或未设置: 使用 JSON 格式（默认）
   * @param url 请求地址
   * @param data 请求体数据（JSON 对象）
   * @param config 请求配置
   */
  post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const requestConfig: RequestConfig = { ...config }
    let requestData = data

    // 根据 isFormData 配置决定数据格式
    if (
      requestConfig.isFormData &&
      data &&
      typeof data === 'object' &&
      !(data instanceof FormData)
    ) {
      // 转换为 FormData
      requestData = this.convertToFormData(data)
      // FormData 格式：删除 Content-Type，让浏览器自动设置（包含 boundary）
      if (requestConfig.headers) {
        const headers = { ...requestConfig.headers } as Record<string, any>
        delete headers['Content-Type']
        requestConfig.headers = headers
      } else {
        requestConfig.headers = {}
      }
    } else if (
      data &&
      typeof data === 'object' &&
      !(data instanceof FormData) &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      // JSON 格式：设置 Content-Type 为 application/json
      requestConfig.headers = {
        ...requestConfig.headers,
        'Content-Type': 'application/json'
      }
    }

    return this.instance.post<T>(url, requestData, requestConfig) as Promise<T>
  }

  /**
   * PUT 请求 - 完整更新资源（替换整个资源）
   * 根据配置决定数据格式：
   * - isFormData = true: 将 JSON 对象转换为 FormData
   * - isFormData = false 或未设置: 使用 JSON 格式（默认）
   * @param url 请求地址
   * @param data 请求体数据（JSON 对象）
   * @param config 请求配置
   */
  put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const requestConfig: RequestConfig = { ...config }
    let requestData = data

    // 根据 isFormData 配置决定数据格式
    if (
      requestConfig.isFormData &&
      data &&
      typeof data === 'object' &&
      !(data instanceof FormData)
    ) {
      // 转换为 FormData
      requestData = this.convertToFormData(data)
      // FormData 格式：删除 Content-Type，让浏览器自动设置
      if (requestConfig.headers) {
        const headers = { ...requestConfig.headers } as Record<string, any>
        delete headers['Content-Type']
        requestConfig.headers = headers
      } else {
        requestConfig.headers = {}
      }
    } else if (
      data &&
      typeof data === 'object' &&
      !(data instanceof FormData) &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      // JSON 格式：设置 Content-Type 为 application/json
      requestConfig.headers = {
        ...requestConfig.headers,
        'Content-Type': 'application/json'
      }
    }

    return this.instance.put<T>(url, requestData, requestConfig) as Promise<T>
  }

  /**
   * PATCH 请求 - 部分更新资源（只更新提供的字段）
   * 根据配置决定数据格式：
   * - isFormData = true: 将 JSON 对象转换为 FormData
   * - isFormData = false 或未设置: 使用 JSON 格式（默认）
   * @param url 请求地址
   * @param data 请求体数据（JSON 对象）
   * @param config 请求配置
   */
  patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const requestConfig: RequestConfig = { ...config }
    let requestData = data

    // 根据 isFormData 配置决定数据格式
    if (
      requestConfig.isFormData &&
      data &&
      typeof data === 'object' &&
      !(data instanceof FormData)
    ) {
      // 转换为 FormData
      requestData = this.convertToFormData(data)
      // FormData 格式：删除 Content-Type，让浏览器自动设置
      if (requestConfig.headers) {
        const headers = { ...requestConfig.headers } as Record<string, any>
        delete headers['Content-Type']
        requestConfig.headers = headers
      } else {
        requestConfig.headers = {}
      }
    } else if (
      data &&
      typeof data === 'object' &&
      !(data instanceof FormData) &&
      !(data instanceof Blob) &&
      !(data instanceof ArrayBuffer)
    ) {
      // JSON 格式：设置 Content-Type 为 application/json
      requestConfig.headers = {
        ...requestConfig.headers,
        'Content-Type': 'application/json'
      }
    }

    return this.instance.patch<T>(url, requestData, requestConfig) as Promise<T>
  }

  /**
   * DELETE 请求 - 删除资源
   * @param url 请求地址
   * @param config 请求配置
   */
  delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance.delete<T>(url, config) as Promise<T>
  }

  /**
   * HEAD 请求 - 获取资源的元信息
   * @param url 请求地址
   * @param config 请求配置
   */
  head<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance
      .head<T>(url, config)
      .then(response => response.data as T)
  }

  /**
   * OPTIONS 请求 - 获取服务器支持的 HTTP 方法
   * @param url 请求地址
   * @param config 请求配置
   */
  options<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.instance
      .options<T>(url, config)
      .then(response => response.data as T)
  }

  /**
   * 文件上传
   * @param url 请求地址
   * @param formData FormData 对象
   * @param config 请求配置（可包含 onUploadProgress 等）
   */
  upload<T = any>(
    url: string,
    formData: FormData,
    config?: RequestConfig & {
      onUploadProgress?: (progressEvent: ProgressEvent) => void
    }
  ): Promise<T> {
    return this.instance.post<T>(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config?.headers
      }
    }) as Promise<T>
  }

  /**
   * 文件下载
   * @param url 请求地址
   * @param params 查询参数
   * @param filename 下载文件名
   * @param config 请求配置
   */
  download(
    url: string,
    params?: Record<string, any>,
    filename?: string,
    config?: RequestConfig
  ): Promise<void> {
    return this.instance
      .get(url, {
        params,
        responseType: 'blob',
        ...config
      })
      .then(response => {
        const blob = new Blob([response.data])
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = filename || 'download'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(downloadUrl)
      })
  }

  /**
   * 取消所有请求
   */
  cancelAllRequests(): void {
    cancelTokenMap.forEach(source => {
      source.cancel('取消所有请求')
    })
    cancelTokenMap.clear()
  }

  /**
   * 获取 axios 实例（用于特殊需求）
   */
  getInstance(): AxiosInstance {
    return this.instance
  }
}

// 导出单例实例
export default new Request()
