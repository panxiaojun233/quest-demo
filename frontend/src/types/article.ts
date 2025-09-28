/**
 * 文章相关类型定义
 */
export interface Article {
  id: number;
  title: string;
  content: string;
  summary?: string;
  authorId: number;
  authorName: string;
  status: 'DRAFT' | 'PUBLISHED';
  viewCount: number;
  createTime: string;
  updateTime: string;
}

/**
 * 文章请求类型
 */
export interface ArticleRequest {
  title: string;
  content: string;
  summary?: string;
  status?: 'DRAFT' | 'PUBLISHED';
}

/**
 * 分页响应类型
 */
export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * 文章列表项类型（用于列表显示）
 */
export interface ArticleListItem {
  id: number;
  title: string;
  summary?: string;
  authorName: string;
  viewCount: number;
  createTime: string;
  status?: 'DRAFT' | 'PUBLISHED';
}