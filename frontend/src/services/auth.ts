import ApiService from './api';
import { LoginRequest, RegisterRequest, JwtResponse, User } from '../types';

/**
 * 认证服务
 */
export class AuthService {
  /**
   * 用户登录
   */
  static async login(loginData: LoginRequest): Promise<JwtResponse> {
    const response = await ApiService.post<JwtResponse>('/auth/login', loginData);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || '登录失败');
  }

  /**
   * 用户注册
   */
  static async register(registerData: RegisterRequest): Promise<void> {
    const response = await ApiService.post('/auth/register', registerData);
    if (!response.success) {
      throw new Error(response.message || '注册失败');
    }
  }

  /**
   * 验证Token
   */
  static async validateToken(): Promise<User> {
    const response = await ApiService.get<User>('/auth/validate');
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Token验证失败');
  }

  /**
   * 用户登出
   */
  static async logout(): Promise<void> {
    try {
      await ApiService.post('/auth/logout');
    } catch (error) {
      // 即使接口调用失败，也要清除本地存储
      console.warn('Logout API failed:', error);
    }
  }
}