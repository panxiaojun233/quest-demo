import React from 'react';
import { ArticleEditor } from '../components/article';

/**
 * 创建文章页面
 */
export const ArticleCreatePage: React.FC = () => {
  return <ArticleEditor mode="create" />;
};