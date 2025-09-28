import { format, formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';

/**
 * 日期格式化工具类
 */
export class DateUtils {
  /**
   * 格式化日期为标准格式
   */
  static format(date: string | Date, formatStr: string = 'yyyy-MM-dd HH:mm:ss'): string {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return format(dateObj, formatStr, { locale: zhCN });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  }

  /**
   * 格式化为相对时间（如：3天前）
   */
  static formatRelative(date: string | Date): string {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return formatDistanceToNow(dateObj, { addSuffix: true, locale: zhCN });
    } catch (error) {
      console.error('Error formatting relative date:', error);
      return '';
    }
  }

  /**
   * 格式化为短日期格式
   */
  static formatShort(date: string | Date): string {
    return this.format(date, 'MM-dd HH:mm');
  }

  /**
   * 格式化为日期格式（不含时间）
   */
  static formatDate(date: string | Date): string {
    return this.format(date, 'yyyy-MM-dd');
  }

  /**
   * 判断日期是否为今天
   */
  static isToday(date: string | Date): boolean {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const today = new Date();
      return dateObj.toDateString() === today.toDateString();
    } catch (error) {
      console.error('Error checking if date is today:', error);
      return false;
    }
  }

  /**
   * 判断日期是否为本周
   */
  static isThisWeek(date: string | Date): boolean {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return dateObj >= weekAgo && dateObj <= now;
    } catch (error) {
      console.error('Error checking if date is this week:', error);
      return false;
    }
  }
}