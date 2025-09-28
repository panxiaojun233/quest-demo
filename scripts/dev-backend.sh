#!/bin/bash

# 后端开发服务器启动脚本

set -e

echo "=== 启动后端开发服务器 ==="

# 进入后端目录
cd "$(dirname "$0")/../backend"

# 检查Java环境
if ! command -v java &> /dev/null; then
    echo "错误: Java未安装，请先安装Java 17+"
    exit 1
fi

# 检查Maven环境
if ! command -v mvn &> /dev/null; then
    echo "错误: Maven未安装，请先安装Maven"
    exit 1
fi

# 启动MySQL（如果使用Docker）
echo "检查MySQL服务..."
if command -v docker &> /dev/null; then
    if ! docker ps | grep -q personal-blog-mysql; then
        echo "启动MySQL容器..."
        docker run -d \
            --name personal-blog-mysql \
            -e MYSQL_ROOT_PASSWORD=password \
            -e MYSQL_DATABASE=personal_blog \
            -p 3306:3306 \
            mysql:8.0
        echo "等待MySQL启动..."
        sleep 20
    fi
fi

echo "启动Spring Boot应用..."
mvn spring-boot:run