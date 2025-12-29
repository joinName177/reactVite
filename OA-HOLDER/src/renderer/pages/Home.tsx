import React from 'react';
import { Card, Button, Space, Typography, Tag, Descriptions, Row, Col, Modal } from 'antd';
import { CheckCircleOutlined, CalendarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increment, decrement, incrementByAmount, reset } from '@/store/slices/counterSlice';
import { clearToken } from '@/store/slices/loginSlice';
import envConfig, { isDevelopment, isRe, isProduction } from '@/config/env';

const { Title, Text } = Typography;

const Home: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
        
        // 清除登录状态
        dispatch(clearToken());
        // 跳转到登录页
        navigate('/login', { replace: true });
      },
    });
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2} style={{ margin: 0 }}>首页</Title>
        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          退出登录
        </Button>
      </div>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
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

