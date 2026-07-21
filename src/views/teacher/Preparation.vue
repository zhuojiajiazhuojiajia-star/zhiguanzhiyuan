<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">智能备课助手</h1>
        <p class="page-desc">基于AI技术，为农业水利专业教师提供智能备课支持，包括课程设计、教案生成、教学资源推荐等功能</p>
      </div>

    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="input-card">
          <template #header>
            <span class="card-title">备课参数</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="课程名称">
              <el-input v-model="form.courseName" placeholder="请输入课程名称" />
            </el-form-item>
            <el-form-item label="授课章节">
              <el-input v-model="form.chapter" placeholder="请输入授课章节" />
            </el-form-item>
            <el-form-item label="教学目标">
              <el-select v-model="form.objectives" multiple placeholder="请选择教学目标">
                <el-option label="知识传授" value="knowledge" />
                <el-option label="能力培养" value="skill" />
                <el-option label="素质提升" value="quality" />
                <el-option label="创新思维" value="innovation" />
              </el-select>
            </el-form-item>
            <el-form-item label="授课时长">
              <el-select v-model="form.duration" placeholder="请选择授课时长">
                <el-option label="1课时 (45分钟)" value="1" />
                <el-option label="2课时 (90分钟)" value="2" />
                <el-option label="3课时 (135分钟)" value="3" />
                <el-option label="4课时 (180分钟)" value="4" />
              </el-select>
            </el-form-item>
            <el-form-item label="教学重点">
              <el-textarea v-model="form.keyPoints" rows="3" placeholder="请输入教学重点内容..." />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="generate-btn" @click="handleGenerate">
                <el-icon><MagicStick /></el-icon>
                生成教案
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="history-card">
          <template #header>
            <span class="card-title">最近生成</span>
          </template>
          <div class="history-list">
            <div
              v-for="item in recentHistory"
              :key="item.id"
              class="history-item"
              @click="handleLoadHistory(item)"
            >
              <div class="history-icon">📄</div>
              <div class="history-info">
                <span class="history-title">{{ item.title }}</span>
                <span class="history-time">{{ item.time }}</span>
              </div>
              <el-icon class="history-arrow"><ArrowRight /></el-icon>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="备课助手"
          :headerIcon="Reading"
          emptyIcon="📚"
          emptyTitle="智能备课助手"
          emptyDesc="输入课程信息，AI将为您生成完整的教案设计方案"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MagicStick, ArrowRight, Reading } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const form = ref({
  courseName: '',
  chapter: '',
  objectives: [],
  duration: '',
  keyPoints: ''
})

const recentHistory = ref([
  { id: 1, title: '农田水利学 - 灌溉渠道设计', time: '今天 09:30' },
  { id: 2, title: '水资源规划 - 水资源评价方法', time: '昨天 14:20' },
  { id: 3, title: '水力学 - 明渠恒定均匀流', time: '昨天 10:15' },
  { id: 4, title: '节水灌溉技术 - 滴灌系统设计', time: '本周三 16:45' }
])

const examples = [
  '帮我设计农田水利学第六章灌溉渠道设计的教案',
  '生成一份关于水资源规划的教学方案',
  '如何设计节水灌溉技术的实践教学环节？'
]

const mockResponse = (question) => {
  return `# 教案设计方案

## 一、课程信息

**课程名称：** ${form.value.courseName || '农业水利工程相关课程'}
**授课章节：** ${form.value.chapter || '根据问题自动识别'}
**授课时长：** ${form.value.duration ? form.value.duration + '课时' : '标准课时'}
**教学目标：** ${form.value.objectives.length > 0 ? form.value.objectives.join('、') : '知识传授与能力培养'}

## 二、教学重点

${form.value.keyPoints || '根据课程内容确定核心知识点'}

## 三、教学内容安排

### 1. 导入环节（10分钟）
- 通过案例引入，激发学生兴趣
- 复习上节内容，建立知识衔接

### 2. 核心讲解（60分钟）
- 讲解基本概念和原理
- 结合实际工程案例分析
- 演示关键公式推导过程

### 3. 课堂互动（20分钟）
- 分组讨论
- 提问答疑
- 案例分析

### 4. 总结布置（10分钟）
- 总结重点内容
- 布置课后作业

## 四、教学方法

- 讲授法：系统讲解理论知识
- 案例法：结合实际工程案例
- 讨论法：促进学生思考
- 演示法：展示计算过程

## 五、教学资源

- 教材：《农业水利工程》相关章节
- 课件：PPT演示文稿
- 视频：工程现场视频资料
- 习题：配套练习题

## 六、课后作业

1. 完成教材习题
2. 查阅相关文献
3. 思考拓展问题

---

如需调整教案内容，请告诉我具体需求！`
}

const handleGenerate = () => {
  ElMessage.info('正在生成教案，请在右侧对话框查看结果...')
}

const handleLoadHistory = (item) => {
  ElMessage.info(`正在加载：${item.title}`)
}
</script>

<style scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.header-info {
  flex: 1;
}

.page-title {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.page-desc {
  font-size: var(--font-size-base);
  color: var(--text-tertiary);
  max-width: 600px;
}

.header-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

.stat-value {
  font-size: var(--font-size-xxl);
  font-weight: 600;
  color: var(--accent-color);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-top: 4px;
}

.page-body {
  flex: 1;
  display: flex;
  gap: 20px;
  overflow: hidden;
}

.left-panel {
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex-shrink: 0;
}

.input-card,
.history-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.generate-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.history-item:hover {
  background-color: var(--bg-hover);
}

.history-icon {
  font-size: 24px;
}

.history-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-title {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.history-time {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  margin-top: 2px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
