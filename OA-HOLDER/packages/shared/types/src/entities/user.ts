export interface IUserInfo {
  id: string
  username: string
  nickname: string
  avatar?: string
  email?: string
  phone?: string
  departmentId?: string
  departmentName?: string
  roles: string[]
  permissions: string[]
  token?: string
}

export interface ILoginParams {
  username: string
  password: string
  captcha?: string
  rememberMe?: boolean
}

export interface ILoginResult {
  token: string
  refreshToken: string
  userInfo: IUserInfo
  expiresIn: number
}
