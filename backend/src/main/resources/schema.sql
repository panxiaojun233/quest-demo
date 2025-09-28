-- 创建数据库
CREATE DATABASE IF NOT EXISTS personal_blog 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE personal_blog;

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    email VARCHAR(100) NOT NULL UNIQUE COMMENT '邮箱',
    nickname VARCHAR(50) COMMENT '昵称',
    bio TEXT COMMENT '个人简介',
    avatar VARCHAR(255) COMMENT '头像URL',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 创建文章表
CREATE TABLE IF NOT EXISTS articles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL COMMENT '文章标题',
    content TEXT NOT NULL COMMENT '文章内容',
    summary VARCHAR(500) COMMENT '文章摘要',
    author_id BIGINT NOT NULL COMMENT '作者ID',
    status ENUM('DRAFT', 'PUBLISHED') NOT NULL DEFAULT 'DRAFT' COMMENT '文章状态',
    view_count INT NOT NULL DEFAULT 0 COMMENT '阅读量',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    INDEX idx_author_id (author_id),
    INDEX idx_status (status),
    INDEX idx_create_time (create_time),
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文章表';

-- 插入示例数据（可选）
-- 注意：密码是 'password' 经过BCrypt加密的结果
INSERT INTO users (username, password, email, nickname, bio) VALUES 
('admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'admin@example.com', '管理员', '这是一个个人博客网站的管理员账户');

-- 插入示例文章
INSERT INTO articles (title, content, summary, author_id, status, view_count) VALUES 
('欢迎来到我的博客', '这是我的第一篇博客文章，欢迎大家访问！\n\n在这个博客中，我会分享一些技术心得、生活感悟等内容。希望能够与大家交流学习，共同进步。', '这是我的第一篇博客文章，欢迎大家访问！', 1, 'PUBLISHED', 0),
('关于Spring Boot开发', 'Spring Boot是一个非常优秀的Java开发框架...\n\n本文将介绍Spring Boot的基本使用方法。', 'Spring Boot开发经验分享', 1, 'PUBLISHED', 0);