import React from 'react';
import { Typography, Row, Col, Card, Space } from 'antd';
import { ArticleList } from '../components/article';
import './HomePage.css';

const { Title, Paragraph } = Typography;

/**
 * 博客首页
 */
export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Row gutter={24}>
        {/* 主要内容区域 */}
        <Col xs={24} lg={16}>
          <div className="main-content">
            <ArticleList showSearch pageSize={10} />
          </div>
        </Col>

        {/* 侧边栏 */}
        <Col xs={24} lg={8}>
          <div className="sidebar">
            {/* 博客介绍卡片 */}
            <Card className="intro-card" title="关于本博客">
              <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <Paragraph>
                  欢迎来到我的个人博客！这里记录了我在技术学习和生活中的点点滴滴。
                </Paragraph>
                <Paragraph>
                  本博客基于 React + Spring Boot + MySQL 技术栈构建，
                  采用前后端分离的架构设计，支持用户注册登录、文章发布管理等功能。
                </Paragraph>
                <Paragraph type="secondary">
                  希望我的分享能够对您有所帮助，也欢迎与我交流学习！
                </Paragraph>
              </Space>
            </Card>

            {/* 统计信息卡片 */}
            <Card className="stats-card" title="博客统计">
              <div className="stats-content">
                <div className="stat-item">
                  <div className="stat-number">正在加载...</div>
                  <div className="stat-label">文章总数</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">正在加载...</div>
                  <div className="stat-label">总阅读量</div>
                </div>
              </div>
            </Card>

            {/* 标签云卡片 */}
            <Card className="tags-card" title="热门标签">
              <div className="tags-content">
                <Space wrap>
                  <span className="tag-item">React</span>
                  <span className="tag-item">Spring Boot</span>
                  <span className="tag-item">JavaScript</span>
                  <span className="tag-item">Java</span>
                  <span className="tag-item">前端开发</span>
                  <span className="tag-item">后端开发</span>
                </Space>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};