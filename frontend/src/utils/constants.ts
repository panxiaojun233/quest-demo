/**
 * API配置常量
 */
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
  TOKEN_KEY: 'personal_blog_token',
  USER_KEY: 'personal_blog_user'
};

/**
 * 分页配置
 */
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100']
};

/**
 * 文章状态配置
 */
export const ARTICLE_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED'
} as const;

/**
 * 文章状态标签配置
 */
export const ARTICLE_STATUS_LABELS = {
  DRAFT: '草稿',
  PUBLISHED: '已发布'
};

/**
 * 路由路径常量
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ARTICLE_DETAIL: '/article/:id',
  ARTICLE_MANAGE: '/manage',
  ARTICLE_CREATE: '/manage/create',
  ARTICLE_EDIT: '/manage/edit/:id'
};

/**
 * 本地存储键名
 */
export const STORAGE_KEYS = {
  TOKEN: 'personal_blog_token',
  USER: 'personal_blog_user',
  THEME: 'personal_blog_theme'
};