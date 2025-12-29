import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <Card>
      <Title level={2}>关于</Title>
      <Paragraph>
        这是一个基于 Electron + React + TypeScript + Ant Design 的桌面应用程序。
      </Paragraph>
      <Paragraph>
        <strong>技术栈：</strong>
      </Paragraph>
      <ul>
        <li>Electron - 跨平台桌面应用框架</li>
        <li>React - UI 库</li>
        <li>TypeScript - 类型安全的 JavaScript</li>
        <li>Ant Design - 企业级 UI 设计语言</li>
        <li>React Router - 路由管理</li>
        <li>Redux Toolkit - 状态管理</li>
        <li>Vite - 构建工具</li>
        <li>Less - CSS 预处理器</li>
      </ul>
    </Card>
  );
};

export default About;

