import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    redirect: '/dashboard/overview',
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    component: () => import('@/components/layout/DashboardLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'overview', name: 'DashboardOverview', component: () => import('@/views/dashboard/Overview.vue') },
      { path: 'assessment', name: 'DashboardAssessment', component: () => import('@/views/dashboard/Assessment.vue') },
      { path: 'qa', name: 'DashboardQA', component: () => import('@/views/dashboard/QA.vue') },
      { path: 'simulation', name: 'DashboardSimulation', component: () => import('@/views/dashboard/Simulation.vue') },
      { path: 'analysis', name: 'DashboardAnalysis', component: () => import('@/views/dashboard/Analysis.vue') }
    ]
  },
  {
    path: '/teacher',
    component: () => import('@/components/layout/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'preparation', name: 'TeacherPreparation', component: () => import('@/views/teacher/Preparation.vue') },
      { path: 'grading', name: 'TeacherGrading', component: () => import('@/views/teacher/Grading.vue') },
      { path: 'case-design', name: 'TeacherCaseDesign', component: () => import('@/views/teacher/CaseDesign.vue') }
    ]
  },
  {
    path: '/student',
    component: () => import('@/components/layout/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: 'qa', name: 'StudentQA', component: () => import('@/views/student/QA.vue') },
      { path: 'calculation', name: 'StudentCalculation', component: () => import('@/views/student/Calculation.vue') },
      { path: 'learning-path', name: 'StudentLearningPath', component: () => import('@/views/student/LearningPath.vue') }
    ]
  },
  {
    path: '/research',
    component: () => import('@/components/layout/MainLayout.vue'),
    meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/teacher/preparation')
  } else {
    next()
  }
})

export default router
