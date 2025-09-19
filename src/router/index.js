// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// ✨ 1. IMPORTA LA TIENDA DE USUARIO
import { useUserStore } from '@/stores/user'

const LoginView = () => import('../views/LoginView.vue')
const RegisterView = () => import('../views/Register.vue')

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { title: 'Iniciar Sesión | Sistema Académico' }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { title: 'Crear Cuenta | Sistema Académico' }
  },
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

// ✨ 2. GUARDIÁN DE RUTA ACTUALIZADO
router.beforeEach((to, from, next) => {
  // Inicializa la tienda Pinia aquí para poder usarla
  const userStore = useUserStore()

  // Verifica si la ruta requiere autenticación y si el usuario NO ha iniciado sesión
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // Redirige al login
    next({ name: 'Login' })
  } else {
    // Si todo está bien, permite la navegación
    next()
  }
})

// Actualiza el título del documento (sin cambios)
router.afterEach((to) => {
  document.title = to.meta?.title || 'Sistema Académico'
})

export default router