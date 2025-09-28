import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  message,
  Typography,
  Space,
  Divider,
} from 'antd';
import {
  SaveOutlined,
  SendOutlined,
  ArrowLeftOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { ArticleService } from '../../services';
import { ArticleRequest, Article } from '../../types';
import { StringUtils } from '../../utils';
import './ArticleEditor.css';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

/**
 * 文章编辑器组件属性
 */
interface ArticleEditorProps {
  mode: 'create' | 'edit';
}

/**
 * 文章编辑器组件
 */
export const ArticleEditor: React.FC<ArticleEditorProps> = ({ mode }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);

  /**
   * 获取文章数据（编辑模式）
   */
  const fetchArticle = async () => {
    if (mode === 'create' || !id) return;

    setLoading(true);
    try {
      const response = await ArticleService.getArticleById(parseInt(id));
      setArticle(response);
      
      // 填充表单
      form.setFieldsValue({
        title: response.title,
        content: response.content,
        summary: response.summary,
        status: response.status,
      });
    } catch (error: any) {
      message.error(error.message || '获取文章失败');
      navigate('/manage');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 保存草稿
   */
  const handleSaveDraft = async () => {
    try {
      const values = await form.validateFields();
      const articleData: ArticleRequest = {
        ...values,
        status: 'DRAFT',
      };

      setSaving(true);
      
      if (mode === 'create') {
        await ArticleService.createArticle(articleData);
        message.success('草稿保存成功');
        navigate('/manage');
      } else if (article) {
        await ArticleService.updateArticle(article.id, articleData);
        message.success('草稿保存成功');
      }
    } catch (error: any) {
      if (error.errorFields) {
        message.error('请填写必要字段');
      } else {
        message.error(error.message || '保存失败');
      }
    } finally {
      setSaving(false);
    }
  };

  /**
   * 发布文章
   */
  const handlePublish = async () => {
    try {
      const values = await form.validateFields();
      const articleData: ArticleRequest = {
        ...values,
        status: 'PUBLISHED',
      };

      setPublishing(true);
      
      if (mode === 'create') {
        await ArticleService.createArticle(articleData);
        message.success('文章发布成功');
        navigate('/manage');
      } else if (article) {
        await ArticleService.updateArticle(article.id, articleData);
        message.success('文章发布成功');
      }
    } catch (error: any) {
      if (error.errorFields) {
        message.error('请填写必要字段');
      } else {
        message.error(error.message || '发布失败');
      }
    } finally {
      setPublishing(false);
    }
  };

  /**
   * 自动生成摘要
   */
  const handleGenerateSummary = () => {
    const content = form.getFieldValue('content');
    if (content && content.trim()) {
      const summary = StringUtils.generateSummary(content, 200);
      form.setFieldsValue({ summary });
      message.success('摘要已自动生成');
    } else {
      message.warning('请先填写文章内容');
    }
  };

  /**
   * 预览文章
   */
  const handlePreview = () => {
    const values = form.getFieldsValue();
    if (!values.title || !values.content) {
      message.warning('请先填写标题和内容');
      return;
    }

    // 这里可以实现预览功能，暂时显示模态框
    message.info('预览功能待实现');
  };

  /**
   * 组件初始化
   */
  useEffect(() => {
    fetchArticle();
  }, [mode, id]);

  if (loading) {
    return (
      <div className="article-editor-container">
        <Card loading />
      </div>
    );
  }

  return (
    <div className="article-editor-container">
      <Card>
        <div className="editor-header">
          <div className="header-left">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate('/manage')}
            >
              返回
            </Button>
            <Title level={2} style={{ margin: 0 }}>
              {mode === 'create' ? '新建文章' : '编辑文章'}
            </Title>
          </div>
          <Space>
            <Button
              icon={<EyeOutlined />}
              onClick={handlePreview}
            >
              预览
            </Button>
            <Button
              icon={<SaveOutlined />}
              loading={saving}
              onClick={handleSaveDraft}
            >
              保存草稿
            </Button>
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={publishing}
              onClick={handlePublish}
            >
              发布文章
            </Button>
          </Space>
        </div>

        <Divider />

        <Form
          form={form}
          layout="vertical"
          size="large"
          initialValues={{
            status: 'DRAFT',
          }}
        >
          <Form.Item
            name="title"
            label="文章标题"
            rules={[
              { required: true, message: '请输入文章标题' },
              { min: 1, max: 200, message: '标题长度必须在1-200个字符之间' },
            ]}
          >
            <Input
              placeholder="请输入文章标题"
              showCount
              maxLength={200}
            />
          </Form.Item>

          <Form.Item
            name="summary"
            label={
              <Space>
                <span>文章摘要</span>
                <Button
                  type="link"
                  size="small"
                  onClick={handleGenerateSummary}
                  style={{ padding: 0, height: 'auto' }}
                >
                  自动生成
                </Button>
              </Space>
            }
            rules={[
              { max: 500, message: '摘要长度不能超过500个字符' },
            ]}
          >
            <TextArea
              placeholder="请输入文章摘要，用于在文章列表中展示"
              rows={3}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="文章内容"
            rules={[
              { required: true, message: '请输入文章内容' },
            ]}
          >
            <TextArea
              placeholder="请输入文章内容，支持 Markdown 语法"
              rows={20}
              showCount
              className="content-textarea"
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};