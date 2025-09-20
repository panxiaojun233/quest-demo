import React from 'react'
import './About.css'

function About() {
  const skills = [
    { category: '前端开发', items: ['React', 'Vue.js', 'TypeScript', 'HTML5/CSS3', 'Tailwind CSS', 'Next.js'] },
    { category: '后端开发', items: ['Node.js', 'Python', 'Java', 'Express.js', 'Django', 'Spring Boot'] },
    { category: '数据库', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase'] },
    { category: '工具与部署', items: ['Git', 'Docker', 'AWS', 'Kubernetes', 'CI/CD', 'Linux'] }
  ]

  const experience = [
    {
      company: '科技创新公司',
      position: '高级全栈开发工程师',
      period: '2022 - 至今',
      description: '负责大型Web应用的架构设计和开发，团队协作和技术指导。'
    },
    {
      company: '互联网公司',
      position: '前端开发工程师',
      period: '2020 - 2022',
      description: '开发用户界面，优化用户体验，参与产品设计和技术选型。'
    },
    {
      company: '软件开发公司',
      position: '初级开发工程师',
      period: '2018 - 2020',
      description: '学习和实践软件开发技能，参与多个客户项目的开发工作。'
    }
  ]

  const education = [
    {
      school: '北京理工大学',
      degree: '计算机科学与技术 学士',
      period: '2014 - 2018',
      description: '主修计算机科学，专注于软件工程和算法设计。'
    }
  ]

  return (
    <div className="about">
      {/* 个人介绍 */}
      <section className="about-intro">
        <div className="container">
          <div className="intro-content">
            <div className="intro-text fade-in">
              <h1 className="page-title">关于我</h1>
              <p className="intro-description">
                我是一名充满热情的全栈开发工程师，拥有5年的软件开发经验。
                我专注于创建高质量、用户友好的Web应用程序，并热衷于学习和应用最新的技术。
              </p>
              <p className="intro-description">
                我相信技术应该为人们的生活带来便利，因此我总是从用户的角度思考问题，
                努力创造既美观又实用的解决方案。
              </p>
              <div className="intro-stats">
                <div className="stat">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">年经验</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">完成项目</span>
                </div>
                <div className="stat">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">客户满意度</span>
                </div>
              </div>
            </div>
            <div className="intro-image">
              <div className="profile-image">
                <div className="profile-placeholder">👨‍💻</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 技能详情 */}
      <section className="skills-section">
        <div className="container">
          <h2 className="section-title">技能专长</h2>
          <div className="skills-categories">
            {skills.map((skillCategory, index) => (
              <div key={index} className="skill-category slide-in">
                <h3 className="category-title">{skillCategory.category}</h3>
                <div className="skill-items">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 工作经验 */}
      <section className="experience-section">
        <div className="container">
          <h2 className="section-title">工作经验</h2>
          <div className="timeline">
            {experience.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="job-title">{exp.position}</h3>
                  <h4 className="company-name">{exp.company}</h4>
                  <span className="job-period">{exp.period}</span>
                  <p className="job-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 教育背景 */}
      <section className="education-section">
        <div className="container">
          <h2 className="section-title">教育背景</h2>
          <div className="education-list">
            {education.map((edu, index) => (
              <div key={index} className="education-item card">
                <h3 className="degree-title">{edu.degree}</h3>
                <h4 className="school-name">{edu.school}</h4>
                <span className="education-period">{edu.period}</span>
                <p className="education-description">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 个人价值观 */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">我的价值观</h2>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h3>专注品质</h3>
              <p>追求代码的简洁性和可维护性，注重每一个细节的完美。</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🚀</div>
              <h3>持续学习</h3>
              <p>保持对新技术的好奇心，不断提升自己的技能和知识。</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>团队协作</h3>
              <p>相信团队合作的力量，乐于分享知识和经验。</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💡</div>
              <h3>创新思维</h3>
              <p>用创新的方法解决问题，创造有价值的解决方案。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About