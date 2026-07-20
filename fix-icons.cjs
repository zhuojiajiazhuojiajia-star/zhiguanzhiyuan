const fs = require('fs')
const path = require('path')

const iconMap = {
  Wand2: 'MagicStick',
  BookOpen: 'Reading',
  CheckCircle: 'CircleCheck',
  FileText: 'Document',
  Lightbulb: 'InfoFilled',
  PenTool: 'EditPen',
  Database: 'DataBoard',
  BarChart: 'PieChart',
  FileSearch: 'Search',
  Target: 'Medal',
  HelpCircle: 'HelpFilled',
  Droplets: 'Watermelon',
  Wind: 'WindPower',
  Mountain: 'Place',
  Waves: 'TrendCharts',
  Thermometer: 'Sunny',
  CloudRain: 'Cloudy',
  Calculator: 'CirclePlus'
}

const files = [
  'src/views/teacher/Preparation.vue',
  'src/views/teacher/Grading.vue',
  'src/views/teacher/CaseDesign.vue',
  'src/views/student/QA.vue',
  'src/views/student/Calculation.vue',
  'src/views/student/LearningPath.vue',
  'src/views/research/Literature.vue',
  'src/views/research/DataAnalysis.vue',
  'src/views/research/AcademicWriting.vue'
]

files.forEach(file => {
  const filePath = path.join(__dirname, file)
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`)
    return
  }
  
  let content = fs.readFileSync(filePath, 'utf-8')
  
  Object.entries(iconMap).forEach(([oldIcon, newIcon]) => {
    content = content.replace(new RegExp(oldIcon, 'g'), newIcon)
  })
  
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`Fixed: ${file}`)
})

console.log('All files fixed!')