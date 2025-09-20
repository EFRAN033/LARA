// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// --- Vistas Públicas ---
const LoginView = () => import('../views/LoginView.vue')

// --- Vistas de Paneles de Control ---
const AdminView = () => import('../views/Admin/AdminView.vue')
const TeacherView = () => import('../views/Teacher/TeacherView.vue')
const StudentView = () => import('../views/Studen/StudentView.vue')

// --- Vistas de la Sección de Estudiante ---
const StudentCourses = () => import('../views/Studen/Courses.vue')
const StudentQualifications = () => import('../views/Studen/Qualifications.vue') // <-- AÑADIDO
const StudentAttendance = () => import('../views/Studen/Attendance.vue')
const StudentEnrollment = () => import('../views/Studen/Tuition.vue')
const StudentAnnouncements = () => import('../views/Studen/Advertisement.vue')
const StudentProfile = () => import('../views/Studen/Profile.vue')

// --- Vista General ---
const SettingsView = () => import('../views/Studen/Settings.vue')

const routes = [
  // Redirección por defecto
  { path: '/', redirect: '/login' },
  
  // Ruta pública
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Iniciar Sesión | Sistema Académico' }
  },

  // --- Rutas de Administrador ---
  {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: AdminView,
    meta: { title: 'Panel de Administrador', requiresAuth: true, roles: ['admin'] }
  },
  
  // --- Rutas de Docente ---
  {
    path: '/teacher-dashboard',
    name: 'TeacherDashboard',
    component: TeacherView,
    meta: { title: 'Panel del Docente', requiresAuth: true, roles: ['teacher'] }
  },

  // --- Rutas de Estudiante ---
  {
    path: '/student-dashboard',
    name: 'StudentDashboard',
    component: StudentView,
    meta: { title: 'Portal del Estudiante', requiresAuth: true, roles: ['student'] }
  },
  {
    path: '/student/courses',
    name: 'StudentCourses',
    component: StudentCourses,
    meta: { title: 'Mis Cursos', requiresAuth: true, roles: ['student'] }
  },
  // --- ✨ RUTA DE QUALIFICATIONS AÑADIDA ---
  {
    path: '/student/qualifications',
    name: 'StudentQualifications',
    component: StudentQualifications,
    meta: { title: 'Mis Calificaciones', requiresAuth: true, roles: ['student'] }
  },
  {
    path: '/student/attendance',
    name: 'StudentAttendance',
    component: StudentAttendance,
    meta: { title: 'Mi Asistencia', requiresAuth: true, roles: ['student'] }
  },
  {
    path: '/student/enrollment',
    name: 'StudentEnrollment',
    component: StudentEnrollment,
    meta: { title: 'Matrícula', requiresAuth: true, roles: ['student'] }
  },
  {
    path: '/student/announcements',
    name: 'StudentAnnouncements',
    component: StudentAnnouncements,
    meta: { title: 'Anuncios', requiresAuth: true, roles: ['student'] }
  },
  {
    path: '/student/profile',
    name: 'StudentProfile',
    component: StudentProfile,
    meta: { title: 'Mi Perfil', requiresAuth: true, roles: ['student'] }
  },

  // --- Ruta General ---
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView,
    meta: { title: 'Ajustes', requiresAuth: true }
  },

  // Ruta para páginas no encontradas (404)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: { template: `<div class="p-8"><h1 class="font-bold text-2xl">404 - Error de capa 8</h1><router-link to="/login" class="text-indigo-600">Volver a iniciar sesión</router-link></div>` },
    meta: { title: '404 | No Encontrado' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// Guardián de navegación
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

// Actualiza el título de la página
router.afterEach((to) => {
  document.title = to.meta?.title || 'Sistema Académico'
})

export default router