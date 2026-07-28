<template>
  <svg
    class="svg-icon"
    :class="{ [`svg-icon--${size}`]: size }"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <component :is="iconComponent" v-if="iconComponent" />
  </svg>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: '24'
  }
})

const iconMap = {
  water: () => import('./icons/WaterIcon.vue'),
  droplet: () => import('./icons/WaterIcon.vue'),
  flow: () => import('./icons/FlowIcon.vue'),
  waves: () => import('./icons/FlowIcon.vue'),
  chart: () => import('./icons/ChartIcon.vue'),
  chart-bar: () => import('./icons/ChartIcon.vue'),
  gate: () => import('./icons/GateIcon.vue'),
  door: () => import('./icons/GateIcon.vue'),
  alert: () => import('./icons/AlertIcon.vue'),
  warning: () => import('./icons/AlertIcon.vue'),
  'trend-up': () => import('./icons/TrendUpIcon.vue'),
  line-chart: () => import('./icons/TrendUpIcon.vue'),
  user: () => import('./icons/UserIcon.vue'),
  users: () => import('./icons/UserIcon.vue'),
  robot: () => import('./icons/RobotIcon.vue'),
  bot: () => import('./icons/RobotIcon.vue'),
  ai: () => import('./icons/RobotIcon.vue'),
  graduation: () => import('./icons/GraduationIcon.vue'),
  cap: () => import('./icons/GraduationIcon.vue'),
  book: () => import('./icons/BookIcon.vue'),
  books: () => import('./icons/BookIcon.vue'),
  trophy: () => import('./icons/TrophyIcon.vue'),
  award: () => import('./icons/TrophyIcon.vue'),
  document: () => import('./icons/DocumentIcon.vue'),
  file: () => import('./icons/DocumentIcon.vue'),
  file-text: () => import('./icons/DocumentIcon.vue'),
  weather: () => import('./icons/WeatherIcon.vue'),
  sun: () => import('./icons/WeatherIcon.vue'),
  partly-cloudy: () => import('./icons/WeatherIcon.vue'),
  dam: () => import('./icons/DamIcon.vue'),
  building: () => import('./icons/DamIcon.vue'),
  pin: () => import('./icons/PinIcon.vue'),
  location: () => import('./icons/PinIcon.vue'),
  mountain: () => import('./icons/MountainIcon.vue'),
  landscape: () => import('./icons/MountainIcon.vue'),
  nature: () => import('./icons/MountainIcon.vue'),
  clipboard: () => import('./icons/ClipboardIcon.vue'),
  list: () => import('./icons/ClipboardIcon.vue'),
  checklist: () => import('./icons/ClipboardIcon.vue'),
  edit: () => import('./icons/EditIcon.vue'),
  pencil: () => import('./icons/EditIcon.vue'),
  pen: () => import('./icons/EditIcon.vue'),
  link: () => import('./icons/LinkIcon.vue'),
  connection: () => import('./icons/LinkIcon.vue'),
  folder: () => import('./icons/FolderIcon.vue'),
  archive: () => import('./icons/FolderIcon.vue'),
  crystal: () => import('./icons/CrystalIcon.vue'),
  magic: () => import('./icons/CrystalIcon.vue'),
  scale: () => import('./icons/ScaleIcon.vue'),
  balance: () => import('./icons/ScaleIcon.vue'),
  target: () => import('./icons/TargetIcon.vue'),
  goal: () => import('./icons/TargetIcon.vue'),
  calculator: () => import('./icons/CalculatorIcon.vue'),
  hash: () => import('./icons/CalculatorIcon.vue'),
  numbers: () => import('./icons/CalculatorIcon.vue'),
  check: () => import('./icons/CheckIcon.vue'),
  success: () => import('./icons/CheckIcon.vue'),
  close: () => import('./icons/CloseIcon.vue'),
  error: () => import('./icons/CloseIcon.vue'),
  x: () => import('./icons/CloseIcon.vue'),
  teacher: () => import('./icons/TeacherIcon.vue'),
  professor: () => import('./icons/TeacherIcon.vue'),
  student: () => import('./icons/StudentIcon.vue'),
  scientist: () => import('./icons/ScientistIcon.vue')
}

const iconComponent = computed(() => {
  const loader = iconMap[props.name]
  if (loader) {
    return defineAsyncComponent(loader)
  }
  return null
})
</script>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
}

.svg-icon--sm {
  width: 16px;
  height: 16px;
}

.svg-icon--md {
  width: 20px;
  height: 20px;
}

.svg-icon--lg {
  width: 28px;
  height: 28px;
}

.svg-icon--xl {
  width: 36px;
  height: 36px;
}
</style>
