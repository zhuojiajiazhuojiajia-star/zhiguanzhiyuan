<template>
  <div class="assessment-page">
    <div class="grid-container">
      <div class="card card-full">
        <div class="card-header">
          <span class="card-title">学科评估概览</span>
          <div class="card-actions">
            <el-select v-model="year" size="small">
              <el-option label="2024年" value="2024" />
              <el-option label="2023年" value="2023" />
              <el-option label="2022年" value="2022" />
            </el-select>
            <el-button type="text" size="small">导出报告</el-button>
          </div>
        </div>
        <div class="assessment-content">
          <div class="assessment-summary">
            <div class="summary-item">
              <div class="summary-value">A+</div>
              <div class="summary-label">综合评级</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">全国第3</div>
              <div class="summary-label">学科排名</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">94.5</div>
              <div class="summary-label">评估得分</div>
            </div>
            <div class="summary-item">
              <div class="summary-value">5年</div>
              <div class="summary-label">评估周期</div>
            </div>
          </div>
          <div class="assessment-chart">
            <v-chart class="echarts" :option="radarChartOption" autoresize />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">师资力量</span>
        </div>
        <div class="faculty-list">
          <div class="faculty-item">
            <div class="faculty-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <path d="M12 11v0"/>
              </svg>
            </div>
            <div class="faculty-info">
              <div class="faculty-name">张教授</div>
              <div class="faculty-title">博士生导师</div>
            </div>
            <div class="faculty-score">98</div>
          </div>
          <div class="faculty-item">
            <div class="faculty-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div class="faculty-info">
              <div class="faculty-name">李教授</div>
              <div class="faculty-title">硕士生导师</div>
            </div>
            <div class="faculty-score">95</div>
          </div>
          <div class="faculty-item">
            <div class="faculty-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 24px; height: 24px;">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <path d="M19 14v2"/>
                <path d="M5 14v2"/>
              </svg>
            </div>
            <div class="faculty-info">
              <div class="faculty-name">王研究员</div>
              <div class="faculty-title">科研骨干</div>
            </div>
            <div class="faculty-score">92</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">科研成果</span>
        </div>
        <div class="chart-container">
          <v-chart class="echarts" :option="barChartOption" autoresize />
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">论文发表</span>
        </div>
        <div class="chart-container">
          <v-chart class="echarts" :option="lineChartOption" autoresize />
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">学生培养</span>
        </div>
        <div class="student-stats">
          <div class="student-item">
            <div class="student-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px;">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div class="student-value">128</div>
            <div class="student-label">博士毕业生</div>
          </div>
          <div class="student-item">
            <div class="student-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px;">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <div class="student-value">567</div>
            <div class="student-label">硕士毕业生</div>
          </div>
          <div class="student-item">
            <div class="student-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 28px; height: 28px;">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
            <div class="student-value">89</div>
            <div class="student-label">优秀论文</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <span class="card-title">评估指标详情</span>
        </div>
        <div class="indicator-list">
          <div class="indicator-item">
            <div class="indicator-header">
              <span class="indicator-name">教学质量</span>
              <span class="indicator-value">96%</span>
            </div>
            <el-progress :percentage="96" stroke-width="6" :color="getColor(96)" />
          </div>
          <div class="indicator-item">
            <div class="indicator-header">
              <span class="indicator-name">科研水平</span>
              <span class="indicator-value">92%</span>
            </div>
            <el-progress :percentage="92" stroke-width="6" :color="getColor(92)" />
          </div>
          <div class="indicator-item">
            <div class="indicator-header">
              <span class="indicator-name">师资队伍</span>
              <span class="indicator-value">88%</span>
            </div>
            <el-progress :percentage="88" stroke-width="6" :color="getColor(88)" />
          </div>
          <div class="indicator-item">
            <div class="indicator-header">
              <span class="indicator-name">学术声誉</span>
              <span class="indicator-value">95%</span>
            </div>
            <el-progress :percentage="95" stroke-width="6" :color="getColor(95)" />
          </div>
          <div class="indicator-item">
            <div class="indicator-header">
              <span class="indicator-name">国际交流</span>
              <span class="indicator-value">82%</span>
            </div>
            <el-progress :percentage="82" stroke-width="6" :color="getColor(82)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart, BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  RadarComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  RadarChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  RadarComponent
])

const year = ref('2024')

const getColor = (percent) => {
  if (percent >= 90) return '#22c55e'
  if (percent >= 80) return '#38bdf8'
  if (percent >= 70) return '#eab308'
  return '#ef4444'
}

const radarChartOption = computed(() => ({
  radar: {
    indicator: [
      { name: '教学质量', max: 100 },
      { name: '科研水平', max: 100 },
      { name: '师资队伍', max: 100 },
      { name: '学术声誉', max: 100 },
      { name: '国际交流', max: 100 }
    ],
    shape: 'polygon',
    splitNumber: 4,
    axisName: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: '#334155' } },
    splitArea: { areaStyle: { color: ['rgba(56, 189, 248, 0.05)', 'rgba(56, 189, 248, 0.1)'] } },
    axisLine: { lineStyle: { color: '#475569' } }
  },
  tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  series: [{
    type: 'radar',
    data: [{
      value: [96, 92, 88, 95, 82],
      name: '本学科',
      areaStyle: { color: 'rgba(56, 189, 248, 0.3)' },
      lineStyle: { color: '#38bdf8', width: 2 },
      itemStyle: { color: '#38bdf8' }
    }, {
      value: [85, 80, 75, 82, 70],
      name: '全国平均',
      areaStyle: { color: 'rgba(148, 163, 184, 0.1)' },
      lineStyle: { color: '#64748b', width: 2, type: 'dashed' },
      itemStyle: { color: '#64748b' }
    }]
  }]
}))

const barChartOption = computed(() => ({
  grid: { top: 10, right: 10, bottom: 30, left: 50 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  xAxis: {
    type: 'category',
    data: ['国家级', '省部级', '横向课题', '专利', '软件著作'],
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8', rotate: 30 }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: '#334155' } }
  },
  series: [{
    name: '数量',
    type: 'bar',
    data: [28, 65, 42, 35, 22],
    barWidth: '50%',
    itemStyle: {
      borderRadius: [6, 6, 0, 0],
      color: '#38bdf8'
    }
  }]
}))

const lineChartOption = computed(() => ({
  grid: { top: 10, right: 10, bottom: 30, left: 50 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  xAxis: {
    type: 'category',
    data: ['2020', '2021', '2022', '2023', '2024'],
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: '#334155' } }
  },
  series: [{
    name: 'SCI论文',
    type: 'line',
    smooth: true,
    data: [45, 58, 72, 85, 96],
    lineStyle: { color: '#22c55e', width: 3 },
    itemStyle: { color: '#22c55e' }
  }, {
    name: 'EI论文',
    type: 'line',
    smooth: true,
    data: [32, 45, 58, 65, 78],
    lineStyle: { color: '#a855f7', width: 3 },
    itemStyle: { color: '#a855f7' }
  }]
}))
</script>

<style scoped>
.assessment-page {
  height: 100%;
  overflow-y: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  min-height: 100%;
}

.card {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.1);
  overflow: hidden;
  grid-column: span 6;
  display: flex;
  flex-direction: column;
  min-height: 300px;
}

.card-full {
  grid-column: span 12;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid rgba(56, 189, 248, 0.1);
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.card-actions {
  display: flex;
  gap: 12px;
}

.card-actions :deep(.el-button) {
  color: #94a3b8;
}

.assessment-content {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.assessment-summary {
  display: flex;
  gap: 30px;
}

.summary-item {
  text-align: center;
}

.summary-value {
  font-size: 36px;
  font-weight: 700;
  color: #38bdf8;
}

.summary-item:first-child .summary-value {
  color: #f97316;
}

.summary-label {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.assessment-chart {
  flex: 1;
  height: 280px;
}

.faculty-list {
  padding: 12px;
}

.faculty-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 8px;
  margin-bottom: 8px;
}

.faculty-item:last-child {
  margin-bottom: 0;
}

.faculty-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(56, 189, 248, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.faculty-info {
  flex: 1;
}

.faculty-name {
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.faculty-title {
  font-size: 12px;
  color: #94a3b8;
}

.faculty-score {
  font-size: 20px;
  font-weight: 700;
  color: #22c55e;
}

.chart-container {
  height: 220px;
  padding: 10px;
}

.echarts {
  width: 100%;
  height: 100%;
}

.student-stats {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}

.student-item {
  text-align: center;
}

.student-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.student-value {
  font-size: 28px;
  font-weight: 700;
  color: #e2e8f0;
}

.student-label {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}

.indicator-list {
  padding: 12px;
}

.indicator-item {
  margin-bottom: 16px;
}

.indicator-item:last-child {
  margin-bottom: 0;
}

.indicator-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.indicator-name {
  font-size: 13px;
  color: #cbd5e1;
}

.indicator-value {
  font-size: 13px;
  font-weight: 600;
  color: #38bdf8;
}
</style>