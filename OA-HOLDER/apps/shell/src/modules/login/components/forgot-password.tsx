import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button, Form, Input, Row, Col, Typography, message } from 'antd'
import { useI18n } from '@holder/i18n'
import styles from '../index.module.css'
import { loginLocale } from '../locale'

import userIcon from '~/assets/images/login/username.png'
import pwIcon from '~/assets/images/login/password.png'
import EyeTwoTone from '~/assets/images/login/password_eye.png'
import EyeInvisibleOutlined from '~/assets/images/login/password_eye_invisible.png'
import securityIcon from '~/assets/images/login/security code_icon.png'

const { Text } = Typography

const regPhone = /^1[3-9]\d{9}$/
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface IForgotPasswordProps {
  onBack?: () => void
}

const ForgotPassword: React.FC<IForgotPasswordProps> = ({ onBack }) => {
  const { chooseLanguage } = useI18n()
  const t = useCallback(
    (key: keyof typeof loginLocale, param?: Record<string, unknown>) =>
      chooseLanguage({ tmpl: loginLocale[key], param }),
    [chooseLanguage],
  )

  const [form] = Form.useForm()
  const [count, setCount] = useState<number>(-1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const account = Form.useWatch('account', form)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  useEffect(() => {
    if (count > 0) {
      timerRef.current = setInterval(() => {
        setCount(prev => prev - 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [count])

  const handleSendCode = async () => {
    try {
      const accountValue = form.getFieldValue('account')
      if (!accountValue) {
        message.warning(t('accountFirstWarning'))
        form.validateFields(['account'])
        return
      }

      await form.validateFields(['account'])
      message.success(t('sendSuccess'))
      setCount(60)
    } catch (error) {
      console.error('发送验证码失败:', error)
    }
  }

  return (
    <div className={styles.forgotPasswordContainer}>
      <div className={styles.forgotPasswordTitle}>
        <span className={styles.forgotPasswordTitleIcon} onClick={onBack}>
          <span className={styles.backIcon} />
        </span>
        <Text className={styles.loginPageTitle} type="secondary">
          {t('forgotTitle')}
        </Text>
      </div>

      <Form form={form}>
        <Form.Item
          validateTrigger="blur"
          name="account"
          rules={[
            { required: true, message: t('forgotAccountRequired') },
            {
              validator: (_: unknown, value: string) => {
                if (!value || regPhone.test(value) || regEmail.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(t('forgotAccountInvalid'))
              },
            },
          ]}
          getValueFromEvent={e => {
            const val = e.target.value
            return /\s+/g.test(val) ? val.replace(/\s+/g, '') : val
          }}
        >
          <Input
            prefix={<img src={userIcon} alt="账号图标" />}
            placeholder={t('accountPlaceholder')}
            size="large"
          />
        </Form.Item>

        <Form.Item
          validateTrigger="onBlur"
          name="code"
          rules={[
            { required: true, message: t('codeRequired') },
            { pattern: /^\d{6}$/, message: t('codeInvalid') },
          ]}
        >
          <Row gutter={16} justify="space-between">
            <Col span={15}>
              <Input
                prefix={<img src={securityIcon} alt="验证码图标" />}
                placeholder={t('codePlaceholder')}
                size="large"
                maxLength={6}
              />
            </Col>
            <Col span={9}>
              <Button
                type="primary"
                size="large"
                onClick={handleSendCode}
                style={{ width: '100%' }}
                className={styles.sendCodeBtn}
                disabled={count > -1 || !account}
              >
                {count < 0 ? t('sendCode') : t('resendCode', { count })}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: t('forgotPasswordRequired') },
            {
              pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/,
              message: t('passwordFormatInvalid'),
            },
          ]}
        >
          <Input.Password
            maxLength={20}
            placeholder={t('newPasswordPlaceholder')}
            size="large"
            iconRender={visible => (
              <img
                alt=""
                src={visible ? EyeTwoTone : EyeInvisibleOutlined}
                style={{ cursor: 'pointer' }}
              />
            )}
            prefix={<img alt="" src={pwIcon} />}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          rules={[
            { required: true, message: t('confirmRequired') },
            ({ getFieldValue }) => ({
              validator(_rule: unknown, value: string) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(t('confirmMismatch')))
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            maxLength={20}
            placeholder={t('confirmPlaceholder')}
            iconRender={visible => (
              <img alt="" src={visible ? EyeTwoTone : EyeInvisibleOutlined} />
            )}
            prefix={<img alt="" src={pwIcon} />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className={styles.loginFormSubmit}
          >
            {t('resetBtn')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
