<template>
  <div class="overview-page">
    <div class="grid-container">
      <div class="card card-large map-card">
        <div class="card-header">
          <span class="card-title">灌区总览地图</span>
          <div class="card-actions">
            <el-button type="text" size="small">刷新</el-button>
            <el-button type="text" size="small">全屏</el-button>
          </div>
        </div>
        <div class="map-content">
          <div class="map-legend">
            <div class="legend-title">供水满足率/旱情风险图例</div>
            <div class="legend-items">
              <div class="legend-item"><span class="legend-color" style="background: #22c55e;"></span> &gt;90%（充足）</div>
              <div class="legend-item"><span class="legend-color" style="background: #84cc16;"></span> 70-90%（基本满足）</div>
              <div class="legend-item"><span class="legend-color" style="background: #eab308;"></span> 50-70%（偏紧）</div>
              <div class="legend-item"><span class="legend-color" style="background: #f97316;"></span> 30-50%（紧张）</div>
              <div class="legend-item"><span class="legend-color" style="background: #ef4444;"></span> &lt;30%（严重）</div>
              <div class="legend-item"><span class="legend-color" style="background: #64748b;"></span> 无数据</div>
            </div>
          </div>
          <div class="map-area">
            <div class="map-zone zone-safe">I区</div>
            <div class="map-zone zone-safe">II区</div>
            <div class="map-zone zone-basic">III区</div>
            <div class="map-zone zone-warning">IV区</div>
            <div class="map-zone zone-danger">V区</div>
            <div class="map-water-source">白云水库</div>
            <div class="map-water-source bottom">河干渠</div>
          </div>
        </div>
      </div>

      <div class="card card-grid">
        <div class="stat-card">
          <div class="stat-icon water">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">86.3%</div>
            <div class="stat-label">供水满足率</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon flow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
              <path d="M2 12c2 -2 4 -2 6 0s4 2 6 0 4 -2 6 0"/>
              <path d="M2 18c2 -2 4 -2 6 0s4 2 6 0 4 -2 6 0"/>
              <path d="M2 6c2 -2 4 -2 6 0s4 2 6 0 4 -2 6 0"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">152.6</div>
            <div class="stat-label">实时流量(m³/s)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon area">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">523.6</div>
            <div class="stat-label">灌区面积(万亩)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon gate">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
              <path d="M3 21h18"/>
              <path d="M5 21V7l7-4 7 4v14"/>
              <path d="M9 21v-6h6v6"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">128</div>
            <div class="stat-label">闸门数量(座)</div>
          </div>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">5</div>
            <div class="stat-label">今日预警(条)</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon level">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
              <polyline points="16 7 22 7 22 13"/>
            </svg>
          </div>
          <div class="stat-info">
            <div class="stat-value">23.45</div>
            <div class="stat-label">水位(总干渠m)</div>
          </div>
        </div>
      </div>

      <div class="card chart-card">
        <div class="card-header">
          <span class="card-title">供水满足率趋势（近7天）</span>
          <el-select v-model="trendPeriod" size="small">
            <el-option label="7天" value="7" />
            <el-option label="30天" value="30" />
          </el-select>
        </div>
        <div class="chart-container">
          <v-chart class="echarts" :option="trendChartOption" autoresize />
        </div>
      </div>

      <div class="card chart-card">
        <div class="card-header">
          <span class="card-title">用水结构占比</span>
        </div>
        <div class="chart-container">
          <v-chart class="echarts" :option="pieChartOption" autoresize />
        </div>
      </div>

      <div class="card chart-card">
        <div class="card-header">
          <span class="card-title">旱情风险面积占比</span>
        </div>
        <div class="chart-container">
          <v-chart class="echarts" :option="riskPieOption" autoresize />
        </div>
      </div>

      <div class="card chart-card">
        <div class="card-header">
          <span class="card-title">各分区供水满足率对比</span>
        </div>
        <div class="chart-container">
          <v-chart class="echarts" :option="barChartOption" autoresize />
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
import { LineChart, PieChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const trendPeriod = ref('7')

const trendChartOption = computed(() => ({
  grid: { top: 20, right: 20, bottom: 30, left: 50 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  xAxis: {
    type: 'category',
    data: ['05-20', '05-21', '05-22', '05-23', '05-24', '05-25', '05-26'],
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
    name: '供水满足率',
    type: 'line',
    smooth: true,
    data: [78, 82, 80, 85, 83, 84, 86.3],
    areaStyle: {
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: 'rgba(56, 189, 248, 0.4)' },
          { offset: 1, color: 'rgba(56, 189, 248, 0.05)' }
        ]
      }
    },
    lineStyle: { color: '#38bdf8', width: 3 },
    itemStyle: { color: '#38bdf8' }
  }]
}))

const pieChartOption = computed(() => ({
  tooltip: { trigger: 'item', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
    textStyle: { color: '#94a3b8' }
  },
  series: [{
    name: '用水结构',
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['35%', '50%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 8,
      borderColor: '#1e293b',
      borderWidth: 2
    },
    label: { show: false },
    emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#fff' } },
    data: [
      { value: 72.6, name: '农业用水', itemStyle: { color: '#38bdf8' } },
      { value: 12.4, name: '工业用水', itemStyle: { color: '#22c55e' } },
      { value: 10.3, name: '生活用水', itemStyle: { color: '#eab308' } },
      { value: 4.7, name: '生态用水', itemStyle: { color: '#a855f7' } }
    ]
  }]
}))

const riskPieOption = computed(() => ({
  tooltip: { trigger: 'item', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
    textStyle: { color: '#94a3b8' }
  },
  series: [{
    name: '旱情风险',
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['35%', '50%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 8,
      borderColor: '#1e293b',
      borderWidth: 2
    },
    label: { show: false },
    emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#fff' } },
    data: [
      { value: 38.7, name: '低风险', itemStyle: { color: '#22c55e' } },
      { value: 31.6, name: '基本满足', itemStyle: { color: '#84cc16' } },
      { value: 16.9, name: '偏紧', itemStyle: { color: '#eab308' } },
      { value: 8.6, name: '紧张', itemStyle: { color: '#f97316' } },
      { value: 4.2, name: '严重', itemStyle: { color: '#ef4444' } }
    ]
  }]
}))

const barChartOption = computed(() => ({
  grid: { top: 20, right: 20, bottom: 30, left: 50 },
  tooltip: { trigger: 'axis', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: '#38bdf8' },
  xAxis: {
    type: 'category',
    data: ['I区', 'II区', 'III区', 'IV区', 'V区', 'VI区', 'VII区'],
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
    name: '供水满足率',
    type: 'bar',
    data: [92.1, 88.7, 83.6, 71.4, 71.4, 60.2, 45.8],
    barWidth: '50%',
    itemStyle: {
      borderRadius: [6, 6, 0, 0],
      color: {
        type: 'linear',
        x: 0, y: 0, x2: 0, y2: 1,
        colorStops: [
          { offset: 0, color: '#38bdf8' },
          { offset: 1, color: '#0f172a' }
        ]
      }
    }
  }]
}))
</script>

<style scoped>
.overview-page {
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto;
  gap: 16px;
  height: 100%;
  min-height: 600px;
}

.card {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.card-large {
  grid-column: span 8;
  grid-row: span 1;
  min-height: 320px;
}

.card-grid {
  grid-column: span 4;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  padding: 12px;
  min-height: 320px;
}

.chart-card {
  grid-column: span 3;
  min-height: 280px;
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
  gap: 8px;
}

.card-actions :deep(.el-button) {
  color: #94a3b8;
}

.map-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.map-legend {
  width: 180px;
  padding: 16px;
  border-right: 1px solid rgba(56, 189, 248, 0.1);
  flex-shrink: 0;
}

.legend-title {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 12px;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #cbd5e1;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.map-area {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);
  padding: 20px;
  overflow: hidden;
  min-width: 0;
}

.map-area::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: 
    radial-gradient(circle at 30% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 40%),
    radial-gradient(circle at 70% 60%, rgba(34, 197, 94, 0.08) 0%, transparent 30%);
}

.map-zone {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.zone-safe { background: rgba(34, 197, 94, 0.4); }
.zone-basic { background: rgba(132, 204, 22, 0.4); }
.zone-warning { background: rgba(234, 179, 8, 0.4); }
.zone-danger { background: rgba(239, 68, 68, 0.4); }

.map-zone:nth-child(2) { top: 30px; left: 50px; width: 120px; height: 80px; }
.map-zone:nth-child(3) { top: 30px; left: 200px; width: 100px; height: 100px; }
.map-zone:nth-child(4) { top: 50px; left: 330px; width: 110px; height: 90px; }
.map-zone:nth-child(5) { top: 140px; left: 100px; width: 130px; height: 110px; }
.map-zone:nth-child(6) { top: 160px; left: 260px; width: 140px; height: 100px; }

.map-water-source {
  position: absolute;
  padding: 8px 16px;
  background: rgba(56, 189, 248, 0.3);
  border-radius: 20px;
  font-size: 12px;
  color: #38bdf8;
  top: 20px;
  right: 40px;
}

.map-water-source.bottom {
  bottom: 20px;
  top: auto;
  left: 50%;
  transform: translateX(-50%);
}

.stat-card {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid rgba(56, 189, 248, 0.1);
}

.stat-card.warning {
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.05);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stat-icon.water { background: rgba(56, 189, 248, 0.2); }
.stat-icon.flow { background: rgba(34, 197, 94, 0.2); }
.stat-icon.area { background: rgba(168, 85, 247, 0.2); }
.stat-icon.gate { background: rgba(234, 179, 8, 0.2); }
.stat-icon.alert { background: rgba(239, 68, 68, 0.2); }
.stat-icon.level { background: rgba(249, 115, 22, 0.2); }

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #e2e8f0;
}

.stat-card.warning .stat-value {
  color: #ef4444;
}

.stat-label {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
}

.chart-container {
  flex: 1;
  padding: 10px;
  min-height: 0;
}

.echarts {
  width: 100%;
  height: 100%;
}
</style>