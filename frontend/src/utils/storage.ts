import { STORAGE_KEYS } from './constants';

/**
 * 本地存储工具类
 */
export class StorageUtils {
  /**
   * 设置本地存储
   */
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error setting localStorage item:', error);
    }
  }

  /**
   * 获取本地存储
   */
  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return null;
    }
  }

  /**
   * 删除本地存储项
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing localStorage item:', error);
    }
  }

  /**
   * 清空本地存储
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * 获取认证token
   */
  static getToken(): string | null {
    return this.getItem<string>(STORAGE_KEYS.TOKEN);
  }

  /**
   * 设置认证token
   */
  static setToken(token: string): void {
    this.setItem(STORAGE_KEYS.TOKEN, token);
  }

  /**
   * 删除认证token
   */
  static removeToken(): void {
    this.removeItem(STORAGE_KEYS.TOKEN);
  }

  /**
   * 获取用户信息
   */
  static getUser<T>(): T | null {
    return this.getItem<T>(STORAGE_KEYS.USER);
  }

  /**
   * 设置用户信息
   */
  static setUser(user: any): void {
    this.setItem(STORAGE_KEYS.USER, user);
  }

  /**
   * 删除用户信息
   */
  static removeUser(): void {
    this.removeItem(STORAGE_KEYS.USER);
  }
}