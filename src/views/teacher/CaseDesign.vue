<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">案例教学设计</h1>
        <p class="page-desc">基于真实工程案例，设计沉浸式教学方案，提升学生实践能力和工程思维</p>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-value">86</span>
          <span class="stat-label">案例库</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">23</span>
          <span class="stat-label">教学方案</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">5</span>
          <span class="stat-label">最新案例</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="case-card">
          <template #header>
            <span class="card-title">案例选择</span>
          </template>
          <div class="case-tabs">
            <el-tabs v-model="activeTab">
              <el-tab-pane label="灌溉工程" name="irrigation">
                <div class="case-list">
                  <div
                    v-for="caseItem in irrigationCases"
                    :key="caseItem.id"
                    class="case-item"
                    :class="{ active: selectedCase === caseItem.id }"
                    @click="selectCase(caseItem)"
                  >
                    <div class="case-icon">💧</div>
                    <div class="case-info">
                      <span class="case-title">{{ caseItem.title }}</span>
                      <span class="case-desc">{{ caseItem.desc }}</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="排水工程" name="drainage">
                <div class="case-list">
                  <div
                    v-for="caseItem in drainageCases"
                    :key="caseItem.id"
                    class="case-item"
                    :class="{ active: selectedCase === caseItem.id }"
                    @click="selectCase(caseItem)"
                  >
                    <div class="case-icon">🌊</div>
                    <div class="case-info">
                      <span class="case-title">{{ caseItem.title }}</span>
                      <span class="case-desc">{{ caseItem.desc }}</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="水资源管理" name="water">
                <div class="case-list">
                  <div
                    v-for="caseItem in waterCases"
                    :key="caseItem.id"
                    class="case-item"
                    :class="{ active: selectedCase === caseItem.id }"
                    @click="selectCase(caseItem)"
                  >
                    <div class="case-icon">🏞️</div>
                    <div class="case-info">
                      <span class="case-title">{{ caseItem.title }}</span>
                      <span class="case-desc">{{ caseItem.desc }}</span>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>

        <el-card class="design-card" v-if="selectedCaseData">
          <template #header>
            <span class="card-title">设计参数</span>
          </template>
          <el-form label-width="100px">
            <el-form-item label="目标学生">
              <el-select v-model="designForm.targetStudents" placeholder="请选择">
                <el-option label="本科生" value="undergraduate" />
                <el-option label="研究生" value="graduate" />
                <el-option label="高职生" value="vocational" />
              </el-select>
            </el-form-item>
            <el-form-item label="教学时长">
              <el-input-number v-model="designForm.duration" :min="1" :max="8" />
              <span class="unit">课时</span>
            </el-form-item>
            <el-form-item label="教学方法">
              <el-select v-model="designForm.methods" multiple placeholder="请选择">
                <el-option label="案例分析法" value="case" />
                <el-option label="小组讨论" value="discussion" />
                <el-option label="角色扮演" value="roleplay" />
                <el-option label="实地考察" value="field" />
                <el-option label="模拟仿真" value="simulation" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="design-btn" @click="handleDesign">
                <el-icon><InfoFilled /></el-icon>
                生成教学方案
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="案例教学助手"
          :headerIcon="Briefcase"
          emptyIcon="📋"
          emptyTitle="案例教学设计"
          emptyDesc="选择一个案例，AI将为您设计完整的教学方案"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { InfoFilled, Briefcase } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const activeTab = ref('irrigation')
const selectedCase = ref(null)

const designForm = ref({
  targetStudents: 'undergraduate',
  duration: 4,
  methods: ['case', 'discussion']
})

const irrigationCases = ref([
  { id: 1, title: '河套灌区节水改造工程', desc: '大型灌区节水改造典型案例' },
  { id: 2, title: '新疆滴灌系统设计', desc: '干旱地区高效节水灌溉实践' },
  { id: 3, title: '南方稻田节水灌溉模式', desc: '水稻节水技术集成应用' }
])

const drainageCases = ref([
  { id: 4, title: '华北平原盐碱地改良', desc: '排水工程改良盐碱地案例' },
  { id: 5, title: '长江中下游排涝工程', desc: '平原湖区排涝系统设计' },
  { id: 6, title: '滨海地区咸潮入侵治理', desc: '排水与防咸综合治理' }
])

const waterCases = ref([
  { id: 7, title: '南水北调中线工程', desc: '跨流域调水水资源配置' },
  { id: 8, title: '太湖流域水资源管理', desc: '流域水资源综合管理' },
  { id: 9, title: '西北干旱区水资源优化', desc: '缺水地区水资源合理利用' }
])

const selectedCaseData = computed(() => {
  const allCases = [...irrigationCases.value, ...drainageCases.value, ...waterCases.value]
  return allCases.find(c => c.id === selectedCase.value)
})

const examples = [
  '设计一个关于河套灌区节水改造的教学案例',
  '如何利用案例教学法提高学生的工程实践能力？',
  '推荐一些适合农业水利专业的教学案例'
]

const mockResponse = (question) => {
  const caseTitle = selectedCaseData.value ? selectedCaseData.value.title : '农业水利工程案例'
  
  return `# 案例教学方案设计

## 一、案例信息

**案例名称：** ${caseTitle}
**适用对象：** ${designForm.value.targetStudents === 'undergraduate' ? '本科生' : designForm.value.targetStudents === 'graduate' ? '研究生' : '高职生'}
**教学时长：** ${designForm.value.duration}课时

## 二、教学目标

### 知识目标
1. 理解${caseTitle.split(' ')[0]}的基本原理和设计方法
2. 掌握相关工程技术标准和规范
3. 了解国内外先进的${caseTitle.split(' ')[0]}技术

### 能力目标
1. 能够运用所学知识分析实际工程问题
2. 培养工程设计和优化能力
3. 提高团队协作和沟通能力

### 素质目标
1. 培养工程伦理意识
2. 增强创新思维能力
3. 树立可持续发展理念

## 三、教学内容安排

### 第1课时：案例导入与背景介绍
- 展示工程现场视频和图片
- 介绍项目背景和建设意义
- 提出思考问题，引发学生兴趣

### 第2课时：技术原理讲解
- 讲解核心技术原理
- 分析关键设计参数
- 结合理论知识进行讲解

### 第3课时：案例分析与讨论
${designForm.value.methods.includes('discussion') ? '- 分组讨论案例中的关键问题\n- 引导学生分析解决方案\n- 组织小组汇报和交流' : '- 深入分析案例中的技术要点\n- 讨论工程设计中的决策因素\n- 分析可能的改进方案'}

### 第4课时：方案设计与总结
- 学生分组完成方案设计
- 展示设计成果
- 教师点评和总结

## 四、教学方法

${designForm.value.methods.map(m => 
  m === 'case' ? '- 案例分析法：通过真实案例理解理论知识' :
  m === 'discussion' ? '- 小组讨论法：促进学生主动思考' :
  m === 'roleplay' ? '- 角色扮演法：体验不同角色视角' :
  m === 'field' ? '- 实地考察法：亲身体验工程现场' :
  '- 模拟仿真法：利用软件进行模拟分析'
).join('\n')}

## 五、教学资源

- **视频资料：** 工程建设纪录片、现场施工视频
- **图片资料：** 工程设计图纸、现场照片
- **文献资料：** 相关论文、技术规范、研究报告
- **软件工具：** 水利工程设计软件、仿真模拟软件

## 六、考核方式

| 考核项目 | 占比 | 说明 |
|----------|------|------|
| 课堂参与 | 30% | 讨论发言、小组贡献 |
| 方案设计 | 40% | 设计合理性、创新性 |
| 总结报告 | 30% | 分析深度、表达能力 |

## 七、教学注意事项

1. 引导学生从工程实际出发思考问题
2. 注重理论与实践的结合
3. 鼓励学生提出不同见解
4. 关注学生的学习进度和理解程度

---

如需调整教学方案或获取更多案例资源，请告诉我！`
}

const selectCase = (caseItem) => {
  selectedCase.value = caseItem.id
}

const handleDesign = () => {
  if (!selectedCase.value) {
    ElMessage.warning('请先选择一个案例')
    return
  }
  ElMessage.info('正在生成教学方案，请在右侧对话框查看结果...')
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

.case-card,
.design-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.case-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 10px;
}

.case-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 2px solid transparent;
}

.case-item:hover {
  background-color: var(--bg-hover);
}

.case-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.case-icon {
  font-size: 28px;
}

.case-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.case-title {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 500;
}

.case-desc {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: 2px;
}

.unit {
  margin-left: 8px;
  color: var(--text-tertiary);
}

.design-btn {
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
