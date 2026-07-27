<template>
  <div class="login-page">
    <div class="login-bg"></div>
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="login-logo">
            <span class="logo-icon">💧</span>
            <span class="logo-text">智灌知源</span>
          </div>
          <h1 class="login-title">农业水利垂类大模型平台</h1>
          <p class="login-desc">基于AI技术，为农业水利领域提供智能辅助服务</p>
        </div>

        <el-form ref="loginForm" :model="form" :rules="rules" class="login-form">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              size="large"
              prefix-icon="User"
              :disabled="loading"
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              prefix-icon="Lock"
              :disabled="loading"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>

          <el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-checkbox v-model="form.remember" size="large">记住我</el-checkbox>
              </el-col>
              <el-col :span="12" class="text-right">
                <el-button type="text" size="large" @click="handleForgotPassword">忘记密码？</el-button>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-btn"
              :loading="loading"
              @click="handleLogin"
            >
              {{ loading ? '登录中...' : '登 录' }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
          <span>还没有账号？</span>
          <el-button type="text" @click="handleRegister">立即注册</el-button>
        </div>

        <div class="login-tips">
          <div class="tip-item">
            <el-icon class="tip-icon"><Shield /></el-icon>
            <span>数据安全加密</span>
          </div>
          <div class="tip-item">
            <el-icon class="tip-icon"><Lock /></el-icon>
            <span>隐私保护</span>
          </div>
          <div class="tip-item">
            <el-icon class="tip-icon"><Zap /></el-icon>
            <span>快速响应</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
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
  const valid = await loginForm.value?.validate()
  if (!valid) return

  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 1500))

    sessionStorage.setItem('token', 'mock-token-' + Date.now())
    sessionStorage.setItem('username', form.username)

    if (form.remember) {
      localStorage.setItem('rememberUser', form.username)
    } else {
      localStorage.removeItem('rememberUser')
    }

    ElMessage.success('登录成功！')
    setTimeout(() => {
      window.location.href = '/dashboard/overview'
    }, 500)
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

const rememberUser = localStorage.getItem('rememberUser')
if (rememberUser) {
  form.username = rememberUser
  form.remember = true
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0a2463 0%, #1e3a8a 50%, #3e54ac 100%);
}

.login-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(56, 189, 248, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 40%);
}

.login-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  padding: 0 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 50px 40px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.logo-icon {
  font-size: 40px;
}

.logo-text {
  font-size: 28px;
  font-weight: 700;
  color: #0a2463;
}

.login-title {
  font-size: 22px;
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 8px;
}

.login-desc {
  font-size: 14px;
  color: #64748b;
}

.login-form {
  margin-bottom: 30px;
}

.login-form :deep(.el-form-item) {
  margin-bottom: 24px;
}

.login-form :deep(.el-input__wrapper) {
  border-radius: 12px;
  height: 52px;
  background: #f8fafc;
  box-shadow: none;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.login-form :deep(.el-input__wrapper:hover) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.login-form :deep(.el-input__inner) {
  font-size: 15px;
  color: #1e293b;
}

.login-btn {
  width: 100%;
  height: 52px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #0a2463, #3e54ac);
  border: none;
  transition: all 0.3s ease;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.login-footer {
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
  color: #64748b;
}

.login-footer :deep(.el-button) {
  font-weight: 600;
  color: #3b82f6;
  padding: 0;
}

.login-tips {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #94a3b8;
}

.tip-icon {
  font-size: 14px;
  color: #3b82f6;
}

.text-right {
  text-align: right;
}
</style>