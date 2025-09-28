/**
 * 用户相关类型定义
 */
export interface User {
  id: number;
  username: string;
  email?: string;
  nickname?: string;
  bio?: string;
  avatar?: string;
  createTime?: string;
  updateTime?: string;
}

/**
 * JWT响应类型
 */
export interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  nickname?: string;
  expiresAt: string;
}

/**
 * 登录请求类型
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 注册请求类型
 */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  nickname?: string;
}

/**
 * 用户信息更新请求类型
 */
export interface UserProfileUpdateRequest {
  nickname?: string;
  email?: string;
  bio?: string;
  avatar?: string;
}