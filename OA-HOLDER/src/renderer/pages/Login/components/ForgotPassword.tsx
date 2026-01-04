import { regEmail, regPhone } from '@/utils/regex'
import { Button, Form, Input, Row, Col, Typography, message } from 'antd'
import React, { useState, useEffect, useRef } from 'react'

const { Text } = Typography
import userIcon from '@/assets/images/login/username.png'
import pwIcon from '@/assets/images/login/password.png'

import EyeTwoTone from '@/assets/images/login/password_eye.png'
import EyeInvisibleOutlined from '@/assets/images/login/password_eye_invisible.png'

import securityIcon from '@/assets/images/login/security code_icon.png'
interface ForgotPasswordProps {
  onBack?: () => void
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [form] = Form.useForm()
  const [count, setCount] = useState<number>(-1) // 倒计时，-1表示未开始
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 监听账号字段变化
  const account = Form.useWatch('account', form)

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  // 倒计时逻辑
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

  // 发送验证码
  const handleSendCode = async () => {
    try {
      // 获取账号值并验证
      const accountValue = form.getFieldValue('account')
      if (!accountValue) {
        message.warning('请先输入账号')
        form.validateFields(['account'])
        return
      }

      // 验证账号格式
      await form.validateFields(['account'])

      // 这里可以调用发送验证码的API
      // await sendVerifyCode(accountValue)

      message.success('验证码已发送')
      setCount(60) // 开始60秒倒计时
    } catch (error) {
      console.error('发送验证码失败:', error)
    }
  }
  return (
    <div className='forgot-password-container'>
      <div className='forgot-password-title flex items-center'>
        <span
          className='forgot-password-title-icon flex items-center justify-center'
          onClick={onBack}
        >
          <span className='back-icon'></span>
        </span>
        <Text
          className='login-page-title'
          type='secondary'
        >
          忘记密码
        </Text>
      </div>
      {/* 表单 */}
      <Form form={form}>
        <Form.Item
          validateTrigger='blur'
          name='account'
          label=''
          rules={[
            { required: true, message: '请输入您的注册账号' },
            {
              validator: (_, value) => {
                if (!value || regPhone.test(value) || regEmail.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject('请输入正确的注册账号')
              }
            }
          ]}
          getValueFromEvent={e => {
            // 禁止输入空格（检测到输入空则则替换空格）
            const _val = e.target.value
            const _rpx = /\s+/g
            if (_rpx.test(_val)) {
              return e.target.value.replace(/\s+/g, '')
            } else {
              return e.target.value
            }
          }}
        >
          <Input
            prefix={
              <img
                src={userIcon}
                alt='账号图标'
              />
            }
            placeholder='请输入账号'
            size='large'
          />
        </Form.Item>
        <Form.Item
          validateTrigger='onBlur'
          name='code'
          rules={[
            { required: true, message: '请填写验证码' },
            {
              pattern: /^\d{6}$/,
              message: '验证码不正确'
            }
          ]}
        >
          <Row
            gutter={16}
            justify='space-between'
          >
            <Col span={15}>
              <Input
                prefix={
                  <img
                    src={securityIcon}
                    alt='账号图标'
                  />
                }
                placeholder='请填写验证码'
                size='large'
                maxLength={6}
              />
            </Col>
            <Col span={9}>
              <Button
                type='primary'
                size='large'
                onClick={handleSendCode}
                style={{ width: '100%' }}
                className='send-code-btn'
                disabled={count > -1 || !account}
              >
                {count < 0 ? '发送验证码' : `${count}s后重发`}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: '请输入密码!'
            },
            {
              pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/,
              message: '格式不正确，8-20位字母、数字或特殊符号中的2种'
            }
          ]}
        >
          <Input.Password
            maxLength={20}
            placeholder='新密码（8-20位，字母、数字或特殊符号中的2种）'
            size='large'
            iconRender={visible => (
              <img
                alt=''
                src={visible ? EyeTwoTone : EyeInvisibleOutlined}
                style={{ cursor: 'pointer' }}
              />
            )}
            prefix={
              <img
                alt=''
                src={pwIcon}
              />
            }
          />
        </Form.Item>
        {/* 确认密码 */}
        <Form.Item
          name='confirm'
          rules={[
            {
              required: true,
              message: '请确认密码!'
            },
            ({ getFieldValue }) => ({
              validator(_rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码不一致'))
              }
            })
          ]}
        >
          <Input.Password
            size='large'
            maxLength={20}
            placeholder='请再次输入新密码'
            iconRender={visible => (
              <img
                alt=''
                src={visible ? EyeTwoTone : EyeInvisibleOutlined}
              />
            )}
            prefix={
              <img
                alt=''
                src={pwIcon}
              />
            }
          />
        </Form.Item>
        {/* 登录按钮 */}
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            block
            className='login-form-submit'
          >
            重置密码
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ForgotPassword
