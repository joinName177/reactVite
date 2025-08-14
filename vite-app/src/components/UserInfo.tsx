import React from 'react';
import { Card, Typography, Tag, Avatar } from 'antd';
import { UserOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { useAppSelector } from '../store/hooks';
import '../styles/components/UserInfo.less';

const { Title, Text } = Typography;

const UserInfo: React.FC = () => {
  const { isLoggedIn, username, email, id, profile } = useAppSelector(state => state.user);

  console.log(profile);
  console.log(username);
  console.log(email);
  console.log(id);

  if (!isLoggedIn) {
    return (
      <Card title="用户信息" className="user-info-card">
        <div className="login-prompt">
          <Text type="secondary">请先登录查看用户信息</Text>
        </div>
      </Card>
    );
  }

  return (
    <Card title="用户信息" className="user-info-card">
      <div className="user-info-content">
        <div className="user-avatar-section">
          <Avatar size={64} icon={<UserOutlined />} className="user-avatar" src={profile} />
          <div className="user-details">
            <Title level={4} className="user-name">
              {username}
            </Title>
            <Tag color="green" className="login-status">已登录</Tag>
          </div>
        </div>
        
        <div className="user-info-item">
          <IdcardOutlined className="info-icon" />
          <Text className="info-text">用户ID: {id}</Text>
        </div>
        
        <div className="user-info-item">
          <MailOutlined className="info-icon" />
          <Text className="info-text">邮箱: {email}</Text>
        </div>
      </div>
    </Card>
  );
};

export default UserInfo; 