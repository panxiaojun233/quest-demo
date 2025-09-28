#!/bin/bash

# 个人博客项目停止脚本

set -e

echo "=== 个人博客项目停止脚本 ==="

# 设置环境变量
export COMPOSE_PROJECT_NAME=personal-blog

echo "正在停止服务..."

# 停止所有服务
docker-compose down

echo "清理Docker网络..."
docker network prune -f

echo ""
echo "=== 服务已停止 ==="
echo ""
echo "如需完全清理（包括数据），请运行:"
echo "docker-compose down -v"
echo "docker system prune -a"