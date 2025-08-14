import React from 'react';
import { Card, Typography, Descriptions, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>关于我们</Title>
        <Paragraph>
          这是一个现代化的 React 应用，采用了最新的技术栈和最佳实践。
        </Paragraph>
        
        <Divider />
        
        <Title level={3}>技术栈</Title>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="前端框架">React 19</Descriptions.Item>
          <Descriptions.Item label="构建工具">Vite 7</Descriptions.Item>
          <Descriptions.Item label="开发语言">TypeScript</Descriptions.Item>
          <Descriptions.Item label="UI 组件库">Ant Design 5</Descriptions.Item>
          <Descriptions.Item label="路由管理">React Router 7</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default About; 