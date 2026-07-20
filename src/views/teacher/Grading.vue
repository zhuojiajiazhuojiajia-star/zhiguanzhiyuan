<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">作业批改助手</h1>
        <p class="page-desc">AI辅助批改农业水利专业作业与实验报告，自动识别答案、评估成绩、生成评语</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-value">324</span>
          <span class="stat-label">已批改作业</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">85%</span>
          <span class="stat-label">正确率</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">15</span>
          <span class="stat-label">待批改</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="upload-card">
          <template #header>
            <span class="card-title">上传作业</span>
          </template>
          <div class="upload-area">
            <el-upload
              class="upload-demo"
              drag
              :auto-upload="false"
              :on-change="handleFileChange"
            >
              <el-icon class="upload-icon"><Upload /></el-icon>
              <div class="upload-text">将作业文件拖到此处，或<em>点击上传</em></div>
              <div class="upload-hint">支持 PDF、Word、图片等格式</div>
            </el-upload>
          </div>
          <div class="file-list" v-if="uploadedFiles.length > 0">
            <div
              v-for="file in uploadedFiles"
              :key="file.uid"
              class="file-item"
            >
              <el-icon><Document /></el-icon>
              <span class="file-name">{{ file.name }}</span>
              <el-button type="text" size="small" @click="removeFile(file.uid)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
          </div>
        </el-card>

        <el-card class="settings-card">
          <template #header>
            <span class="card-title">批改设置</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="作业类型">
              <el-select v-model="settings.type" placeholder="请选择">
                <el-option label="选择题" value="choice" />
                <el-option label="填空题" value="blank" />
                <el-option label="计算题" value="calculation" />
                <el-option label="简答题" value="essay" />
                <el-option label="综合作业" value="comprehensive" />
              </el-select>
            </el-form-item>
            <el-form-item label="评分标准">
              <el-select v-model="settings.standard" placeholder="请选择">
                <el-option label="严格标准" value="strict" />
                <el-option label="中等标准" value="medium" />
                <el-option label="宽松标准" value="lenient" />
              </el-select>
            </el-form-item>
            <el-form-item label="评语风格">
              <el-select v-model="settings.commentStyle" placeholder="请选择">
                <el-option label="简洁明了" value="concise" />
                <el-option label="详细具体" value="detailed" />
                <el-option label="鼓励为主" value="encouraging" />
              </el-select>
            </el-form-item>
            <el-form-item label="自动评分">
              <el-switch v-model="settings.autoScore" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="grade-btn" @click="handleGrade">
                <el-icon><CircleCheck /></el-icon>
                开始批改
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="queue-card">
          <template #header>
            <span class="card-title">批改队列</span>
          </template>
          <div class="queue-list">
            <div
              v-for="item in gradeQueue"
              :key="item.id"
              class="queue-item"
            >
              <div class="queue-status" :class="item.status"></div>
              <div class="queue-info">
                <span class="queue-name">{{ item.name }}</span>
                <span class="queue-progress">{{ item.progress }}%</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="批改助手"
          :headerIcon="Document"
          emptyIcon="✏️"
          emptyTitle="作业批改助手"
          emptyDesc="上传作业文件，AI将自动批改并生成详细评语"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload, Document, Delete, CircleCheck } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const uploadedFiles = ref([])
const settings = ref({
  type: 'comprehensive',
  standard: 'medium',
  commentStyle: 'detailed',
  autoScore: true
})

const gradeQueue = ref([
  { id: 1, name: '张三 - 水力学作业', progress: 75, status: 'processing' },
  { id: 2, name: '李四 - 灌溉工程实验报告', progress: 40, status: 'pending' },
  { id: 3, name: '王五 - 水资源规划习题', progress: 0, status: 'pending' }
])

const examples = [
  '请帮我批改这份水力学作业',
  '如何评估学生实验报告的质量？',
  '生成一份关于计算题的详细评语模板'
]

const mockResponse = (question) => {
  return `# 作业批改结果

## 一、基本信息

**作业类型：** ${settings.value.type === 'choice' ? '选择题' : settings.value.type === 'blank' ? '填空题' : settings.value.type === 'calculation' ? '计算题' : settings.value.type === 'essay' ? '简答题' : '综合作业'}
**评分标准：** ${settings.value.standard === 'strict' ? '严格标准' : settings.value.standard === 'medium' ? '中等标准' : '宽松标准'}
**评语风格：** ${settings.value.commentStyle === 'concise' ? '简洁明了' : settings.value.commentStyle === 'detailed' ? '详细具体' : '鼓励为主'}

## 二、批改详情

### 选择题（30分）
| 题号 | 答案 | 得分 | 正确答案 |
|------|------|------|----------|
| 1 | A | 2 | A ✅ |
| 2 | B | 2 | C ❌ |
| 3 | C | 2 | C ✅ |
| 4 | D | 2 | D ✅ |
| 5 | A | 2 | B ❌ |

### 填空题（20分）
| 题号 | 答案 | 得分 |
|------|------|------|
| 1 | 渗透系数 | 4 ✅ |
| 2 | 明渠均匀流 | 4 ✅ |
| 3 | 灌溉效率 | 3 ⚠️ |

### 计算题（30分）

**第1题：渠道流量计算**
- 思路正确：✅
- 公式应用：✅
- 计算过程：✅
- 结果正确：✅
- 得分：15/15

**第2题：水泵选型计算**
- 思路正确：✅
- 公式应用：✅
- 计算过程：⚠️ 部分步骤有误
- 结果正确：❌
- 得分：10/15

### 简答题（20分）
- 回答完整：✅
- 逻辑清晰：✅
- 结合实际：✅
- 得分：18/20

## 三、综合评分

**总分：** 82/100
**等级：** B+

## 四、评语

${settings.value.commentStyle === 'concise' ? '整体表现良好，基础知识掌握扎实。建议加强计算题的练习，注意计算细节。' : settings.value.commentStyle === 'detailed' ? '本次作业整体完成度较高，基础知识掌握扎实。选择题正确率较高，但第2、5题需要注意概念的理解。填空题整体表现不错。计算题部分，第1题完成得很好，思路清晰、计算准确；第2题在计算过程中出现了一些错误，建议复习水泵扬程计算的相关知识。简答题回答全面，能够结合实际案例进行分析，值得表扬。希望继续保持，在后续学习中注重细节，提升计算准确性。' : '作业完成得很好！基础知识掌握扎实，特别是简答题部分表现出色。计算题虽然有些小失误，但整体思路正确。相信通过进一步的练习和复习，你一定能够取得更大的进步！继续加油！'}

---

如需进一步分析或调整评分，请告诉我！`
}

const handleFileChange = (file) => {
  uploadedFiles.value.push(file)
}

const removeFile = (uid) => {
  uploadedFiles.value = uploadedFiles.value.filter(f => f.uid !== uid)
}

const handleGrade = () => {
  if (uploadedFiles.value.length === 0) {
    ElMessage.warning('请先上传作业文件')
    return
  }
  ElMessage.info('正在批改作业，请在右侧对话框查看结果...')
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

.upload-card,
.settings-card,
.queue-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.upload-area {
  padding: 20px 0;
}

.upload-icon {
  font-size: 48px;
  color: var(--text-tertiary);
}

.upload-text {
  margin: 16px 0;
  font-size: var(--font-size-base);
  color: var(--text-secondary);
}

.upload-hint {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.file-list {
  margin-top: 16px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  margin-bottom: 8px;
}

.file-name {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.grade-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.queue-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.queue-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.queue-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.queue-status.processing {
  background-color: var(--warning-color);
  animation: pulse 1s infinite;
}

.queue-status.pending {
  background-color: var(--text-muted);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.queue-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.queue-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.queue-progress {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
