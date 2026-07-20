<template>
  <div class="chat-panel">
    <div class="chat-header">
      <div class="chat-title">
        <el-icon><component :is="headerIcon" /></el-icon>
        <span>{{ title }}</span>
      </div>
      <div class="chat-actions">
        <el-button type="text" @click="handleClear">
          <el-icon><Delete /></el-icon>
        </el-button>
        <el-button type="text" @click="handleExport">
          <el-icon><Download /></el-icon>
        </el-button>
      </div>
    </div>

    <div class="chat-history" ref="chatHistoryRef">
      <div v-if="messages.length === 0" class="empty-state">
        <div class="empty-icon">{{ emptyIcon }}</div>
        <p class="empty-title">{{ emptyTitle }}</p>
        <p class="empty-desc">{{ emptyDesc }}</p>
        <div class="empty-examples">
          <el-button
            v-for="example in examples"
            :key="example"
            type="primary"
            plain
            size="small"
            @click="handleExampleClick(example)"
          >
            {{ example }}
          </el-button>
        </div>
      </div>

      <div v-else class="message-list">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="message-item"
          :class="{ 'is-user': msg.role === 'user', 'is-ai': msg.role === 'ai' }"
        >
          <div class="message-avatar">
            <span v-if="msg.role === 'user'">👤</span>
            <span v-else>🤖</span>
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <div v-if="msg.role === 'user'" class="user-text">{{ msg.content }}</div>
              <div v-else class="ai-content markdown-content" v-html="renderMarkdown(msg.content)"></div>
            </div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>

        <div v-if="isLoading" class="loading-state">
          <div class="loading-dots">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
          <span class="loading-text">正在生成回答...</span>
        </div>

        <div v-if="errorMessage" class="error-state">
          <el-icon class="error-icon"><Warning /></el-icon>
          <span>{{ errorMessage }}</span>
          <el-button type="text" size="small" @click="handleRetry">重试</el-button>
        </div>
      </div>
    </div>

    <div class="chat-input-area">
      <el-input
        v-model="inputMessage"
        type="textarea"
        :rows="2"
        placeholder="请输入您的问题..."
        class="chat-input"
        @keyup.enter.ctrl="handleSend"
        :disabled="isLoading"
      />
      <div class="input-actions">
        <el-button type="text" class="action-btn">
          <el-icon><Paperclip /></el-icon>
        </el-button>
        <el-button type="text" class="action-btn">
          <el-icon><User /></el-icon>
        </el-button>
        <el-button
          type="primary"
          :loading="isLoading"
          class="send-btn"
          @click="handleSend"
          :disabled="!inputMessage.trim() || isLoading"
        >
          <el-icon><Right /></el-icon>
          发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { Delete, Download, Right, Paperclip, User, Warning } from '@element-plus/icons-vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { chatApi } from '@/utils/api'

const props = defineProps({
  title: {
    type: String,
    default: 'AI助手'
  },
  headerIcon: {
    type: Object,
    default: () => Send
  },
  emptyIcon: {
    type: String,
    default: '🤖'
  },
  emptyTitle: {
    type: String,
    default: '欢迎使用AI助手'
  },
  emptyDesc: {
    type: String,
    default: '请输入您的问题，我将为您提供专业的解答。'
  },
  examples: {
    type: Array,
    default: () => []
  },
  mockResponse: {
    type: Function,
    default: null
  },
  terminal: {
    type: String,
    default: 'teacher'
  },
  module: {
    type: String,
    default: ''
  },
  useApi: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['send', 'clear'])

const inputMessage = ref('')
const messages = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const chatHistoryRef = ref(null)

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (e) {
        console.error(e)
      }
    }
    return hljs.highlightAuto(code).value
  }
})

const renderMarkdown = (content) => {
  return marked(content)
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatHistoryRef.value) {
    chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight
  }
}

watch(messages, scrollToBottom, { deep: true })

const handleSend = async () => {
  if (!inputMessage.value.trim() || isLoading.value) return

  const userMessage = {
    role: 'user',
    content: inputMessage.value.trim(),
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  messages.value.push(userMessage)
  inputMessage.value = ''
  errorMessage.value = ''
  isLoading.value = true

  emit('send', userMessage)

  try {
    let responseContent = ''
    
    if (props.useApi) {
      const response = await chatApi.sendMessage(
        userMessage.content,
        props.terminal,
        props.module
      )
      responseContent = response.content || await simulateAIResponse(userMessage.content)
    } else if (props.mockResponse) {
      responseContent = props.mockResponse(userMessage.content)
    } else {
      responseContent = await simulateAIResponse(userMessage.content)
    }

    const aiMessage = {
      role: 'ai',
      content: responseContent,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }

    messages.value.push(aiMessage)
  } catch (error) {
    errorMessage.value = '网络异常，请稍后重试'
    console.error('AI response error:', error)
  } finally {
    isLoading.value = false
  }
}

const simulateAIResponse = (question) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = [
        '感谢您的提问！关于这个问题，我将从以下几个方面为您解答：\n\n**一、基本概念**\n\n农业水利工程是研究农田水利、灌溉排水、水资源利用与管理等方面的工程技术学科。\n\n**二、核心原理**\n\n1. 灌溉原理：根据作物需水量和土壤水分状况，合理分配灌溉水量\n2. 排水原理：排除多余水分，防止土壤盐碱化和渍涝\n\n**三、应用实例**\n\n以节水灌溉为例，通过滴灌、喷灌等技术，可以有效提高水资源利用率。\n\n如需更详细的解答，请提供更多具体信息。',
        '这是一个很好的问题！让我为您详细分析：\n\n```\nQ = K * A * (H1 - H2) / L\n```\n\n**公式说明：**\n- Q：渗流量\n- K：渗透系数\n- A：过水断面面积\n- H1-H2：水头差\n- L：渗流路径长度\n\n**计算步骤：**\n1. 确定各参数取值\n2. 代入公式计算\n3. 校核结果合理性\n\n**注意事项：**\n- 单位要统一\n- 考虑边界条件\n- 参考相关规范',
        '针对您的需求，我为您制定了以下学习路径：\n\n## 第一阶段：基础学习（2-3周）\n- 课程：水力学基础、工程力学\n- 目标：掌握基本概念和原理\n\n## 第二阶段：专业深入（4-6周）\n- 课程：灌溉排水工程、水资源规划\n- 目标：理解专业核心知识\n\n## 第三阶段：实践应用（持续进行）\n- 实验：渠道设计、泵站选型\n- 目标：提升动手能力\n\n建议按照此路径循序渐进，如有疑问随时提问！'
      ]
      resolve(responses[Math.floor(Math.random() * responses.length)])
    }, 2000 + Math.random() * 2000)
  })
}

const handleExampleClick = (example) => {
  inputMessage.value = example
}

const handleClear = () => {
  messages.value = []
  errorMessage.value = ''
  emit('clear')
}

const handleExport = () => {
  const content = messages.value.map(msg => `${msg.role === 'user' ? '用户' : 'AI'}: ${msg.content}`).join('\n\n')
  const blob = new Blob([content], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `chat-${Date.now()}.md`
  a.click()
  URL.revokeObjectURL(url)
}

const handleRetry = () => {
  if (messages.value.length > 0) {
    const lastUserMsg = messages.value[messages.value.length - 1]
    if (lastUserMsg.role === 'user') {
      errorMessage.value = ''
      handleSend()
    }
  }
}
</script>

<style scoped>
.chat-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.chat-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.chat-actions :deep(.el-button) {
  color: var(--text-tertiary);
}

.chat-actions :deep(.el-button:hover) {
  color: var(--text-primary);
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.empty-desc {
  font-size: var(--font-size-base);
  color: var(--text-tertiary);
  margin-bottom: 30px;
}

.empty-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.empty-examples :deep(.el-button) {
  background-color: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-secondary);
}

.empty-examples :deep(.el-button:hover) {
  background-color: var(--primary-color) !important;
  border-color: var(--primary-color) !important;
  color: white !important;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-item {
  display: flex;
  gap: 12px;
}

.message-item.is-user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.message-content {
  max-width: 70%;
}

.message-item.is-user .message-content {
  text-align: right;
}

.message-bubble {
  padding: 12px 16px;
  border-radius: var(--radius-lg);
  word-break: break-word;
}

.message-item.is-user .message-bubble {
  background-color: var(--primary-color);
  border-top-right-radius: 4px;
}

.message-item.is-ai .message-bubble {
  background-color: var(--bg-tertiary);
  border-top-left-radius: 4px;
}

.user-text {
  color: white;
}

.message-time {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-top: 6px;
}

.loading-state {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  border-top-left-radius: 4px;
  width: fit-content;
}

.loading-dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  animation: loading 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes loading {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.loading-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.error-state {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.3);
  border-radius: var(--radius-md);
  color: var(--danger-color);
  font-size: var(--font-size-sm);
}

.error-icon {
  font-size: var(--font-size-lg);
}

.chat-input-area {
  padding: 16px 20px;
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
}

.chat-input {
  margin-bottom: 12px;
}

.input-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
}

.action-btn {
  color: var(--text-tertiary);
  padding: 6px 12px;
}

.action-btn:hover {
  color: var(--text-primary);
}

.send-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}

.markdown-content {
  color: var(--text-secondary);
}
</style>
