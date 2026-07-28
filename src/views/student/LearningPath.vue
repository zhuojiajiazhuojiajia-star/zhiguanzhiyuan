<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-info">
        <h1 class="page-title">个性化学习路径规划</h1>
        <p class="page-desc">基于您的学习情况和目标，AI为您量身定制农业水利专业学习路径</p>
      </div>

    </div>

    <div class="page-body">
      <div class="left-panel">
        <el-card class="profile-card">
          <template #header>
            <span class="card-title">学习档案</span>
          </template>
          <div class="profile-info">
            <div class="profile-avatar">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div class="profile-details">
              <span class="profile-name">学生用户</span>
              <span class="profile-major">农业水利工程专业</span>
              <span class="profile-level">本科三年级</span>
            </div>
          </div>
          <div class="progress-section">
            <div class="progress-item">
              <span class="progress-label">已修学分</span>
              <span class="progress-value">85/160</span>
              <el-progress :percentage="53" :stroke-width="8" />
            </div>
            <div class="progress-item">
              <span class="progress-label">GPA</span>
              <span class="progress-value">3.6/4.0</span>
              <el-progress :percentage="90" :stroke-width="8" color="#4CAF50" />
            </div>
            <div class="progress-item">
              <span class="progress-label">学习时长</span>
              <span class="progress-value">420小时</span>
              <el-progress :percentage="60" :stroke-width="8" color="#FF9800" />
            </div>
          </div>
        </el-card>

        <el-card class="goal-card">
          <template #header>
            <span class="card-title">学习目标</span>
          </template>
          <el-form label-width="80px">
            <el-form-item label="目标方向">
              <el-select v-model="goal.direction" placeholder="请选择">
                <el-option label="学术研究" value="research" />
                <el-option label="工程实践" value="engineering" />
                <el-option label="公务员" value="civil" />
                <el-option label="继续深造" value="graduate" />
              </el-select>
            </el-form-item>
            <el-form-item label="目标院校">
              <el-input v-model="goal.school" placeholder="如：清华大学" />
            </el-form-item>
            <el-form-item label="时间规划">
              <el-select v-model="goal.timeframe" placeholder="请选择">
                <el-option label="1年内" value="1year" />
                <el-option label="2年内" value="2year" />
                <el-option label="3年内" value="3year" />
              </el-select>
            </el-form-item>
            <el-form-item label="兴趣领域">
              <el-select v-model="goal.interests" multiple placeholder="请选择">
                <el-option label="节水灌溉" value="irrigation" />
                <el-option label="水资源管理" value="water" />
                <el-option label="水力学" value="hydraulics" />
                <el-option label="生态水利" value="ecology" />
                <el-option label="智慧水利" value="smart" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="plan-btn" @click="handleGeneratePlan">
                <el-icon><Medal /></el-icon>
                生成学习路径
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>

        <el-card class="recommend-card">
          <template #header>
            <span class="card-title">推荐课程</span>
          </template>
          <div class="recommend-list">
            <div
              v-for="course in recommendedCourses"
              :key="course.id"
              class="recommend-item"
            >
              <div class="course-tag" :style="{ backgroundColor: course.color }">{{ course.tag }}</div>
              <div class="course-info">
                <span class="course-name">{{ course.name }}</span>
                <span class="course-hours">{{ course.hours }}课时</span>
              </div>
              <el-button type="primary" size="small">学习</el-button>
            </div>
          </div>
        </el-card>
      </div>

      <div class="right-panel">
        <ChatPanel
          title="学习路径助手"
          :headerIcon="Medal"
          :emptyIcon="TargetIcon"
          emptyTitle="个性化学习路径"
          emptyDesc="设置您的学习目标，AI将为您定制专属学习路径"
          :examples="examples"
          :mockResponse="mockResponse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { Medal } from '@element-plus/icons-vue'
import ChatPanel from '@/components/chat/ChatPanel.vue'

const TargetIcon = {
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
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('circle', { cx: '12', cy: '12', r: '6' }),
      h('circle', { cx: '12', cy: '12', r: '2' })
    ])
  }
}

const goal = ref({
  direction: '',
  school: '',
  timeframe: '',
  interests: []
})

const recommendedCourses = ref([
  { id: 1, name: '灌溉排水工程学', tag: '核心', hours: 48, color: '#0A2463' },
  { id: 2, name: '水力学', tag: '基础', hours: 64, color: '#3E92CC' },
  { id: 3, name: '水资源规划与管理', tag: '选修', hours: 32, color: '#00D9FF' },
  { id: 4, name: '土壤物理学', tag: '基础', hours: 40, color: '#4CAF50' }
])

const examples = [
  '我想从事节水灌溉方向的研究，如何规划学习路径？',
  '推荐一些水力学的学习资源',
  '如何提高专业课程的学习效率？'
]

const mockResponse = (question) => {
  const direction = goal.value.direction || '综合发展'
  const timeframe = goal.value.timeframe === '1year' ? '1年内' : goal.value.timeframe === '2year' ? '2年内' : goal.value.timeframe === '3year' ? '3年内' : '长期'
  
  return `# 个性化学习路径规划

## 一、规划概览

**目标方向：** ${direction === 'research' ? '学术研究' : direction === 'engineering' ? '工程实践' : direction === 'civil' ? '公务员' : direction === 'graduate' ? '继续深造' : '综合发展'}
**目标院校：** ${goal.value.school || '根据方向推荐'}
**时间规划：** ${timeframe}
**兴趣领域：** ${goal.value.interests.length > 0 ? goal.value.interests.join('、') : '广泛'}

## 二、学习阶段规划

### 第一阶段：基础夯实（${timeframe === '1年内' ? '1-3个月' : '1-6个月'}）

**核心课程：**
- **水力学**（64课时）：掌握流体力学基本原理
- **工程力学**（48课时）：力学基础
- **土壤学**（40课时）：土壤物理性质

**学习建议：**
1. 认真听讲，做好笔记
2. 完成课后习题，巩固知识
3. 参加课程实验，加深理解

### 第二阶段：专业深入（${timeframe === '1年内' ? '3-6个月' : '6-12个月'}）

**核心课程：**
- **灌溉排水工程学**（48课时）：灌溉排水原理与设计
- **水资源规划与管理**（32课时）：水资源评价与配置
- **水工建筑物**（48课时）：水利工程结构设计

**学习建议：**
1. 结合案例学习，理解工程应用
2. 参与课程设计，提升实践能力
3. 阅读专业文献，了解前沿动态

### 第三阶段：专项提升（${timeframe === '1年内' ? '6-12个月' : '12-24个月'}）

**专项课程：**
${goal.value.interests.includes('irrigation') ? '- **节水灌溉技术**（32课时）：滴灌、喷灌系统设计\n' : ''}
${goal.value.interests.includes('water') ? '- **水资源管理**（32课时）：水资源优化配置\n' : ''}
${goal.value.interests.includes('hydraulics') ? '- **计算水力学**（32课时）：数值模拟方法\n' : ''}
${goal.value.interests.includes('ecology') ? '- **生态水利**（32课时）：生态修复技术\n' : ''}
${goal.value.interests.includes('smart') ? '- **智慧水利**（32课时）：物联网与大数据应用\n' : ''}

**学习建议：**
1. 深入研究感兴趣的方向
2. 参与科研项目或实习
3. 发表学术论文或专利

### 第四阶段：冲刺阶段（最后3-6个月）

**重点任务：**
- 完成毕业论文/设计
- 准备考研/就业
- 参加专业竞赛

## 三、课程推荐

| 课程名称 | 优先级 | 课时 | 推荐学期 |
|----------|--------|------|----------|
| 水力学 | ⭐⭐⭐ | 64 | 大二上 |
| 灌溉排水工程学 | ⭐⭐⭐ | 48 | 大三上 |
| 水资源规划 | ⭐⭐ | 32 | 大三下 |
| 节水灌溉技术 | ⭐⭐ | 32 | 大四上 |

## 四、资源推荐

**教材：**
- 《农业水利工程》（中国农业出版社）
- 《水力学》（高等教育出版社）
- 《灌溉排水工程学》（水利水电出版社）

**在线资源：**
- MOOC平台相关课程
- 专业学术期刊
- 行业报告

**实践机会：**
- 课程实习
- 毕业设计
- 科研项目

## 五、学习建议

1. **制定计划：** 根据路径制定每周学习计划
2. **注重实践：** 理论与实践相结合
3. **主动学习：** 多问问题，主动探索
4. **劳逸结合：** 合理安排作息时间

## 六、进度追踪

建议每季度回顾学习进度，根据实际情况调整计划。坚持下去，您一定能够实现目标！

---

如需调整学习路径或获取更多资源推荐，请告诉我！`
}

const handleGeneratePlan = () => {
  ElMessage.info('正在生成学习路径，请在右侧对话框查看结果...')
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

.profile-card,
.goal-card,
.recommend-card {
  background-color: var(--bg-card) !important;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.profile-info {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.profile-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-name {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-primary);
}

.profile-major,
.profile-level {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-top: 4px;
}

.progress-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-label {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  width: 80px;
}

.progress-value {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  font-weight: 600;
  width: 80px;
  text-align: right;
}

.plan-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.recommend-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.recommend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.course-tag {
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: white;
  font-weight: 500;
}

.course-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.course-name {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.course-hours {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-top: 2px;
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.el-progress-bar__outer) {
  background-color: var(--bg-tertiary);
}
</style>
