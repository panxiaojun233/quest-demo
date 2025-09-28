import React from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import { Footer } from './Footer';
import './MainLayout.css';

const { Content } = Layout;

/**
 * 主布局组件属性
 */
interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * 主布局组件
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="main-layout">
      <Header />
      <Content className="main-content">
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};