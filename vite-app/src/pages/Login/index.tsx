import React from 'react';
import { Form, Input, Button, Card, Typography, message, Space } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUser, setLoading, setError, clearError } from '../../store/slices/userSlice';
import '../../styles/pages/Login.less';
import md5 from 'md5';
import { UserApiService } from '../../services/api';
const { Title, Text } = Typography;

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector(state => state.user);

  const onFinish = async (values: LoginForm) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    
    try {
      // 使用fetch直接调用登录API
      const formData = new FormData();
      formData.append('client_id', 'holder-pc');
      formData.append('serviceVersion', 'v1');
      formData.append('grant_type', 'password');
      formData.append('username', values.username);
      formData.append('deviceName', '');
      formData.append('sysVersion', '');
      formData.append('address', '');
      formData.append('macAddress', '');
      formData.append('ip', '');
      formData.append('password', md5(values.password));

      const response = await fetch('https://paas-auth.holderzone.cn/realms/paas/protocol/openid-connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData as unknown as Record<string, string>),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('登录响应:', data);
      const { access_token, refresh_token } = data;

      // 如果登录成功，设置用户信息到 Redux
      if (data.success || data.access_token) {
        // 设置BASE_URL
        // dispatch(setBaseUrl(data.base_url));
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);


        const user = await UserApiService.getCurrentUser({ phoneOrEmail: values.username, type: 2 });
        console.log('用户信息:', user);

        dispatch(setUser({
          account: user.account,
          id: user.id,
          username: user.username,
          email: user.email,
          profile: user.profile,
          refresh_token,
          access_token,
        }));
        
        message.success('登录成功！');
        // 跳转到首页
        navigate('/');
      } else {
        dispatch(setError(data.message || '登录失败！'));
        message.error(data.message || '登录失败！');
      }
    } catch (error) {
      console.error('登录错误:', error);
      dispatch(setError('登录失败，请重试！'));
      message.error('登录失败，请重试！');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <LoginOutlined />
          </div>
          <Title level={2} className="login-title">
            欢迎登录
          </Title>
          <Text type="secondary" className="login-subtitle">请输入您的账号信息</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-button"
            >
              {loading ? '登录中...' : '登录'}
            </Button>
          </Form.Item>
        </Form>

        <div className="login-footer">
          <div className="demo-account">
            <Text type="secondary">
              演示账号：admin / 123456
            </Text>
          </div>

          <div className="register-link">
            <Space>
              <Text type="secondary">还没有账号？</Text>
              <Button type="link">
                立即注册
              </Button>
            </Space>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login; 