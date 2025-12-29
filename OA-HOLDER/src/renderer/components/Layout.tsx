import React from 'react';
import { Layout as AntLayout, Menu, Typography, Tag } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import envConfig, { isDevelopment, isRe, isProduction } from '@/config/env';

const { Header, Content } = AntLayout;
const { Title } = Typography;

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const getEnvTagColor = () => {
    if (isDevelopment()) return 'blue';
    if (isRe()) return 'orange';
    if (isProduction()) return 'green';
    return 'default';
  };

  const getEnvText = () => {
    if (isDevelopment()) return 'DEV';
    if (isRe()) return 'RE';
    if (isProduction()) return 'PROD';
    return 'UNKNOWN';
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 24px', display: 'flex', alignItems: 'center' }}>
        <Title level={3} style={{ color: '#fff', margin: 0, marginRight: '48px' }}>
          {envConfig.title}
        </Title>
        <Tag color={getEnvTagColor()} style={{ marginRight: '24px' }}>
          {getEnvText()}
        </Tag>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '24px' }}>
        <Outlet />
      </Content>
    </AntLayout>
  );
};

export default Layout;

