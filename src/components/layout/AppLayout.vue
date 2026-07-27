<template>
  <div class="app-layout">
    <aside class="sidebar" :class="{ 'is-open': mobileMenuOpen }">
      <div class="brand-block">
        <div class="brand-mark">
          <el-icon><Pouring /></el-icon>
        </div>
        <div class="brand-copy">
          <strong>智灌知源</strong>
          <span>农业水利智能平台</span>
        </div>
      </div>

      <div class="role-switch" aria-label="切换工作台">
        <button
          v-for="role in roles"
          :key="role.value"
          type="button"
          :class="{ active: currentRole === role.value }"
          @click="handleRoleChange(role.value)"
        >
          {{ role.shortLabel }}
        </button>
      </div>

      <div class="nav-caption">{{ currentRoleName }}工具</div>
      <el-menu :default-active="activeMenu" class="sidebar-menu" router @select="handleMenuSelect">
        <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </el-menu-item>
      </el-menu>

      <div class="sidebar-status">
        <div class="status-heading">
          <span>{{ statusCard.title }}</span>
          <span class="online-dot">{{ statusCard.status }}</span>
        </div>
        <div class="status-meta">
          <span>{{ statusCard.metaLabel }}</span>
          <strong>{{ statusCard.metaValue }}</strong>
        </div>
        <div class="status-track"><span :style="{ width: statusCard.progress + '%' }" /></div>
        <p>{{ statusCard.updateText }}</p>
      </div>
    </aside>

    <button v-if="mobileMenuOpen" class="sidebar-backdrop" aria-label="关闭导航" @click="mobileMenuOpen = false" />

    <section class="workspace">
      <header class="app-header">
        <div class="header-context">
          <el-button class="mobile-menu-btn" text circle aria-label="打开导航" @click="mobileMenuOpen = !mobileMenuOpen">
            <el-icon><Fold /></el-icon>
          </el-button>
          <div>
            <span class="header-eyebrow">{{ currentRoleName }}</span>
            <strong>{{ currentPageName }}</strong>
          </div>
        </div>

        <div class="header-right">
          <div class="service-state">
            <span class="pulse-dot" />
            <div><span>{{ headerService.label }}</span><strong>{{ headerService.value }}</strong></div>
          </div>
          <div class="date-time">
            <span>{{ currentDate }}</span>
            <strong>{{ currentTime }}</strong>
          </div>
          <div class="weather-chip">
            <span class="weather-icon">🌤️</span>
            <div><span>26°C</span><strong>多云</strong></div>
          </div>
          <el-tooltip content="通知中心" placement="bottom">
            <el-button class="icon-button" text circle aria-label="通知中心">
              <el-icon><Bell /></el-icon>
              <span class="notice-dot" />
            </el-button>
          </el-tooltip>
          <div class="user-chip">
            <span class="avatar">{{ userInfo.avatar }}</span>
            <div><strong>{{ userInfo.name }}</strong><span>{{ userInfo.dept }}</span></div>
            <el-icon><ArrowDown /></el-icon>
          </div>
        </div>
      </header>

      <main class="main-content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.fullPath" />
          </transition>
        </router-view>
      </main>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowDown,
  Bell,
  Briefcase,
  ChatLineRound,
  CirclePlus,
  Document,
  EditPen,
  Fold,
  HelpFilled,
  HomeFilled,
  Medal,
  PieChart,
  Pouring,
  Reading,
  Search,
  TrendCharts,
  VideoPlay
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const mobileMenuOpen = ref(false)
const now = ref(new Date())
let clockTimer

const roles = [
  { value: 'dashboard', shortLabel: '驾驶舱', label: '灌区总览驾驶舱' },
  { value: 'teacher', shortLabel: '教师', label: '教师工作台' },
  { value: 'student', shortLabel: '学生', label: '学生工作台' },
  { value: 'research', shortLabel: '科研', label: '科研工作台' }
]

const menus = {
  dashboard: [
    { path: '/dashboard/overview', label: '首页总览', icon: HomeFilled },
    { path: '/dashboard/assessment', label: '学科评估', icon: PieChart },
    { path: '/dashboard/qa', label: '知识问答', icon: ChatLineRound },
    { path: '/dashboard/simulation', label: '仿真推演', icon: VideoPlay },
    { path: '/dashboard/analysis', label: '数据分析', icon: TrendCharts }
  ],
  teacher: [
    { path: '/teacher/preparation', label: '智能备课', icon: Reading },
    { path: '/teacher/grading', label: '作业批改', icon: Document, badge: '3' },
    { path: '/teacher/case-design', label: '案例设计', icon: Briefcase }
  ],
  student: [
    { path: '/student/qa', label: '专业问答', icon: HelpFilled },
    { path: '/student/calculation', label: '计算讲解', icon: CirclePlus },
    { path: '/student/learning-path', label: '学习路径', icon: Medal }
  ],
  research: [
    { path: '/research/literature', label: '文献综述', icon: Search },
    { path: '/research/data-analysis', label: '数据分析', icon: PieChart },
    { path: '/research/academic-writing', label: '学术写作', icon: EditPen }
  ]
}

const statusCards = {
  dashboard: {
    title: '灌区状态',
    status: '运行正常',
    metaLabel: '监测点位',
    metaValue: '128',
    progress: 92,
    updateText: '数据更新：实时同步'
  },
  teacher: {
    title: '知识库状态',
    status: '在线',
    metaLabel: '教学资源已同步',
    metaValue: '2,486',
    progress: 84,
    updateText: '最近更新：今天 09:32'
  },
  student: {
    title: '学习状态',
    status: '进行中',
    metaLabel: '已完成课程',
    metaValue: '18/32',
    progress: 56,
    updateText: '上次学习：昨天 16:45'
  },
  research: {
    title: '知识库状态',
    status: '在线',
    metaLabel: '专业文献已同步',
    metaValue: '2,486',
    progress: 84,
    updateText: '最近更新：今天 09:32'
  }
}

const headerServices = {
  dashboard: { label: '系统状态', value: '运行正常' },
  teacher: { label: 'AI 服务', value: '运行正常' },
  student: { label: '学习服务', value: '运行正常' },
  research: { label: 'AI 服务', value: '运行正常' }
}

const userInfos = {
  dashboard: { avatar: '管', name: '管理员', dept: '系统管理' },
  teacher: { avatar: '林', name: '林老师', dept: '水利工程系' },
  student: { avatar: '张', name: '张同学', dept: '水利工程2301' },
  research: { avatar: '林', name: '林老师', dept: '水利工程系' }
}

const currentRole = ref('dashboard')

const currentRoleName = computed(() => roles.find((r) => r.value === currentRole.value)?.label || '')
const menuItems = computed(() => menus[currentRole.value] || [])
const activeMenu = computed(() => route.path)
const allMenuItems = computed(() => Object.values(menus).flat())
const currentPageName = computed(() => allMenuItems.value.find((item) => item.path === route.path)?.label || '工作台')
const currentDate = computed(() => now.value.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', weekday: 'short' }))
const currentTime = computed(() => now.value.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
const statusCard = computed(() => statusCards[currentRole.value] || statusCards.dashboard)
const headerService = computed(() => headerServices[currentRole.value] || headerServices.dashboard)
const userInfo = computed(() => userInfos[currentRole.value] || userInfos.dashboard)

const syncRoleWithRoute = () => {
  if (route.path.startsWith('/dashboard')) currentRole.value = 'dashboard'
  else if (route.path.startsWith('/teacher')) currentRole.value = 'teacher'
  else if (route.path.startsWith('/student')) currentRole.value = 'student'
  else if (route.path.startsWith('/research')) currentRole.value = 'research'
  else currentRole.value = 'dashboard'
}

const handleRoleChange = (role) => {
  if (role === currentRole.value) return
  currentRole.value = role
  mobileMenuOpen.value = false
  const firstMenu = menus[role]?.[0]
  if (firstMenu) {
    router.push(firstMenu.path)
  }
}

const handleMenuSelect = () => {
  mobileMenuOpen.value = false
}

onMounted(() => {
  syncRoleWithRoute()
  clockTimer = window.setInterval(() => { now.value = new Date() }, 1000)
})

onBeforeUnmount(() => window.clearInterval(clockTimer))
</script>

<style scoped>
.app-layout {
  display: flex;
  min-width: 0;
  height: 100%;
  background: var(--bg-primary);
}

.sidebar {
  position: relative;
  z-index: 30;
  display: flex;
  width: 244px;
  flex: 0 0 244px;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  background: var(--bg-sidebar);
}

.brand-block {
  display: flex;
  align-items: center;
  min-height: 76px;
  padding: 0 20px;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
}

.brand-mark {
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  place-items: center;
  border: 1px solid rgba(86, 196, 255, .45);
  border-radius: 8px;
  color: #8ee7ff;
  background: linear-gradient(145deg, rgba(34, 119, 255, .24), rgba(29, 214, 181, .12));
  box-shadow: inset 0 0 18px rgba(77, 193, 255, .12), 0 0 18px rgba(33, 125, 255, .1);
  font-size: 22px;
}

.brand-copy { display: flex; min-width: 0; flex-direction: column; }
.brand-copy strong { color: var(--text-primary); font-size: 18px; line-height: 1.3; }
.brand-copy span { color: var(--text-muted); font-size: 11px; white-space: nowrap; }

.role-switch {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 18px 16px 20px;
  padding: 3px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: rgba(5, 16, 31, .7);
}

.role-switch button {
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  color: var(--text-muted);
  background: transparent;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.role-switch button.active {
  color: #f8fdff;
  background: var(--primary-color);
  box-shadow: 0 4px 14px rgba(29, 116, 255, .28);
}

.nav-caption {
  padding: 0 20px 8px;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
}

.sidebar-menu { flex: 1; padding: 0 10px; border-right: 0 !important; }
.sidebar-menu :deep(.el-menu-item) {
  height: 46px;
  margin-bottom: 5px;
  padding: 0 12px !important;
  border-radius: 6px;
  gap: 10px;
}
.sidebar-menu :deep(.el-menu-item::before) {
  position: absolute;
  left: 0;
  width: 3px;
  height: 18px;
  border-radius: 0 3px 3px 0;
  background: #5bd8ff;
  content: '';
  opacity: 0;
}
.sidebar-menu :deep(.el-menu-item.is-active::before) { opacity: 1; }
.sidebar-menu :deep(.el-menu-item.is-active) {
  background: linear-gradient(90deg, rgba(28, 105, 226, .28), rgba(28, 105, 226, .08)) !important;
  color: #eefdff !important;
}
.sidebar-menu :deep(.el-icon) { font-size: 18px; }
.nav-badge {
  min-width: 20px;
  height: 20px;
  margin-left: auto;
  padding: 0 6px;
  border-radius: 10px;
  color: #ffdba7;
  background: rgba(255, 167, 64, .16);
  font-size: 11px;
  line-height: 20px;
  text-align: center;
}

.sidebar-status {
  margin: 12px 14px 16px;
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 7px;
  background: rgba(15, 36, 61, .62);
}
.status-heading, .status-meta { display: flex; align-items: center; justify-content: space-between; }
.status-heading { color: var(--text-secondary); font-size: 12px; }
.online-dot { color: #63e6bd; }
.online-dot::before { display: inline-block; width: 6px; height: 6px; margin-right: 5px; border-radius: 50%; background: currentColor; content: ''; box-shadow: 0 0 8px currentColor; }
.status-meta { margin-top: 13px; color: var(--text-muted); font-size: 11px; }
.status-meta strong { color: var(--text-primary); font-size: 13px; }
.status-track { height: 3px; margin: 8px 0 9px; overflow: hidden; border-radius: 2px; background: rgba(114, 151, 182, .18); }
.status-track span { display: block; height: 100%; background: linear-gradient(90deg, #2c78ff, #39d6bd); }
.sidebar-status p { color: var(--text-muted); font-size: 10px; }

.workspace { display: flex; min-width: 0; flex: 1; flex-direction: column; }
.app-header {
  display: flex;
  min-height: 76px;
  flex: 0 0 76px;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  border-bottom: 1px solid var(--border-color);
  background: rgba(9, 24, 43, .92);
}
.header-context { display: flex; align-items: center; gap: 10px; }
.header-context > div:last-child { display: flex; flex-direction: column; }
.header-context strong { color: var(--text-primary); font-size: 16px; line-height: 1.35; }
.header-eyebrow { color: var(--text-muted); font-size: 11px; }
.mobile-menu-btn { display: none; color: var(--text-secondary) !important; }
.header-right { display: flex; align-items: center; gap: 22px; }
.service-state { display: flex; align-items: center; gap: 9px; }
.service-state > div, .date-time, .weather-chip > div { display: flex; flex-direction: column; }
.service-state span, .date-time span, .weather-chip span { color: var(--text-muted); font-size: 10px; }
.service-state strong { color: #72e7c3; font-size: 11px; }
.pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: #42d8ad; box-shadow: 0 0 0 4px rgba(66, 216, 173, .1), 0 0 10px rgba(66, 216, 173, .55); }
.date-time { padding-left: 22px; border-left: 1px solid var(--border-color); }
.date-time strong { color: var(--text-primary); font-size: 14px; line-height: 1.2; }
.weather-chip { display: flex; align-items: center; gap: 9px; padding-left: 22px; border-left: 1px solid var(--border-color); }
.weather-icon { font-size: 20px; }
.weather-chip strong { color: var(--text-primary); font-size: 12px; line-height: 1.2; }
.icon-button { position: relative; width: 36px; height: 36px; border: 1px solid var(--border-color) !important; color: var(--text-secondary) !important; background: var(--bg-tertiary) !important; }
.notice-dot { position: absolute; top: 6px; right: 6px; width: 6px; height: 6px; border: 1px solid var(--bg-tertiary); border-radius: 50%; background: #ff805d; }
.user-chip { display: flex; align-items: center; gap: 9px; min-width: 142px; }
.user-chip > div { display: flex; flex-direction: column; flex: 1; }
.user-chip strong { color: var(--text-primary); font-size: 12px; }
.user-chip span { color: var(--text-muted); font-size: 10px; }
.avatar { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid rgba(84, 186, 255, .35); border-radius: 6px; color: #c9f4ff !important; background: #173f69; font-size: 13px !important; }
.user-chip > .el-icon { color: var(--text-muted); font-size: 12px; }

.main-content { min-height: 0; flex: 1; overflow: auto; padding: 18px; }
.sidebar-backdrop { display: none; }

@media (max-width: 980px) {
  .sidebar { position: fixed; top: 0; bottom: 0; left: 0; transform: translateX(-100%); transition: transform .22s ease; }
  .sidebar.is-open { transform: translateX(0); box-shadow: 12px 0 40px rgba(0, 0, 0, .38); }
  .sidebar-backdrop { position: fixed; z-index: 20; inset: 0; display: block; border: 0; background: rgba(1, 7, 14, .64); }
  .mobile-menu-btn { display: inline-flex; }
  .service-state, .date-time, .weather-chip { display: none; }
}

@media (max-width: 640px) {
  .app-header { min-height: 64px; flex-basis: 64px; padding: 0 12px; }
  .header-right { gap: 8px; }
  .user-chip { min-width: auto; }
  .user-chip > div, .user-chip > .el-icon { display: none; }
  .main-content { padding: 12px; }
}
</style>
