<template>
  <div class="qa-page">
    <div class="grid-container">
      <div class="card card-full">
        <div class="card-header">
          <span class="card-title">智能问答助手</span>
          <div class="card-actions">
            <el-button type="text" size="small">历史记录</el-button>
            <el-button type="text" size="small">反馈建议</el-button>
          </div>
        </div>
        <div class="qa-content">
          <div class="qa-sidebar">
            <div class="sidebar-section">
              <div class="section-title">热门问题</div>
              <div class="hot-questions">
                <div class="hot-question" v-for="(q, index) in hotQuestions" :key="index" @click="askQuestion(q)">
                  <span class="question-index">{{ index + 1 }}</span>
                  <span class="question-text">{{ q }}</span>
                </div>
              </div>
            </div>
            <div class="sidebar-section">
              <div class="section-title">知识分类</div>
              <el-tree
                :data="knowledgeTree"
                :props="{ label: 'label', children: 'children' }"
                @node-click="handleTreeClick"
                :default-expand-all="true"
                highlight-current
              />
            </div>
          </div>
          <div class="qa-main">
            <div class="chat-container">
              <div class="chat-messages">
                <div class="chat-message system-message">
                  <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                      <rect x="3" y="8" width="18" height="12" rx="2"/>
                      <path d="M12 2v4"/>
                      <circle cx="12" cy="14" r="1"/>
                      <path d="M8 14v0"/>
                      <path d="M16 14v0"/>
                    </svg>
                  </div>
                  <div class="message-content">
                    <div class="message-text">您好！我是农业水利领域的智能问答助手。请问有什么可以帮助您的？</div>
                  </div>
                </div>
                <div class="chat-message user-message" v-for="(msg, index) in messages" :key="index">
                  <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div class="message-content">
                    <div class="message-text">{{ msg.content }}</div>
                  </div>
                </div>
                <div class="chat-message system-message" v-if="loading">
                  <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                      <rect x="3" y="8" width="18" height="12" rx="2"/>
                      <path d="M12 2v4"/>
                      <circle cx="12" cy="14" r="1"/>
                      <path d="M8 14v0"/>
                      <path d="M16 14v0"/>
                    </svg>
                  </div>
                  <div class="message-content">
                    <div class="message-text">
                      <span class="typing-dot"></span>
                      <span class="typing-dot"></span>
                      <span class="typing-dot"></span>
                    </div>
                  </div>
                </div>
                <div class="chat-message system-message" v-for="(reply, index) in replies" :key="'reply-' + index">
                  <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                      <rect x="3" y="8" width="18" height="12" rx="2"/>
                      <path d="M12 2v4"/>
                      <circle cx="12" cy="14" r="1"/>
                      <path d="M8 14v0"/>
                      <path d="M16 14v0"/>
                    </svg>
                  </div>
                  <div class="message-content">
                    <div class="message-text" v-html="reply"></div>
                  </div>
                </div>
              </div>
              <div class="chat-input">
                <el-input
                  v-model="inputMessage"
                  placeholder="请输入您的问题..."
                  size="large"
                  @keyup.enter="sendMessage"
                />
                <el-button type="primary" size="large" @click="sendMessage" :loading="loading">发送</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">问答统计</span>
        </div>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">2,847</div>
            <div class="stat-label">累计问答</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">96.8%</div>
            <div class="stat-label">准确率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">3.2s</div>
            <div class="stat-label">平均响应</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">58</div>
            <div class="stat-label">知识库条目</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">问答趋势</span>
        </div>
        <div class="chart-container">
          <v-chart class="echarts" :option="trendChartOption" autoresize />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const inputMessage = ref('')
const loading = ref(false)
const messages = ref([])
const replies = ref([])

const hotQuestions = [
  '灌溉排水工程的主要类型有哪些？',
  '水资源管理的基本原则是什么？',
  '农田水利工程的设计要点有哪些？',
  '如何计算灌溉用水量？',
  '水力学基本方程有哪些？'
]

const knowledgeTree = [
  {
    label: '灌溉工程',
    children: [
      { label: '渠道灌溉' },
      { label: '管道灌溉' },
      { label: '喷灌技术' },
      { label: '滴灌技术' }
    ]
  },
  {
    label: '排水工程',
    children: [
      { label: '明沟排水' },
      { label: '暗管排水' },
      { label: '竖井排水' }
    ]
  },
  {
    label: '水资源管理',
    children: [
      { label: '水量平衡' },
      { label: '水质监测' },
      { label: '节水措施' }
    ]
  },
  {
    label: '水力学',
    children: [
      { label: '流体力学' },
      { label: '管道水力学' },
      { label: '渠道水力学' }
    ]
  }
]

const askQuestion = (question) => {
  inputMessage.value = question
}

const handleTreeClick = (data) => {
  inputMessage.value = `请介绍一下${data.label}`
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || loading.value) return

  const message = inputMessage.value.trim()
  messages.value.push({ content: message })
  inputMessage.value = ''
  loading.value = true

  await new Promise(resolve => setTimeout(resolve, 2000))

  const mockReply = `关于"${message}"的回答：<br/>农业水利工程是指为农业生产服务的水利工程设施，包括灌溉、排水、防洪、水土保持等方面。灌溉工程可以分为渠道灌溉、管道灌溉、喷灌和滴灌等多种形式。排水工程则包括明沟排水、暗管排水和竖井排水等方式。水资源管理需要遵循水量平衡、水质监测和节水优先的原则。`
  
  replies.value.push(mockReply)
  loading.value = false
}

const trendChartOption = computed(() => ({
  grid: { top: 10, right: 10, bottom: 30, left: 50 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: '#334155' } }
  },
  series: [{
    name: '问答次数',
    type: 'line',
    smooth: true,
    data: [120, 156, 134, 189, 167, 98, 76],
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(56, 189, 248, 0.4)' },
          { offset: 1, color: 'rgba(56, 189, 248, 0.05)' }
        ]
      }
    },
    lineStyle: { color: '#38bdf8', width: 3 },
    itemStyle: { color: '#38bdf8' }
  }]
}))
</script>

<style scoped>
.qa-page {
  height: 100%;
  overflow-y: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  min-height: 100%;
}

.card {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.1);
  overflow: hidden;
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  min-height: 500px;
}

.card-full {
  grid-column: span 12;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(56, 189, 248, 0.1);
  flex-shrink: 0;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.card-actions :deep(.el-button) {
  color: #94a3b8;
}

.qa-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.qa-sidebar {
  width: 280px;
  border-right: 1px solid rgba(56, 189, 248, 0.1);
  padding: 16px;
}

.sidebar-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #38bdf8;
  margin-bottom: 12px;
}

.hot-questions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hot-question {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hot-question:hover {
  background: rgba(56, 189, 248, 0.15);
}

.question-index {
  font-size: 12px;
  font-weight: 700;
  color: #38bdf8;
  min-width: 20px;
}

.question-text {
  font-size: 12px;
  color: #cbd5e1;
}

.qa-sidebar :deep(.el-tree) {
  background: transparent;
}

.qa-sidebar :deep(.el-tree-node__content) {
  color: #cbd5e1;
}

.qa-sidebar :deep(.el-tree-node__content:hover) {
  background: rgba(56, 189, 248, 0.1);
}

.qa-sidebar :deep(.is-current > .el-tree-node__content) {
  background: rgba(56, 189, 248, 0.2);
  color: #38bdf8;
}

.qa-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 10px;
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.3);
  border-radius: 3px;
}

.chat-message {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.chat-message:last-child {
  margin-bottom: 0;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: rgba(34, 197, 94, 0.2);
}

.message-content {
  flex: 1;
  max-width: 70%;
}

.user-message .message-content {
  text-align: right;
}

.message-text {
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.6;
}

.system-message .message-text {
  background: rgba(56, 189, 248, 0.15);
  color: #e2e8f0;
  border: 1px solid rgba(56, 189, 248, 0.2);
}

.user-message .message-text {
  background: rgba(34, 197, 94, 0.2);
  color: #e2e8f0;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.typing-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: #38bdf8;
  border-radius: 50%;
  margin: 0 2px;
  animation: typing 1.4s infinite ease-in-out both;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.chat-input {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid rgba(56, 189, 248, 0.1);
}

.chat-input :deep(.el-input__wrapper) {
  flex: 1;
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.8);
}

.chat-input :deep(.el-button) {
  border-radius: 10px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 16px;
}

.stat-item {
  text-align: center;
  padding: 12px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #38bdf8;
}

.stat-label {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.chart-container {
  height: 200px;
  padding: 10px;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>