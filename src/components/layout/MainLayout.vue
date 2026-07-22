<template>
  <div class="main-layout">
    <header class="app-header">
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">💧</span>
          <span class="logo-text">智灌知源</span>
        </div>
      </div>
      <div class="header-center">
        <el-dropdown trigger="click" @command="handleTerminalChange">
          <span class="terminal-selector">
            {{ currentTerminalName }}
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="teacher">教师端</el-dropdown-item>
              <el-dropdown-item command="student">学生端</el-dropdown-item>
              <el-dropdown-item command="research">科研端</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="header-right">
        <el-button type="text" class="header-btn" @click="showSettings = true">
          <el-icon><Setting /></el-icon>
        </el-button>
        <el-button type="text" class="header-btn" @click="showFeedback = true">
          <el-icon><ChatRound /></el-icon>
        </el-button>
        <el-button type="text" class="header-btn logout-btn" @click="handleLogout">
          <el-icon><SwitchButton /></el-icon>
          <span>退出登录</span>
        </el-button>
      </div>
    </header>

    <div class="app-body">
      <aside class="sidebar">
        <el-menu
          :default-active="activeMenu"
          class="sidebar-menu"
          router
          @select="handleMenuSelect"
        >
          <template v-for="item in menuItems" :key="item.path">
            <el-menu-item :index="item.path">
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.label }}</span>
            </el-menu-item>
          </template>
        </el-menu>

        <div class="sidebar-footer">
          <el-button type="primary" plain class="new-chat-btn" @click="handleNewChat">
            <el-icon><Plus /></el-icon>
            新建会话
          </el-button>
        </div>
      </aside>

      <main class="main-content">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath" />
        </transition>
      </main>
    </div>

    <footer class="app-footer">
      <span class="footer-text">© 2026 智灌知源 - 农业水利垂类大模型平台</span>
      <div class="footer-actions">
        <span class="version">v1.0.0</span>
      </div>
    </footer>

    <FloatAssistant @open-tool="handleOpenTool" />

    <el-dialog v-model="showSettings" title="设置" width="600px">
      <div class="settings-content">
        <el-form label-width="100px">
          <el-form-item label="字体大小">
            <el-select v-model="settings.fontSize" placeholder="请选择">
              <el-option label="小号" value="small" />
              <el-option label="默认" value="default" />
              <el-option label="大号" value="large" />
            </el-select>
          </el-form-item>
          <el-form-item label="主题模式">
            <el-select v-model="settings.theme" placeholder="请选择">
              <el-option label="深色模式" value="dark" />
              <el-option label="浅色模式" value="light" />
            </el-select>
          </el-form-item>
          <el-form-item label="自动保存">
            <el-switch v-model="settings.autoSave" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="showSettings = false">取消</el-button>
        <el-button type="primary" @click="saveSettings">保存设置</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="showFeedback" title="意见反馈" width="600px">
      <div class="feedback-content">
        <el-form label-width="80px">
          <el-form-item label="反馈类型">
            <el-select v-model="feedback.type" placeholder="请选择">
              <el-option label="功能建议" value="suggestion" />
              <el-option label="Bug报告" value="bug" />
              <el-option label="其他" value="other" />
            </el-select>
          </el-form-item>
          <el-form-item label="反馈内容">
            <el-textarea v-model="feedback.content" rows="6" placeholder="请输入您的反馈内容..." />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="showFeedback = false">取消</el-button>
        <el-button type="primary" @click="submitFeedback">提交反馈</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ArrowDown,
  Setting,
  ChatRound,
  SwitchButton,
  Plus,
  Reading,
  Document,
  Briefcase,
  HelpFilled,
  CirclePlus,
  Medal,
  Search,
  PieChart,
  EditPen
} from '@element-plus/icons-vue'
import FloatAssistant from '../common/FloatAssistant.vue'

const router = useRouter()
const route = useRoute()

const currentTerminal = ref('teacher')
const showSettings = ref(false)
const showFeedback = ref(false)

const settings = ref({
  fontSize: 'default',
  theme: 'dark',
  autoSave: true
})

const feedback = ref({
  type: 'suggestion',
  content: ''
})

const terminalNames = {
  teacher: '教师端',
  student: '学生端',
  research: '科研端'
}

const currentTerminalName = computed(() => terminalNames[currentTerminal.value])

const menuItems = computed(() => {
  const menus = {
    teacher: [
      { path: '/teacher/preparation', label: '智能备课助手', icon: Reading },
      { path: '/teacher/grading', label: '作业批改助手', icon: Document },
      { path: '/teacher/case-design', label: '案例教学设计', icon: Briefcase }
    ],
    student: [
      { path: '/student/qa', label: '专业问答导师', icon: HelpFilled },
      { path: '/student/calculation', label: '计算题讲解', icon: CirclePlus },
      { path: '/student/learning-path', label: '学习路径规划', icon: Medal }
    ],
    research: [
      { path: '/research/literature', label: '文献综述助手', icon: Search },
      { path: '/research/data-analysis', label: '灌区数据分析', icon: PieChart },
      { path: '/research/academic-writing', label: '学术写作助手', icon: EditPen }
    ]
  }
  return menus[currentTerminal.value] || []
})

const activeMenu = computed(() => route.path)

const handleTerminalChange = (terminal) => {
  currentTerminal.value = terminal
  const firstMenu = menuItems.value[0]
  if (firstMenu) {
    router.push(firstMenu.path)
  }
}

const handleMenuSelect = (index) => {
  router.push(index)
}

const handleNewChat = () => {
  const firstMenu = menuItems.value[0]
  if (firstMenu) {
    router.push(firstMenu.path)
  }
}

const handleOpenTool = (tool) => {
  console.log('Open tool:', tool)
}

const saveSettings = () => {
  localStorage.setItem('appSettings', JSON.stringify(settings.value))
  showSettings.value = false
  ElMessage.success('设置已保存')
}

const submitFeedback = () => {
  if (!feedback.value.content.trim()) {
    ElMessage.warning('请输入反馈内容')
    return
  }
  showFeedback.value = false
  ElMessage.success('反馈已提交，感谢您的意见！')
  feedback.value = { type: 'suggestion', content: '' }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  ElMessage.info('已退出登录')
  router.push('/login')
}

onMounted(() => {
  const path = route.path
  if (path.startsWith('/teacher')) currentTerminal.value = 'teacher'
  else if (path.startsWith('/student')) currentTerminal.value = 'student'
  else if (path.startsWith('/research')) currentTerminal.value = 'research'

  const savedSettings = localStorage.getItem('appSettings')
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings)
  }
})
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-primary);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.terminal-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.terminal-selector:hover {
  background-color: var(--bg-hover);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-btn {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  padding: 6px 12px;
  transition: color var(--transition-fast);
}

.header-btn:hover {
  color: var(--text-primary);
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-tertiary);
}

.logout-btn:hover {
  color: var(--danger-color);
}

.app-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-menu {
  flex: 1;
  border-right: none;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--border-color);
}

.new-chat-btn {
  width: 100%;
  color: var(--text-primary);
  border-color: var(--primary-color);
}

.new-chat-btn:hover {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
}

.main-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
}

.app-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  padding: 0 20px;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.footer-text {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.version {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.settings-content,
.feedback-content {
  padding: 10px 0;
}
</style>
