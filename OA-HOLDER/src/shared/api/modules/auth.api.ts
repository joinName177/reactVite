import type { HttpClient } from '../client'
import type { ILoginParams, ILoginResult, IUserInfo } from '@shared/types'

export class AuthApi {
  constructor(private client: HttpClient) {}

  login(params: ILoginParams): Promise<ILoginResult> {
    return this.client.post('/auth/login', params)
  }

  logout(): Promise<void> {
    return this.client.post('/auth/logout')
  }

  refreshToken(refreshToken: string): Promise<{ token: string; expiresIn: number }> {
    return this.client.post('/auth/refresh', { refreshToken })
  }

  getCurrentUser(): Promise<IUserInfo> {
    return this.client.get('/auth/current-user')
  }

  changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return this.client.put('/auth/password', { oldPassword, newPassword })
  }
}
