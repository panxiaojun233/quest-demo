import React from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Space, Typography } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import type { MenuProps } from 'antd';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

/**
 * 头部导航组件
 */
export const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * 处理登出
   */
  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  /**
   * 用户菜单项
   */
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'manage',
      icon: <EditOutlined />,
      label: '文章管理',
      onClick: () => navigate('/manage'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  /**
   * 导航菜单项
   */
  const navMenuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
  ];

  return (
    <AntHeader className="site-header">
      <div className="header-content">
        {/* Logo和标题 */}
        <div className="header-logo">
          <Link to="/">
            <Title level={3} style={{ margin: 0, color: 'white' }}>
              个人博客
            </Title>
          </Link>
        </div>

        {/* 导航菜单 */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={navMenuItems}
          className="header-nav"
        />

        {/* 用户操作区 */}
        <div className="header-actions">
          {state.isAuthenticated ? (
            <Space>
              <span style={{ color: 'rgba(255, 255, 255, 0.65)' }}>
                欢迎, {state.user?.nickname || state.user?.username}
              </span>
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  src={state.user?.avatar}
                  className="user-avatar"
                />
              </Dropdown>
            </Space>
          ) : (
            <div className="auth-buttons">
              <Link to="/login">
                <Button
                  type="text"
                  icon={<LoginOutlined />}
                  style={{ color: 'white' }}
                >
                  登录
                </Button>
              </Link>
              <Link to="/register">
                <Button type="primary" size="small">
                  注册
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AntHeader>
  );
};