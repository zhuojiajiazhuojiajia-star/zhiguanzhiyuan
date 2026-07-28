<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">专业问答导师</h1>
        <p class="page-desc">农业水利专业知识问答，AI导师为您解答灌溉排水、水资源管理、水力学等专业问题</p>
      </div>

    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="category-card">
          <template #header>
            <span class="card-title">知识分类</span>
          </template>
          <div class="category-list">
            <div
              v-for="cat in categories"
              :key="cat.id"
              class="category-item"
              :class="{ active: selectedCategory === cat.id }"
              @click="selectCategory(cat)"
            >
              <el-icon><component :is="cat.icon" /></el-icon>
              <span>{{ cat.name }}</span>
              <span class="cat-count">{{ cat.count }}</span>
            </div>
          </div>
        </el-card>

        <el-card class="hot-card">
          <template #header>
            <span class="card-title">热门问题</span>
          </template>
          <div class="hot-list">
            <div
              v-for="(item, index) in hotQuestions"
              :key="index"
              class="hot-item"
              @click="handleHotClick(item.question)"
            >
              <span class="hot-rank" :class="{ top: index < 3 }">{{ index + 1 }}</span>
              <span class="hot-text">{{ item.question }}</span>
            </div>
          </div>
        </el-card>

        <el-card class="history-card">
          <template #header>
            <span class="card-title">我的提问</span>
          </template>
          <div class="history-list">
            <div
              v-for="item in myQuestions"
              :key="item.id"
              class="history-item"
              @click="handleHistoryClick(item.content)"
            >
              <span class="history-text">{{ item.content }}</span>
              <span class="history-time">{{ item.time }}</span>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="专业问答导师"
          :headerIcon="HelpFilled"
          :emptyIcon="GraduationIcon"
          emptyTitle="农业水利专业问答"
          emptyDesc="提出您的专业问题，AI导师将为您提供详细解答"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { HelpFilled, Watermelon, WindPower, Place, TrendCharts, Sunny, Cloudy } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const GraduationIcon = {
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M22 10v6M2 10l10-5 10 5-10 5z' }),
      h('path', { d: 'M6 12v5c3 3 9 3 12 0v-5' })
    ])
  }
}

const selectedCategory = ref('irrigation')

const categories = ref([
  { id: 'irrigation', name: '灌溉工程', count: '1,234', icon: Watermelon },
  { id: 'drainage', name: '排水工程', count: '856', icon: WindPower },
  { id: 'hydraulics', name: '水力学', count: '2,109', icon: TrendCharts },
  { id: 'water', name: '水资源', count: '987', icon: Cloudy },
  { id: 'soil', name: '土壤水', count: '654', icon: Place },
  { id: 'climate', name: '农田气候', count: '321', icon: Sunny }
])

const hotQuestions = ref([
  { question: '什么是节水灌溉？有哪些主要技术？' },
  { question: '如何计算渠道的设计流量？' },
  { question: '渗流和径流的区别是什么？' },
  { question: '水泵选型的基本原则是什么？' },
  { question: '灌区规划需要考虑哪些因素？' },
  { question: '土壤含水量如何测定？' },
  { question: '滴灌系统的组成和工作原理？' },
  { question: '如何进行水资源评价？' }
])

const myQuestions = ref([
  { id: 1, content: '明渠均匀流的水力计算公式', time: '今天 10:30' },
  { id: 2, content: '作物需水量计算方法', time: '昨天 15:20' },
  { id: 3, content: '灌溉渠道断面设计步骤', time: '本周二 09:15' }
])

const examples = [
  '什么是灌溉水利用系数？如何提高？',
  '水力学中雷诺数的物理意义是什么？',
  '请解释土壤水分特征曲线'
]

const mockResponse = (question) => {
  const responses = {
    '节水': `# 节水灌溉技术详解

## 一、概念定义

**节水灌溉**是指在灌溉过程中，通过各种技术手段减少水资源浪费，提高灌溉水利用效率的灌溉方式。

## 二、主要技术类型

### 1. 喷灌技术
- **原理：** 利用水泵将水加压，通过喷头喷洒到作物上
- **特点：** 均匀度高、适应性强
- **适用：** 大田作物、园林绿地

### 2. 滴灌技术
- **原理：** 通过滴头将水缓慢滴入作物根部土壤
- **特点：** 节水效果最好、精准灌溉
- **适用：** 蔬菜、果树、温室作物

### 3. 微灌技术
- **微喷灌：** 介于喷灌和滴灌之间
- **涌泉灌：** 适合果树等高大作物

### 4. 低压管道输水
- 减少渠道渗漏损失
- 提高输水效率

## 三、节水效果对比

| 灌溉方式 | 节水率 | 特点 |
|----------|--------|------|
| 地面灌溉 | 基础 | 传统方式，浪费较大 |
| 喷灌 | 30-50% | 均匀度高 |
| 滴灌 | 50-70% | 节水效果最佳 |

## 四、发展趋势

1. 智能化：结合传感器和物联网
2. 精准化：根据作物需求精确供水
3. 生态化：考虑生态环境影响`,

    '渠道': `# 渠道设计流量计算

## 一、计算公式

\`\`\`
Q = q_m * A / 1000
\`\`\`

**参数说明：**
- Q：渠道设计流量（m³/s）
- q_m：灌水模数（m³/s/hm²）
- A：灌溉面积（hm²）

## 二、计算步骤

### 第一步：确定灌溉面积
根据灌区规划，确定各级渠道控制的灌溉面积。

### 第二步：确定灌水模数
\`\`\`
q_m = m * W / (T * 24 * 3600)
\`\`\`

其中：
- m：灌溉制度中的灌水定额（m³/hm²）
- W：灌溉面积（hm²）
- T：灌水延续时间（天）

### 第三步：计算设计流量
考虑输水损失和同时灌水系数。

## 三、注意事项

1. **单位统一：** 确保所有参数单位一致
2. **损失系数：** 考虑渠道渗漏损失
3. **安全系数：** 乘以1.1~1.3的安全系数
4. **校核：** 用均匀流公式校核渠道断面

## 四、示例计算

**已知条件：**
- 灌溉面积：1000 hm²
- 灌水模数：0.002 m³/s/hm²

**计算：**
\`\`\`
Q = 0.002 * 1000 / 1000 = 2.0 m³/s
\`\`\``
  }

  const keywords = Object.keys(responses)
  for (const keyword of keywords) {
    if (question.includes(keyword)) {
      return responses[keyword]
    }
  }

  return `# 专业问题解答

感谢您的提问！关于"${question}"，我为您解答如下：

## 一、核心概念

农业水利工程是研究农田水利、灌溉排水、水资源利用与管理等方面的工程技术学科。

## 二、关键知识点

### 1. 基本原理
根据您的问题，涉及的核心原理包括：
- 水力学原理：水流运动规律
- 土壤水动力学：水分在土壤中的运动
- 作物需水规律：作物生长对水分的需求

### 2. 计算公式

\`\`\`
Q = K * A * (H1 - H2) / L
\`\`\`

**参数说明：**
- Q：流量/渗流量
- K：系数
- A：面积
- H1-H2：水头差
- L：长度

### 3. 应用场景
在实际工程中的应用包括：
- 灌溉系统设计
- 排水工程规划
- 水资源优化配置

## 三、学习建议

1. **理论学习：** 系统学习水力学、土壤学等基础课程
2. **实践应用：** 通过课程设计、实习加深理解
3. **案例分析：** 结合实际工程案例学习

## 四、拓展阅读

推荐参考书籍：
- 《农业水利工程》
- 《水力学》
- 《灌溉排水工程学》

如需更详细的解答，请提供更多具体信息！`
}

const selectCategory = (cat) => {
  selectedCategory.value = cat.id
}

const handleHotClick = (question) => {
  ElMessage.info(`正在查询：${question}`)
}

const handleHistoryClick = (content) => {
  ElMessage.info(`正在加载历史记录...`)
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
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  flex-shrink: 0;
}

.category-card,
.hot-card,
.history-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-item:hover {
  background-color: var(--bg-hover);
}

.category-item.active {
  background-color: var(--primary-color);
}

.cat-count {
  margin-left: auto;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.hot-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.hot-item:hover {
  background-color: var(--bg-hover);
}

.hot-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: 600;
  color: var(--text-tertiary);
}

.hot-rank.top {
  background-color: var(--warning-color);
  color: white;
}

.hot-text {
  flex: 1;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.history-item:hover {
  background-color: var(--bg-hover);
}

.history-text {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  display: block;
  margin-bottom: 4px;
}

.history-time {
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
