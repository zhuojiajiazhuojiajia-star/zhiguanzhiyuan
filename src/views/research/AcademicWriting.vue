<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">学术写作助手</h1>
        <p class="page-desc">AI辅助农业水利学术论文撰写与图表说明，支持摘要、引言、结论等各部分写作</p>
      </div>

    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="paper-card">
          <template #header>
            <span class="card-title">论文信息</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="论文标题">
              <el-input v-model="paperForm.title" placeholder="输入论文标题" />
            </el-form-item>
            <el-form-item label="期刊类型">
              <el-select v-model="paperForm.journal" placeholder="请选择">
                <el-option label="SCI期刊" value="sci" />
                <el-option label="EI期刊" value="ei" />
                <el-option label="中文核心" value="core" />
                <el-option label="普通期刊" value="general" />
              </el-select>
            </el-form-item>
            <el-form-item label="写作部分">
              <el-select v-model="paperForm.section" placeholder="请选择">
                <el-option label="摘要" value="abstract" />
                <el-option label="引言" value="introduction" />
                <el-option label="研究方法" value="method" />
                <el-option label="结果分析" value="results" />
                <el-option label="结论" value="conclusion" />
                <el-option label="全文" value="full" />
              </el-select>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input v-model="paperForm.keywords" placeholder="多个关键词用逗号分隔" />
            </el-form-item>
            <el-form-item label="研究亮点">
              <el-textarea v-model="paperForm.highlights" rows="3" placeholder="请输入研究亮点..." />
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="chart-card">
          <template #header>
            <span class="card-title">图表说明</span>
          </template>
          <div class="chart-options">
            <div class="option-item">
              <el-radio-group v-model="chartOptions.type">
                <el-radio label="图">图</el-radio>
                <el-radio label="表">表</el-radio>
              </el-radio-group>
            </div>
            <div class="option-item">
              <span class="option-label">图表类型：</span>
              <el-select v-model="chartOptions.chartType" placeholder="请选择">
                <el-option label="折线图" value="line" />
                <el-option label="柱状图" value="bar" />
                <el-option label="散点图" value="scatter" />
                <el-option label="饼图" value="pie" />
                <el-option label="表格" value="table" />
              </el-select>
            </div>
            <div class="option-item">
              <span class="option-label">内容描述：</span>
              <el-textarea v-model="chartOptions.description" rows="2" placeholder="描述图表内容..." />
            </div>
            <el-button type="primary" class="generate-chart-btn" @click="handleGenerateChart">
              <el-icon><PieChart /></el-icon>
              生成图表说明
            </el-button>
          </div>
        </el-card>

        <el-card class="template-card">
          <template #header>
            <span class="card-title">写作模板</span>
          </template>
          <div class="template-list">
            <div
              v-for="template in templates"
              :key="template.id"
              class="template-item"
              @click="handleUseTemplate(template)"
            >
              <el-icon><Document /></el-icon>
              <span class="template-name">{{ template.name }}</span>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="学术写作助手"
          :headerIcon="EditPen"
          :emptyIcon="EditPen"
          emptyTitle="学术写作助手"
          emptyDesc="输入论文信息，AI将为您撰写学术论文或生成图表说明"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PieChart, Document, EditPen } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const paperForm = ref({
  title: '',
  journal: '',
  section: '',
  keywords: '',
  highlights: ''
})

const chartOptions = ref({
  type: '图',
  chartType: '',
  description: ''
})

const templates = ref([
  { id: 1, name: 'SCI论文摘要模板' },
  { id: 2, name: '中文核心引言模板' },
  { id: 3, name: '研究方法写作模板' },
  { id: 4, name: '结果分析模板' },
  { id: 5, name: '结论写作模板' },
  { id: 6, name: '图表说明模板' }
])

const examples = [
  '帮我写一篇关于节水灌溉的论文摘要',
  '生成图表1的说明文字',
  '撰写论文的引言部分'
]

const mockResponse = (question) => {
  const sectionNames = {
    abstract: '摘要',
    introduction: '引言',
    method: '研究方法',
    results: '结果分析',
    conclusion: '结论',
    full: '全文'
  }

  const section = sectionNames[paperForm.value.section] || '综合内容'

  return `# 学术写作助手

## 一、论文信息

**论文标题：** ${paperForm.value.title || '基于智能算法的农业灌溉优化研究'}
**目标期刊：** ${paperForm.value.journal === 'sci' ? 'SCI期刊' : paperForm.value.journal === 'ei' ? 'EI期刊' : paperForm.value.journal === 'core' ? '中文核心期刊' : '普通期刊'}
**写作部分：** ${section}
**关键词：** ${paperForm.value.keywords || '节水灌溉；智能算法；水资源优化；精准农业'}

## 二、${section}

${paperForm.value.section === 'abstract' ? `### 摘要

**研究背景：** 随着全球水资源短缺问题日益严峻，农业节水灌溉技术成为研究热点。传统灌溉方式存在水资源利用率低、灌溉决策缺乏科学性等问题。

**研究方法：** 本研究提出一种基于${paperForm.value.highlights ? paperForm.value.highlights : '深度学习的智能灌溉决策模型'}。通过采集灌区土壤墒情、气象数据、作物生长状态等多源数据，构建灌溉决策数据集。利用卷积神经网络（CNN）提取数据特征，结合长短期记忆网络（LSTM）进行时序预测，最终实现精准灌溉决策。

**研究结果：** 实验结果表明，与传统灌溉方式相比，本研究提出的智能灌溉系统可提高灌溉水利用效率${paperForm.value.highlights ? '20%以上' : '15%-25%'}，减少灌溉用水量${paperForm.value.highlights ? '18%' : '10%-20%'}，同时提高作物产量${paperForm.value.highlights ? '12%' : '5%-15%'}。

**研究结论：** 本研究为农业节水灌溉提供了一种新的智能决策方法，具有重要的理论意义和应用价值。

**关键词：** ${paperForm.value.keywords || '节水灌溉；深度学习；智能决策；精准农业'}` : 
paperForm.value.section === 'introduction' ? `### 引言

**1.1 研究背景与意义**

水资源是人类生存和发展的基础，农业用水占全球总用水量的70%以上。随着人口增长和气候变化，水资源短缺问题日益严峻，节水灌溉技术成为保障农业可持续发展的关键。

**1.2 国内外研究现状**

（1）**节水灌溉技术研究**

国内外学者在节水灌溉领域开展了大量研究，包括喷灌、滴灌、微灌等技术的研发与应用。Smith等（2020）研究了滴灌系统在干旱地区的应用效果，发现滴灌可节约灌溉用水30%-50%。

（2）**智能灌溉研究**

随着物联网、人工智能技术的发展，智能灌溉成为研究热点。Zhang等（2022）基于物联网技术构建了精准灌溉系统，实现了灌溉过程的实时监测与智能控制。

**1.3 研究问题与不足**

尽管已有研究取得了一定进展，但仍存在以下问题：
1. 灌溉决策模型缺乏对多源数据的综合利用
2. 模型泛化能力不足，难以适应不同区域和作物类型
3. 缺乏对灌溉效果的长期评估

**1.4 研究内容与创新点**

本研究的主要内容包括：
1. 构建多源灌溉数据采集与融合系统
2. 开发基于深度学习的智能灌溉决策模型
3. 开展田间试验验证模型有效性

**创新点：**
1. 提出一种多特征融合的灌溉决策方法
2. 构建自适应的灌溉决策模型
3. 实现灌溉效果的动态评估与优化` :
paperForm.value.section === 'conclusion' ? `### 结论

**3.1 主要研究成果**

本研究围绕智能灌溉决策问题，开展了系统深入的研究，取得了以下主要成果：

1. **构建了多源灌溉数据集**：采集了土壤墒情、气象、作物生长等多维度数据，构建了包含10万+样本的灌溉决策数据集。

2. **提出了智能灌溉决策模型**：基于深度学习技术，提出了一种融合CNN和LSTM的灌溉决策模型，实现了精准灌溉决策。

3. **验证了模型有效性**：通过田间试验验证，模型在灌溉水利用效率、作物产量等方面均表现优异。

**3.2 研究结论**

1. 多源数据融合可有效提高灌溉决策的准确性
2. 深度学习模型在时序预测方面具有显著优势
3. 智能灌溉系统可实现水资源的高效利用

**3.3 研究不足与展望**

**不足：**
1. 模型训练数据主要来源于单一地区，泛化能力有待提高
2. 缺乏极端天气条件下的验证

**展望：**
1. 扩大数据采集范围，提高模型泛化能力
2. 研究气候变化对灌溉决策的影响
3. 开发智能灌溉决策支持系统` :
`### ${section}

根据您的需求，以下是${section}的撰写内容：

**研究背景：**

农业水利工程是保障国家粮食安全和生态安全的重要基础设施。随着社会经济的发展和气候变化的影响，农业用水面临着严峻挑战，亟需创新灌溉技术和管理模式。

**研究方法：**

本研究采用理论分析、模型模拟和田间试验相结合的方法，系统研究了智能灌溉决策的关键技术和应用模式。

**研究内容：**

1. **数据采集与分析**：构建多源数据采集系统，分析灌溉用水规律
2. **模型构建与优化**：开发智能灌溉决策模型，优化灌溉策略
3. **系统开发与验证**：构建智能灌溉决策支持系统，开展田间验证

**研究意义：**

本研究成果对于提高农业用水效率、保障粮食安全、促进农业可持续发展具有重要意义。

${paperForm.value.highlights ? `**研究亮点：**

${paperForm.value.highlights}` : ''}`}

## 三、图表说明

${chartOptions.value.description ? `### ${chartOptions.value.type}${chartOptions.value.chartType === 'line' ? '1 灌溉用水量变化趋势' : chartOptions.value.chartType === 'bar' ? '1 不同灌溉方式对比' : chartOptions.value.chartType === 'scatter' ? '1 土壤含水量与产量关系' : chartOptions.value.chartType === 'pie' ? '1 灌溉用水构成' : chartOptions.value.chartType === 'table' ? '1 灌溉效果对比' : '1 图表说明'}

**图表类型：** ${chartOptions.value.chartType === 'line' ? '折线图' : chartOptions.value.chartType === 'bar' ? '柱状图' : chartOptions.value.chartType === 'scatter' ? '散点图' : chartOptions.value.chartType === 'pie' ? '饼图' : chartOptions.value.chartType === 'table' ? '表格' : '未知'}

**内容描述：** ${chartOptions.value.description}

**图表说明：**

根据${chartOptions.value.description}，该图表展示了${chartOptions.value.chartType === 'line' ? '灌溉用水量随时间的变化趋势，可观察到季节性变化规律和年度变化趋势' : chartOptions.value.chartType === 'bar' ? '不同灌溉方式下的灌溉效果对比，包括用水量、产量、水分利用效率等指标' : chartOptions.value.chartType === 'scatter' ? '土壤含水量与作物产量之间的关系，可分析适宜的土壤水分范围' : chartOptions.value.chartType === 'pie' ? '灌溉用水的构成比例，包括渠道输水损失、田间蒸发、作物蒸腾等部分' : chartOptions.value.chartType === 'table' ? '不同处理下的灌溉效果对比数据，包括灌溉量、产量、水分利用效率等' : '图表所展示的数据内容和分析结果'}。从图中可以看出，${chartOptions.value.chartType === 'line' ? '灌溉用水量在夏季达到峰值，冬季降至最低' : chartOptions.value.chartType === 'bar' ? '滴灌方式的水分利用效率最高' : chartOptions.value.chartType === 'scatter' ? '土壤含水量在20%-25%时作物产量最高' : chartOptions.value.chartType === 'pie' ? '作物蒸腾占灌溉用水的比例最大' : chartOptions.value.chartType === 'table' ? '处理组B的综合效果最优' : '数据呈现出明显的规律'}。` : ''}

## 四、写作建议

### 语言规范

1. 使用正式、学术化的语言表达
2. 避免口语化表达和缩略语
3. 保持句子结构清晰、逻辑严谨

### 格式要求

1. 遵循目标期刊的格式要求
2. 正确使用专业术语
3. 引用格式规范统一

### 内容优化

1. 突出研究创新点
2. 确保逻辑连贯
3. 提供充分的数据支撑

---

如需调整写作内容或生成其他部分，请告诉我！`
}

const handleGenerateChart = () => {
  ElMessage.info('正在生成图表说明...')
}

const handleUseTemplate = (template) => {
  ElMessage.info(`已选择模板：${template.name}`)
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

.paper-card,
.chart-card,
.template-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.chart-options {
  padding: 10px 0;
}

.option-item {
  margin-bottom: 16px;
}

.option-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  margin-right: 10px;
}

.generate-chart-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.template-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.template-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.template-item:hover {
  background-color: var(--bg-hover);
}

.template-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
