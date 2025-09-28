# API接口文档

## 概述

个人博客系统的RESTful API接口文档，基于Spring Boot构建。

## 基础信息

- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **认证方式**: JWT Bearer Token

## 认证接口

### 用户登录

**POST** `/auth/login`

**请求参数**
```json
{
  "username": "admin",
  "password": "password"
}
```

**响应示例**
```json
{
  "success": true,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzUxMiJ9...",
    "type": "Bearer",
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "nickname": "管理员",
    "expiresAt": "2024-01-02T12:00:00"
  }
}
```

### 用户注册

**POST** `/auth/register`

**请求参数**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "nickname": "新用户"
}
```

**响应示例**
```json
{
  "success": true,
  "message": "用户注册成功"
}
```

### 验证Token

**GET** `/auth/validate`

**请求头**
```
Authorization: Bearer <token>
```

**响应示例**
```json
{
  "success": true,
  "message": "Token有效",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "nickname": "管理员"
  }
}
```

### 用户登出

**POST** `/auth/logout`

**请求头**
```
Authorization: Bearer <token>
```

**响应示例**
```json
{
  "success": true,
  "message": "登出成功"
}
```

## 文章接口

### 获取文章列表

**GET** `/articles`

**查询参数**
- `page`: 页码（从0开始，默认0）
- `size`: 每页大小（默认10）
- `search`: 搜索关键词（可选）

**请求示例**
```
GET /api/articles?page=0&size=10&search=React
```

**响应示例**
```json
{
  "success": true,
  "message": "获取文章列表成功",
  "data": {
    "content": [
      {
        "id": 1,
        "title": "React开发指南",
        "summary": "这是一篇关于React开发的文章",
        "authorId": 1,
        "authorName": "管理员",
        "status": "PUBLISHED",
        "viewCount": 100,
        "createTime": "2024-01-01T10:00:00",
        "updateTime": "2024-01-01T10:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "first": true,
    "last": true,
    "empty": false
  }
}
```

### 获取文章详情

**GET** `/articles/{id}`

**路径参数**
- `id`: 文章ID

**响应示例**
```json
{
  "success": true,
  "message": "获取文章详情成功",
  "data": {
    "id": 1,
    "title": "React开发指南",
    "content": "这是文章的完整内容...",
    "summary": "这是一篇关于React开发的文章",
    "authorId": 1,
    "authorName": "管理员",
    "status": "PUBLISHED",
    "viewCount": 101,
    "createTime": "2024-01-01T10:00:00",
    "updateTime": "2024-01-01T10:00:00"
  }
}
```

### 创建文章

**POST** `/articles`

**请求头**
```
Authorization: Bearer <token>
```

**请求参数**
```json
{
  "title": "新文章标题",
  "content": "文章内容...",
  "summary": "文章摘要",
  "status": "DRAFT"
}
```

**响应示例**
```json
{
  "success": true,
  "message": "文章创建成功",
  "data": {
    "id": 2,
    "title": "新文章标题",
    "content": "文章内容...",
    "summary": "文章摘要",
    "authorId": 1,
    "authorName": "管理员",
    "status": "DRAFT",
    "viewCount": 0,
    "createTime": "2024-01-01T11:00:00",
    "updateTime": "2024-01-01T11:00:00"
  }
}
```

### 更新文章

**PUT** `/articles/{id}`

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
- `id`: 文章ID

**请求参数**
```json
{
  "title": "更新后的标题",
  "content": "更新后的内容...",
  "summary": "更新后的摘要",
  "status": "PUBLISHED"
}
```

### 删除文章

**DELETE** `/articles/{id}`

**请求头**
```
Authorization: Bearer <token>
```

**路径参数**
- `id`: 文章ID

**响应示例**
```json
{
  "success": true,
  "message": "文章删除成功"
}
```

### 获取我的文章

**GET** `/articles/my`

**请求头**
```
Authorization: Bearer <token>
```

**查询参数**
- `page`: 页码（从0开始，默认0）
- `size`: 每页大小（默认10）
- `status`: 文章状态（DRAFT/PUBLISHED，可选）

## 用户接口

### 获取当前用户信息

**GET** `/user/profile`

**请求头**
```
Authorization: Bearer <token>
```

**响应示例**
```json
{
  "success": true,
  "message": "获取用户信息成功",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "nickname": "管理员",
    "bio": "这是个人简介",
    "avatar": "http://example.com/avatar.jpg",
    "createTime": "2024-01-01T00:00:00",
    "updateTime": "2024-01-01T10:00:00"
  }
}
```

### 更新用户信息

**PUT** `/user/profile`

**请求头**
```
Authorization: Bearer <token>
```

**请求参数**
```json
{
  "nickname": "新昵称",
  "email": "newemail@example.com",
  "bio": "更新后的个人简介",
  "avatar": "http://example.com/new-avatar.jpg"
}
```

### 获取用户公开信息

**GET** `/user/{userId}`

**路径参数**
- `userId`: 用户ID

**响应示例**
```json
{
  "success": true,
  "message": "获取用户信息成功",
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "管理员",
    "bio": "这是个人简介",
    "avatar": "http://example.com/avatar.jpg",
    "createTime": "2024-01-01T00:00:00",
    "updateTime": "2024-01-01T10:00:00"
  }
}
```

## 错误响应

### 通用错误格式

```json
{
  "success": false,
  "message": "错误描述信息"
}
```

### 错误状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 401 | 未认证或Token无效 |
| 403 | 权限不足 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

### 常见错误示例

**参数验证失败 (400)**
```json
{
  "success": false,
  "message": "参数验证失败: {用户名不能为空, 密码长度至少6个字符}"
}
```

**认证失败 (401)**
```json
{
  "success": false,
  "message": "认证失败，请先登录"
}
```

**权限不足 (403)**
```json
{
  "success": false,
  "message": "权限不足"
}
```

**资源不存在 (404)**
```json
{
  "success": false,
  "message": "文章不存在"
}
```

## 数据模型

### 用户模型

```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "nickname": "string",
  "bio": "string",
  "avatar": "string",
  "createTime": "datetime",
  "updateTime": "datetime"
}
```

### 文章模型

```json
{
  "id": "number",
  "title": "string",
  "content": "string",
  "summary": "string",
  "authorId": "number",
  "authorName": "string",
  "status": "DRAFT|PUBLISHED",
  "viewCount": "number",
  "createTime": "datetime",
  "updateTime": "datetime"
}
```

### 分页模型

```json
{
  "content": "array",
  "page": "number",
  "size": "number",
  "totalElements": "number",
  "totalPages": "number",
  "first": "boolean",
  "last": "boolean",
  "empty": "boolean"
}
```

## 请求限制

| 接口类型 | 限制 |
|----------|------|
| 登录接口 | 5次/分钟 |
| 注册接口 | 3次/分钟 |
| 文章创建 | 10次/小时 |
| 其他接口 | 100次/分钟 |

## SDK示例

### JavaScript/TypeScript

```typescript
// API客户端示例
class BlogApiClient {
  private baseURL = 'http://localhost:8080/api';
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  async request(method: string, url: string, data?: any) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseURL}${url}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });

    return response.json();
  }

  async login(username: string, password: string) {
    return this.request('POST', '/auth/login', { username, password });
  }

  async getArticles(page = 0, size = 10, search?: string) {
    const params = new URLSearchParams({ 
      page: page.toString(), 
      size: size.toString() 
    });
    if (search) params.append('search', search);
    
    return this.request('GET', `/articles?${params}`);
  }
}
```

### cURL示例

```bash
# 用户登录
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}'

# 获取文章列表
curl -X GET "http://localhost:8080/api/articles?page=0&size=10"

# 创建文章（需要认证）
curl -X POST http://localhost:8080/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"新文章","content":"内容","status":"DRAFT"}'
```

## 版本信息

- **当前版本**: v1.0.0
- **API版本**: v1
- **更新日期**: 2024-01-01

## 联系方式

如有API相关问题，请联系：
- 邮箱: developer@example.com
- 文档地址: http://localhost:8080/swagger-ui.html