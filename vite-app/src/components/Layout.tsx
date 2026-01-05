import React from 'react';
import { Layout as AntLayout, Menu, Button, ConfigProvider } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  LoginOutlined,
  LogoutOutlined,
  FormOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearUser } from '../store/slices/userSlice';
import '../styles/components/Layout.less';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isLoggedIn, username } = useAppSelector(state => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: '首页',
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: '关于',
    },
    {
      key: '/contact',
      icon: <ContactsOutlined />,
      label: '联系',
    },
    {
      key: '/form-configuration',
      icon: <FormOutlined />,
      label: '表单配置',
    },
    {
      key: '/permission-configuration',
      icon: <UserOutlined />,
      label: '权限配置',
    },
    {
      key: '/tour',
      icon: <UserOutlined />,
      label: '漫游引导',
    },
    {
      key: '/form',
      icon: <FormOutlined />,
      label: '表单',
    },
    {
      key: '/notification-demo',
      icon: <BellOutlined />,
      label: '通知演示',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3949AB',
          },
          components: {
            Button: {
              colorPrimary: '#3949AB',
            },
          },
        }}
      >
    <AntLayout className="app-layout">
      <Header className="app-header">
        <div className="app-logo">
          MiniCar
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="app-menu"
        />
        <div className="user-actions">
          {isLoggedIn ? (
            <>
              <span className="welcome-text">
                欢迎，{username}！
              </span>
              <Button 
                type="text" 
                icon={<LogoutOutlined />} 
                onClick={handleLogout}
                className="logout-button"
              >
                退出登录
              </Button>
            </>
          ) : (
            <Button 
              type="primary" 
              icon={<LoginOutlined />} 
              onClick={() => navigate('/login')}
              className="login-button"
            >
              登录
            </Button>
          )}
        </div>
      </Header>
      
      <Content className="app-content">
        <div className="content-container">
          <Outlet />
        </div>
      </Content>
      
      <Footer className="app-footer" style={{padding: 0}}>
        {/* React App ©{new Date().getFullYear()} Created with ❤️ */}
      </Footer>
    </AntLayout>
    </ConfigProvider>
  );
};

export default Layout; 