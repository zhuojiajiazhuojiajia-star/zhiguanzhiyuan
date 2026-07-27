<template>
  <div class="chat-panel">
    <div class="chat-header">
      <div class="chat-title">
        <span class="assistant-mark"><el-icon><component :is="headerIcon || MagicStick" /></el-icon></span>
        <div><strong>{{ title }}</strong><span><i />已读取当前任务上下文</span></div>
      </div>
      <div class="chat-actions">
        <el-tooltip content="清空对话" placement="bottom">
          <el-button text circle aria-label="清空对话" @click="handleClear"><el-icon><Delete /></el-icon></el-button>
        </el-tooltip>
        <el-tooltip content="导出记录" placement="bottom">
          <el-button text circle aria-label="导出记录" @click="handleExport"><el-icon><Download /></el-icon></el-button>
        </el-tooltip>
      </div>
    </div>

    <div ref="chatHistoryRef" class="chat-history">
      <div v-if="messages.length === 0" class="empty-state">
        <div class="empty-visual">
          <span class="visual-core"><el-icon><MagicStick /></el-icon></span>
          <i class="orbit-one" /><i class="orbit-two" />
        </div>
        <p class="empty-title">{{ emptyTitle }}</p>
        <p class="empty-desc">{{ emptyDesc }}</p>
        <div class="empty-examples">
          <button v-for="(example, index) in examples" :key="example" type="button" @click="handleExampleClick(example)">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <strong>{{ example }}</strong>
            <el-icon><ArrowRight /></el-icon>
          </button>
        </div>
      </div>

      <div v-else class="message-list">
        <div v-for="(msg, index) in messages" :key="index" class="message-item" :class="`is-${msg.role}`">
          <div class="message-avatar">
            <el-icon><component :is="msg.role === 'user' ? User : MagicStick" /></el-icon>
          </div>
          <div class="message-content">
            <div class="message-label">{{ msg.role === 'user' ? '我' : '智灌 AI' }}</div>
            <div class="message-bubble">
              <div v-if="msg.role === 'user'" class="user-text">{{ msg.content }}</div>
              <div v-else class="ai-content markdown-content" v-html="renderMarkdown(msg.content)" />
            </div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>

        <div v-if="isLoading" class="loading-state">
          <span class="loading-mark"><el-icon><MagicStick /></el-icon></span>
          <div><strong>正在组织内容</strong><span class="loading-dots"><i /><i /><i /></span></div>
        </div>

        <div v-if="errorMessage" class="error-state">
          <el-icon><Warning /></el-icon><span>{{ errorMessage }}</span>
          <el-button text size="small" @click="handleRetry">重试</el-button>
        </div>
      </div>
    </div>

    <div class="chat-input-area">
      <el-input
        v-model="inputMessage"
        type="textarea"
        :rows="2"
        placeholder="描述要调整的内容，Ctrl + Enter 发送"
        class="chat-input"
        :disabled="isLoading"
        @keyup.enter.ctrl="handleSend"
      />
      <div class="input-footer">
        <span>内容将同步到当前方案</span>
        <el-button type="primary" :loading="isLoading" class="send-btn" :disabled="!inputMessage.trim() || isLoading" @click="handleSend">
          发送
          <el-icon><Right /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue'
import { ArrowRight, Delete, Download, MagicStick, Right, User, Warning } from '@element-plus/icons-vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { chatApi } from '@/utils/api'

const props = defineProps({
  title: { type: String, default: 'AI 助手' },
  headerIcon: { type: Object, default: null },
  emptyIcon: { type: String, default: '' },
  emptyTitle: { type: String, default: '开始协作' },
  emptyDesc: { type: String, default: '输入需求，我会基于当前任务提供专业建议。' },
  examples: { type: Array, default: () => [] },
  mockResponse: { type: Function, default: null },
  terminal: { type: String, default: 'teacher' },
  module: { type: String, default: '' },
  useApi: { type: Boolean, default: false }
})

const emit = defineEmits(['send', 'clear'])
const inputMessage = ref('')
const messages = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const chatHistoryRef = ref(null)
const failedQuestion = ref('')

marked.setOptions({
  gfm: true,
  breaks: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try { return hljs.highlight(code, { language: lang }).value } catch (error) { console.error(error) }
    }
    return hljs.highlightAuto(code).value
  }
})

const renderMarkdown = (content) => marked(content)
const scrollToBottom = async () => {
  await nextTick()
  if (chatHistoryRef.value) chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight
}
watch(messages, scrollToBottom, { deep: true })

const simulateAIResponse = () => new Promise((resolve) => {
  window.setTimeout(() => resolve('我已结合当前任务完成分析。\n\n1. 明确本节课的核心概念与应用边界。\n2. 通过工程案例连接理论和参数计算。\n3. 增加一项可量化的课堂评价任务。\n\n你可以继续指定要修改的环节。'), 900)
})

const handleSend = async (retryQuestion = '') => {
  const question = typeof retryQuestion === 'string' && retryQuestion ? retryQuestion : inputMessage.value.trim()
  if (!question || isLoading.value) return

  const userMessage = { role: 'user', content: question, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) }
  if (!retryQuestion) messages.value.push(userMessage)
  inputMessage.value = ''
  errorMessage.value = ''
  failedQuestion.value = ''
  isLoading.value = true
  emit('send', userMessage)

  try {
    let responseContent
    if (props.useApi) {
      const response = await chatApi.sendMessage(question, props.terminal, props.module)
      responseContent = response.content || await simulateAIResponse()
    } else if (props.mockResponse) {
      await new Promise((resolve) => window.setTimeout(resolve, 650))
      responseContent = props.mockResponse(question)
    } else responseContent = await simulateAIResponse()

    messages.value.push({ role: 'ai', content: responseContent, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) })
  } catch (error) {
    failedQuestion.value = question
    errorMessage.value = '服务暂时不可用，请稍后重试'
    console.error('AI response error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleExampleClick = (example) => { inputMessage.value = example }
const handleClear = () => { messages.value = []; errorMessage.value = ''; emit('clear') }
const handleExport = () => {
  if (!messages.value.length) { ElMessage.info('当前没有可导出的对话'); return }
  const content = messages.value.map((msg) => `${msg.role === 'user' ? '用户' : 'AI'}: ${msg.content}`).join('\n\n')
  const url = URL.createObjectURL(new Blob([content], { type: 'text/markdown' }))
  const link = document.createElement('a')
  link.href = url
  link.download = `chat-${Date.now()}.md`
  link.click()
  URL.revokeObjectURL(url)
}
const handleRetry = () => handleSend(failedQuestion.value)
</script>

<style scoped>
.chat-panel { display: flex; height: 100%; min-height: 0; flex-direction: column; overflow: hidden; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-card); }
.chat-header { display: flex; min-height: 58px; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1px solid var(--border-color); background: rgba(14, 36, 59, .78); }
.chat-title { display: flex; align-items: center; gap: 9px; }
.assistant-mark { display: grid; width: 30px; height: 30px; place-items: center; border: 1px solid rgba(73, 173, 255, .25); border-radius: 5px; color: #69c9ff; background: rgba(32, 117, 198, .14); }
.chat-title > div { display: flex; flex-direction: column; }
.chat-title strong { color: var(--text-primary); font-size: 11px; }
.chat-title span { display: flex; align-items: center; color: var(--text-muted); font-size: 8px; }
.chat-title i { width: 5px; height: 5px; margin-right: 5px; border-radius: 50%; background: #47d6ae; box-shadow: 0 0 6px currentColor; }
.chat-actions { display: flex; gap: 3px; }.chat-actions :deep(.el-button) { width: 28px; height: 28px; color: var(--text-muted); }
.chat-history { min-height: 0; flex: 1; overflow-y: auto; padding: 18px; }
.empty-state { display: flex; height: 100%; min-height: 350px; align-items: center; justify-content: center; flex-direction: column; text-align: center; }
.empty-visual { position: relative; display: grid; width: 66px; height: 66px; margin-bottom: 16px; place-items: center; border: 1px solid rgba(72, 160, 224, .12); border-radius: 50%; }
.visual-core { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid rgba(78, 189, 255, .38); border-radius: 8px; color: #83dcff; background: rgba(29, 111, 177, .15); box-shadow: 0 0 22px rgba(61, 174, 255, .12); }
.empty-visual > i { position: absolute; width: 5px; height: 5px; border-radius: 50%; background: #42d6b1; box-shadow: 0 0 8px currentColor; }
.orbit-one { top: 8px; right: 7px; }.orbit-two { bottom: 4px; left: 13px; }
.empty-title { color: var(--text-primary); font-size: 15px; font-weight: 600; }.empty-desc { max-width: 390px; margin-top: 5px; color: var(--text-muted); font-size: 10px; line-height: 1.6; }
.empty-examples { display: flex; width: 100%; max-width: 450px; flex-direction: column; gap: 6px; margin-top: 19px; }
.empty-examples button { display: grid; grid-template-columns: 24px 1fr 16px; min-height: 39px; align-items: center; gap: 8px; padding: 7px 10px; border: 1px solid var(--border-color); border-radius: 5px; color: var(--text-muted); background: rgba(12, 33, 54, .6); font: inherit; text-align: left; cursor: pointer; transition: border-color .15s ease, background .15s ease; }
.empty-examples button:hover { border-color: rgba(72, 163, 231, .45); background: rgba(24, 71, 111, .38); }
.empty-examples button span { color: #4daee7; font-size: 8px; }.empty-examples button strong { color: var(--text-secondary); font-size: 9px; font-weight: 500; }
.message-list { display: flex; flex-direction: column; gap: 18px; }
.message-item { display: flex; gap: 9px; }.message-item.is-user { flex-direction: row-reverse; }.message-avatar { display: grid; width: 28px; height: 28px; flex: 0 0 28px; place-items: center; border: 1px solid var(--border-color); border-radius: 5px; color: #75c9ef; background: rgba(22, 74, 114, .3); font-size: 12px; }
.message-content { max-width: 82%; }.message-item.is-user .message-content { text-align: right; }.message-label { margin-bottom: 4px; color: var(--text-muted); font-size: 8px; }.message-bubble { padding: 10px 12px; border: 1px solid var(--border-color); border-radius: 5px; background: rgba(17, 43, 68, .72); word-break: break-word; }.message-item.is-user .message-bubble { border-color: rgba(41, 126, 217, .35); background: rgba(31, 102, 181, .38); }.user-text { color: #e8f6ff; font-size: 10px; }.message-time { margin-top: 3px; color: var(--text-muted); font-size: 8px; }
.loading-state { display: flex; width: fit-content; align-items: center; gap: 8px; padding: 9px 11px; border: 1px solid var(--border-color); border-radius: 5px; background: var(--bg-tertiary); }.loading-mark { color: #6ecfff; }.loading-state > div { display: flex; gap: 7px; }.loading-state strong { color: var(--text-secondary); font-size: 9px; }.loading-dots { display: flex; align-items: center; gap: 3px; }.loading-dots i { width: 4px; height: 4px; border-radius: 50%; background: #57c8ff; animation: bounce 1.1s infinite; }.loading-dots i:nth-child(2) { animation-delay: .15s; }.loading-dots i:nth-child(3) { animation-delay: .3s; } @keyframes bounce { 50% { transform: translateY(-3px); opacity: .5; } }
.error-state { display: flex; align-items: center; gap: 8px; padding: 9px 11px; border: 1px solid rgba(255, 109, 89, .26); border-radius: 5px; color: #ff9d8d; background: rgba(157, 55, 44, .1); font-size: 9px; }
.chat-input-area { padding: 11px 13px; border-top: 1px solid var(--border-color); background: rgba(9, 27, 46, .8); }
.chat-input :deep(.el-textarea__inner) { min-height: 54px !important; padding: 9px 10px 3px; border: 1px solid var(--border-color); border-bottom: 0; border-radius: 5px 5px 0 0; background: var(--bg-input); box-shadow: none; font-size: 10px; resize: none; }
.input-footer { display: flex; min-height: 35px; align-items: center; justify-content: space-between; padding: 3px 4px 3px 10px; border: 1px solid var(--border-color); border-top: 0; border-radius: 0 0 5px 5px; background: var(--bg-input); }.input-footer > span { color: var(--text-muted); font-size: 8px; }.send-btn { height: 27px; border-radius: 4px !important; font-size: 9px; }
.markdown-content { color: var(--text-secondary); font-size: 10px; line-height: 1.65; text-align: left; }
</style>
