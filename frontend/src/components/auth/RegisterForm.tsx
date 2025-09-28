import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterRequest } from '../../types';
import { AuthService } from '../../services';
import { StringUtils } from '../../utils';
import './AuthForms.css';

const { Title, Text } = Typography;

/**
 * 注册表单组件
 */
export const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * 处理注册表单提交
   */
  const handleSubmit = async (values: RegisterRequest) => {
    setLoading(true);
    try {
      await AuthService.register(values);
      message.success('注册成功！请登录您的账户');
      navigate('/login');
    } catch (error: any) {
      message.error(error.message || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <Title level={2}>注册</Title>
          <Text type="secondary">创建您的个人博客账户</Text>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={handleSubmit}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 50, message: '用户名长度必须在3-50字符之间' },
              {
                validator: (_, value) => {
                  if (!value || StringUtils.isValidUsername(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('用户名只能包含字母、数字和下划线'));
                },
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
              { max: 100, message: '邮箱长度不能超过100个字符' },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="请输入邮箱"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度至少6个字符' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="确认密码"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请再次输入密码"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="昵称（可选）"
            rules={[{ max: 50, message: '昵称长度不能超过50个字符' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入昵称"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
            >
              注册
            </Button>
          </Form.Item>
        </Form>

        <Divider>
          <Text type="secondary">已有账户？</Text>
        </Divider>

        <div className="auth-footer">
          <Link to="/login">
            <Button type="link" size="large" block>
              立即登录
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};