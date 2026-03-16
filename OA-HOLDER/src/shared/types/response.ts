export interface IApiResponse<T = unknown> {
  code: number
  message: string
  data: T
  success?: boolean
}

export interface IApiError {
  code: number
  message: string
  details?: Record<string, unknown>
}

export interface IRequestConfig {
  showError?: boolean
  showSuccess?: boolean
  successMessage?: string
  cancelRepeat?: boolean
  isFormData?: boolean
}
