import React, { useState, useCallback, useMemo } from 'react'
import {
  Button,
  Form,
  Input,
  Typography,
  message,
  Checkbox,
  AutoComplete,
} from 'antd'
import type { FormProps } from 'antd'
import { useI18n } from '@shared/i18n'
import styles from '../index.module.css'
import { loginLocale } from '../locale'

import weChatIcon from '~/assets/images/login/weChatLoginIn.png'
import userIcon from '~/assets/images/login/username.png'
import pwIcon from '~/assets/images/login/password.png'
import EyeTwoTone from '~/assets/images/login/password_eye.png'
import EyeInvisibleOutlined from '~/assets/images/login/password_eye_invisible.png'

const { Text } = Typography

// ==================== 类型定义 ====================

interface IAccountOption {
  value: string
  label?: string
  password?: string
  rememberMe?: boolean
}

interface ILoginFormValues {
  account: string
  password: string
  rememberMe?: boolean
}

interface ILoginFormProps {
  /** 提交回调 */
  onSubmit: (values: LoginFormValues) => void | Promise<void>
  /** 忘记密码回调 */
  onForgotPassword: () => void
  /** 微信登陆回调 */
  onWeChatLogin: () => void
  /** 加载状�?*/
  loading?: boolean
}

// ==================== 常量定义 ====================

const ACCOUNT_MAX_LENGTH = 25
const PASSWORD_MIN_LENGTH = 6

const regPhone = /^1[3-9]\d{9}$/
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ==================== 登录表单组件 ====================

/**
 * 登录表单组件
 */
const LoginForm: React.FC<ILoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onWeChatLogin,
  loading = false,
}) => {
  const { chooseLanguage } = useI18n()
  const t = useCallback(
    (key: keyof typeof loginLocale, param?: Record<string, unknown>) =>
      chooseLanguage({ tmpl: loginLocale[key], param }),
    [chooseLanguage],
  )

  const [form] = Form.useForm<ILoginFormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [options] = useState<IAccountOption[]>([])

  const isLoading = loading || submitting

  const accountRules = useMemo(
    () => [
      { required: true, message: t('accountRequired') },
      {
        validator: (_: unknown, value: string) => {
          if (!value) return Promise.resolve()
          if (regPhone.test(value) || regEmail.test(value)) {
            return Promise.resolve()
          }
          return Promise.reject(new Error(t('accountInvalid')))
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  )

  const passwordRules = useMemo(
    () => [
      { required: true, message: t('passwordRequired') },
      {
        min: PASSWORD_MIN_LENGTH,
        message: t('passwordMinLength', { min: PASSWORD_MIN_LENGTH }),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  )

  const handleSubmit: FormProps<ILoginFormValues>['onFinish'] = useCallback(
    async (values: ILoginFormValues) => {
      try {
        setSubmitting(true)
        await onSubmit?.(values)
      } catch (error) {
        message.error(t('loginError'))
        console.error('登录错误:', error)
      } finally {
        setSubmitting(false)
      }
    },
    [onSubmit, t],
  )

  const getPasswordByAccount = useCallback(
    (account: string) => {
      const currentItem = options.find(item => item.value === account)
      if (!currentItem) return

      form.setFieldsValue({
        rememberMe: currentItem.rememberMe ?? false,
        account: currentItem.value,
        password: currentItem.password || '',
      })
      form.validateFields()
    },
    [options, form],
  )

  const handleAccountChange = useCallback(
    (value: string) => {
      if (!value || value.trim() === '') {
        form.setFieldsValue({ rememberMe: false, password: '' })
        return
      }

      const matchedOption = options.find(
        item => String(item.value).toUpperCase() === value.toUpperCase(),
      )

      if (matchedOption) {
        form.setFieldsValue({
          rememberMe: matchedOption.rememberMe ?? false,
          account: matchedOption.value,
          password: matchedOption.password || '',
        })
      }
    },
    [options, form],
  )

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      const target = e.target as HTMLElement
      const inputElement =
        target.tagName === 'INPUT'
          ? (target as HTMLInputElement)
          : ((e.currentTarget as HTMLElement).querySelector('input') as HTMLInputElement)

      handleAccountChange(inputElement?.value || '')
    },
    [handleAccountChange],
  )

  const handleClearAccount = useCallback(() => {
    form.setFieldsValue({ password: '' })
  }, [form])

  const filterOptions = useCallback(
    (inputValue: string, option?: IAccountOption) => {
      if (!option) return false
      return String(option.value || '')
        .toUpperCase()
        .indexOf(inputValue.toUpperCase()) !== -1
    },
    [],
  )

  return (
    <div className={styles.loginForm}>
      {/* 表单标题 */}
      <Text className={styles.loginPageTitle} type="secondary">
        {t('formTitle')}
      </Text>
      <Form
        form={form}
        name="login"
        onFinish={handleSubmit}
        layout="vertical"
        size="large"
        className={styles.loginFormContent}
        autoComplete="off"
      >
        {/* 账号输入 */}
        <Form.Item name="account" rules={accountRules}>
          <AutoComplete
            allowClear
            onClear={handleClearAccount}
            options={options}
            filterOption={filterOptions}
            onSelect={getPasswordByAccount}
            onKeyUp={handleKeyUp}
          >
            <Input
              prefix={<img src={userIcon} alt="账号图标" />}
              placeholder={t('accountPlaceholder')}
              size="large"
              maxLength={ACCOUNT_MAX_LENGTH}
              onChange={e => handleAccountChange(e.target.value)}
            />
          </AutoComplete>
        </Form.Item>

        {/* 密码输入 */}
        <Form.Item name="password" rules={passwordRules}>
          <Input.Password
            iconRender={visible => (
              <img
                alt=""
                src={visible ? EyeTwoTone : EyeInvisibleOutlined}
                style={{ cursor: 'pointer' }}
              />
            )}
            prefix={<img alt="" src={pwIcon} />}
            placeholder={t('passwordPlaceholder')}
          />
        </Form.Item>

        {/* 记住密码和忘记密�?*/}
        <Form.Item>
          <div className={styles.loginFormOptions}>
            <Form.Item name="rememberMe" valuePropName="checked" noStyle>
              <Checkbox disabled={isLoading}>{t('rememberMe')}</Checkbox>
            </Form.Item>
            <Button
              type="link"
              className={styles.loginFormForgot}
              disabled={isLoading}
              onClick={onForgotPassword}
            >
              {t('forgotPassword')}
            </Button>
          </div>
        </Form.Item>

        {/* 登录按钮 */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isLoading}
            className={styles.loginFormSubmit}
          >
            {t('loginBtn')}
          </Button>
        </Form.Item>

        {/* 微信登录 */}
        <Form.Item>
          <div className={styles.loginFormWeChat}>
            <img
              src={weChatIcon}
              alt="微信登录"
              className={styles.loginFormWeChatIcon}
              onClick={onWeChatLogin}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
