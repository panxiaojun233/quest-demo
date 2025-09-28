import React from 'react';
import { Layout, Typography } from 'antd';
import { GithubOutlined, HeartFilled } from '@ant-design/icons';
import './Footer.css';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

/**
 * 底部组件
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <Text type="secondary">
            © {currentYear} 个人博客. 基于 React + Spring Boot 构建
          </Text>
        </div>
        
        <div className="footer-section">
          <Text type="secondary">
            Made with <HeartFilled style={{ color: '#ff4d4f', margin: '0 4px' }} /> 
            by 博客作者
          </Text>
        </div>

        <div className="footer-section">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            <GithubOutlined /> GitHub
          </a>
        </div>
      </div>
    </AntFooter>
  );
};