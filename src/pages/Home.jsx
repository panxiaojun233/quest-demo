import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      {/* 英雄区域 */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <div className="hero-text">
              <h1 className="hero-title">
                你好，我是 <span className="highlight">张小明</span>
              </h1>
              <p className="hero-subtitle">
                全栈开发工程师 · 创新者 · 问题解决者
              </p>
              <p className="hero-description">
                专注于创建优雅、高效的数字解决方案。拥有丰富的前端和后端开发经验，
                热衷于学习新技术并将其应用到实际项目中。
              </p>
              <div className="hero-actions">
                <Link to="/projects" className="btn btn-primary">
                  查看我的作品
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  联系我
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="avatar">
                <div className="avatar-placeholder">
                  <span>👨‍💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技能预览 */}
      <section className="skills-preview">
        <div className="container">
          <h2 className="section-title">核心技能</h2>
          <div className="skills-grid">
            <div className="skill-card slide-in">
              <div className="skill-icon">🚀</div>
              <h3>前端开发</h3>
              <p>React, Vue.js, TypeScript, HTML5, CSS3</p>
            </div>
            <div className="skill-card slide-in">
              <div className="skill-icon">⚡</div>
              <h3>后端开发</h3>
              <p>Node.js, Python, Java, 数据库设计</p>
            </div>
            <div className="skill-card slide-in">
              <div className="skill-icon">☁️</div>
              <h3>云服务</h3>
              <p>AWS, Docker, Kubernetes, DevOps</p>
            </div>
            <div className="skill-card slide-in">
              <div className="skill-icon">🎨</div>
              <h3>UI/UX设计</h3>
              <p>Figma, 原型设计, 用户体验优化</p>
            </div>
          </div>
        </div>
      </section>

      {/* 最新项目 */}
      <section className="featured-projects">
        <div className="container">
          <h2 className="section-title">精选项目</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">📱</div>
              </div>
              <div className="project-content">
                <h3 className="project-title">移动应用开发</h3>
                <p className="project-description">
                  基于React Native开发的跨平台移动应用，提供优秀的用户体验。
                </p>
                <div className="project-tags">
                  <span className="tag">React Native</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">Firebase</span>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">🌐</div>
              </div>
              <div className="project-content">
                <h3 className="project-title">企业级Web平台</h3>
                <p className="project-description">
                  为大型企业开发的管理系统，支持多用户、权限控制和数据分析。
                </p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">PostgreSQL</span>
                </div>
              </div>
            </div>
            
            <div className="project-card">
              <div className="project-image">
                <div className="project-placeholder">🤖</div>
              </div>
              <div className="project-content">
                <h3 className="project-title">AI智能助手</h3>
                <p className="project-description">
                  集成机器学习模型的智能对话系统，能够理解用户需求并提供帮助。
                </p>
                <div className="project-tags">
                  <span className="tag">Python</span>
                  <span className="tag">TensorFlow</span>
                  <span className="tag">FastAPI</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="section-action">
            <Link to="/projects" className="btn btn-outline">
              查看所有项目
            </Link>
          </div>
        </div>
      </section>

      {/* 联系CTA */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>让我们一起创造些什么</h2>
            <p>如果您有有趣的项目想法或需要技术支持，我很乐意与您交流。</p>
            <Link to="/contact" className="btn btn-primary">
              开始对话
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home