import ApiService from './api';
import { Article, ArticleRequest, PageResponse } from '../types';

/**
 * 文章服务
 */
export class ArticleService {
  /**
   * 获取已发布文章列表
   */
  static async getPublishedArticles(
    page: number = 0,
    size: number = 10,
    search?: string
  ): Promise<PageResponse<Article>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (search && search.trim()) {
      params.append('search', search.trim());
    }

    const response = await ApiService.get<PageResponse<Article>>(`/articles?${params.toString()}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '获取文章列表失败');
  }

  /**
   * 根据ID获取文章详情
   */
  static async getArticleById(id: number): Promise<Article> {
    const response = await ApiService.get<Article>(`/articles/${id}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '获取文章详情失败');
  }

  /**
   * 创建文章
   */
  static async createArticle(articleData: ArticleRequest): Promise<Article> {
    const response = await ApiService.post<Article>('/articles', articleData);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '创建文章失败');
  }

  /**
   * 更新文章
   */
  static async updateArticle(id: number, articleData: ArticleRequest): Promise<Article> {
    const response = await ApiService.put<Article>(`/articles/${id}`, articleData);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '更新文章失败');
  }

  /**
   * 删除文章
   */
  static async deleteArticle(id: number): Promise<void> {
    const response = await ApiService.delete(`/articles/${id}`);
    if (!response.success) {
      throw new Error(response.message || '删除文章失败');
    }
  }

  /**
   * 获取当前用户的文章列表
   */
  static async getCurrentUserArticles(
    page: number = 0,
    size: number = 10,
    status?: string
  ): Promise<PageResponse<Article>> {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (status && status.trim()) {
      params.append('status', status.trim());
    }

    const response = await ApiService.get<PageResponse<Article>>(`/articles/my?${params.toString()}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '获取我的文章列表失败');
  }
}