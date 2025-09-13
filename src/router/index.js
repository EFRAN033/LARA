// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// ✅ Lazy loading para vistas
const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/Register.vue')
// ✨ NUEVA VISTA: Lazy loading para el Dashboard
const DashboardView = () => import('../views/DashboardView.vue')

/** * Utilidad mínima para auth.
 * Ajusta según tu backend (token/JWT). 
 * Aquí usamos 'auth_token' y, como fallback de desarrollo, 'lastUser'.
 */
function isAuthenticated() {
  return !!(localStorage.getItem('auth_token') || localStorage.getItem('lastUser'))
}

// 1) Define tus rutas
const routes = [
  // Redirige raíz a /login
  { path: '/', redirect: '/login' },

  // Login
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Iniciar Sesión | Sistema Académico' }
  },

  // Register
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { title: 'Crear Cuenta | Sistema Académico' }
  },

  // ⚠️ RUTA PROTEGIDA: Panel principal después del login
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true, title: 'Panel | Sistema Académico' }
  },

  // 404 Catch-all
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    // Puedes crear una vista NotFound.vue y cargarla lazy:
    component: {
      // Componente mínimo inline para 404 (reemplaza por tu vista si quieres)
      template: `<div style="padding:2rem">
                  <h1 style="font-weight:800;font-size:1.5rem">404</h1>
                  <p>La página no existe.</p>
                  <p><a href="/login" style="color:#2563eb">Ir a Iniciar Sesión</a></p>
                 </div>`
    },
    meta: { title: '404 | Sistema Académico' }
  }
]

// 2) Crea el router
const router = createRouter({
  // Usa BASE_URL de Vite por si tu app está en subcarpeta
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

// 3) Guard opcional para rutas protegidas
router.beforeEach((to, from, next) => {
  // Verifica si la ruta requiere autenticación y el usuario no está autenticado
  if (to.meta?.requiresAuth && !isAuthenticated()) {
    // Redirige a login con 'redirect' para volver luego a la página que intentaba acceder
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }
  // Si todo está bien, permite la navegación
  next()
})

// 4) Actualiza el título del documento en cada cambio de ruta
router.afterEach((to) => {
  const defaultTitle = 'Sistema Académico'
  document.title = to.meta?.title || defaultTitle
})

export default router