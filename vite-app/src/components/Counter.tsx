import React, { useState } from 'react'
import { Button, Card, Space, Typography, InputNumber, Tag, Divider } from 'antd'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { 
  increment, 
  decrement, 
  incrementByAmount, 
  reset, 
  clearHistory 
} from '../store/slices/counterSlice'

const { Title, Text } = Typography

const Counter: React.FC = () => {
  const dispatch = useAppDispatch()
  const { value, history } = useAppSelector((state) => state.counter)
  const [amount, setAmount] = useState(5)

  const handleIncrement = () => dispatch(increment())
  const handleDecrement = () => dispatch(decrement())
  const handleIncrementByAmount = () => dispatch(incrementByAmount(amount))
  const handleReset = () => dispatch(reset())
  const handleClearHistory = () => dispatch(clearHistory())

  return (
    <Card title="计数器示例" style={{ maxWidth: 600, margin: '20px auto' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 当前值显示 */}
        <div style={{ textAlign: 'center' }}>
          <Title level={1} style={{ margin: 0 }}>
            {value}
          </Title>
          <Text type="secondary">当前值</Text>
        </div>

        {/* 基本操作按钮 */}
        <div>
          <Title level={4}>基本操作</Title>
          <Space>
            <Button size="large" onClick={handleDecrement}>
              -1
            </Button>
            <Button size="large" onClick={handleIncrement}>
              +1
            </Button>
          </Space>
        </div>

        {/* 自定义增量 */}
        <div>
          <Title level={4}>自定义增量</Title>
          <Space>
            <InputNumber
              value={amount}
              onChange={(val) => setAmount(val || 0)}
              min={-100}
              max={100}
            />
            <Button onClick={handleIncrementByAmount}>
              增加 {amount}
            </Button>
          </Space>
        </div>

        {/* 重置和历史 */}
        <div>
          <Title level={4}>管理</Title>
          <Space>
            <Button onClick={handleReset}>重置</Button>
            <Button onClick={handleClearHistory}>清除历史</Button>
          </Space>
        </div>

        {/* 历史记录 */}
        {history.length > 0 && (
          <div>
            <Title level={4}>操作历史</Title>
            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
              <Space wrap>
                {history.map((item, index) => (
                  <Tag key={index} color="blue">
                    {item}
                  </Tag>
                ))}
              </Space>
            </div>
          </div>
        )}

        <Divider />

        {/* Redux 状态信息 */}
        <div>
          <Title level={4}>Redux 状态</Title>
          <pre style={{ background: '#f5f5f5', padding: 8, borderRadius: 4 }}>
            {JSON.stringify({ value, history }, null, 2)}
          </pre>
        </div>
      </Space>
    </Card>
  )
}

export default Counter 