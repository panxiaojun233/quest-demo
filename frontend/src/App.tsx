import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { AuthProvider } from './contexts/AuthContext';
import { MainLayout, PrivateRoute } from './components';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ArticleDetailPage,
  ArticleManagePage,
  ArticleCreatePage,
  ArticleEditPage,
  UserProfilePage,
} from './pages';
import './App.css';

/**
 * 应用程序根组件
 */
function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* 登录和注册页面不使用主布局 */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* 使用主布局的页面 */}
              <Route
                path="/*"
                element={
                  <MainLayout>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/article/:id" element={<ArticleDetailPage />} />
                      
                      {/* 需要认证的页面 */}
                      <Route path="/profile" element={
                        <PrivateRoute>
                          <UserProfilePage />
                        </PrivateRoute>
                      } />
                      <Route path="/manage" element={
                        <PrivateRoute>
                          <ArticleManagePage />
                        </PrivateRoute>
                      } />
                      <Route path="/manage/create" element={
                        <PrivateRoute>
                          <ArticleCreatePage />
                        </PrivateRoute>
                      } />
                      <Route path="/manage/edit/:id" element={
                        <PrivateRoute>
                          <ArticleEditPage />
                        </PrivateRoute>
                      } />
                      
                      {/* 404页面 */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </MainLayout>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;