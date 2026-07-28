<template>
  <div class="simulation-page">
    <div class="grid-container">
      <div class="card card-full">
        <div class="card-header">
          <span class="card-title">水坝调度仿真场景</span>
          <div class="card-actions">
            <el-select v-model="scenario" size="small">
              <el-option label="都江堰教学推演" value="dujiangyan" />
              <el-option label="青龙水库调度" value="qinglong" />
              <el-option label="灌区配水模拟" value="irrigation" />
            </el-select>
            <el-button type="text" size="small">保存方案</el-button>
          </div>
        </div>
        <div class="simulation-content">
          <div class="control-panel">
            <div class="control-section">
              <div class="section-title">调度控制</div>
              <div class="control-item">
                <label>入库流量</label>
                <el-slider v-model="inflow" :min="0" :max="1000" :step="10" show-input />
                <span class="control-value">{{ inflow }} m³/s</span>
              </div>
              <div class="control-item">
                <label>泄洪流量</label>
                <el-slider v-model="outflow" :min="0" :max="800" :step="10" show-input />
                <span class="control-value">{{ outflow }} m³/s</span>
              </div>
              <div class="control-item">
                <label>闸门开度</label>
                <el-slider v-model="gateOpen" :min="0" :max="100" :step="1" show-input />
                <span class="control-value">{{ gateOpen }}%</span>
              </div>
              <div class="mode-selector">
                <el-button 
                  v-for="m in modes" 
                  :key="m.value" 
                  :type="mode === m.value ? 'primary' : 'default'"
                  size="small"
                  @click="mode = m.value"
                >
                  {{ m.label }}
                </el-button>
              </div>
              <div class="action-buttons">
                <el-button type="primary" size="large" @click="startSimulation" :loading="running">运行</el-button>
                <el-button size="large" @click="pauseSimulation">暂停</el-button>
                <el-button size="large" @click="resetSimulation">重置</el-button>
              </div>
            </div>
          </div>
          <div class="map-panel">
            <div class="map-header">
              <span>青龙水库</span>
              <div class="map-actions">
                <el-button type="text" size="small">图层切换</el-button>
                <el-button type="text" size="small">全图</el-button>
              </div>
            </div>
            <div class="map-area">
              <div class="water-body"></div>
              <div class="dam">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px;">
                  <path d="M3 21h18"/>
                  <path d="M5 21V10l7-5 7 5v11"/>
                  <path d="M9 21v-8h6v8"/>
                  <path d="M12 3v2"/>
                </svg>
              </div>
              <div class="monitor-point" v-for="i in 3" :key="i">
                <span class="monitor-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </span>
                <span class="monitor-label">监测点{{ i }}</span>
              </div>
            </div>
          </div>
          <div class="data-panel">
            <div class="panel-header">
              <span>水位过程线</span>
              <el-select v-model="waterStation" size="small">
                <el-option label="青龙水库" value="qinglong" />
                <el-option label="下游监测点" value="downstream" />
              </el-select>
            </div>
            <div class="chart-container">
              <v-chart class="echarts" :option="waterChartOption" autoresize />
            </div>
            <div class="warning-panel">
              <div class="panel-header">
                <span>风险预警摘要</span>
              </div>
              <div class="warning-list">
                <div class="warning-item danger">
                  <span class="warning-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </span>
                  <div class="warning-content">
                    <div class="warning-title">下游高风险区</div>
                    <div class="warning-desc">2处风险点，影响人口约1.28万人</div>
                  </div>
                </div>
                <div class="warning-item warning">
                  <span class="warning-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </span>
                  <div class="warning-content">
                    <div class="warning-title">影响人口（估算）</div>
                    <div class="warning-desc">3.56万人</div>
                  </div>
                </div>
                <div class="warning-item info">
                  <span class="warning-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                      <line x1="18" y1="20" x2="18" y2="10"/>
                      <line x1="12" y1="20" x2="12" y2="4"/>
                      <line x1="6" y1="20" x2="6" y2="14"/>
                    </svg>
                  </span>
                  <div class="warning-content">
                    <div class="warning-title">影响农田（估算）</div>
                    <div class="warning-desc">3.6万亩</div>
                  </div>
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
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const scenario = ref('qinglong')
const waterStation = ref('qinglong')
const inflow = ref(850)
const outflow = ref(600)
const gateOpen = ref(65)
const mode = ref('auto')
const running = ref(false)

const modes = [
  { label: '手动调度', value: 'manual' },
  { label: '自动调度', value: 'auto' },
  { label: '方案探索', value: 'explore' }
]

const startSimulation = () => {
  running.value = true
}

const pauseSimulation = () => {
  running.value = false
}

const resetSimulation = () => {
  running.value = false
  inflow.value = 850
  outflow.value = 600
  gateOpen.value = 65
}

const waterChartOption = computed(() => ({
  grid: { top: 10, right: 10, bottom: 30, left: 50 },
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
    axisLabel: { color: '#94a3b8' },
    splitLine: { lineStyle: { color: '#334155' } }
  },
  series: [{
    name: '当前水位',
    type: 'line',
    smooth: true,
    data: [220, 225, 230, 228, 235, 240, 238],
    lineStyle: { color: '#38bdf8', width: 3 },
    itemStyle: { color: '#38bdf8' }
  }, {
    name: '汛限水位',
    type: 'line',
    data: [230, 230, 230, 230, 230, 230, 230],
    lineStyle: { color: '#ef4444', width: 2, type: 'dashed' },
    itemStyle: { color: '#ef4444' }
  }]
}))
</script>

<style scoped>
.simulation-page {
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
  min-height: 400px;
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

.simulation-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

.control-panel {
  width: 280px;
  border-right: 1px solid rgba(56, 189, 248, 0.1);
  padding: 16px;
}

.control-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: #38bdf8;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-item label {
  font-size: 12px;
  color: #cbd5e1;
}

.control-value {
  font-size: 13px;
  font-weight: 600;
  color: #38bdf8;
  text-align: right;
}

.mode-selector {
  display: flex;
  gap: 8px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-top: 10px;
}

.action-buttons :deep(.el-button) {
  flex: 1;
  border-radius: 8px;
}

.map-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(56, 189, 248, 0.1);
  font-size: 14px;
  font-weight: 600;
  color: #e2e8f0;
}

.map-actions :deep(.el-button) {
  color: #94a3b8;
}

.map-area {
  flex: 1;
  position: relative;
  background: linear-gradient(135deg, #1e3a5f 0%, #0f2744 100%);
  overflow: hidden;
}

.map-area::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: 
    radial-gradient(circle at 20% 60%, rgba(56, 189, 248, 0.2) 0%, transparent 40%);
}

.water-body {
  position: absolute;
  top: 20%;
  left: 10%;
  right: 10%;
  height: 40%;
  background: rgba(56, 189, 248, 0.3);
  border-radius: 50%;
  border: 2px solid rgba(56, 189, 248, 0.5);
}

.dam {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 60px;
}

.monitor-point {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.monitor-point:nth-child(3) {
  top: 30%;
  left: 25%;
}

.monitor-point:nth-child(4) {
  top: 40%;
  left: 60%;
}

.monitor-point:nth-child(5) {
  bottom: 30%;
  left: 40%;
}

.monitor-icon {
  font-size: 20px;
}

.monitor-label {
  font-size: 11px;
  color: #cbd5e1;
  background: rgba(15, 23, 42, 0.8);
  padding: 2px 8px;
  border-radius: 10px;
}

.data-panel {
  width: 380px;
  border-left: 1px solid rgba(56, 189, 248, 0.1);
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(56, 189, 248, 0.1);
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.chart-container {
  height: 200px;
  padding: 10px;
}

.echarts {
  width: 100%;
  height: 100%;
}

.warning-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.warning-list {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

.warning-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
}

.warning-item.danger {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.warning-item.warning {
  background: rgba(234, 179, 8, 0.1);
  border: 1px solid rgba(234, 179, 8, 0.3);
}

.warning-item.info {
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.3);
}

.warning-icon {
  font-size: 20px;
}

.warning-content {
  flex: 1;
}

.warning-title {
  font-size: 13px;
  font-weight: 600;
  color: #e2e8f0;
}

.warning-desc {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
}
</style>