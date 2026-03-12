import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosProgressEvent,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'
import type { IApiResponse, IRequestConfig } from '@holder/shared-types'

export interface HttpClientConfig {
  baseURL: string
  timeout?: number
  getToken?: () => string | null
  onUnauthorized?: () => void
  onError?: (message: string) => void
  onSuccess?: (message: string) => void
  debug?: boolean
}

export type RequestInterceptor = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse

export class HttpClient {
  private instance: AxiosInstance
  private config: HttpClientConfig

  constructor(config: HttpClientConfig) {
    this.config = config
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: config.timeout ?? 30000,
      headers: { 'Content-Type': 'application/json' },
    })
    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = this.config.getToken?.()
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }

        if (config.data instanceof FormData && config.headers) {
          delete config.headers['Content-Type']
        }

        if (this.config.debug) {
          console.log('[API] Request:', config.method?.toUpperCase(), config.url)
        }

        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse<IApiResponse>) => {
        const { data } = response
        const requestConfig = response.config as InternalAxiosRequestConfig & IRequestConfig

        if (this.config.debug) {
          console.log('[API] Response:', response.config.url, data)
        }

        if (data.code !== undefined) {
          if (data.code !== 200 && data.code !== 0) {
            const errorMessage = data.message || '请求失败'
            if (requestConfig.showError !== false) {
              this.config.onError?.(errorMessage)
            }
            return Promise.reject(new Error(errorMessage))
          }

          if (requestConfig.showSuccess && requestConfig.successMessage) {
            this.config.onSuccess?.(requestConfig.successMessage)
          }
        }

        return response
      },
      (error: AxiosError<IApiResponse>) => {
        if (error.response?.status === 401) {
          this.config.onUnauthorized?.()
        }

        const errorMessage = error.response?.data?.message
          || this.getHttpErrorMessage(error.response?.status)
          || error.message
          || '请求失败'

        const requestConfig = error.config as IRequestConfig | undefined
        if (requestConfig?.showError !== false) {
          this.config.onError?.(errorMessage)
        }

        return Promise.reject(error)
      }
    )
  }

  private getHttpErrorMessage(status?: number): string {
    const messages: Record<number, string> = {
      400: '请求参数错误',
      401: '未授权，请重新登录',
      403: '拒绝访问',
      404: '请求的资源不存在',
      500: '服务器内部错误',
      502: '网关错误',
      503: '服务不可用',
      504: '网关超时',
    }
    return status ? messages[status] || `请求失败 (${status})` : ''
  }

  get<T = any>(url: string, params?: Record<string, any>, config?: IRequestConfig & AxiosRequestConfig): Promise<T> {
    return this.instance.get<T>(url, { params, ...config }) as Promise<T>
  }

  post<T = any>(url: string, data?: any, config?: IRequestConfig & AxiosRequestConfig): Promise<T> {
    return this.instance.post<T>(url, data, config as AxiosRequestConfig) as Promise<T>
  }

  put<T = any>(url: string, data?: any, config?: IRequestConfig & AxiosRequestConfig): Promise<T> {
    return this.instance.put<T>(url, data, config as AxiosRequestConfig) as Promise<T>
  }

  patch<T = any>(url: string, data?: any, config?: IRequestConfig & AxiosRequestConfig): Promise<T> {
    return this.instance.patch<T>(url, data, config as AxiosRequestConfig) as Promise<T>
  }

  delete<T = any>(url: string, config?: IRequestConfig & AxiosRequestConfig): Promise<T> {
    return this.instance.delete<T>(url, config as AxiosRequestConfig) as Promise<T>
  }

  upload<T = any>(
    url: string,
    formData: FormData,
    config?: IRequestConfig & { onUploadProgress?: (e: AxiosProgressEvent) => void }
  ): Promise<T> {
    return this.instance.post<T>(url, formData, {
      ...(config as AxiosRequestConfig),
      headers: { 'Content-Type': 'multipart/form-data' },
    }) as Promise<T>
  }

  download(url: string, params?: Record<string, any>, filename?: string): Promise<void> {
    return this.instance
      .get(url, { params, responseType: 'blob' })
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

  getInstance(): AxiosInstance {
    return this.instance
  }
}

export function createHttpClient(config: HttpClientConfig): HttpClient {
  return new HttpClient(config)
}
