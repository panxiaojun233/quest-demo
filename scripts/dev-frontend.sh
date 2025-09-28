#!/bin/bash

# 前端开发服务器启动脚本

set -e

echo "=== 启动前端开发服务器 ==="

# 进入前端目录
cd "$(dirname "$0")/../frontend"

# 检查Node.js环境
if ! command -v node &> /dev/null; then
    echo "错误: Node.js未安装，请先安装Node.js 16+"
    exit 1
fi

# 检查npm环境
if ! command -v npm &> /dev/null; then
    echo "错误: npm未安装，请先安装npm"
    exit 1
fi

# 安装依赖（如果node_modules不存在）
if [ ! -d "node_modules" ]; then
    echo "安装依赖..."
    npm install
fi

echo "启动React开发服务器..."
npm start