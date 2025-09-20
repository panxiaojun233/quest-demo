import React, { useState } from 'react'
import './Projects.css'

function Projects() {
  const [filter, setFilter] = useState('all')
  
  const projects = [
    {
      id: 1,
      title: '电商平台管理系统',
      description: '为中小企业设计的全功能电商管理平台，支持商品管理、订单处理、库存跟踪和数据分析。',
      image: '🛒',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Stripe API'],
      github: 'https://github.com/example/ecommerce-platform',
      demo: 'https://demo.ecommerce-platform.com',
      status: 'completed'
    },
    {
      id: 2,
      title: '任务管理移动应用',
      description: '基于React Native开发的跨平台任务管理应用，支持团队协作、时间追踪和项目管理。',
      image: '📱',
      category: 'mobile',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux', 'Expo'],
      github: 'https://github.com/example/task-manager-app',
      demo: 'https://apps.example.com/task-manager',
      status: 'completed'
    },
    {
      id: 3,
      title: 'AI智能客服系统',
      description: '集成自然语言处理的智能客服系统，能够自动回答常见问题并学习用户意图。',
      image: '🤖',
      category: 'ai',
      technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'PostgreSQL'],
      github: 'https://github.com/example/ai-customer-service',
      demo: 'https://ai-cs.example.com',
      status: 'completed'
    },
    {
      id: 4,
      title: '数据可视化仪表板',
      description: '为企业提供实时数据分析和可视化的仪表板系统，支持多种图表类型和自定义报告。',
      image: '📊',
      category: 'web',
      technologies: ['Vue.js', 'D3.js', 'Python', 'Django', 'MySQL'],
      github: 'https://github.com/example/data-dashboard',
      demo: 'https://dashboard.example.com',
      status: 'completed'
    },
    {
      id: 5,
      title: '在线学习平台',
      description: '完整的在线教育平台，包含课程管理、学生跟踪、视频播放和在线考试功能。',
      image: '🎓',
      category: 'web',
      technologies: ['Next.js', 'Prisma', 'PostgreSQL', 'AWS S3', 'Stripe'],
      github: 'https://github.com/example/learning-platform',
      demo: 'https://learn.example.com',
      status: 'in-progress'
    },
    {
      id: 6,
      title: '区块链投票系统',
      description: '基于区块链技术的透明投票系统，确保投票的安全性和不可篡改性。',
      image: '🗳️',
      category: 'blockchain',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'IPFS'],
      github: 'https://github.com/example/blockchain-voting',
      demo: 'https://vote.example.com',
      status: 'planning'
    }
  ]

  const categories = [
    { id: 'all', label: '全部项目' },
    { id: 'web', label: 'Web应用' },
    { id: 'mobile', label: '移动应用' },
    { id: 'ai', label: 'AI/机器学习' },
    { id: 'blockchain', label: '区块链' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const getStatusLabel = (status) => {
    const statusMap = {
      'completed': '已完成',
      'in-progress': '进行中',
      'planning': '规划中'
    }
    return statusMap[status] || status
  }

  const getStatusClass = (status) => {
    const statusClasses = {
      'completed': 'status-completed',
      'in-progress': 'status-progress',
      'planning': 'status-planning'
    }
    return statusClasses[status] || ''
  }

  return (
    <div className="projects">
      <div className="container">
        {/* 页面标题 */}
        <div className="projects-header">
          <h1 className="page-title fade-in">项目展示</h1>
          <p className="page-description fade-in">
            这里展示了我在不同领域的项目作品，从Web应用到移动开发，从AI系统到区块链应用，
            每个项目都体现了我对技术的探索和对用户体验的重视。
          </p>
        </div>

        {/* 项目分类过滤器 */}
        <div className="projects-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* 项目网格 */}
        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="project-card slide-in" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="project-image">
                <div className="project-emoji">{project.image}</div>
                <div className={`project-status ${getStatusClass(project.status)}`}>
                  {getStatusLabel(project.status)}
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                <div className="project-actions">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    查看代码
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      在线演示
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 项目统计 */}
        <div className="projects-stats">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">总项目数</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{projects.filter(p => p.status === 'completed').length}</span>
              <span className="stat-label">已完成</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{projects.filter(p => p.status === 'in-progress').length}</span>
              <span className="stat-label">进行中</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{[...new Set(projects.flatMap(p => p.technologies))].length}</span>
              <span className="stat-label">使用技术</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects