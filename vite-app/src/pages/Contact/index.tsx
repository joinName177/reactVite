import React from 'react';
import { Card, Typography, Form, Input, Button, message } from 'antd';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form] = Form.useForm<ContactFormValues>();

  const onFinish = (values: ContactFormValues) => {
    console.log('表单数据:', values);
    message.success('消息已发送！');
    form.resetFields();
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>联系我们</Title>
        <Paragraph>
          如果您有任何问题或建议，请通过以下表单与我们联系。
        </Paragraph>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: '600px' }}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入您的姓名' }]}
          >
            <Input placeholder="请输入您的姓名" />
          </Form.Item>
          
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入您的邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入您的邮箱" />
          </Form.Item>
          
          <Form.Item
            name="subject"
            label="主题"
            rules={[{ required: true, message: '请输入主题' }]}
          >
            <Input placeholder="请输入主题" />
          </Form.Item>
          
          <Form.Item
            name="message"
            label="消息内容"
            rules={[{ required: true, message: '请输入消息内容' }]}
          >
            <TextArea rows={4} placeholder="请输入消息内容" />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              发送消息
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Contact; 