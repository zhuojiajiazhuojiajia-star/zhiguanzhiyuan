import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/teacher/preparation'
  },
  {
    path: '/teacher',
    component: () => import('@/components/layout/MainLayout.vue'),
    children: [
      { path: 'preparation', name: 'TeacherPreparation', component: () => import('@/views/teacher/Preparation.vue') },
      { path: 'grading', name: 'TeacherGrading', component: () => import('@/views/teacher/Grading.vue') },
      { path: 'case-design', name: 'TeacherCaseDesign', component: () => import('@/views/teacher/CaseDesign.vue') }
    ]
  },
  {
    path: '/student',
    component: () => import('@/components/layout/MainLayout.vue'),
    children: [
      { path: 'qa', name: 'StudentQA', component: () => import('@/views/student/QA.vue') },
      { path: 'calculation', name: 'StudentCalculation', component: () => import('@/views/student/Calculation.vue') },
      { path: 'learning-path', name: 'StudentLearningPath', component: () => import('@/views/student/LearningPath.vue') }
    ]
  },
  {
    path: '/research',
    component: () => import('@/components/layout/MainLayout.vue'),
    children: [
      { path: 'literature', name: 'ResearchLiterature', component: () => import('@/views/research/Literature.vue') },
      { path: 'data-analysis', name: 'ResearchDataAnalysis', component: () => import('@/views/research/DataAnalysis.vue') },
      { path: 'academic-writing', name: 'ResearchAcademicWriting', component: () => import('@/views/research/AcademicWriting.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
