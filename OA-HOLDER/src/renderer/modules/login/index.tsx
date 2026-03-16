import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useI18n, LanguageTypeMapping } from '@shared/i18n'
import { useUserStore } from '~/store'
import LoginForm from './components/login-form'
import LoginLeftPanel from './components/login-left-panel'
import QrCode from './components/qr-code'
import ForgotPassword from './components/forgot-password'
import styles from './index.module.css'
import { loginLocale } from './locale'

import logo from '~/assets/images/login/holder_logo.svg'
import QrIcon from '~/assets/images/login/qr_code.svg'
import PcIcon from '~/assets/images/login/pc_code.svg'

interface ILoginStatus {
  isForgotPassword: boolean
  isQrLogin: boolean
  isFormLogin: boolean
}

/**
 * 登录页面组件
 */
const Login: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, setToken, setUserInfo } = useUserStore()
  const { chooseLanguage, language, setLanguage } = useI18n()

  const t = useCallback(
    (key: keyof typeof loginLocale) => chooseLanguage({ tmpl: loginLocale[key] }),
    [chooseLanguage],
  )

  const [loginStatus, setLoginStatus] = useState<ILoginStatus>({
    isForgotPassword: false,
    isQrLogin: false,
    isFormLogin: true,
  })

  useEffect(() => {
    if (isAuthenticated) {
      const from =
        (location.state as { from?: { pathname: string } })?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location])

  /**
   * 处理登录提交
   */
  const handleLogin = async (values: { account: string; password: string }) => {
    try {
      // TODO: 替换为真实的登录 API 调用
      await new Promise(resolve => setTimeout(resolve, 800))

      setToken('mock-token-' + Date.now())
      setUserInfo({
        id: '1',
        username: values.account,
        nickname: values.account,
        roles: ['admin'],
        permissions: [],
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * 安全地设置登录状态（确保状态互斥）
   */
    const setLoginStatusSafely = useCallback(
    (updates: Partial<ILoginStatus>) => {
      setLoginStatus(prev => {
        const next = { ...prev, ...updates }

        if (next.isForgotPassword) {
          next.isFormLogin = false
          next.isQrLogin = false
        } else if (next.isQrLogin) {
          next.isForgotPassword = false
        } else if (next.isFormLogin) {
          next.isForgotPassword = false
        }

        return next
      })
    },
    [],
  )

  const handleQrCodeSwitch = useCallback(() => {
    setLoginStatus(prev => {
      if (prev.isQrLogin) {
        return { isForgotPassword: false, isQrLogin: false, isFormLogin: true }
      }
      return { isForgotPassword: false, isQrLogin: true, isFormLogin: false }
    })
  }, [])

  const handleForgotPassword = useCallback(() => {
    setLoginStatusSafely({ isForgotPassword: true, isFormLogin: false, isQrLogin: false })
  }, [setLoginStatusSafely])

  const handleBackToFormLogin = useCallback(() => {
    setLoginStatusSafely({ isForgotPassword: false, isFormLogin: true, isQrLogin: false })
  }, [setLoginStatusSafely])

  const handleWeChatLogin = useCallback(() => {}, [])

  return (
    <div className={styles.loginPage}>
      {/* 页面背景装饰 */}
      <div className={styles.holderLogoBg}>
        <img src={logo} alt="logo" />
      </div>
      <span className={styles.holderBg1} />
      <span className={styles.holderBg2} />
      <span className={styles.holderBgTopRig} />

      {/* 语言切换�?*/}
      <div className={styles.languageSwitcher}>
        {LanguageTypeMapping.map(item => (
          <button
            key={item.value}
            className={`${styles.langBtn} ${language === item.value ? styles.langBtnActive : ''}`}
            onClick={() => setLanguage(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 登录卡片 */}
      <div className={styles.loginCard}>
        {/* 左侧装饰面板 */}
        <LoginLeftPanel />

        {/* 右侧登录表单 */}
        <div className={styles.loginCardRight}>
          {/* 右上角二维码切换（忘记密码时隐藏�?*/}
          {!loginStatus.isForgotPassword && (
            <div className={styles.qrCodeSwitch} onClick={handleQrCodeSwitch}>
              <img
                src={loginStatus.isQrLogin ? PcIcon : QrIcon}
                alt={loginStatus.isQrLogin ? t('switchToPc') : t('switchToQr')}
              />
            </div>
          )}

          {/* 表单登录 */}
          {loginStatus.isFormLogin && !loginStatus.isForgotPassword && (
            <LoginForm
              onSubmit={handleLogin}
              onForgotPassword={handleForgotPassword}
              onWeChatLogin={handleWeChatLogin}
            />
          )}

          {/* 二维码登�?*/}
          {loginStatus.isQrLogin && !loginStatus.isForgotPassword && <QrCode />}

          {/* 忘记密码 */}
          {loginStatus.isForgotPassword && (
            <ForgotPassword onBack={handleBackToFormLogin} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
