import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, JwtResponse } from '../types';
import { StorageUtils } from '../utils';
import { AuthService } from '../services';

/**
 * 认证状态类型
 */
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
}

/**
 * 认证操作类型
 */
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

/**
 * 认证上下文类型
 */
interface AuthContextType {
  state: AuthState;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

/**
 * 初始状态
 */
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
};

/**
 * 认证状态reducer
 */
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

/**
 * 认证上下文
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * 认证提供者组件
 */
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * 登录
   */
  const login = (token: string, user: User) => {
    StorageUtils.setToken(token);
    StorageUtils.setUser(user);
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
  };

  /**
   * 登出
   */
  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.warn('Logout API failed:', error);
    } finally {
      StorageUtils.removeToken();
      StorageUtils.removeUser();
      dispatch({ type: 'LOGOUT' });
    }
  };

  /**
   * 更新用户信息
   */
  const updateUser = (user: User) => {
    StorageUtils.setUser(user);
    dispatch({ type: 'UPDATE_USER', payload: user });
  };

  /**
   * 设置加载状态
   */
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  /**
   * 初始化认证状态
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = StorageUtils.getToken();
      const user = StorageUtils.getUser<User>();

      if (token && user) {
        try {
          // 验证token是否仍然有效
          const validatedUser = await AuthService.validateToken();
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: validatedUser, token } });
        } catch (error) {
          // Token无效，清除本地存储
          StorageUtils.removeToken();
          StorageUtils.removeUser();
          dispatch({ type: 'LOGIN_FAILURE' });
        }
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    };

    initAuth();
  }, []);

  const contextValue: AuthContextType = {
    state,
    login,
    logout,
    updateUser,
    setLoading,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

/**
 * 使用认证上下文的Hook
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}