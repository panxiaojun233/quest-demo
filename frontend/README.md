# 个人博客前端

基于 React + TypeScript + Ant Design 构建的个人博客前端项目。

## 功能特性

- ✅ 用户注册/登录
- ✅ JWT 认证
- ✅ 博客首页
- ✅ 文章列表/详情
- ✅ 文章创建/编辑/删除
- ✅ 文章管理
- ✅ 个人资料管理
- ✅ 响应式设计

## 技术栈

- React 18
- TypeScript
- Ant Design 5
- React Router 6
- Axios
- CSS3

## 开发环境启动

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm start
```

3. 构建生产版本：
```bash
npm run build
```

## 环境变量

- `REACT_APP_API_BASE_URL`: 后端API地址，默认 http://localhost:8080/api

## 项目结构

```
src/
├── components/         # 可复用组件
│   ├── auth/          # 认证相关组件
│   ├── article/       # 文章相关组件
│   ├── layout/        # 布局组件
│   └── user/          # 用户相关组件
├── contexts/          # React Context
├── pages/             # 页面组件
├── services/          # API服务
├── types/             # TypeScript类型定义
├── utils/             # 工具函数
└── App.tsx            # 根组件
```

## 注意事项

- 确保后端服务已启动并运行在 http://localhost:8080
- 首次访问需要先注册账户
