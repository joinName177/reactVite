/**
 * 全局类型声明
 */

import type { ClockAngles } from '@/utils/tools'
import type { RequestConfig, ApiResponse } from '@/utils/request'
import type { AxiosInstance } from 'axios'

declare global {
  /**
   * 全局工具函数对象
   * 可以在任何地方直接使用，无需 import
   *
   * @example
   * // 直接使用，无需 import
   * const angles = window.$tools.getTimeRotate();
   */
  interface Window {
    /**
     * 全局工具函数
     */
    $tools: {
      /**
       * 获取时钟指针的旋转角度
       * @param date 日期对象，默认为当前时间
       * @returns 包含时针、分针、秒针角度的对象
       */
      getTimeRotate: (date?: Date) => ClockAngles
    }

    /**
     * 全局 API 请求工具
     * 可以在任何地方直接使用，无需 import
     *
     * @example
     * // 直接使用，无需 import
     * const data = await holderApi.get('/api/users');
     * await holderApi.post('/api/users', { name: 'test' });
     */
    holderApi: {
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
      ): Promise<T>

      /**
       * POST 请求 - 创建资源
       * @param url 请求地址
       * @param data 请求体数据
       * @param config 请求配置
       */
      post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>

      /**
       * PUT 请求 - 完整更新资源（替换整个资源）
       * @param url 请求地址
       * @param data 请求体数据
       * @param config 请求配置
       */
      put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T>

      /**
       * PATCH 请求 - 部分更新资源（只更新提供的字段）
       * @param url 请求地址
       * @param data 请求体数据
       * @param config 请求配置
       */
      patch<T = any>(
        url: string,
        data?: any,
        config?: RequestConfig
      ): Promise<T>

      /**
       * DELETE 请求 - 删除资源
       * @param url 请求地址
       * @param config 请求配置
       */
      delete<T = any>(url: string, config?: RequestConfig): Promise<T>

      /**
       * HEAD 请求 - 获取资源的元信息
       * @param url 请求地址
       * @param config 请求配置
       */
      head<T = any>(url: string, config?: RequestConfig): Promise<T>

      /**
       * OPTIONS 请求 - 获取服务器支持的 HTTP 方法
       * @param url 请求地址
       * @param config 请求配置
       */
      options<T = any>(url: string, config?: RequestConfig): Promise<T>

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
      ): Promise<T>

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
      ): Promise<void>

      /**
       * 取消所有请求
       */
      cancelAllRequests(): void

      /**
       * 获取 axios 实例（用于特殊需求）
       */
      getInstance(): AxiosInstance
    }

    /**
     * 全局数学工具
     * 可以在任何地方直接使用，无需 import
     *
     * @example
     * // 直接使用，无需 import
     * const id = Maths.uuid();
     * const shortId = Maths.uuid(8);
     */
    Maths: {
      /**
       * 生成 UUID 或随机字符串
       * @param len 可选，指定长度。如果不提供，则生成 RFC4122 v4 格式的 UUID
       * @param radix 可选，进制数（默认使用完整字符集长度）
       * @returns UUID 字符串或指定长度的随机字符串
       */
      uuid: (len?: number, radix?: number) => string
    }
  }

  /**
   * 全局工具函数的简写
   * 可以直接使用 $tools 而不需要 window.$tools
   */
  const $tools: Window['$tools']

  /**
   * 全局 API 请求工具的简写
   * 可以直接使用 holderApi 而不需要 window.holderApi
   */
  const holderApi: Window['holderApi']

  /**
   * 全局数学工具的简写
   * 可以直接使用 Maths 而不需要 window.Maths
   */
  const Maths: Window['Maths']
}

export {}
