<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">文献综述助手</h1>
        <p class="page-desc">AI辅助农业水利领域文献检索、阅读和综述撰写，提高科研效率</p>
      </div>

    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="search-card">
          <template #header>
            <span class="card-title">文献检索</span>
          </template>
          <el-form label-width="80px">
            <el-form-item label="关键词">
              <el-input v-model="searchForm.keywords" placeholder="请输入关键词" />
            </el-form-item>
            <el-form-item label="作者">
              <el-input v-model="searchForm.author" placeholder="请输入作者" />
            </el-form-item>
            <el-form-item label="年份范围">
              <el-date-picker
                v-model="searchForm.yearRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始年份"
                end-placeholder="结束年份"
                format="yyyy"
                value-format="yyyy"
              />
            </el-form-item>
            <el-form-item label="期刊来源">
              <el-select v-model="searchForm.journal" placeholder="请选择">
                <el-option label="水利学报" value="shui-li-xue-bao" />
                <el-option label="农业工程学报" value="nong-ye-gong-cheng" />
                <el-option label="水科学进展" value="shui-ke-xue-jin-zhan" />
                <el-option label="灌溉排水学报" value="guan-gai-pai-shui" />
                <el-option label="水土保持学报" value="shui-tu-bao-chi" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="search-btn" @click="handleSearch">
                <el-icon><Search /></el-icon>
                检索文献
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="filter-card">
          <template #header>
            <span class="card-title">筛选条件</span>
          </template>
          <div class="filter-list">
            <div class="filter-item">
              <span class="filter-label">研究方向</span>
              <div class="filter-tags">
                <span
                  v-for="tag in directionTags"
                  :key="tag"
                  class="filter-tag"
                  :class="{ active: selectedDirections.includes(tag) }"
                  @click="toggleDirection(tag)"
                >{{ tag }}</span>
              </div>
            </div>
            <div class="filter-item">
              <span class="filter-label">文献类型</span>
              <div class="filter-tags">
                <span
                  v-for="tag in typeTags"
                  :key="tag"
                  class="filter-tag"
                  :class="{ active: selectedTypes.includes(tag) }"
                  @click="toggleType(tag)"
                >{{ tag }}</span>
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="result-card">
          <template #header>
            <span class="card-title">检索结果</span>
            <span class="result-count">{{ searchResults.length }}篇</span>
          </template>
          <div class="result-list">
            <div
              v-for="item in searchResults"
              :key="item.id"
              class="result-item"
              @click="handleSelectPaper(item)"
            >
              <div class="paper-info">
                <span class="paper-title">{{ item.title }}</span>
                <span class="paper-authors">{{ item.authors }}</span>
                <span class="paper-source">{{ item.source }} · {{ item.year }}</span>
              </div>
              <el-icon class="result-arrow"><ArrowRight /></el-icon>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="文献综述助手"
          :headerIcon="Search"
          :emptyIcon="Reading"
          emptyTitle="文献综述助手"
          emptyDesc="输入研究主题，AI将为您检索相关文献并生成综述"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Search, ArrowRight, Reading } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const searchForm = ref({
  keywords: '',
  author: '',
  yearRange: [],
  journal: ''
})

const selectedDirections = ref(['节水灌溉'])
const selectedTypes = ref(['期刊论文'])

const directionTags = ['节水灌溉', '水资源管理', '水力学', '生态水利', '智慧水利', '农田排水']
const typeTags = ['期刊论文', '学位论文', '会议论文', '专利', '标准']

const searchResults = ref([
  { id: 1, title: '基于物联网的精准灌溉系统设计与实现', authors: '张三, 李四, 王五', source: '农业工程学报', year: '2024' },
  { id: 2, title: '干旱区节水灌溉技术发展趋势研究', authors: '赵六, 孙七', source: '灌溉排水学报', year: '2024' },
  { id: 3, title: '基于深度学习的作物需水量预测模型', authors: '周八, 吴九', source: '水科学进展', year: '2023' },
  { id: 4, title: '灌区水资源优化配置模型研究', authors: '郑十', source: '水利学报', year: '2023' },
  { id: 5, title: '智慧灌溉系统关键技术研究', authors: '钱十一, 刘十二', source: '农业工程学报', year: '2023' }
])

const examples = [
  '生成关于节水灌溉技术的文献综述',
  '检索近五年关于灌区水资源管理的文献',
  '帮我总结智慧水利领域的研究进展'
]

const mockResponse = (question) => {
  return `# 文献综述

## 一、研究背景

农业水利工程是保障国家粮食安全和水资源可持续利用的重要领域。随着人口增长和气候变化，水资源短缺问题日益突出，推动了节水灌溉、水资源管理等方向的研究发展。

## 二、文献检索结果

根据您的检索条件，共找到 **${searchResults.value.length}** 篇相关文献。

### 核心文献列表

| 序号 | 文献标题 | 作者 | 来源 | 年份 |
|------|----------|------|------|------|
| 1 | 基于物联网的精准灌溉系统设计与实现 | 张三等 | 农业工程学报 | 2024 |
| 2 | 干旱区节水灌溉技术发展趋势研究 | 赵六等 | 灌溉排水学报 | 2024 |
| 3 | 基于深度学习的作物需水量预测模型 | 周八等 | 水科学进展 | 2023 |
| 4 | 灌区水资源优化配置模型研究 | 郑十 | 水利学报 | 2023 |
| 5 | 智慧灌溉系统关键技术研究 | 钱十一等 | 农业工程学报 | 2023 |

## 三、研究现状分析

### 1. 节水灌溉技术
近年来，节水灌溉技术得到快速发展，主要包括：
- **滴灌技术：** 精准供水，节水效果显著
- **喷灌技术：** 均匀度高，适应性强
- **微灌技术：** 结合了滴灌和喷灌的优点

### 2. 水资源管理
水资源优化配置和高效利用成为研究热点：
- 多目标优化模型
- 水资源评价方法
- 智能调度系统

### 3. 智慧水利
物联网、大数据、人工智能技术在水利领域的应用：
- 智能监测系统
- 预测预警模型
- 自动化控制

## 四、研究趋势

1. **智能化：** AI技术深度融合
2. **精准化：** 精准灌溉、精准施肥
3. **可持续：** 绿色发展理念
4. **数字化：** 数字孪生技术应用

## 五、结论

当前农业水利领域研究呈现多学科交叉融合的趋势，智能化、精准化、可持续是未来发展方向。建议关注以下方向：
- 基于AI的智能灌溉决策
- 水资源高效利用技术
- 生态水利与可持续发展

如需深入分析某个方向，请告诉我！`
}

const toggleDirection = (tag) => {
  const index = selectedDirections.value.indexOf(tag)
  if (index > -1) {
    selectedDirections.value.splice(index, 1)
  } else {
    selectedDirections.value.push(tag)
  }
}

const toggleType = (tag) => {
  const index = selectedTypes.value.indexOf(tag)
  if (index > -1) {
    selectedTypes.value.splice(index, 1)
  } else {
    selectedTypes.value.push(tag)
  }
}

const handleSearch = () => {
  ElMessage.info('正在检索文献...')
}

const handleSelectPaper = (item) => {
  ElMessage.info(`已选择：${item.title}`)
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
  width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex-shrink: 0;
}

.search-card,
.filter-card,
.result-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.search-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  padding: 6px 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-tag:hover {
  background-color: var(--bg-hover);
}

.filter-tag.active {
  background-color: var(--primary-color);
  color: white;
}

.result-count {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.result-item:hover {
  background-color: var(--bg-hover);
}

.paper-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.paper-title {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.paper-authors {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-bottom: 2px;
}

.paper-source {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>