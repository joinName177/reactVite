import React from 'react';
import { Button, Card, Typography, Divider } from 'antd';
import UserInfo from '../components/UserInfo';
import Counter from '../components/Counter';
import '../styles/pages/Home.less';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Card className="card-container">
        <Title level={2} className="welcome-title">欢迎来到首页</Title>
        <Paragraph className="welcome-description">
          这是一个使用 React + Vite + TypeScript + Ant Design + Redux 构建的现代化应用。
        </Paragraph>
        <div className="welcome-actions">
          <Button type="primary">开始使用</Button>
          <Button>了解更多</Button>
        </div>
      </Card>
      
      <Divider className="section-divider" />
      
      <Title level={3} className="section-title">Redux 状态管理示例</Title>
      <Paragraph className="section-description">
        下面的组件展示了如何使用 Redux 进行状态管理。你可以尝试登录、退出登录等操作来观察状态变化。
      </Paragraph>
      
      <UserInfo />
      
    
      
      <Divider className="section-divider" />
      
      <Counter />
    </div>
  );
};

export default Home; 