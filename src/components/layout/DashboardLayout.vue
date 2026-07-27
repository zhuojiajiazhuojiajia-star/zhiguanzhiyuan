<template>
  <div class="dashboard-layout">
    <header class="dashboard-header">
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">💧</span>
          <span class="logo-text">智灌知源</span>
        </div>
        <div class="title">灌区总览驾驶舱</div>
      </div>
      <div class="header-center">
        <div class="status-item">
          <span class="status-dot online"></span>
          <span>系统状态：运行正常</span>
        </div>
        <div class="status-item">
          <el-icon><Clock /></el-icon>
          <span>{{ currentTime }}</span>
        </div>
      </div>
      <div class="header-right">
        <div class="weather">
          <span>🌤️</span>
          <span>26°C 多云</span>
        </div>
        <div class="user-info">
          <span>管理员</span>
          <el-icon><User /></el-icon>
        </div>
      </div>
    </header>

    <div class="dashboard-body">
      <aside class="dashboard-sidebar">
        <div class="sidebar-scroll">
          <el-menu
            :default-active="activeMenu"
            class="sidebar-menu"
            router
            background-color="transparent"
            text-color="#94a3b8"
            active-text-color="#38bdf8"
          >
            <template v-for="item in menuItems" :key="item.path">
              <el-menu-item :index="item.path">
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.label }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </aside>

      <main class="dashboard-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  HomeFilled,
  PieChart,
  ChatLineRound,
  VideoPlay,
  TrendCharts,
  Clock,
  User
} from '@element-plus/icons-vue'

const route = useRoute()
const currentTime = ref('')

const menuItems = [
  { path: '/dashboard/overview', label: '首页总览', icon: HomeFilled },
  { path: '/dashboard/assessment', label: '学科评估', icon: PieChart },
  { path: '/dashboard/qa', label: '知识问答', icon: ChatLineRound },
  { path: '/dashboard/simulation', label: '仿真推演', icon: VideoPlay },
  { path: '/dashboard/analysis', label: '数据分析', icon: TrendCharts }
]

const activeMenu = computed(() => route.path)

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

let timer = null

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  height: 60px;
  flex-shrink: 0;
  background: rgba(15, 23, 42, 0.9);
  border-bottom: 1px solid rgba(56, 189, 248, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
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
  font-size: 20px;
  font-weight: 700;
  color: #38bdf8;
}

.title {
  font-size: 16px;
  color: #e2e8f0;
  font-weight: 600;
}

.header-center {
  display: flex;
  gap: 30px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #94a3b8;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

.status-dot.online {
  background: #22c55e;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.weather {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #94a3b8;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #94a3b8;
  padding: 6px 12px;
  background: rgba(56, 189, 248, 0.1);
  border-radius: 20px;
}

.dashboard-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.dashboard-sidebar {
  width: 180px;
  flex-shrink: 0;
  border-right: 1px solid rgba(56, 189, 248, 0.1);
  overflow: hidden;
}

.sidebar-scroll {
  height: 100%;
  overflow-y: auto;
  padding: 20px 0;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}

.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.3);
  border-radius: 2px;
}

.sidebar-menu {
  border-right: none;
  background-color: transparent !important;
}

.sidebar-menu :deep(.el-menu-item) {
  margin: 4px 12px;
  border-radius: 8px;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.sidebar-menu :deep(.el-menu-item:hover) {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
}

.dashboard-content {
  flex: 1;
  overflow: auto;
  padding: 20px;
}
</style>