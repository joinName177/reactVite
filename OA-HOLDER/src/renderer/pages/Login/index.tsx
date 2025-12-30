import React from 'react';
import { Card, Form, Input, Button, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import envConfig from '@/config/env';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/slices/loginSlice';

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const isLogin = useAppSelector((state) => state.login.isLogin);

  // 如果已经登录，重定向到首页或之前尝试访问的页面
  React.useEffect(() => {
    if (isLogin) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isLogin, navigate, location]);

  const handleSubmit = (values: any) => {
    console.log('登录信息:', values);
    // TODO: 实现登录逻辑
    // 登录成功后，ProtectedRoute 会自动处理重定向
    // 或者在这里调用 dispatch(setToken('token')) 后跳转
    dispatch(setToken('token'));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
      }}
    >
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }} align="center">
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: 8 }}>
              {envConfig.title || '登录'}
            </Title>
            <Text type="secondary">请输入您的账号和密码</Text>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
            style={{ width: '100%' }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="用户名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Card>
    </div>
  );
};

export default Login;

