# 个人博客项目部署指南

## 概述

本文档提供了个人博客项目的完整部署指南，支持多种部署方式。

## 系统要求

### 基础环境
- 操作系统：Linux/macOS/Windows
- Docker 20.10+
- Docker Compose 2.0+

### 开发环境
- Java 17+
- Maven 3.6+
- Node.js 16+
- npm 8+ 或 yarn 1.22+
- MySQL 8.0+

## 快速部署（推荐）

### 使用Docker Compose

1. **克隆项目**
```bash
git clone <repository-url>
cd quest-demo
```

2. **一键启动**
```bash
./scripts/start.sh
```

3. **访问应用**
- 前端: http://localhost:3000
- 后端API: http://localhost:8080/api
- 默认用户：admin / password

4. **停止服务**
```bash
./scripts/stop.sh
```

## 开发环境部署

### 后端开发环境

1. **准备数据库**
```bash
# 使用Docker启动MySQL
docker run -d \
  --name personal-blog-mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=personal_blog \
  -p 3306:3306 \
  mysql:8.0
```

2. **配置应用**
```bash
cd backend
cp src/main/resources/application.yml src/main/resources/application-dev.yml
# 根据需要修改数据库连接配置
```

3. **启动后端**
```bash
# 自动启动脚本
./scripts/dev-backend.sh

# 或手动启动
cd backend
mvn spring-boot:run
```

### 前端开发环境

1. **安装依赖**
```bash
cd frontend
npm install
```

2. **配置环境变量**
```bash
# 创建.env.local文件
echo "REACT_APP_API_BASE_URL=http://localhost:8080/api" > .env.local
```

3. **启动前端**
```bash
# 自动启动脚本
./scripts/dev-frontend.sh

# 或手动启动
npm start
```

## 生产环境部署

### 方式一：Docker Compose（推荐）

1. **配置生产环境变量**
```bash
# 创建.env.production文件
cat > .env.production << EOF
MYSQL_ROOT_PASSWORD=your_secure_password
MYSQL_DATABASE=personal_blog
MYSQL_USER=blog_user
MYSQL_PASSWORD=your_secure_password
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_here
REACT_APP_API_BASE_URL=https://your-domain.com/api
EOF
```

2. **修改Docker Compose配置**
```bash
cp docker-compose.yml docker-compose.prod.yml
# 根据生产环境需求修改配置
```

3. **启动生产环境**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 方式二：分离部署

#### 后端部署

1. **构建应用**
```bash
cd backend
mvn clean package -DskipTests
```

2. **配置生产环境**
```bash
# 修改application-prod.yml
vim src/main/resources/application-prod.yml
```

3. **部署到服务器**
```bash
# 复制jar包到服务器
scp target/personal-blog-backend-1.0.0.jar user@server:/opt/blog/

# 在服务器上运行
java -jar -Dspring.profiles.active=prod personal-blog-backend-1.0.0.jar
```

#### 前端部署

1. **构建生产版本**
```bash
cd frontend
npm run build
```

2. **部署到Web服务器**
```bash
# 使用nginx部署
sudo cp -r build/* /var/www/html/

# nginx配置示例
sudo cp nginx.config /etc/nginx/sites-available/blog
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
sudo nginx -s reload
```

## 数据库初始化

### 自动初始化
项目启动时会自动创建表结构和初始数据。

### 手动初始化
```sql
-- 创建数据库
CREATE DATABASE personal_blog CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 运行初始化脚本
SOURCE backend/src/main/resources/schema.sql;
```

## 配置说明

### 后端配置文件

**application.yml**
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/personal_blog
    username: root
    password: password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false

jwt:
  secret: your-secret-key
  expiration: 86400000

server:
  port: 8080
```

### 前端环境变量

**.env.production**
```
REACT_APP_API_BASE_URL=https://your-domain.com/api
REACT_APP_APP_NAME=个人博客
GENERATE_SOURCEMAP=false
```

## 反向代理配置

### Nginx配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
    }

    # 后端API代理
    location /api/ {
        proxy_pass http://localhost:8080/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## SSL证书配置

### 使用Let's Encrypt

```bash
# 安装certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo crontab -e
# 添加: 0 12 * * * /usr/bin/certbot renew --quiet
```

## 监控和日志

### 应用日志

**后端日志**
```bash
# Docker环境
docker-compose logs -f backend

# 直接部署
tail -f logs/application.log
```

**前端日志**
```bash
# Nginx访问日志
tail -f /var/log/nginx/access.log

# Nginx错误日志
tail -f /var/log/nginx/error.log
```

### 性能监控

建议使用以下工具进行监控：
- **应用监控**: Spring Boot Actuator
- **服务器监控**: Prometheus + Grafana
- **日志聚合**: ELK Stack

## 备份和恢复

### 数据库备份

```bash
# 创建备份
mysqldump -u root -p personal_blog > backup_$(date +%Y%m%d_%H%M%S).sql

# 恢复备份
mysql -u root -p personal_blog < backup_20231201_120000.sql
```

### 自动化备份脚本

```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backup/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u root -p${MYSQL_PASSWORD} personal_blog > ${BACKUP_DIR}/backup_${DATE}.sql
find ${BACKUP_DIR} -name "backup_*.sql" -mtime +7 -delete
```

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查数据库服务状态
   - 验证连接配置
   - 确认网络连通性

2. **前端无法访问后端API**
   - 检查CORS配置
   - 验证API基础URL
   - 确认后端服务运行状态

3. **容器启动失败**
   - 检查端口占用：`netstat -tulpn | grep :8080`
   - 查看容器日志：`docker logs container_name`
   - 验证Docker资源限制

### 日志分析

```bash
# 查看错误日志
grep -i error logs/application.log

# 监控API响应时间
grep -E "POST|GET|PUT|DELETE" logs/access.log | awk '{print $10}' | sort -n
```

## 安全配置

### 基础安全措施

1. **更改默认密码**
2. **启用HTTPS**
3. **配置防火墙**
4. **定期更新依赖**
5. **使用强JWT密钥**

### 安全检查清单

- [ ] 数据库密码已修改
- [ ] JWT密钥已设置为复杂字符串
- [ ] HTTPS已启用
- [ ] 不必要的端口已关闭
- [ ] 应用日志不包含敏感信息
- [ ] 定期备份已配置

## 性能优化

### 后端优化

1. **数据库索引优化**
2. **连接池配置**
3. **缓存策略**
4. **JVM参数调优**

### 前端优化

1. **代码分割**
2. **资源压缩**
3. **CDN加速**
4. **浏览器缓存**

## 维护计划

### 日常维护

- 监控应用状态
- 检查日志错误
- 验证备份完整性

### 定期维护

- 更新依赖包
- 清理旧日志
- 性能分析
- 安全漏洞扫描

## 联系支持

如需技术支持，请提供以下信息：
- 操作系统版本
- Docker版本
- 错误日志
- 配置文件（去除敏感信息）