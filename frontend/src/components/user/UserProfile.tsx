import React, { useState, useEffect } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Avatar,
  Typography,
  Space,
  Divider,
  message,
  Upload,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  EditOutlined,
  SaveOutlined,
  CameraOutlined,
} from '@ant-design/icons';
import { UserService } from '../../services';
import { UserProfileUpdateRequest, User } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { DateUtils } from '../../utils';
import type { UploadProps } from 'antd';
import './UserProfile.css';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

/**
 * 用户资料组件
 */
export const UserProfile: React.FC = () => {
  const { state, updateUser } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  /**
   * 获取用户资料
   */
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const profile = await UserService.getCurrentUser();
      setUserProfile(profile);
      
      // 填充表单
      form.setFieldsValue({
        nickname: profile.nickname,
        email: profile.email,
        bio: profile.bio,
      });
    } catch (error: any) {
      message.error(error.message || '获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  /**
   * 保存用户资料
   */
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updateData: UserProfileUpdateRequest = values;

      setLoading(true);
      const updatedProfile = await UserService.updateProfile(updateData);
      
      setUserProfile(updatedProfile);
      updateUser(updatedProfile);
      setEditing(false);
      message.success('个人资料更新成功');
    } catch (error: any) {
      if (error.errorFields) {
        message.error('请检查输入信息');
      } else {
        message.error(error.message || '更新失败');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * 取消编辑
   */
  const handleCancel = () => {
    setEditing(false);
    if (userProfile) {
      form.setFieldsValue({
        nickname: userProfile.nickname,
        email: userProfile.email,
        bio: userProfile.bio,
      });
    }
  };

  /**
   * 头像上传配置
   */
  const uploadProps: UploadProps = {
    name: 'avatar',
    listType: 'picture-card',
    className: 'avatar-uploader',
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传 JPG/PNG 格式的图片!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('图片大小不能超过 2MB!');
      }
      return isJpgOrPng && isLt2M;
    },
    onChange: (info) => {
      // 这里可以实现图片上传逻辑
      message.info('头像上传功能待实现');
    },
  };

  /**
   * 组件初始化
   */
  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!userProfile) {
    return (
      <div className="user-profile-container">
        <Card loading />
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <Row gutter={24}>
        {/* 个人信息卡片 */}
        <Col xs={24} md={8}>
          <Card className="profile-card">
            <div className="profile-avatar-section">
              <div className="avatar-container">
                <Avatar
                  size={120}
                  src={userProfile.avatar}
                  icon={<UserOutlined />}
                  className="user-avatar"
                />
                {editing && (
                  <Upload {...uploadProps}>
                    <div className="avatar-upload-overlay">
                      <CameraOutlined />
                      <div>更换头像</div>
                    </div>
                  </Upload>
                )}
              </div>
              
              <div className="profile-basic-info">
                <Title level={3} style={{ margin: '16px 0 8px' }}>
                  {userProfile.nickname || userProfile.username}
                </Title>
                <Text type="secondary">@{userProfile.username}</Text>
                
                <div className="profile-stats">
                  <div className="stat-item">
                    <div className="stat-label">注册时间</div>
                    <div className="stat-value">
                      {DateUtils.formatDate(userProfile.createTime!)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* 详细信息卡片 */}
        <Col xs={24} md={16}>
          <Card
            title="个人资料"
            className="profile-detail-card"
            extra={
              !editing ? (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => setEditing(true)}
                >
                  编辑资料
                </Button>
              ) : (
                <Space>
                  <Button onClick={handleCancel}>
                    取消
                  </Button>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    loading={loading}
                    onClick={handleSave}
                  >
                    保存
                  </Button>
                </Space>
              )
            }
          >
            {editing ? (
              <Form
                form={form}
                layout="vertical"
                size="large"
              >
                <Form.Item
                  name="nickname"
                  label="昵称"
                  rules={[
                    { max: 50, message: '昵称长度不能超过50个字符' },
                  ]}
                >
                  <Input
                    placeholder="请输入昵称"
                    prefix={<UserOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' },
                    { max: 100, message: '邮箱长度不能超过100个字符' },
                  ]}
                >
                  <Input
                    placeholder="请输入邮箱"
                    prefix={<MailOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  name="bio"
                  label="个人简介"
                  rules={[
                    { max: 1000, message: '个人简介长度不能超过1000个字符' },
                  ]}
                >
                  <TextArea
                    placeholder="介绍一下你自己..."
                    rows={4}
                    showCount
                    maxLength={1000}
                  />
                </Form.Item>
              </Form>
            ) : (
              <div className="profile-display">
                <div className="profile-item">
                  <label>用户名</label>
                  <div className="profile-value">{userProfile.username}</div>
                </div>

                <div className="profile-item">
                  <label>昵称</label>
                  <div className="profile-value">
                    {userProfile.nickname || '未设置'}
                  </div>
                </div>

                <div className="profile-item">
                  <label>邮箱</label>
                  <div className="profile-value">{userProfile.email}</div>
                </div>

                <div className="profile-item">
                  <label>个人简介</label>
                  <div className="profile-value">
                    {userProfile.bio ? (
                      <Paragraph className="bio-text">
                        {userProfile.bio}
                      </Paragraph>
                    ) : (
                      <Text type="secondary">还没有个人简介</Text>
                    )}
                  </div>
                </div>

                <Divider />

                <div className="profile-item">
                  <label>注册时间</label>
                  <div className="profile-value">
                    {DateUtils.format(userProfile.createTime!)}
                  </div>
                </div>

                <div className="profile-item">
                  <label>最后更新</label>
                  <div className="profile-value">
                    {DateUtils.format(userProfile.updateTime!)}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};