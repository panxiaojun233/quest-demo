# 个人博客网站项目

这是一个基于 React + Spring Boot + MySQL 的个人博客网站项目，采用前后端分离的架构设计。

## ✨ 功能特性

### 前端功能
- 🏠 博客首页展示
- 📝 文章列表和详情查看
- 🔍 文章搜索功能
- 👤 用户注册和登录
- 🔐 JWT 认证机制
- 📊 个人资料管理
- ✏️ 文章创建和编辑
- 📋 文章管理面板
- 📱 响应式设计

### 后端功能
- 🔒 用户认证和授权
- 📄 RESTful API 接口
- 📚 文章 CRUD 操作
- 👥 用户管理
- 🛡️ Spring Security 安全配置
- 🗄️ JPA 数据持久化
- ⚡ 分页查询支持

## 🛠️ 技术栈

### 前端
- React 18
- TypeScript
- Ant Design 5
- React Router 6
- Axios
- CSS3

### 后端
- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL 8.0
- JWT
- Maven

## 📦 项目结构

```
quest-demo/
├── backend/           # Spring Boot 后端项目
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/personalblog/
│   │   │   │   ├── config/        # 配置类
│   │   │   │   ├── controller/    # 控制器
│   │   │   │   ├── dto/           # 数据传输对象
│   │   │   │   ├── entity/        # JPA实体
│   │   │   │   ├── repository/    # 数据访问层
│   │   │   │   ├── security/      # 安全配置
│   │   │   │   └── service/       # 业务逻辑层
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       └── schema.sql
│   │   └── test/
│   └── pom.xml
├── frontend/          # React 前端项目
│   ├── src/
│   │   ├── components/    # 可复用组件
│   │   ├── contexts/      # React Context
│   │   ├── pages/         # 页面组件
│   │   ├── services/      # API服务
│   │   ├── types/         # TypeScript类型
│   │   └── utils/         # 工具函数
│   └── package.json
├── scripts/           # 构建和部署脚本
├── docker-compose.yml # Docker 容器编排
└── README.md
```

## 🚀 快速开始

### 环境要求
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### 方式一：一键启动（推荐）

```bash
# 克隆项目
git clone <repository-url>
cd quest-demo

# 运行一键启动脚本
./scripts/start.sh
```

### 方式二：手动启动

#### 1. 数据库配置

创建 MySQL 数据库：
```sql
CREATE DATABASE personal_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### 2. 启动后端服务

```bash
cd backend

# 修改 application.yml 中的数据库连接配置
# 启动后端服务
mvn spring-boot:run
```

后端服务将在 http://localhost:8080 启动

#### 3. 启动前端服务

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm start
```

前端服务将在 http://localhost:3000 启动

### 方式三：Docker 部署

```bash
# 使用 Docker Compose 一键部署
docker-compose up -d
```

## 📋 API 接口文档

### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/validate` - 验证token

### 文章接口
- `GET /api/articles` - 获取文章列表
- `GET /api/articles/{id}` - 获取文章详情
- `POST /api/articles` - 创建文章（需认证）
- `PUT /api/articles/{id}` - 更新文章（需认证）
- `DELETE /api/articles/{id}` - 删除文章（需认证）
- `GET /api/articles/my` - 获取我的文章列表（需认证）

### 用户接口
- `GET /api/user/profile` - 获取用户信息（需认证）
- `PUT /api/user/profile` - 更新用户信息（需认证）
- `GET /api/user/{id}` - 获取用户公开信息

## 🎯 使用说明

1. **访问首页**：打开 http://localhost:3000
2. **用户注册**：点击"注册"按钮创建新账户
3. **用户登录**：使用注册的账户登录
4. **浏览文章**：在首页查看已发布的文章
5. **创建文章**：登录后访问"文章管理"页面创建新文章
6. **个人资料**：在"个人资料"页面管理个人信息

## 🔧 开发说明

### 数据库初始化

项目启动时会自动创建数据库表结构。初始数据可以通过 `backend/src/main/resources/schema.sql` 文件进行配置。

### 环境配置

- 后端配置文件：`backend/src/main/resources/application.yml`
- 前端环境变量：`frontend/.env`

### 开发工具推荐

- IDE：IntelliJ IDEA（后端）+ VS Code（前端）
- API 测试：Postman 或 Insomnia
- 数据库工具：MySQL Workbench 或 Navicat

## 📝 注意事项

1. **首次运行**：确保 MySQL 服务已启动并创建了相应数据库
2. **端口占用**：确保 3000、8080、3306 端口未被占用
3. **网络访问**：前端默认连接本地后端，如需修改请更新环境变量
4. **数据安全**：生产环境请修改默认的 JWT 密钥和数据库密码

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交变更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 📧 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 项目 Issues
- 邮箱：your-email@example.com

---

**Happy Coding! 🎉**