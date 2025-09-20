# 个人网站 - Personal Website

这是一个现代化的个人网站项目，使用React和Vite构建，展示个人技能、项目作品和联系信息。

## 功能特点

- 🏠 **首页** - 个人介绍和技能预览
- 👨‍💻 **关于我** - 详细的个人背景、技能和经验
- 🚀 **项目展示** - 项目作品集，支持分类筛选
- 📞 **联系我** - 联系信息和消息表单
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🎨 **现代化UI** - 简洁优雅的用户界面
- ⚡ **快速加载** - 使用Vite构建工具，开发和部署都很快

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **路由管理**: React Router DOM
- **样式**: CSS3 (自定义样式，支持CSS变量)
- **开发语言**: JavaScript/JSX

## 项目结构

```
quest-demo/
├── public/                 # 静态资源
├── src/
│   ├── components/         # 可复用组件
│   │   ├── Layout.jsx     # 页面布局
│   │   ├── Header.jsx     # 顶部导航
│   │   ├── Footer.jsx     # 底部信息
│   │   ├── Header.css     # 头部样式
│   │   └── Footer.css     # 底部样式
│   ├── pages/             # 页面组件
│   │   ├── Home.jsx       # 首页
│   │   ├── About.jsx      # 关于页面
│   │   ├── Projects.jsx   # 项目页面
│   │   ├── Contact.jsx    # 联系页面
│   │   └── *.css          # 各页面样式
│   ├── styles/            # 全局样式
│   │   ├── index.css      # 基础样式
│   │   └── App.css        # 应用样式
│   ├── App.jsx            # 主应用组件
│   └── main.jsx           # 应用入口
├── index.html             # HTML模板
├── package.json           # 项目配置
├── vite.config.js         # Vite配置
└── README.md              # 项目说明
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览生产版本

```bash
npm run preview
```

## 自定义配置

### 个人信息修改

1. **首页内容**: 编辑 `src/pages/Home.jsx`
2. **关于我信息**: 编辑 `src/pages/About.jsx`
3. **项目展示**: 编辑 `src/pages/Projects.jsx` 中的 `projects` 数组
4. **联系信息**: 编辑 `src/pages/Contact.jsx` 和 `src/components/Footer.jsx`

### 样式自定义

主要的颜色变量定义在 `src/styles/index.css` 中:

```css
:root {
  --primary-color: #2563eb;    /* 主色调 */
  --secondary-color: #1e40af;  /* 次要色调 */
  --accent-color: #3b82f6;     /* 强调色 */
  --text-primary: #1f2937;     /* 主要文本色 */
  --text-secondary: #6b7280;   /* 次要文本色 */
  --background: #ffffff;       /* 背景色 */
  --surface: #f9fafb;          /* 表面色 */
  --border: #e5e7eb;           /* 边框色 */
}
```

## 特性说明

### 响应式设计
- 使用CSS Grid和Flexbox布局
- 断点适配：768px (平板), 480px (手机)
- 优化的移动端导航菜单

### 交互效果
- 平滑的页面过渡动画
- 悬停效果和微交互
- 响应式的按钮和卡片组件

### 性能优化
- 使用Vite的快速热重载
- 优化的资源加载
- 最小化的CSS和JS包

## 部署建议

### Vercel (推荐)
```bash
npm install -g vercel
vercel
```

### Netlify
1. 连接GitHub仓库
2. 设置构建命令: `npm run build`
3. 设置发布目录: `dist`

### GitHub Pages
```bash
npm run build
# 将 dist 目录内容推送到 gh-pages 分支
```

## 开发说明

- 项目使用现代化的React Hooks
- 组件采用函数式编程风格
- CSS使用BEM命名规范
- 代码结构清晰，易于维护和扩展

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 许可证

MIT License - 可自由使用和修改

---

如有问题或建议，欢迎提出Issue或Pull Request！