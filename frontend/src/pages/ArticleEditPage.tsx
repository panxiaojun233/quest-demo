import React from 'react';
import { ArticleEditor } from '../components/article';

/**
 * 编辑文章页面
 */
export const ArticleEditPage: React.FC = () => {
  return <ArticleEditor mode="edit" />;
};