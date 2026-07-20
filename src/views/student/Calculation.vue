<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">计算题分步讲解</h1>
        <p class="page-desc">农业水利专业计算题详解，AI逐步讲解解题思路、公式应用和计算过程</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-value">1,876</span>
          <span class="stat-label">已讲解题目</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">95%</span>
          <span class="stat-label">正确率</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">12</span>
          <span class="stat-label">题型分类</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="calc-card">
          <template #header>
            <span class="card-title">输入计算题</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="题目类型">
              <el-select v-model="calcForm.type" placeholder="请选择">
                <el-option label="渠道流量计算" value="channel" />
                <el-option label="水泵选型计算" value="pump" />
                <el-option label="作物需水量计算" value="crop" />
                <el-option label="渗流计算" value="seepage" />
                <el-option label="水资源评价" value="water" />
                <el-option label="其他计算" value="other" />
              </el-select>
            </el-form-item>
            <el-form-item label="题目描述">
              <el-textarea v-model="calcForm.description" rows="4" placeholder="请输入题目描述..." />
            </el-form-item>
            <el-form-item label="已知条件">
              <el-textarea v-model="calcForm.conditions" rows="3" placeholder="请输入已知条件，每行一个..." />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="calc-btn" @click="handleCalculate">
                <el-icon><CirclePlus /></el-icon>
                开始讲解
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="formula-card">
          <template #header>
            <span class="card-title">常用公式</span>
          </template>
          <div class="formula-list">
            <div
              v-for="formula in formulas"
              :key="formula.id"
              class="formula-item"
              @click="handleFormulaClick(formula)"
            >
              <div class="formula-name">{{ formula.name }}</div>
              <div class="formula-expression">{{ formula.expression }}</div>
            </div>
          </div>
        </el-card>

        <el-card class="example-card">
          <template #header>
            <span class="card-title">典型例题</span>
          </template>
          <div class="example-list">
            <div
              v-for="example in examplesList"
              :key="example.id"
              class="example-item"
              @click="handleExampleClick(example)"
            >
              <span class="example-icon">📝</span>
              <span class="example-title">{{ example.title }}</span>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="计算题讲解"
          :headerIcon="CirclePlus"
          emptyIcon="🔢"
          emptyTitle="计算题分步讲解"
          emptyDesc="输入题目和已知条件，AI将为您逐步讲解解题过程"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CirclePlus } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const calcForm = ref({
  type: '',
  description: '',
  conditions: ''
})

const formulas = ref([
  { id: 1, name: '明渠均匀流公式', expression: 'Q = A * C * sqrt(R * i)' },
  { id: 2, name: '渗流达西定律', expression: 'Q = K * A * (H1-H2)/L' },
  { id: 3, name: '作物需水量公式', expression: 'ET = Kc * ETo' },
  { id: 4, name: '水泵扬程公式', expression: 'H = Hs + Hd + hw' },
  { id: 5, name: '灌溉水利用系数', expression: 'η = W净 / W毛' },
  { id: 6, name: '渠道糙率公式', expression: 'n = A^(2/3) * i^(1/2) / Q' }
])

const examplesList = ref([
  { id: 1, title: '梯形渠道流量计算' },
  { id: 2, title: '离心泵选型计算' },
  { id: 3, title: '冬小麦需水量计算' },
  { id: 4, title: '土坝渗流量计算' },
  { id: 5, title: '灌区水资源平衡计算' }
])

const examples = [
  '某梯形渠道底宽2m，边坡系数1.5，水深1.2m，糙率0.02，底坡0.0005，求流量',
  '已知设计流量和扬程，如何选择合适的水泵？',
  '计算某地区玉米的灌溉定额'
]

const mockResponse = (question) => {
  const type = calcForm.value.type || '综合计算'
  
  return `# 计算题分步讲解

## 一、题目信息

**题目类型：** ${type === 'channel' ? '渠道流量计算' : type === 'pump' ? '水泵选型计算' : type === 'crop' ? '作物需水量计算' : type === 'seepage' ? '渗流计算' : type === 'water' ? '水资源评价' : '其他计算'}

**题目描述：**
${calcForm.value.description || question}

**已知条件：**
${calcForm.value.conditions || '根据问题自动提取'}

## 二、解题思路

### 第一步：明确问题目标

根据题目描述，需要求解的是：**渠道流量/水泵扬程/作物需水量/渗流量**

### 第二步：选择合适公式

根据问题类型，选择以下公式：

\`\`\`
Q = A * C * sqrt(R * i)
\`\`\`

**公式说明：**
| 参数 | 符号 | 单位 | 说明 |
|------|------|------|------|
| 流量 | Q | m³/s | 渠道通过的流量 |
| 过水面积 | A | m² | 渠道断面面积 |
| 谢才系数 | C | m^(1/2)/s | 与糙率有关 |
| 水力半径 | R | m | A/P，P为湿周 |
| 底坡 | i | - | 渠道纵向坡度 |

### 第三步：计算各参数

**1. 计算过水面积 A**

\`\`\`
A = b * h + m * h²
\`\`\`

其中：
- b：渠道底宽（m）
- h：水深（m）
- m：边坡系数

**2. 计算湿周 P**

\`\`\`
P = b + 2 * h * sqrt(1 + m²)
\`\`\`

**3. 计算水力半径 R**

\`\`\`
R = A / P
\`\`\`

**4. 计算谢才系数 C**

\`\`\`
C = (1/n) * R^(1/6)
\`\`\`

其中 n 为糙率系数。

## 三、代入计算

**假设已知条件：**
- 底宽 b = 2.0 m
- 水深 h = 1.2 m
- 边坡系数 m = 1.5
- 糙率 n = 0.02
- 底坡 i = 0.0005

**计算过程：**

\`\`\`
A = 2.0 * 1.2 + 1.5 * 1.2² = 2.4 + 2.16 = 4.56 m²

P = 2.0 + 2 * 1.2 * sqrt(1 + 1.5²) = 2.0 + 3.79 = 5.79 m

R = 4.56 / 5.79 = 0.7876 m

C = (1/0.02) * 0.7876^(1/6) = 50 * 0.962 = 48.1 m^(1/2)/s

Q = 4.56 * 48.1 * sqrt(0.7876 * 0.0005)
  = 4.56 * 48.1 * 0.0198
  = 4.42 m³/s
\`\`\`

## 四、结果分析

**计算结果：** Q = 4.42 m³/s

**结果校核：**
- 检查单位是否正确
- 检查公式应用是否正确
- 检查计算过程是否有误

**设计建议：**
- 根据计算结果选择合适的渠道断面
- 考虑安全系数
- 参考相关规范

## 五、注意事项

1. **单位统一：** 所有参数单位必须统一
2. **公式选择：** 根据实际情况选择合适的公式
3. **糙率选择：** 糙率系数对结果影响较大，需谨慎选择
4. **计算精度：** 保留足够的小数位数

---

如需进一步分析或有其他问题，请随时提问！`
}

const handleCalculate = () => {
  if (!calcForm.value.description && !calcForm.value.type) {
    ElMessage.warning('请输入题目描述或选择题目类型')
    return
  }
  ElMessage.info('正在分析题目，请在右侧对话框查看讲解...')
}

const handleFormulaClick = (formula) => {
  ElMessage.info(`已选择公式：${formula.name}`)
}

const handleExampleClick = (example) => {
  calcForm.value.type = 'other'
  calcForm.value.description = example.title
  ElMessage.info(`已选择例题：${example.title}`)
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

.calc-card,
.formula-card,
.example-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.calc-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.formula-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.formula-item {
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.formula-item:hover {
  background-color: var(--bg-hover);
}

.formula-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  margin-bottom: 4px;
}

.formula-expression {
  font-family: 'Courier New', monospace;
  font-size: var(--font-size-sm);
  color: var(--accent-color);
}

.example-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.example-item:hover {
  background-color: var(--bg-hover);
}

.example-icon {
  font-size: 18px;
}

.example-title {
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
