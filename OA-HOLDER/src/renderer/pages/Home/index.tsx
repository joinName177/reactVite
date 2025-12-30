import React, { useEffect } from 'react';
import { Card, Button, Space, Typography, Tag, Descriptions, Row, Col, Modal, Badge } from 'antd';
import { CheckCircleOutlined, CalendarOutlined, LogoutOutlined, BellOutlined, MessageOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, decrement, incrementByAmount, reset } from '@/store/slices/counterSlice';
import { clearToken } from '@/store/slices/loginSlice';
import { addMessage, addMessages, clearAllMessages } from '@/store/slices/messageSlice';
import envConfig, { isDevelopment, isRe, isProduction } from '@/config/env';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const messages = useAppSelector((state) => state.message.messages);
  const unreadCount = useAppSelector((state) => state.message.unreadCount);
  const isBlinking = useAppSelector((state) => state.message.isBlinking);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 监听消息变化，同步到托盘
  useEffect(() => {
    if (window.electronAPI?.updateTrayMessages) {
      window.electronAPI.updateTrayMessages(messages);
    }
  }, [messages]);

  // 监听闪烁状态变化，同步到托盘
  useEffect(() => {
    if (window.electronAPI?.setTrayBlinking) {
      window.electronAPI.setTrayBlinking(isBlinking);
    }
  }, [isBlinking]);

  const getEnvTagColor = () => {
    if (isDevelopment()) return 'blue';
    if (isRe()) return 'orange';
    if (isProduction()) return 'green';
    return 'default';
  };

  const getEnvText = () => {
    if (isDevelopment()) return '开发环境';
    if (isRe()) return 'RE环境';
    if (isProduction()) return '生产环境';
    return '未知环境';
  };

  const handleOpenApproval = async () => {
    if (window.electronAPI?.openApprovalWindow) {
      try {
        await window.electronAPI.openApprovalWindow();
      } catch (error) {
        console.error('打开审批窗口失败:', error);
      }
    } else {
      console.warn('Electron API 不可用');
    }
  };

  const handleOpenMeeting = async () => {
    if (window.electronAPI?.openMeetingWindow) {
      try {
        await window.electronAPI.openMeetingWindow();
      } catch (error) {
        console.error('打开会议窗口失败:', error);
      }
    } else {
      console.warn('Electron API 不可用');
    }
  };

  const handleLogout = async () => {
    Modal.confirm({
      title: '确认退出',
      content: '确定要退出登录吗？退出后将关闭所有窗口并返回登录界面。',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 关闭所有子窗口（审批窗口和会议窗口）
          if (window.electronAPI?.closeAllChildWindows) {
            await window.electronAPI.closeAllChildWindows();
          }
        } catch (error) {
          console.error('关闭子窗口失败:', error);
        }
        
        // 清空所有消息
        dispatch(clearAllMessages());
        
        // 停止托盘闪烁并清空托盘消息
        try {
          if (window.electronAPI?.setTrayBlinking) {
            await window.electronAPI.setTrayBlinking(false);
          }
          if (window.electronAPI?.updateTrayMessages) {
            await window.electronAPI.updateTrayMessages([]);
          }
        } catch (error) {
          console.error('清空托盘消息失败:', error);
        }
        
        // 清除登录状态
        dispatch(clearToken());
        // 跳转到登录页
        navigate('/login', { replace: true });
      },
    });
  };

  // 模拟添加单条消息
  const handleAddSingleMessage = () => {
    const types: Array<'info' | 'warning' | 'error' | 'success'> = ['info', 'warning', 'error', 'success'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const titles = {
      info: '系统通知',
      warning: '警告信息',
      error: '错误提示',
      success: '操作成功',
    };
    const contents = {
      info: '这是一条普通通知消息',
      warning: '请注意：这是一条警告消息',
      error: '发生错误：这是一条错误消息',
      success: '操作已成功完成',
    };

    dispatch(addMessage({
      title: titles[randomType],
      content: contents[randomType],
      type: randomType,
    }));
  };

  // 模拟添加多条消息
  const handleAddMultipleMessages = () => {
    const mockMessages = [
      { title: '审批通知', content: '您有一条新的审批请求需要处理', type: 'info' as const },
      { title: '会议提醒', content: '您有一个会议将在30分钟后开始', type: 'warning' as const },
      { title: '系统更新', content: '系统已更新到最新版本', type: 'success' as const },
      { title: '错误提示', content: '网络连接异常，请检查网络设置', type: 'error' as const },
      { title: '待办事项', content: '您有3个待办事项需要处理', type: 'info' as const },
    ];
    dispatch(addMessages(mockMessages));
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>首页</Title>
        <Space>
          <Badge count={unreadCount} size="small">
            <Button
              icon={<BellOutlined />}
              onClick={handleAddSingleMessage}
            >
              添加消息
            </Button>
          </Badge>
          <Button
            icon={<MessageOutlined />}
            onClick={handleAddMultipleMessages}
          >
            批量添加消息
          </Button>
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </Space>
      </div>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        {/* 消息统计 */}
        {messages.length > 0 && (
          <Card size="small" title={`消息列表 (${unreadCount} 条未读)`}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {messages.slice(0, 5).map((msg) => (
                <Card
                  key={msg.id}
                  size="small"
                  style={{
                    backgroundColor: msg.read ? '#f5f5f5' : '#fff',
                    borderLeft: `4px solid ${
                      msg.type === 'error' ? '#ff4d4f' :
                      msg.type === 'warning' ? '#faad14' :
                      msg.type === 'success' ? '#52c41a' : '#1890ff'
                    }`,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div style={{ flex: 1 }}>
                      <Typography.Text strong={!msg.read}>
                        {msg.title}
                      </Typography.Text>
                      <div style={{ marginTop: 4, color: '#666', fontSize: '12px' }}>
                        {msg.content}
                      </div>
                      <div style={{ marginTop: 4, color: '#999', fontSize: '12px' }}>
                        {new Date(msg.timestamp).toLocaleString('zh-CN')}
                      </div>
                    </div>
                    <Tag color={
                      msg.type === 'error' ? 'red' :
                      msg.type === 'warning' ? 'orange' :
                      msg.type === 'success' ? 'green' : 'blue'
                    }>
                      {msg.type}
                    </Tag>
                  </div>
                </Card>
              ))}
              {messages.length > 5 && (
                <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                  还有 {messages.length - 5} 条消息...
                </Typography.Text>
              )}
            </Space>
          </Card>
        )}

        {/* 快捷入口 */}
        <Card size="small" title="快捷入口">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={{ textAlign: 'center', height: '100%' }}
                onClick={handleOpenApproval}
              >
                <CheckCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
                <Title level={4}>审批管理</Title>
                <Typography.Text type="secondary">处理审批流程</Typography.Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={{ textAlign: 'center', height: '100%' }}
                onClick={handleOpenMeeting}
              >
                <CalendarOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
                <Title level={4}>会议管理</Title>
                <Typography.Text type="secondary">管理会议安排</Typography.Text>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* 环境信息展示 */}
        <Card size="small" title="环境配置信息">
          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label="当前环境">
              <Tag color={getEnvTagColor()}>{getEnvText()}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="产品名称（中文）">{envConfig.variables.PRODUCT_NAME_CH}</Descriptions.Item>
            <Descriptions.Item label="产品名称（英文）">{envConfig.variables.PRODUCT_NAME}</Descriptions.Item>
            <Descriptions.Item label="API协议">{envConfig.variables.API_PROTOCOL}</Descriptions.Item>
            <Descriptions.Item label="API主机">{envConfig.variables.API_HOST}</Descriptions.Item>
            <Descriptions.Item label="API完整地址">{envConfig.apiBaseUrl || '未配置'}</Descriptions.Item>
            <Descriptions.Item label="文件服务地址">{envConfig.variables.API_FILE_HOST || '未配置'}</Descriptions.Item>
            <Descriptions.Item label="WebSocket地址">{envConfig.wsUrl || '未配置'}</Descriptions.Item>
            <Descriptions.Item label="Keycloak服务">{envConfig.variables.KEYCLOAK_SERVICE || '未配置'}</Descriptions.Item>
            <Descriptions.Item label="Keycloak Realm">{envConfig.variables.KEYCLOAK_REALM || '未配置'}</Descriptions.Item>
            <Descriptions.Item label="Keycloak Client">{envConfig.variables.KEYCLOAK_CLIENT || '未配置'}</Descriptions.Item>
            <Descriptions.Item label="调试模式">
              <Tag color={envConfig.debug ? 'red' : 'green'}>
                {envConfig.debug ? '开启' : '关闭'}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Redux 计数器示例 */}
        <Card size="small" title="Redux 状态管理示例">
          <Space orientation="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Text strong>计数器值: </Text>
              <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>{count}</Text>
            </div>
            <Space>
              <Button type="primary" onClick={() => dispatch(increment())}>
                增加
              </Button>
              <Button onClick={() => dispatch(decrement())}>
                减少
              </Button>
              <Button onClick={() => dispatch(incrementByAmount(5))}>
                增加 5
              </Button>
              <Button danger onClick={() => dispatch(reset())}>
                重置
              </Button>
            </Space>
          </Space>
        </Card>
      </Space>
    </Card>
  );
};

export default Home;

