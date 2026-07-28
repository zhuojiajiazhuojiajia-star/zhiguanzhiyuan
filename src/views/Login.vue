<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-glow bg-glow--1"></div>
      <div class="bg-glow bg-glow--2"></div>
      <div class="bg-glow bg-glow--3"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="login-wrapper">
      <div class="brand-section">
        <div class="brand-logo">
          <svg viewBox="0 0 64 64" fill="none" class="logo-svg">
            <defs>
              <linearGradient id="waterGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stop-color="#60a5fa" />
                <stop offset="100%" stop-color="#3b82f6" />
              </linearGradient>
              <linearGradient id="waterGrad2" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stop-color="#22d3ee" />
                <stop offset="100%" stop-color="#0ea5e9" />
              </linearGradient>
            </defs>
            <path d="M32 6C32 6 16 28 16 40C16 48.837 23.163 56 32 56C40.837 56 48 48.837 48 40C48 28 32 6 32 6Z" fill="url(#waterGrad)" opacity="0.9"/>
            <path d="M32 14C32 14 22 30 22 38C22 43.523 26.477 48 32 48C37.523 48 42 43.523 42 38C42 30 32 14 32 14Z" fill="url(#waterGrad2)"/>
            <ellipse cx="28" cy="28" rx="4" ry="6" fill="white" opacity="0.3"/>
          </svg>
        </div>
        <h1 class="brand-title">智灌知源</h1>
        <p class="brand-subtitle">农业水利智能平台</p>
        <div class="brand-tagline">
          基于 AI 技术的农业水利垂类大模型平台
        </div>

        <div class="feature-list">
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <div class="feature-title">数据安全加密</div>
              <div class="feature-desc">端到端加密传输，保障数据安全</div>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div>
              <div class="feature-title">隐私保护</div>
              <div class="feature-desc">严格的隐私保护机制</div>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <div class="feature-title">快速响应</div>
              <div class="feature-desc">高性能架构，毫秒级响应</div>
            </div>
          </div>
        </div>
      </div>

      <div class="login-card-wrapper">
        <div class="login-card">
          <div class="card-header">
            <h2 class="card-title">欢迎回来</h2>
            <p class="card-desc">登录您的账号以继续</p>
          </div>

          <el-form ref="loginForm" :model="form" :rules="rules" class="login-form">
            <div class="form-group">
              <label class="form-label">用户名</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <el-input
                  v-model="form.username"
                  placeholder="请输入用户名"
                  :disabled="loading"
                  class="apple-input"
                  @keyup.enter="handleLogin"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">密码</label>
              <div class="input-wrapper">
                <span class="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <el-input
                  v-model="form.password"
                  type="password"
                  placeholder="请输入密码"
                  :disabled="loading"
                  show-password
                  class="apple-input"
                  @keyup.enter="handleLogin"
                />
              </div>
            </div>

            <div class="form-options">
              <el-checkbox v-model="form.remember" class="apple-checkbox">记住我</el-checkbox>
              <a href="#" class="forgot-link" @click.prevent="handleForgotPassword">忘记密码？</a>
            </div>

            <el-button
              type="primary"
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
            >
              {{ loading ? '登录中...' : '登 录' }}
            </el-button>
          </el-form>

          <div class="divider">
            <span>或</span>
          </div>

          <div class="register-prompt">
            还没有账号？
            <a href="#" class="register-link" @click.prevent="handleRegister">立即注册</a>
          </div>
        </div>

        <p class="footer-text">
          © 2025 智灌知源 · 农业水利智能平台
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loginForm = ref(null)
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3-20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度在6-32个字符', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  const valid = await loginForm.value?.validate().catch(() => false)
  if (!valid) return

  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1200))

    localStorage.setItem('token', 'mock-token-' + Date.now())
    localStorage.setItem('username', form.username)

    if (form.remember) {
      localStorage.setItem('rememberUser', form.username)
    } else {
      localStorage.removeItem('rememberUser')
    }

    ElMessage.success('登录成功')
    setTimeout(() => {
      window.location.href = '/dashboard/overview'
    }, 400)
  } catch (error) {
    ElMessage.error('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}

const handleForgotPassword = () => {
  ElMessageBox.alert('请联系管理员重置密码', '忘记密码', {
    confirmButtonText: '知道了',
    type: 'info'
  })
}

const handleRegister = () => {
  ElMessageBox.alert('请联系管理员开通账号', '注册', {
    confirmButtonText: '知道了',
    type: 'info'
  })
}

onMounted(() => {
  const rememberUser = localStorage.getItem('rememberUser')
  if (rememberUser) {
    form.username = rememberUser
    form.remember = true
  }
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000000;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #0a0a0f 0%, #0d1117 50%, #0a0a0f 100%);
}

.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  pointer-events: none;
}

.bg-glow--1 {
  width: 600px;
  height: 600px;
  top: -200px;
  left: -100px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
}

.bg-glow--2 {
  width: 500px;
  height: 500px;
  bottom: -150px;
  right: -100px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, transparent 70%);
}

.bg-glow--3 {
  width: 400px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
}

.login-wrapper {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  padding: 40px;
}

.brand-section {
  flex: 1;
  max-width: 480px;
  color: white;
}

.brand-logo {
  margin-bottom: 32px;
}

.logo-svg {
  width: 64px;
  height: 64px;
  filter: drop-shadow(0 4px 20px rgba(59, 130, 246, 0.4));
}

.brand-title {
  font-size: 42px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-subtitle {
  font-size: 18px;
  color: #64748b;
  margin: 0 0 24px 0;
  font-weight: 500;
}

.brand-tagline {
  font-size: 15px;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 48px;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  flex-shrink: 0;
}

.feature-icon svg {
  width: 20px;
  height: 20px;
}

.feature-title {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 4px;
}

.feature-desc {
  font-size: 13px;
  color: #64748b;
}

.login-card-wrapper {
  flex: 0 0 auto;
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-card {
  width: 100%;
  background: rgba(22, 22, 26, 0.8);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 48px 40px;
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.05) inset,
    0 32px 64px -12px rgba(0, 0, 0, 0.5);
}

.card-header {
  text-align: center;
  margin-bottom: 36px;
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  color: #f8fafc;
  margin: 0 0 8px 0;
  letter-spacing: -0.3px;
}

.card-desc {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.login-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #cbd5e1;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #475569;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-icon svg {
  width: 18px;
  height: 18px;
}

.apple-input :deep(.el-input__wrapper) {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding-left: 44px;
  box-shadow: none;
  transition: all 0.2s ease;
  height: 48px;
}

.apple-input :deep(.el-input__wrapper:hover) {
  border-color: rgba(59, 130, 246, 0.3);
  background: rgba(15, 23, 42, 0.8);
}

.apple-input :deep(.el-input__wrapper.is-focus) {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  background: rgba(15, 23, 42, 0.9);
}

.apple-input :deep(.el-input__inner) {
  color: #f1f5f9;
  font-size: 14px;
}

.apple-input :deep(.el-input__inner::placeholder) {
  color: #475569;
}

.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}

.apple-checkbox :deep(.el-checkbox__label) {
  color: #94a3b8;
  font-size: 13px;
}

.apple-checkbox :deep(.el-checkbox__inner) {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.apple-checkbox :deep(.el-checkbox__inner:hover) {
  border-color: rgba(59, 130, 246, 0.5);
}

.apple-checkbox :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
  background: #3b82f6;
  border-color: #3b82f6;
}

.forgot-link {
  font-size: 13px;
  color: #60a5fa;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #93c5fd;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  color: white;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
}

.login-btn:active {
  transform: translateY(0);
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
}

.divider span {
  font-size: 12px;
  color: #475569;
}

.register-prompt {
  text-align: center;
  font-size: 13px;
  color: #64748b;
}

.register-link {
  color: #60a5fa;
  text-decoration: none;
  font-weight: 500;
  margin-left: 4px;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: #93c5fd;
}

.footer-text {
  margin-top: 28px;
  font-size: 12px;
  color: #334155;
  text-align: center;
}

@media (max-width: 960px) {
  .login-wrapper {
    flex-direction: column;
    gap: 40px;
    padding: 40px 20px;
  }

  .brand-section {
    max-width: 100%;
    text-align: center;
  }

  .brand-logo {
    display: flex;
    justify-content: center;
  }

  .feature-list {
    max-width: 360px;
    margin: 0 auto;
  }

  .login-card-wrapper {
    width: 100%;
    max-width: 420px;
  }
}

@media (max-width: 480px) {
  .login-card {
    padding: 36px 24px;
  }

  .brand-title {
    font-size: 32px;
  }
}
</style>
