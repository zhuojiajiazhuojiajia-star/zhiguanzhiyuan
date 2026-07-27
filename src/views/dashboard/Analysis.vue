<template>
  <div class="analysis-page">
    <div class="grid-container">
      <div class="card card-full">
        <div class="card-header">
          <span class="card-title">灌区数据分析</span>
          <div class="card-actions">
            <el-button type="text" size="small">数据导入</el-button>
            <el-select v-model="analysisMode" size="small">
              <el-option label="数据分析" value="analysis" />
              <el-option label="图表分析" value="chart" />
            </el-select>
          </div>
        </div>
        <div class="analysis-content">
          <div class="data-panel">
            <div class="panel-header">
              <span>数据文件</span>
            </div>
            <div class="file-list">
              <div class="file-item active">
                <el-icon><Files /></el-icon>
                <div class="file-info">
                  <div class="file-name">灌区监测数据_202505.csv</div>
                  <div class="file-size">1.2 MB</div>
                </div>
                <div class="file-actions">
                  <el-button type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </div>
              </div>
              <div class="file-item">
                <el-icon><Files /></el-icon>
                <div class="file-info">
                  <div class="file-name">灌区监测数据_202504.csv</div>
                  <div class="file-size">1.1 MB</div>
                </div>
                <div class="file-actions">
                  <el-button type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </div>
              </div>
            </div>
            <div class="data-preview">
              <div class="panel-header">
                <span>数据预览（前5行）</span>
              </div>
              <el-table :data="previewData" border>
                <el-table-column v-for="col in columns" :key="col" :label="col" />
              </el-table>
              <div class="preview-footer">共 1250 行数据</div>
            </div>
          </div>
          <div class="charts-panel">
            <div class="chart-row">
              <div class="chart-card">
                <div class="chart-header">
                  <span>指标趋势（近15天）</span>
                </div>
                <div class="chart-container">
                  <v-chart class="echarts" :option="trendChartOption" autoresize />
                </div>
              </div>
              <div class="chart-card">
                <div class="chart-header">
                  <span>灌溉量统计</span>
                </div>
                <div class="chart-container">
                  <v-chart class="echarts" :option="irrigationChartOption" autoresize />
                </div>
              </div>
            </div>
            <div class="chart-row">
              <div class="chart-card">
                <div class="chart-header">
                  <span>降雨量统计</span>
                </div>
                <div class="chart-container">
                  <v-chart class="echarts" :option="rainfallChartOption" autoresize />
                </div>
              </div>
              <div class="chart-card">
                <div class="chart-header">
                  <span>AI智能总结</span>
                </div>
                <div class="summary-content">
                  <div class="summary-text">
                    <p>基于近15天数据分析，灌区土壤湿度整体呈上升趋势，当前平均湿度为26.8%，处于适宜范围。</p>
                    <p>灌溉量在5月23日达到峰值(1400 m³)，5月25日出现一次明显降雨过程，对土壤湿度提升起到积极作用。</p>
                    <p>建议合理调整灌溉计划，关注高温天气对灌区土壤墒情的影响，重点关注IV区的土壤墒情变化。</p>
                  </div>
                  <div class="summary-meta">
                    <span>置信度: 92%</span>
                  </div>
                  <el-button type="primary" size="small" class="export-btn">导出分析报告</el-button>
                </div>
              </div>
            </div>
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
import { LineChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { Files } from '@element-plus/icons-vue'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const analysisMode = ref('analysis')

const columns = ['时间', '土壤湿度(%)', '灌溉量(m³)', '降雨量(mm)', '气温(°C)']
const previewData = [
  { '时间': '2025-05-20', '土壤湿度(%)': 23.5, '灌溉量(m³)': 1200, '降雨量(mm)': 0, '气温(°C)': 24.1 },
  { '时间': '2025-05-21', '土壤湿度(%)': 24.1, '灌溉量(m³)': 1100, '降雨量(mm)': 5.2, '气温(°C)': 22.8 },
  { '时间': '2025-05-22', '土壤湿度(%)': 25.3, '灌溉量(m³)': 1300, '降雨量(mm)': 0, '气温(°C)': 25.2 },
  { '时间': '2025-05-23', '土壤湿度(%)': 26.8, '灌溉量(m³)': 1400, '降雨量(mm)': 2.1, '气温(°C)': 26.3 },
  { '时间': '2025-05-24', '土壤湿度(%)': 26.1, '灌溉量(m³)': 1000, '降雨量(mm)': 0, '气温(°C)': 27.1 }
]

const trendChartOption = computed(() => ({
  grid: { top: 10, right: 10, bottom: 30, left: 50 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  xAxis: {
    type: 'category',
    data: ['05-12', '05-14', '05-16', '05-18', '05-20', '05-22', '05-24', '05-26'],
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8', formatter: '{value}%' },
    splitLine: { lineStyle: { color: '#334155' } }
  },
  series: [{
    name: '土壤湿度',
    type: 'line',
    smooth: true,
    data: [22, 23, 24, 25, 23.5, 25.3, 26.8, 26.8],
    lineStyle: { color: '#38bdf8', width: 3 },
    itemStyle: { color: '#38bdf8' }
  }]
}))

const irrigationChartOption = computed(() => ({
  grid: { top: 10, right: 10, bottom: 30, left: 50 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  xAxis: {
    type: 'category',
    data: ['05-12', '05-14', '05-16', '05-18', '05-20', '05-22', '05-24', '05-26'],
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
    name: '灌溉量',
    type: 'bar',
    data: [1100, 1200, 900, 1300, 1200, 1300, 1400, 1000],
    barWidth: '50%',
    itemStyle: {
      borderRadius: [6, 6, 0, 0],
      color: '#22c55e'
    }
  }]
}))

const rainfallChartOption = computed(() => ({
  grid: { top: 10, right: 10, bottom: 30, left: 50 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  xAxis: {
    type: 'category',
    data: ['05-12', '05-14', '05-16', '05-18', '05-20', '05-22', '05-24', '05-26'],
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8' }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#475569' } },
    axisLabel: { color: '#94a3b8', formatter: '{value}mm' },
    splitLine: { lineStyle: { color: '#334155' } }
  },
  series: [{
    name: '降雨量',
    type: 'bar',
    data: [0, 5.2, 0, 2.1, 0, 0, 0, 28.1],
    barWidth: '50%',
    itemStyle: {
      borderRadius: [6, 6, 0, 0],
      color: '#a855f7'
    }
  }]
}))
</script>

<style scoped>
.analysis-page {
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
  display: flex;
  flex-direction: column;
  min-height: 500px;
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
  flex-shrink: 0;
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

.analysis-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.data-panel {
  width: 380px;
  border-right: 1px solid rgba(56, 189, 248, 0.1);
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(56, 189, 248, 0.1);
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.file-list {
  padding: 12px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-item:last-child {
  margin-bottom: 0;
}

.file-item:hover {
  background: rgba(56, 189, 248, 0.1);
}

.file-item.active {
  background: rgba(56, 189, 248, 0.15);
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.file-info {
  flex: 1;
}

.file-name {
  font-size: 13px;
  color: #e2e8f0;
}

.file-size {
  font-size: 11px;
  color: #94a3b8;
}

.file-actions :deep(.el-button) {
  color: #94a3b8;
}

.data-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(56, 189, 248, 0.1);
}

.data-preview :deep(.el-table) {
  background: transparent;
}

.data-preview :deep(.el-table th) {
  background: rgba(15, 23, 42, 0.8);
  color: #94a3b8;
  font-size: 12px;
}

.data-preview :deep(.el-table td) {
  background: rgba(15, 23, 42, 0.4);
  color: #cbd5e1;
  font-size: 12px;
}

.data-preview :deep(.el-table--border .el-table__cell) {
  border-right: 1px solid rgba(56, 189, 248, 0.1);
}

.preview-footer {
  padding: 8px 16px;
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
}

.charts-panel {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chart-row {
  display: flex;
  gap: 16px;
}

.chart-card {
  flex: 1;
  background: rgba(15, 23, 42, 0.6);
  border-radius: 10px;
  overflow: hidden;
}

.chart-header {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(56, 189, 248, 0.1);
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.chart-container {
  height: 220px;
  padding: 10px;
}

.echarts {
  width: 100%;
  height: 100%;
}

.summary-content {
  padding: 16px;
}

.summary-text {
  font-size: 13px;
  color: #cbd5e1;
  line-height: 1.8;
}

.summary-text p {
  margin-bottom: 10px;
}

.summary-text p:last-child {
  margin-bottom: 0;
}

.summary-meta {
  margin-top: 12px;
  font-size: 12px;
  color: #94a3b8;
}

.export-btn {
  margin-top: 16px;
  width: 100%;
}
</style>