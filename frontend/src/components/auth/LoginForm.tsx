import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { LoginRequest } from '../../types';
import { AuthService } from '../../services';
import { useAuth } from '../../contexts/AuthContext';
import { StringUtils } from '../../utils';
import './AuthForms.css';

const { Title, Text } = Typography;

/**
 * 登录表单组件
 */
export const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  /**
   * 处理登录表单提交
   */
  const handleSubmit = async (values: LoginRequest) => {
    setLoading(true);
    try {
      const jwtResponse = await AuthService.login(values);
      
      // 构造用户对象
      const user = {
        id: jwtResponse.id,
        username: jwtResponse.username,
        email: jwtResponse.email,
        nickname: jwtResponse.nickname,
      };

      login(jwtResponse.token, user);
      message.success('登录成功！');
      navigate('/');
    } catch (error: any) {
      message.error(error.message || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-header">
          <Title level={2}>登录</Title>
          <Text type="secondary">欢迎回到个人博客</Text>
        </div>

        <Form
          form={form}
          name="login"
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
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <Divider>
          <Text type="secondary">还没有账户？</Text>
        </Divider>

        <div className="auth-footer">
          <Link to="/register">
            <Button type="link" size="large" block>
              立即注册
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};