import React, { useState, useEffect, useRef } from 'react'
import { Button, Form, Input, Row, Col, Typography, message } from 'antd'
import styles from '../index.module.css'

import userIcon from '@/assets/images/login/username.png'
import pwIcon from '@/assets/images/login/password.png'
import EyeTwoTone from '@/assets/images/login/password_eye.png'
import EyeInvisibleOutlined from '@/assets/images/login/password_eye_invisible.png'
import securityIcon from '@/assets/images/login/security code_icon.png'

const { Text } = Typography

const regPhone = /^1[3-9]\d{9}$/
const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ForgotPasswordProps {
  onBack?: () => void
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
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
        message.warning('请先输入账号')
        form.validateFields(['account'])
        return
      }

      await form.validateFields(['account'])
      message.success('验证码已发送')
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
          忘记密码
        </Text>
      </div>

      <Form form={form}>
        <Form.Item
          validateTrigger="blur"
          name="account"
          rules={[
            { required: true, message: '请输入您的注册账号' },
            {
              validator: (_, value) => {
                if (!value || regPhone.test(value) || regEmail.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject('请输入正确的注册账号')
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
            placeholder="请输入账号"
            size="large"
          />
        </Form.Item>

        <Form.Item
          validateTrigger="onBlur"
          name="code"
          rules={[
            { required: true, message: '请填写验证码' },
            { pattern: /^\d{6}$/, message: '验证码不正确' },
          ]}
        >
          <Row gutter={16} justify="space-between">
            <Col span={15}>
              <Input
                prefix={<img src={securityIcon} alt="验证码图标" />}
                placeholder="请填写验证码"
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
                {count < 0 ? '发送验证码' : `${count}s后重发`}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: '请输入密码!' },
            {
              pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/,
              message: '格式不正确，8-20位字母、数字或特殊符号中的2种',
            },
          ]}
        >
          <Input.Password
            maxLength={20}
            placeholder="新密码（8-20位，字母、数字或特殊符号中的2种）"
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
            { required: true, message: '请确认密码!' },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码不一致'))
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            maxLength={20}
            placeholder="请再次输入新密码"
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
            重置密码
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
