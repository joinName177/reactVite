import { Layout } from 'antd'

const { Content } = Layout

export function HomePage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: 24 }}>
        <h1>Holder 模块模板</h1>
        <p>基于此模板创建新的独立模块。</p>
      </Content>
    </Layout>
  )
}
