import React, { useState, useEffect } from 'react';
import { Button, Card, Space, Input, message, Tag, Switch } from 'antd';
import { BellOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './index.less';

const { TextArea } = Input;

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  vibrate?: number[];
  timestamp?: number;
  data?: Record<string, unknown>;
  image?: string;
}

const NotificationDemo: React.FC = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [notificationTitle, setNotificationTitle] = useState('新消息通知');
  const [notificationBody, setNotificationBody] = useState('这是一条测试通知消息');
  const [notificationIcon, setNotificationIcon] = useState('');
  const [notificationTag, setNotificationTag] = useState('notification-demo');
  const [requireInteraction, setRequireInteraction] = useState(false);
  const [silent, setSilent] = useState(false);
  const [vibrate, setVibrate] = useState<string>('');

  useEffect(() => {
    // 检查浏览器是否支持通知
    if (!('Notification' in window)) {
      message.error('您的浏览器不支持通知功能');
      return;
    }

    // 获取当前权限状态
    setPermission(Notification.permission);

    // 监听权限变化
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'notifications' as PermissionName }).then((result) => {
        result.onchange = () => {
          setPermission(Notification.permission);
        };
      });
    }
  }, []);

  // 生成默认图标（使用 data URI）
  const getDefaultIcon = () => {
    // 创建一个简单的 SVG 图标作为 data URI
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
        <rect width="128" height="128" fill="#1890ff" rx="20"/>
        <text x="50%" y="50%" font-family="Arial" font-size="64" fill="white" text-anchor="middle" dominant-baseline="middle">🔔</text>
      </svg>
    `.trim();
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
  };

  // 请求通知权限
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      message.error('您的浏览器不支持通知功能');
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result === 'granted') {
        message.success('通知权限已授予');
      } else if (result === 'denied') {
        message.warning('通知权限已被拒绝，请在浏览器设置中允许通知');
      }
    } catch (error) {
      message.error('请求权限失败');
      console.error(error);
    }
  };

  // 发送通知
  const sendNotification = () => {
    if (permission !== 'granted') {
      message.warning('请先授予通知权限');
      return;
    }

    try {
      // 使用唯一的 tag，避免通知被替换（添加时间戳）
      const uniqueTag = `${notificationTag}-${Date.now()}`;
      
      const options: NotificationOptions = {
        title: notificationTitle,
        body: notificationBody,
        tag: uniqueTag, // 使用唯一 tag，确保每次通知都能显示
        requireInteraction: requireInteraction || true, // 默认开启，确保通知不会立即消失
        silent: silent,
        timestamp: Date.now(),
        data: {
          url: window.location.href,
        },
      };

      // 添加图标（如果用户没有提供，使用默认图标）
      options.icon = notificationIcon || getDefaultIcon();

      // 添加震动模式
      if (vibrate) {
        const vibrateArray = vibrate.split(',').map((v) => parseInt(v.trim())).filter((v) => !isNaN(v));
        if (vibrateArray.length > 0) {
          options.vibrate = vibrateArray;
        }
      }

      // 创建通知
      console.log('准备创建通知，参数:', options);
      console.log('通知配置:', {
        tag: options.tag,
        requireInteraction: options.requireInteraction,
        silent: options.silent,
        icon: options.icon ? '已设置图标' : '未设置图标',
      });
      
      const notification = new Notification(options.title, options);
      console.log('通知对象已创建:', notification);
      console.log('通知对象属性:', {
        title: notification.title,
        body: notification.body,
        tag: notification.tag,
        icon: notification.icon,
      });

      // 检查通知对象状态
      setTimeout(() => {
        console.log('通知状态检查:', {
          title: notification.title,
          body: notification.body,
          tag: notification.tag,
          icon: notification.icon,
        });
      }, 100);

      // 通知点击事件
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        message.info('通知被点击了！');
        notification.close();
      };

      // 通知显示事件
      notification.onshow = () => {
        console.log('✅ 通知已显示 - onshow 事件触发');
        console.log('通知应该已经在屏幕上显示了，如果看不到请检查：');
        console.log('1. Windows 通知中心（右下角通知图标）');
        console.log('2. Windows 专注助手是否开启');
        console.log('3. 浏览器通知设置');
        message.success('通知已成功显示！请查看屏幕右下角或通知中心');
      };

      // 通知错误事件
      notification.onerror = (error) => {
        console.error('❌ 通知错误:', error);
        message.error('通知显示失败，请检查系统通知设置');
      };

      // 通知关闭事件
      notification.onclose = () => {
        console.log('通知已关闭 - onclose 事件触发');
      };

      // 延迟检查通知是否真的显示了
      setTimeout(() => {
        if (notification) {
          console.log('通知检查 - 通知对象仍然存在');
          console.log('如果此时仍看不到通知，请检查 Windows 通知中心');
        }
      }, 2000);

      // 5秒后自动关闭通知（如果用户没有手动关闭）
      // if (!requireInteraction) {
      //   setTimeout(() => {
      //     notification.close();
      //     console.log('通知已自动关闭（5秒后）');
      //   }, 5000);
      // }

      message.success('通知已发送，请查看屏幕右下角或通知中心');
    } catch (error) {
      console.error('发送通知失败:', error);
      message.error('发送通知失败: ' + (error as Error).message);
    }
  };

  // 发送带图片的通知
  const sendImageNotification = () => {
    if (permission !== 'granted') {
      message.warning('请先授予通知权限');
      return;
    }

    try {
      const defaultIcon = getDefaultIcon();
      const notificationOptions: NotificationOptions = {
        title: '图片通知',
        body: '这是一条带图片的通知',
        icon: defaultIcon,
        tag: 'image-notification',
      };

      // image 和 badge 参数在某些浏览器可能不支持，使用可选配置
      if ('image' in Notification.prototype) {
        notificationOptions.image = defaultIcon;
      }
      if ('badge' in Notification.prototype) {
        notificationOptions.badge = defaultIcon;
      }

      const notification = new Notification(notificationOptions.title, notificationOptions);

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      message.success('图片通知已发送');
    } catch (error) {
      console.error('发送图片通知失败:', error);
      message.error('发送图片通知失败');
    }
  };

  // 发送定时通知
  const sendScheduledNotification = () => {
    if (permission !== 'granted') {
      message.warning('请先授予通知权限');
      return;
    }

    const delay = 3000; // 3秒后发送
    message.info(`通知将在 ${delay / 1000} 秒后发送`);

    setTimeout(() => {
      try {
        const notification = new Notification('定时通知', {
          body: `这条通知在 ${delay / 1000} 秒前被安排发送`,
          tag: 'scheduled-notification',
          icon: getDefaultIcon(),
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };

        message.success('定时通知已发送');
      } catch (error) {
        console.error('发送定时通知失败:', error);
        message.error('发送定时通知失败');
      }
    }, delay);
  };

  // 诊断通知问题
  const diagnoseNotification = () => {
    const diagnostics: string[] = [];
    
    // 检查浏览器支持
    if (!('Notification' in window)) {
      diagnostics.push('❌ 浏览器不支持通知功能');
    } else {
      diagnostics.push('✅ 浏览器支持通知功能');
    }

    // 检查权限
    diagnostics.push(`📋 通知权限状态: ${Notification.permission}`);
    
    if (Notification.permission === 'granted') {
      diagnostics.push('✅ 浏览器已授予通知权限');
    } else {
      diagnostics.push('❌ 浏览器未授予通知权限');
    }

    // 检查 Service Worker（某些浏览器需要）
    if ('serviceWorker' in navigator) {
      diagnostics.push('✅ 浏览器支持 Service Worker');
    }

    // 尝试创建一个测试通知
    if (Notification.permission === 'granted') {
      try {
        const testNotification = new Notification('诊断测试通知', {
          body: '如果您看到这条通知，说明通知功能正常',
          icon: getDefaultIcon(),
          tag: 'diagnostic-test',
          requireInteraction: true, // 确保通知不会立即消失
        });

        testNotification.onshow = () => {
          diagnostics.push('✅ 测试通知已创建并触发 onshow 事件');
          console.log('诊断信息:', diagnostics);
          message.success('测试通知已发送，请检查是否在屏幕上显示');
        };

        testNotification.onerror = (error) => {
          diagnostics.push('❌ 测试通知创建失败');
          console.error('诊断错误:', error);
          message.error('测试通知创建失败');
        };

        setTimeout(() => {
          testNotification.close();
        }, 5000);
      } catch (error) {
        diagnostics.push('❌ 创建测试通知时出错: ' + (error as Error).message);
        console.error('诊断错误:', error);
        message.error('创建测试通知失败');
      }
    }

    // 输出诊断信息到控制台
    console.log('=== 通知诊断信息 ===');
    diagnostics.forEach((msg, index) => {
      console.log(`${index + 1}. ${msg}`);
    });
    console.log('==================');

    // 显示诊断结果
    const result = diagnostics.join('\n');
    message.info({
      content: (
        <div style={{ whiteSpace: 'pre-line', maxHeight: '300px', overflow: 'auto' }}>
          <strong>诊断结果：</strong>
          <br />
          {result}
          <br />
          <br />
          <strong>提示：</strong>如果看到"✅ 测试通知已创建"但屏幕上没有显示，请检查 Windows 通知设置
        </div>
      ),
      duration: 10,
    });
  };

  // 获取权限状态标签
  const getPermissionTag = () => {
    switch (permission) {
      case 'granted':
        return <Tag color="green" icon={<CheckCircleOutlined />}>已授权</Tag>;
      case 'denied':
        return <Tag color="red" icon={<CloseCircleOutlined />}>已拒绝</Tag>;
      default:
        return <Tag color="orange">未授权</Tag>;
    }
  };

  return (
    <div className="notification-demo">
      <Card title={<><BellOutlined /> 浏览器通知演示</>} className="demo-card">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* 权限状态 */}
          <Card size="small" title="权限状态">
            <Space>
              <span>当前权限：</span>
              {getPermissionTag()}
              {permission !== 'granted' && (
                <Button type="primary" onClick={requestPermission}>
                  请求通知权限
                </Button>
              )}
            </Space>
          </Card>

          {/* 通知配置 */}
          <Card size="small" title="通知配置">
            <Space direction="vertical" style={{ width: '100%' }} size="middle">
              <div>
                <label>通知标题：</label>
                <Input
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="请输入通知标题"
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <label>通知内容：</label>
                <TextArea
                  value={notificationBody}
                  onChange={(e) => setNotificationBody(e.target.value)}
                  placeholder="请输入通知内容"
                  rows={3}
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <label>图标URL（可选）：</label>
                <Input
                  value={notificationIcon}
                  onChange={(e) => setNotificationIcon(e.target.value)}
                  placeholder="https://example.com/icon.png"
                  style={{ marginTop: 8 }}
                />
              </div>

              <div>
                <label>标签（Tag）：</label>
                <Input
                  value={notificationTag}
                  onChange={(e) => setNotificationTag(e.target.value)}
                  placeholder="notification-demo"
                  style={{ marginTop: 8 }}
                />
                <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                  相同标签的通知会替换之前的通知
                </div>
              </div>

              <div>
                <label>震动模式（可选，逗号分隔）：</label>
                <Input
                  value={vibrate}
                  onChange={(e) => setVibrate(e.target.value)}
                  placeholder="200,100,200"
                  style={{ marginTop: 8 }}
                />
                <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>
                  例如：200,100,200 表示震动200ms，暂停100ms，再震动200ms
                </div>
              </div>

              <div>
                <Space>
                  <span>需要用户交互：</span>
                  <Switch checked={requireInteraction} onChange={setRequireInteraction} />
                  <span style={{ fontSize: 12, color: '#999' }}>
                    （通知不会自动关闭，需要用户手动关闭）
                  </span>
                </Space>
              </div>

              <div>
                <Space>
                  <span>静音模式：</span>
                  <Switch checked={silent} onChange={setSilent} />
                  <span style={{ fontSize: 12, color: '#999' }}>
                    （通知不会播放声音）
                  </span>
                </Space>
              </div>
            </Space>
          </Card>

          {/* 操作按钮 */}
          <Card size="small" title="操作">
            <Space wrap>
              <Button
                type="primary"
                icon={<BellOutlined />}
                onClick={sendNotification}
                disabled={permission !== 'granted'}
              >
                发送通知
              </Button>
              <Button onClick={sendImageNotification} disabled={permission !== 'granted'}>
                发送图片通知
              </Button>
              <Button onClick={sendScheduledNotification} disabled={permission !== 'granted'}>
                发送定时通知（3秒后）
              </Button>
              <Button 
                type="dashed" 
                onClick={diagnoseNotification}
                disabled={permission !== 'granted'}
              >
                🔍 诊断通知问题
              </Button>
            </Space>
          </Card>

          {/* 排查步骤 */}
          <Card size="small" title="🔍 通知未显示排查步骤（重要）" style={{ borderColor: '#faad14' }}>
            <div style={{ marginBottom: 12, padding: 12, background: '#fff7e6', borderRadius: 4 }}>
              <strong>⚠️ 根据您的日志，通知已成功创建但未在屏幕上显示，这是 Windows 系统设置问题！</strong>
            </div>
            <ol style={{ margin: 0, paddingLeft: 20 }}>
              <li><strong>检查 Windows 专注助手（Focus Assist）：</strong>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  <li>按 <code>Win + A</code> 打开操作中心</li>
                  <li>找到"专注助手"按钮，确保它是关闭状态</li>
                  <li>或者：设置 → 系统 → 专注助手 → 关闭所有专注助手规则</li>
                  <li style={{ color: '#ff4d4f' }}><strong>这是最常见的原因！</strong></li>
                </ul>
              </li>
              <li><strong>检查 Windows 通知设置：</strong>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  <li>打开 Windows 设置（Win + I）→ 系统 → 通知和操作</li>
                  <li>确保"获取来自应用和其他发送者的通知"已开启</li>
                  <li>找到您的浏览器（Microsoft Edge 或 Google Chrome）</li>
                  <li>确保浏览器的通知开关是<strong>开启</strong>状态</li>
                  <li>如果浏览器不在列表中，点击"获取来自这些应用的通知"查看</li>
                </ul>
              </li>
              <li><strong>检查浏览器通知设置：</strong>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  <li>Chrome/Edge: 设置 → 隐私和安全 → 网站设置 → 通知</li>
                  <li>确保当前网站（localhost 或您的域名）的通知权限为"允许"</li>
                  <li>检查浏览器地址栏右侧的锁图标，查看通知权限</li>
                </ul>
              </li>
              <li><strong>检查系统通知中心：</strong>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  <li>点击 Windows 右下角通知图标（🔔）查看通知中心</li>
                  <li>通知可能被折叠或自动隐藏</li>
                  <li>尝试点击"通知已显示"按钮后立即查看通知中心</li>
                </ul>
              </li>
              <li><strong>快速测试方法：</strong>
                <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                  <li>点击上方的"🔍 诊断通知问题"按钮</li>
                  <li>查看控制台（F12）输出的诊断信息</li>
                  <li>如果诊断显示一切正常但仍不显示，100% 是 Windows 专注助手的问题</li>
                </ul>
              </li>
            </ol>
          </Card>

          {/* 说明 */}
          <Card size="small" title="使用说明">
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li>首次使用需要点击"请求通知权限"按钮授予通知权限</li>
              <li>如果权限被拒绝，需要在浏览器设置中手动允许通知</li>
              <li>通知会在系统通知中心显示，点击通知可以触发相应事件</li>
              <li>相同标签（Tag）的通知会替换之前的通知</li>
              <li>震动模式仅在支持的设备上生效（如移动设备）</li>
              <li>通知权限是持久的，一旦授予，下次访问会自动生效</li>
              <li><strong>提示：</strong>如果通知已发送但未显示，请检查 Windows 通知设置和浏览器通知设置</li>
            </ul>
          </Card>
        </Space>
      </Card>
    </div>
  );
};

export default NotificationDemo;

