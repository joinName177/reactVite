import React from "react";
import { Card, Typography, Descriptions, Divider, Button } from "antd";
import UserInfo from "../../components/UserInfo";
import Counter from "../../components/Counter";

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Card>
        <Title level={2}>关于我们</Title>
        <Paragraph>这是一个现代化的 React 应用，采用了最新的技术栈和最佳实践。</Paragraph>

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
      <Card className="card-container">
        <Title level={2} className="welcome-title">
          欢迎来到首页
        </Title>
        <Paragraph className="welcome-description">这是一个使用 React + Vite + TypeScript + Ant Design + Redux 构建的现代化应用。</Paragraph>
        <div className="welcome-actions">
          <Button type="primary">开始使用</Button>
          <Button>了解更多</Button>
        </div>
      </Card>

      <Divider className="section-divider" />

      <Title level={3} className="section-title">
        Redux 状态管理示例
      </Title>
      <Paragraph className="section-description">下面的组件展示了如何使用 Redux 进行状态管理。你可以尝试登录、退出登录等操作来观察状态变化。</Paragraph>

      <UserInfo />

      <Divider className="section-divider" />

      <Counter />
    </div>
  );
};

export default About;
