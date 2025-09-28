import React, { useState, useEffect } from 'react';
import { List, Card, Skeleton, Empty, message, Input, Pagination, Tag, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, CalendarOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { ArticleService } from '../../services';
import { Article, PageResponse } from '../../types';
import { DateUtils, StringUtils, PAGINATION_CONFIG } from '../../utils';
import './ArticleList.css';

const { Search } = Input;
const { Text, Paragraph } = Typography;

/**
 * 文章列表组件属性
 */
interface ArticleListProps {
  showSearch?: boolean;
  pageSize?: number;
}

/**
 * 文章列表组件
 */
export const ArticleList: React.FC<ArticleListProps> = ({
  showSearch = true,
  pageSize = PAGINATION_CONFIG.DEFAULT_PAGE_SIZE,
}) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  /**
   * 获取文章列表
   */
  const fetchArticles = async (page: number = 1, search?: string) => {
    setLoading(true);
    try {
      const response: PageResponse<Article> = await ArticleService.getPublishedArticles(
        page - 1, // 后端使用0开始的页码
        pagination.pageSize,
        search
      );

      setArticles(response.content);
      setPagination(prev => ({
        ...prev,
        current: page,
        total: response.totalElements,
      }));
    } catch (error: any) {
      message.error(error.message || '获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理页码变化
   */
  const handlePageChange = (page: number) => {
    fetchArticles(page, searchKeyword);
  };

  /**
   * 处理搜索
   */
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    fetchArticles(1, value);
  };

  /**
   * 组件初始化
   */
  useEffect(() => {
    fetchArticles();
  }, []);

  /**
   * 渲染文章项
   */
  const renderArticleItem = (article: Article) => (
    <List.Item key={article.id}>
      <Card
        hoverable
        className="article-card"
        actions={[
          <Space key="meta">
            <EyeOutlined />
            <Text type="secondary">{article.viewCount}</Text>
          </Space>,
          <Space key="date">
            <CalendarOutlined />
            <Text type="secondary">{DateUtils.formatRelative(article.createTime)}</Text>
          </Space>,
          <Space key="author">
            <UserOutlined />
            <Text type="secondary">{article.authorName}</Text>
          </Space>,
        ]}
      >
        <Card.Meta
          title={
            <Link to={`/article/${article.id}`} className="article-title">
              {article.title}
            </Link>
          }
          description={
            <div className="article-description">
              <Paragraph
                ellipsis={{ rows: 3, expandable: false }}
                type="secondary"
                className="article-summary"
              >
                {StringUtils.generateSummary(article.summary || article.content, 200)}
              </Paragraph>
            </div>
          }
        />
      </Card>
    </List.Item>
  );

  return (
    <div className="article-list-container">
      {showSearch && (
        <div className="search-section">
          <Search
            placeholder="搜索文章..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            className="article-search"
          />
        </div>
      )}

      <div className="list-section">
        {loading && articles.length === 0 ? (
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
            dataSource={Array.from({ length: 6 })}
            renderItem={() => (
              <List.Item>
                <Card>
                  <Skeleton loading active />
                </Card>
              </List.Item>
            )}
          />
        ) : articles.length === 0 ? (
          <Empty
            description="暂无文章"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <>
            <List
              grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
              dataSource={articles}
              renderItem={renderArticleItem}
              loading={loading}
            />

            {pagination.total > pagination.pageSize && (
              <div className="pagination-section">
                <Pagination
                  current={pagination.current}
                  pageSize={pagination.pageSize}
                  total={pagination.total}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showQuickJumper
                  showTotal={(total, range) =>
                    `第 ${range[0]}-${range[1]} 条，共 ${total} 条`
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};