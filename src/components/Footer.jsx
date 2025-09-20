import React from 'react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">个人网站</h3>
            <p className="footer-description">
              展示个人技能、项目和经验的专业平台
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">快速链接</h4>
            <ul className="footer-links">
              <li><a href="/">首页</a></li>
              <li><a href="/about">关于我</a></li>
              <li><a href="/projects">项目展示</a></li>
              <li><a href="/contact">联系我</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">联系方式</h4>
            <div className="contact-info">
              <p>📧 your.email@example.com</p>
              <p>📱 +86 123 4567 8900</p>
              <p>📍 中国，北京</p>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-subtitle">关注我</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="GitHub">
                <span>GitHub</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span>LinkedIn</span>
              </a>
              <a href="#" className="social-link" aria-label="微博">
                <span>微博</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} 个人网站. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer