import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Typography,
  Space,
  Tag,
  Skeleton,
  message,
  Button,
  Divider,
  Avatar,
} from 'antd';
import {
  ArrowLeftOutlined,
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { ArticleService } from '../../services';
import { Article } from '../../types';
import { DateUtils } from '../../utils';
import { useAuth } from '../../contexts/AuthContext';
import './ArticleDetail.css';

const { Title, Paragraph, Text } = Typography;

/**
 * 文章详情组件
 */
export const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useAuth();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);

  /**
   * 获取文章详情
   */
  const fetchArticle = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const response = await ArticleService.getArticleById(parseInt(id));
      setArticle(response);
    } catch (error: any) {
      message.error(error.message || '获取文章详情失败');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理编辑按钮点击
   */
  const handleEdit = () => {
    if (article) {
      navigate(`/manage/edit/${article.id}`);
    }
  };

  /**
   * 组件初始化
   */
  useEffect(() => {
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="article-detail-container">
        <Card>
          <Skeleton active paragraph={{ rows: 8 }} />
        </Card>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  // 检查是否为文章作者
  const isAuthor = state.isAuthenticated && state.user?.id === article.authorId;

  return (
    <div className="article-detail-container">
      {/* 返回按钮 */}
      <div className="back-button-section">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="back-button"
        >
          返回
        </Button>
      </div>

      <Card className="article-detail-card">
        {/* 文章头部 */}
        <div className="article-header">
          <Title level={1} className="article-title">
            {article.title}
          </Title>

          <div className="article-meta">
            <Space wrap>
              <Space>
                <Avatar size="small" icon={<UserOutlined />} />
                <Text strong>{article.authorName}</Text>
              </Space>
              <Space>
                <CalendarOutlined />
                <Text type="secondary">
                  {DateUtils.format(article.createTime)}
                </Text>
              </Space>
              <Space>
                <EyeOutlined />
                <Text type="secondary">{article.viewCount} 次阅读</Text>
              </Space>
              {article.status === 'DRAFT' && (
                <Tag color="orange">草稿</Tag>
              )}
            </Space>
          </div>

          {/* 操作按钮 */}
          {isAuthor && (
            <div className="article-actions">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEdit}
              >
                编辑文章
              </Button>
            </div>
          )}
        </div>

        <Divider />

        {/* 文章内容 */}
        <div className="article-content">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{
              __html: article.content.replace(/\n/g, '<br>')
            }}
          />
        </div>

        <Divider />

        {/* 文章底部信息 */}
        <div className="article-footer">
          <Text type="secondary">
            最后更新于 {DateUtils.format(article.updateTime)}
          </Text>
        </div>
      </Card>
    </div>
  );
};