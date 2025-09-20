import React, { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 模拟表单提交
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // 3秒后清除状态消息
      setTimeout(() => {
        setSubmitStatus('')
      }, 3000)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: '📧',
      title: '邮箱',
      value: 'your.email@example.com',
      action: 'mailto:your.email@example.com'
    },
    {
      icon: '📱',
      title: '电话',
      value: '+86 123 4567 8900',
      action: 'tel:+8612345678900'
    },
    {
      icon: '📍',
      title: '地址',
      value: '中国，北京市',
      action: null
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/yourprofile',
      action: 'https://linkedin.com/in/yourprofile'
    }
  ]

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: '🐙' },
    { name: '微博', url: 'https://weibo.com/yourusername', icon: '🐦' },
    { name: 'Twitter', url: 'https://twitter.com/yourusername', icon: '🔵' },
    { name: '知乎', url: 'https://zhihu.com/people/yourusername', icon: '🤔' }
  ]

  return (
    <div className="contact">
      <div className="container">
        {/* 页面标题 */}
        <div className="contact-header">
          <h1 className="page-title fade-in">联系我</h1>
          <p className="page-description fade-in">
            我很乐意听到您的想法！无论是项目合作、技术咨询还是简单的问候，
            请随时通过以下方式与我联系。
          </p>
        </div>

        <div className="contact-content">
          {/* 联系信息 */}
          <div className="contact-info slide-in">
            <h2 className="section-title">联系方式</h2>
            <div className="info-cards">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <h3 className="info-title">{info.title}</h3>
                    {info.action ? (
                      <a href={info.action} className="info-value link">
                        {info.value}
                      </a>
                    ) : (
                      <span className="info-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 社交媒体链接 */}
            <div className="social-section">
              <h3 className="social-title">关注我</h3>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={social.name}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* 可用性状态 */}
            <div className="availability">
              <div className="availability-status">
                <div className="status-indicator available"></div>
                <span className="status-text">目前可接受新项目</span>
              </div>
              <p className="availability-note">
                我正在寻找有趣的项目机会和合作伙伴。
                如果您有令人兴奋的想法，让我们一起讨论！
              </p>
            </div>
          </div>

          {/* 联系表单 */}
          <div className="contact-form-section slide-in">
            <h2 className="section-title">发送消息</h2>
            
            {submitStatus === 'success' && (
              <div className="form-message success">
                ✅ 消息发送成功！我会尽快回复您。
              </div>
            )}
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">姓名 *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="请输入您的姓名"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">邮箱 *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">主题 *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                  placeholder="消息主题"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">消息 *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  required
                  rows="6"
                  placeholder="请详细描述您的想法或问题..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`form-submit ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? '发送中...' : '发送消息'}
              </button>
            </form>

            <div className="form-note">
              <p>
                <strong>响应时间：</strong>通常在24小时内回复<br/>
                <strong>隐私保护：</strong>您的信息将被安全保护，不会用于其他目的
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact