# 个人博客后端服务

Spring Boot 后端服务，提供个人博客网站的API接口。

## 项目结构

```
src/
├── main/
│   ├── java/com/personalblog/
│   │   ├── controller/     # 控制器层
│   │   ├── service/        # 业务逻辑层
│   │   ├── repository/     # 数据访问层
│   │   ├── entity/         # JPA实体类
│   │   ├── dto/           # 数据传输对象
│   │   ├── config/        # 配置类
│   │   ├── security/      # 安全相关
│   │   ├── exception/     # 异常处理
│   │   └── utils/         # 工具类
│   └── resources/
│       ├── application.yml
│       └── application-test.yml
└── test/
    └── java/com/personalblog/
```

## 技术栈

- Spring Boot 3.2.0
- Spring Security
- Spring Data JPA
- MySQL 8.0
- JWT
- Lombok
- Maven

## 开发环境启动

1. 确保已安装 Java 17+ 和 Maven 3.6+
2. 确保 MySQL 服务已启动
3. 创建数据库：`CREATE DATABASE personal_blog;`
4. 修改 `application.yml` 中的数据库连接配置
5. 运行启动命令：

```bash
mvn spring-boot:run
```

## API接口

服务启动后，API基础路径为：`http://localhost:8080/api`

### 认证接口
- POST `/auth/login` - 用户登录
- POST `/auth/register` - 用户注册
- POST `/auth/logout` - 用户登出
- GET `/auth/validate` - 验证token

### 文章接口
- GET `/articles` - 获取文章列表
- GET `/articles/{id}` - 获取文章详情
- POST `/articles` - 创建文章（需认证）
- PUT `/articles/{id}` - 更新文章（需认证）
- DELETE `/articles/{id}` - 删除文章（需认证）

### 用户接口
- GET `/user/profile` - 获取用户信息（需认证）
- PUT `/user/profile` - 更新用户信息（需认证）

## 测试

运行单元测试：
```bash
mvn test
```

运行集成测试：
```bash
mvn verify
```