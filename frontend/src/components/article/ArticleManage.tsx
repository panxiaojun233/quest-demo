import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Popconfirm,
  message,
  Card,
  Typography,
  Input,
  Select,
  Modal,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { ArticleService } from '../../services';
import { Article, PageResponse } from '../../types';
import { DateUtils, ARTICLE_STATUS_LABELS } from '../../utils';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import './ArticleManage.css';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

/**
 * 文章管理页面
 */
export const ArticleManage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  /**
   * 获取我的文章列表
   */
  const fetchMyArticles = async (
    page: number = 1,
    size: number = 10,
    status?: string
  ) => {
    setLoading(true);
    try {
      const response: PageResponse<Article> = await ArticleService.getCurrentUserArticles(
        page - 1, // 后端使用0开始的页码
        size,
        status
      );

      setArticles(response.content);
      setPagination(prev => ({
        ...prev,
        current: page,
        pageSize: size,
        total: response.totalElements,
      }));
    } catch (error: any) {
      message.error(error.message || '获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理删除文章
   */
  const handleDelete = async (id: number) => {
    try {
      await ArticleService.deleteArticle(id);
      message.success('文章删除成功');
      // 重新加载数据
      fetchMyArticles(pagination.current, pagination.pageSize, statusFilter);
    } catch (error: any) {
      message.error(error.message || '删除文章失败');
    }
  };

  /**
   * 处理表格变化
   */
  const handleTableChange = (paginationConfig: TablePaginationConfig) => {
    fetchMyArticles(
      paginationConfig.current,
      paginationConfig.pageSize,
      statusFilter
    );
  };

  /**
   * 处理状态筛选变化
   */
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    fetchMyArticles(1, pagination.pageSize, value);
  };

  /**
   * 预览文章
   */
  const handlePreview = (article: Article) => {
    if (article.status === 'PUBLISHED') {
      window.open(`/article/${article.id}`, '_blank');
    } else {
      Modal.info({
        title: '文章预览',
        content: (
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            <h3>{article.title}</h3>
            <div dangerouslySetInnerHTML={{ 
              __html: article.content.substring(0, 500).replace(/\n/g, '<br>') + '...' 
            }} />
          </div>
        ),
        width: 600,
      });
    }
  };

  /**
   * 表格列定义
   */
  const columns: ColumnsType<Article> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      render: (text: string, record: Article) => (
        <div>
          <div className="article-title-cell">{text}</div>
          {record.summary && (
            <div className="article-summary-cell">{record.summary}</div>
          )}
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: keyof typeof ARTICLE_STATUS_LABELS) => (
        <Tag color={status === 'PUBLISHED' ? 'green' : 'orange'}>
          {ARTICLE_STATUS_LABELS[status]}
        </Tag>
      ),
    },
    {
      title: '阅读量',
      dataIndex: 'viewCount',
      key: 'viewCount',
      width: 100,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (time: string) => DateUtils.format(time, 'MM-dd HH:mm'),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 180,
      render: (time: string) => DateUtils.format(time, 'MM-dd HH:mm'),
    },
    {
      title: '操作',
      key: 'actions',
      width: 200,
      render: (_, record: Article) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handlePreview(record)}
          >
            预览
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => navigate(`/manage/edit/${record.id}`)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这篇文章吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              type="link"
              size="small"
              danger
              icon={<DeleteOutlined />}
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /**
   * 组件初始化
   */
  useEffect(() => {
    fetchMyArticles();
  }, []);

  return (
    <div className="article-manage-container">
      <Card>
        <div className="manage-header">
          <Title level={2}>文章管理</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/manage/create')}
          >
            新建文章
          </Button>
        </div>

        <div className="manage-toolbar">
          <Space size="middle">
            <Select
              placeholder="筛选状态"
              allowClear
              style={{ width: 120 }}
              value={statusFilter || undefined}
              onChange={handleStatusFilterChange}
            >
              <Option value="DRAFT">草稿</Option>
              <Option value="PUBLISHED">已发布</Option>
            </Select>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={articles}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};