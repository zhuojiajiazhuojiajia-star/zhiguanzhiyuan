<template>
  <div class="float-assistant">
    <div class="assistant-ball" @click="togglePanel">
      <el-icon class="assistant-icon"><MagicStick /></el-icon>
      <span class="assistant-badge" v-if="hasNewMessage">●</span>
    </div>

    <transition name="slide-up">
      <div class="assistant-panel" v-if="showPanel">
        <div class="panel-header">
          <span class="panel-title">快捷工具</span>
          <el-button type="text" class="close-btn" @click="showPanel = false">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>

        <div class="tool-grid">
          <div class="tool-item" v-for="tool in tools" :key="tool.id" @click="handleToolClick(tool)">
            <div class="tool-icon-wrapper" :style="{ backgroundColor: tool.color }">
              <el-icon><component :is="tool.icon" /></el-icon>
            </div>
            <span class="tool-name">{{ tool.name }}</span>
          </div>
        </div>

        <div class="panel-footer">
          <el-button type="primary" class="quick-ask-btn" @click="handleQuickAsk">
            <el-icon><ChatRound /></el-icon>
            快速提问
          </el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MagicStick, Close, ChatRound, CirclePlus, Refresh, Search, PieChart, HelpFilled, StarFilled } from '@element-plus/icons-vue'

const emit = defineEmits(['open-tool'])

const showPanel = ref(false)
const hasNewMessage = ref(false)

const tools = [
  { id: 'calculator', name: '公式计算', icon: CirclePlus, color: '#0A2463' },
  { id: 'unit-convert', name: '单位换算', icon: Refresh, color: '#3E92CC' },
  { id: 'knowledge-search', name: '知识检索', icon: Search, color: '#00D9FF' },
  { id: 'data-analysis', name: '数据分析', icon: PieChart, color: '#1E3A8A' },
  { id: 'quick-help', name: '快速帮助', icon: HelpFilled, color: '#2A4A6E' },
  { id: 'favorites', name: '收藏夹', icon: StarFilled, color: '#1A3A5C' }
]

const togglePanel = () => {
  showPanel.value = !showPanel.value
}

const handleToolClick = (tool) => {
  emit('open-tool', tool)
  showPanel.value = false
  ElMessage.info(`已打开${tool.name}`)
}

const handleQuickAsk = () => {
  showPanel.value = false
  ElMessage.info('正在打开对话界面...')
}
</script>

<style scoped>
.float-assistant {
  position: fixed;
  left: 30px;
  bottom: 80px;
  z-index: 9999;
}

.assistant-ball {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
  position: relative;
}

.assistant-ball:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 40px rgba(10, 36, 99, 0.5);
}

.assistant-icon {
  font-size: 28px;
  color: white;
}

.assistant-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--danger-color);
  color: white;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.assistant-panel {
  position: absolute;
  right: 0;
  bottom: 70px;
  width: 320px;
  background-color: var(--bg-card);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
}

.panel-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  color: var(--text-tertiary);
  padding: 4px;
}

.close-btn:hover {
  color: var(--text-primary);
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 12px 8px;
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast);
}

.tool-item:hover {
  background-color: var(--bg-hover);
}

.tool-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-icon-wrapper :deep(.el-icon) {
  font-size: 24px;
  color: white;
}

.tool-name {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.panel-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
}

.quick-ask-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all var(--transition-normal);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
