/**
 * 字符串工具类
 */
export class StringUtils {
  /**
   * 截断字符串
   */
  static truncate(str: string, maxLength: number, suffix: string = '...'): string {
    if (!str || str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength - suffix.length) + suffix;
  }

  /**
   * 移除HTML标签
   */
  static stripHtml(html: string): string {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  }

  /**
   * 生成摘要
   */
  static generateSummary(content: string, maxLength: number = 200): string {
    const plainText = this.stripHtml(content);
    return this.truncate(plainText, maxLength);
  }

  /**
   * 转换为URL友好格式
   */
  static slugify(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /**
   * 首字母大写
   */
  static capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * 验证邮箱格式
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * 验证用户名格式（3-50字符，字母数字下划线）
   */
  static isValidUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/;
    return usernameRegex.test(username);
  }

  /**
   * 验证密码强度（至少6位）
   */
  static isValidPassword(password: string): boolean {
    return password && password.length >= 6;
  }

  /**
   * 高亮搜索关键词
   */
  static highlightKeyword(text: string, keyword: string): string {
    if (!keyword || !text) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}