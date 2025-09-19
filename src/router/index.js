// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// Vistas públicas
const LoginView = () => import('../views/LoginView.vue')

// Vistas protegidas (paneles de control)
const AdminView = () => import('../views/Admin/AdminView.vue')
const TeacherView = () => import('../views/Teacher/TeacherView.vue')
const StudentView = () => import('../views/Studen/StudentView.vue')


const routes = [
  // Redirección por defecto al login
  { path: '/', redirect: '/login' },
  
  // Ruta pública para iniciar sesión
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Iniciar Sesión | Sistema Académico' }
  },

  // --- RUTA DE REGISTRO ELIMINADA ---
  // Se elimina para que solo el administrador pueda crear cuentas.
  
  // --- RUTAS PROTEGIDAS ---
  // Se requiere que el usuario haya iniciado sesión (requiresAuth: true)
  {
    path: '/dashboard',
    name: 'AdminDashboard',
    component: AdminView,
    meta: { title: 'Panel de Administrador', requiresAuth: true }
  },
  {
    path: '/teacher-dashboard',
    name: 'TeacherDashboard',
    component: TeacherView,
    meta: { title: 'Panel del Docente', requiresAuth: true }
  },
    {
    path: '/student-dashboard',
    name: 'StudentDashboard',
    component: StudentView,
    meta: { title: 'Portal del Estudiante', requiresAuth: true }
  },

  // Ruta para páginas no encontradas (404)
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: {
      template: `<div style="padding:2rem">
                  <h1 style="font-weight:800;font-size:1.5rem">404</h1>
                  <p>La página no existe.</p>
                  <p><a href="/login" style="color:#2563eb">Ir a Iniciar Sesión</a></p>
                 </div>`
    },
    meta: { title: '404 | Sistema Académico' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

// Guardián de navegación para proteger rutas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // Si la ruta requiere autenticación y el usuario NO ha iniciado sesión
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // Redirige al login
    next({ name: 'Login' })
  } else {
    // Si el usuario ya está logueado y trata de ir al login, puedes redirigirlo a su dashboard (opcional)
    if (to.name === 'Login' && userStore.isLoggedIn) {
        // Aquí necesitarás una lógica para saber a qué dashboard redirigir (admin, teacher, etc.)
        // Por ahora, lo dejamos pasar, pero es una mejora a futuro.
        next()
    } else {
       // Permite la navegación
       next()
    }
  }
})

// Actualiza el título de la página en cada cambio de ruta
router.afterEach((to) => {
  document.title = to.meta?.title || 'Sistema Académico'
})

export default router