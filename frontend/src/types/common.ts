/**
 * API响应类型
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * API错误类型
 */
export interface ApiError {
  message: string;
  status?: number;
}

/**
 * 路由参数类型
 */
export interface RouteParams {
  id?: string;
}

/**
 * 表单验证规则类型
 */
export interface ValidationRule {
  required?: boolean;
  message?: string;
  min?: number;
  max?: number;
  pattern?: RegExp;
}

/**
 * 通用组件Props类型
 */
export interface CommonProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}