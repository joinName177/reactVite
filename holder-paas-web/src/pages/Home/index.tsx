/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/Home/index.tsx
import { Button, Card } from 'antd'

const Home: React.FC = () => {
  const handleClick = () => {
    console.log('点击');

  }
  return (
    <div>
      <Card title="欢迎使用 Holder PAAS">
        <p>
          <Button type="primary" onClick={handleClick}>点击</Button>
        </p>
      </Card>
    </div>
  )
}

export default Home

