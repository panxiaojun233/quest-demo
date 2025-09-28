#!/bin/bash

# 个人博客项目启动脚本

set -e

echo "=== 个人博客项目启动脚本 ==="

# 检查Docker是否安装
if ! command -v docker &> /dev/null; then
    echo "错误: Docker未安装，请先安装Docker"
    exit 1
fi

# 检查Docker Compose是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "错误: Docker Compose未安装，请先安装Docker Compose"
    exit 1
fi

# 创建必要的目录
echo "创建必要的目录..."
mkdir -p logs

# 设置环境变量
export COMPOSE_PROJECT_NAME=personal-blog

echo "正在启动服务..."

# 启动所有服务
docker-compose up -d

echo "等待服务启动..."
sleep 30

# 检查服务状态
echo "检查服务状态..."
docker-compose ps

echo ""
echo "=== 服务启动完成 ==="
echo "前端地址: http://localhost:3000"
echo "后端API: http://localhost:8080/api"
echo "MySQL端口: 3306"
echo ""
echo "默认管理员账户:"
echo "用户名: admin"
echo "密码: password"
echo ""
echo "使用以下命令查看日志:"
echo "docker-compose logs -f [service_name]"
echo ""
echo "使用以下命令停止服务:"
echo "docker-compose down"
