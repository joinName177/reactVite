import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import AppSidebar from './sidebar'
import AppHeader from './header'

const { Content } = Layout

const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSidebar />
      <Layout>
        <AppHeader />
        <Content style={{ padding: 24, overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout
