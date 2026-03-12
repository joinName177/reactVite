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
import styles from '../index.module.css'

import weChatIcon from '@/assets/images/login/weChatLoginIn.png'
import userIcon from '@/assets/images/login/username.png'
import pwIcon from '@/assets/images/login/password.png'
import EyeTwoTone from '@/assets/images/login/password_eye.png'
import EyeInvisibleOutlined from '@/assets/images/login/password_eye_invisible.png'

const { Text } = Typography

// ==================== 类型定义 ====================

interface AccountOption {
  value: string
  label?: string
  password?: string
  rememberMe?: boolean
}

interface LoginFormValues {
  account: string
  password: string
  rememberMe?: boolean
}

interface LoginFormProps {
  /** 提交回调 */
  onSubmit: (values: LoginFormValues) => void | Promise<void>
  /** 忘记密码回调 */
  onForgotPassword: () => void
  /** 微信登陆回调 */
  onWeChatLogin: () => void
  /** 加载状态 */
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
const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onWeChatLogin,
  loading = false,
}) => {
  const [form] = Form.useForm<LoginFormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [options] = useState<AccountOption[]>([])

  const isLoading = loading || submitting

  const accountRules = useMemo(
    () => [
      { required: true, message: '请输入账号' },
      {
        validator: (_: unknown, value: string) => {
          if (!value) return Promise.resolve()
          if (regPhone.test(value) || regEmail.test(value)) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('请输入正确的手机号码或邮箱'))
        },
      },
    ],
    [],
  )

  const passwordRules = useMemo(
    () => [
      { required: true, message: '请输入密码' },
      {
        min: PASSWORD_MIN_LENGTH,
        message: `密码长度至少${PASSWORD_MIN_LENGTH}个字符`,
      },
    ],
    [],
  )

  const handleSubmit: FormProps<LoginFormValues>['onFinish'] = useCallback(
    async (values: LoginFormValues) => {
      try {
        setSubmitting(true)
        await onSubmit?.(values)
      } catch (error) {
        message.error('登录失败，请重试')
        console.error('登录错误:', error)
      } finally {
        setSubmitting(false)
      }
    },
    [onSubmit],
  )

  const getPasswordByAccount = useCallback(
    (account: string) => {
      const currentItem = options?.find(item => item.value === account)
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

      const matchedOption = options?.find(
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
    (inputValue: string, option?: AccountOption) => {
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
        账号密码登录
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
              placeholder="请输入账号"
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
            placeholder="请输入登录密码"
          />
        </Form.Item>

        {/* 记住密码和忘记密码 */}
        <Form.Item>
          <div className={styles.loginFormOptions}>
            <Form.Item name="rememberMe" valuePropName="checked" noStyle>
              <Checkbox disabled={isLoading}>记住密码</Checkbox>
            </Form.Item>
            <Button
              type="link"
              className={styles.loginFormForgot}
              disabled={isLoading}
              onClick={onForgotPassword}
            >
              忘记密码
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
            登录
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
