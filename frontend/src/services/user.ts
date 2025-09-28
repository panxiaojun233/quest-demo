import ApiService from './api';
import { User, UserProfileUpdateRequest } from '../types';

/**
 * 用户服务
 */
export class UserService {
  /**
   * 获取当前用户信息
   */
  static async getCurrentUser(): Promise<User> {
    const response = await ApiService.get<User>('/user/profile');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '获取用户信息失败');
  }

  /**
   * 更新用户信息
   */
  static async updateProfile(updateData: UserProfileUpdateRequest): Promise<User> {
    const response = await ApiService.put<User>('/user/profile', updateData);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '更新用户信息失败');
  }

  /**
   * 根据用户ID获取用户信息
   */
  static async getUserById(userId: number): Promise<User> {
    const response = await ApiService.get<User>(`/user/${userId}`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '获取用户信息失败');
  }
}