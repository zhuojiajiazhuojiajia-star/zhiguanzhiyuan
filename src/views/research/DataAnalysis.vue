<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">灌区数据分析助手</h1>
        <p class="page-desc">AI辅助灌区数据处理、分析与可视化，支持灌溉用水、土壤墒情、作物生长等多维度数据分析</p>
      </div>

    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="data-card">
          <template #header>
            <span class="card-title">数据选择</span>
          </template>
          <div class="data-tabs">
            <el-tabs v-model="activeDataTab">
              <el-tab-pane label="上传数据" name="upload">
                <el-upload
                  class="upload-demo"
                  drag
                  :auto-upload="false"
                  :on-change="handleFileChange"
                >
                  <el-icon class="upload-icon"><Upload /></el-icon>
                  <div class="upload-text">将数据文件拖到此处，或<em>点击上传</em></div>
                  <div class="upload-hint">支持 CSV、Excel、JSON 等格式</div>
                </el-upload>
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
              </el-tab-pane>
              <el-tab-pane label="选择数据集" name="dataset">
                <div class="dataset-list">
                  <div
                    v-for="dataset in datasets"
                    :key="dataset.id"
                    class="dataset-item"
                    :class="{ active: selectedDataset === dataset.id }"
                    @click="selectDataset(dataset)"
                  >
                    <el-icon><DataBoard /></el-icon>
                    <div class="dataset-info">
                      <span class="dataset-name">{{ dataset.name }}</span>
                      <span class="dataset-size">{{ dataset.size }}</span>
                    </div>
                    <el-icon class="dataset-arrow"><ArrowRight /></el-icon>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>

        <el-card class="analysis-card">
          <template #header>
            <span class="card-title">分析方法</span>
          </template>
          <div class="method-list">
            <div
              v-for="method in analysisMethods"
              :key="method.id"
              class="method-item"
              :class="{ active: selectedMethod === method.id }"
              @click="selectMethod(method)"
            >
              <div class="method-icon"><el-icon :size="24"><component :is="method.icon" /></el-icon></div>
              <div class="method-info">
                <span class="method-name">{{ method.name }}</span>
                <span class="method-desc">{{ method.desc }}</span>
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="params-card">
          <template #header>
            <span class="card-title">分析参数</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="analysisParams.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
            <el-form-item label="分析指标">
              <el-select v-model="analysisParams.indicators" multiple placeholder="请选择">
                <el-option label="灌溉用水量" value="water" />
                <el-option label="土壤墒情" value="soil" />
                <el-option label="作物产量" value="yield" />
                <el-option label="经济效益" value="economic" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="analyze-btn" @click="handleAnalyze">
                <el-icon><PieChart /></el-icon>
                开始分析
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="数据分析助手"
          :headerIcon="PieChart"
          :emptyIcon="DataBoard"
          emptyTitle="灌区数据分析"
          emptyDesc="上传数据或选择数据集，AI将为您进行多维度分析"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Upload, Document, Delete, DataBoard, ArrowRight, PieChart, TrendCharts, Link, Folder, MagicStick, DataAnalysis, Warning } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const activeDataTab = ref('upload')
const uploadedFiles = ref([])
const selectedDataset = ref(null)
const selectedMethod = ref(null)

const analysisParams = ref({
  dateRange: [],
  indicators: []
})

const datasets = ref([
  { id: 1, name: '河套灌区2024年灌溉数据', size: '15.2 MB' },
  { id: 2, name: '新疆滴灌系统监测数据', size: '8.7 MB' },
  { id: 3, name: '南方稻田节水试验数据', size: '12.4 MB' },
  { id: 4, name: '华北平原土壤墒情数据', size: '20.1 MB' }
])

const analysisMethods = ref([
  { id: 1, name: '趋势分析', desc: '分析数据变化趋势', icon: TrendCharts },
  { id: 2, name: '相关性分析', desc: '分析变量间相关性', icon: Link },
  { id: 3, name: '聚类分析', desc: '数据分类与聚类', icon: Folder },
  { id: 4, name: '预测模型', desc: '基于历史数据预测', icon: MagicStick },
  { id: 5, name: '对比分析', desc: '多组数据对比', icon: DataAnalysis },
  { id: 6, name: '异常检测', desc: '检测异常数据点', icon: Warning }
])

const examples = [
  '分析灌区灌溉用水量的变化趋势',
  '检测土壤墒情数据中的异常值',
  '预测未来一个月的灌溉需求'
]

const mockResponse = (question) => {
  const method = analysisMethods.value.find(m => m.id === selectedMethod.value)
  
  return `# 灌区数据分析报告

## 一、分析概览

**数据来源：** ${selectedDataset.value ? datasets.value.find(d => d.id === selectedDataset.value)?.name : '上传数据'}
**分析方法：** ${method ? method.name : '综合分析'}
**时间范围：** ${analysisParams.value.dateRange.length > 0 ? `${analysisParams.value.dateRange[0]} 至 ${analysisParams.value.dateRange[1]}` : '全部时间'}
**分析指标：** ${analysisParams.value.indicators.length > 0 ? analysisParams.value.indicators.join('、') : '全部指标'}

## 二、数据概况

### 基本统计

| 指标 | 最小值 | 最大值 | 平均值 | 标准差 |
|------|--------|--------|--------|--------|
| 灌溉用水量 | 120 m³/亩 | 450 m³/亩 | 285 m³/亩 | 45.2 |
| 土壤含水量 | 15% | 35% | 24% | 3.8 |
| 作物产量 | 450 kg/亩 | 850 kg/亩 | 680 kg/亩 | 75.5 |

### 数据质量

- **数据完整性：** 98.5%
- **异常值比例：** 1.2%
- **时间覆盖：** 完整覆盖分析周期

## 三、分析结果

### ${method?.name || '趋势分析'}

#### 1. 灌溉用水量趋势

\`\`\`
用水量变化趋势：
- 春季（3-5月）：逐步上升，4月达到峰值
- 夏季（6-8月）：维持较高水平
- 秋季（9-11月）：逐渐下降
- 冬季（12-2月）：降至最低

年度变化：
- 2020年：310 m³/亩
- 2021年：295 m³/亩（下降4.8%）
- 2022年：280 m³/亩（下降5.1%）
- 2023年：275 m³/亩（下降1.8%）
- 2024年：285 m³/亩（上升3.6%）
\`\`\`

#### 2. 土壤墒情分析

- **适宜墒情占比：** 72%
- **偏旱占比：** 18%
- **偏涝占比：** 10%

#### 3. 灌溉效率评估

\`\`\`
灌溉水利用系数：
- 渠道输水效率：85%
- 田间灌水效率：78%
- 综合利用系数：0.66
\`\`\`

## 四、可视化图表建议

### 推荐图表类型

1. **折线图：** 展示灌溉用水量随时间变化趋势
2. **柱状图：** 对比不同作物/区域的用水量
3. **散点图：** 分析土壤含水量与产量的关系
4. **热力图：** 展示灌区空间分布特征

### 图表参数

| 图表类型 | X轴 | Y轴 | 分组 |
|----------|-----|-----|------|
| 趋势图 | 时间 | 用水量 | 作物类型 |
| 对比图 | 区域 | 产量 | 灌溉方式 |

## 五、结论与建议

### 主要结论

1. 灌溉用水量呈逐年下降趋势，节水效果明显
2. 土壤墒情总体适宜，但部分区域存在偏旱问题
3. 灌溉效率有待进一步提高

### 改进建议

1. **优化灌溉制度：** 根据土壤墒情动态调整灌溉时间和水量
2. **推广节水技术：** 扩大滴灌、喷灌等节水技术应用范围
3. **加强监测：** 完善灌区监测网络，提高数据质量
4. **智能决策：** 建立基于AI的灌溉决策系统

---

如需深入分析或生成可视化图表，请告诉我！`
}

const handleFileChange = (file) => {
  uploadedFiles.value.push(file)
}

const removeFile = (uid) => {
  uploadedFiles.value = uploadedFiles.value.filter(f => f.uid !== uid)
}

const selectDataset = (dataset) => {
  selectedDataset.value = dataset.id
}

const selectMethod = (method) => {
  selectedMethod.value = method.id
}

const handleAnalyze = () => {
  ElMessage.info('正在分析数据，请在右侧对话框查看结果...')
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

.data-card,
.analysis-card,
.params-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
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

.dataset-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
}

.dataset-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
}

.dataset-item:hover {
  background-color: var(--bg-hover);
}

.dataset-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.dataset-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.dataset-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.dataset-size {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: 2px;
}

.method-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.method-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.method-item:hover {
  background-color: var(--bg-hover);
}

.method-item.active {
  background-color: var(--primary-color);
}

.method-icon {
  font-size: 24px;
}

.method-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.method-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.method-desc {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: 2px;
}

.analyze-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
}

:deep(.el-tabs__content) {
  padding: 10px 0;
}

:deep(.el-tab-pane) {
  padding: 0;
}
</style>
