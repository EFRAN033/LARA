<template>
    <aside
      class="relative flex h-screen flex-col overflow-y-auto bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-[width] duration-200"
      :class="isCollapsed ? 'w-[76px]' : 'w-80'"
      aria-label="Barra lateral"
    >
      <div class="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-indigo-700 dark:bg-indigo-500"></div>
  
      <div class="flex items-center gap-3 px-5 pt-6 pb-4">
        <button
          type="button"
          @click="toggleCollapse"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
          :title="isCollapsed ? 'Expandir' : 'Colapsar'"
          aria-label="Alternar barra lateral (Ctrl/Cmd+B)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="isCollapsed" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
  
        <div class="min-w-0" :class="isCollapsed ? 'opacity-0 pointer-events-none select-none w-0' : 'opacity-100'">
          <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-gray-100 leading-none">
            I.E. <span class="text-indigo-700 dark:text-indigo-400">20798</span>
          </h1>
          <p class="mt-0.5 text-xs text-gray-600 dark:text-gray-400">Portal Académico</p>
        </div>
      </div>
  
      <div class="px-5"><div class="h-px w-full bg-gray-200 dark:bg-gray-800"></div></div>
  
      <div class="flex items-center gap-3 px-5 py-4">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-white text-sm font-bold" :title="userName">
          <span>{{ userInitials }}</span>
        </div>
        <div class="min-w-0" v-if="!isCollapsed">
          <p class="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{{ userName }}</p>
          <span class="block text-[11px] capitalize text-gray-600 dark:text-gray-400">{{ userRole }}</span>
        </div>
      </div>
  
      <div v-if="!isCollapsed" class="px-5 py-2">
        <div class="flex items-center gap-2">
          <span class="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
          <span class="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-500">Navegación</span>
          <span class="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
        </div>
      </div>
  
      <nav class="flex-1 px-3 space-y-1" aria-label="Principal">
        <router-link
          v-for="link in linksForRole"
          :key="link.name"
          :to="link.path"
          class="nav-item"
          exact-active-class="is-active"
          :title="isCollapsed ? link.name : undefined"
        >
          <component :is="link.icon" class="h-5 w-5" />
          <span v-if="!isCollapsed" class="truncate text-sm font-medium">{{ link.name }}</span>
        </router-link>
      </nav>
  
      <div v-if="!isCollapsed" class="px-5 py-2">
        <div class="flex items-center gap-2">
          <span class="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
          <span class="text-[10px] font-extrabold uppercase tracking-[0.14em] text-gray-500">Sistema</span>
          <span class="h-px flex-1 bg-gray-200 dark:bg-gray-800"></span>
        </div>
      </div>
  
      <div class="px-3 space-y-1" aria-label="Sistema">
        <button class="nav-item" :title="isCollapsed ? 'Ajustes' : undefined" @click="router.push('/settings')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.57-.905 3.356.88 2.45 2.45a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.065 2.572c.905 1.57-.88 3.356-2.45 2.45a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.065c-1.57.905-3.356-.88-2.45-2.45A1.724 1.724 0 003.238 13.8c-1.756-.426-1.756-2.924 0-3.35A1.724 1.724 0 004.304 7.88c-.905-1.57.88-3.356 2.45-2.45.93.537 2.1.214 2.573-1.113z" />
          </svg>
          <span v-if="!isCollapsed" class="truncate text-sm font-medium">Ajustes</span>
        </button>
  
        <button
          class="nav-item text-red-700 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          :title="isCollapsed ? 'Cerrar sesión' : undefined"
          @click="handleLogout"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H9m4 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1" />
          </svg>
          <span v-if="!isCollapsed" class="truncate text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>
  
      <div class="mt-auto px-5 py-4">
        <div class="flex items-center justify-between" :class="isCollapsed ? 'sr-only' : ''">
          <span class="text-[11px] text-gray-500">v{{ appVersion }}</span>
          <button
            class="rounded-md border border-gray-300 px-2 py-1 text-[11px] font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            @click="toggleTheme"
          >
            {{ themeLabel }}
          </button>
        </div>
      </div>
    </aside>
  </template>
  
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  AcademicCapIcon,
  BellIcon,
  UserCircleIcon,
  // --- ✨ ICONOS NUEVOS IMPORTADOS ---
  IdentificationIcon,       // Para Matrícula
  ClipboardDocumentCheckIcon  // Para Asistencia
} from '@heroicons/vue/24/outline'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// Estado UI (sin cambios)
const isCollapsed = ref(false)
try {
  const savedCollapsed = localStorage.getItem('sidebar:collapsed')
  if (savedCollapsed !== null) isCollapsed.value = savedCollapsed === 'true'
} catch {}
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  try { localStorage.setItem('sidebar:collapsed', String(isCollapsed.value)) } catch {}
}

// Atajo de teclado (sin cambios)
const onKey = (e) => {
  const isCtrlOrCmd = e.ctrlKey || e.metaKey
  if (isCtrlOrCmd && e.key.toLowerCase() === 'b') {
    e.preventDefault()
    toggleCollapse()
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

// Usuario (sin cambios)
const userName = computed(() => userStore.user?.full_name || 'Usuario')
const userRole = computed(() => userStore.user?.role || 'student')
const userInitials = computed(() => {
  const parts = (userName.value || '').trim().split(/\s+/)
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
  return parts[0] ? parts[0].slice(0, 2).toUpperCase() : 'U'
})

// --- ✨ LINKS POR ROL (ACTUALIZADO) ---
const links = {
  admin: [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Usuarios', path: '/admin/users', icon: UsersIcon },
    { name: 'Cursos', path: '/admin/courses', icon: BookOpenIcon },
    { name: 'Matrículas', path: '/admin/enrollments', icon: ClipboardDocumentListIcon }
  ],
  teacher: [
    { name: 'Dashboard', path: '/teacher-dashboard', icon: HomeIcon },
    { name: 'Mis Cursos', path: '/teacher/courses', icon: AcademicCapIcon },
    { name: 'Calificaciones', path: '/teacher/grades', icon: ClipboardDocumentListIcon },
    { name: 'Anuncios', path: '/teacher/announcements', icon: BellIcon }
  ],
  student: [
    { name: 'Resumen Académico', path: '/student-dashboard', icon: HomeIcon },
    { name: 'Mis Cursos', path: '/student/courses', icon: BookOpenIcon },
    { name: 'Calificaciones', path: '/student/grades', icon: AcademicCapIcon },
    // --- ✅ SECCIONES AÑADIDAS ---
    { name: 'Mi Asistencia', path: '/student/attendance', icon: ClipboardDocumentCheckIcon },
    { name: 'Matrícula', path: '/student/enrollment', icon: IdentificationIcon },
    { name: 'Anuncios', path: '/student/announcements', icon: BellIcon },
    // ---
    { name: 'Mi Perfil', path: '/student/profile', icon: UserCircleIcon }
  ]
}
const linksForRole = computed(() => links[userRole.value] || [])

// Ruta actual (sin cambios)
const currentPath = computed(() => route.path)

// Tema (sin cambios)
const appVersion = '1.0.1' // Versión actualizada para reflejar cambios
const themeLabel = computed(() =>
  document.documentElement.classList.contains('dark') ? 'Tema claro' : 'Tema oscuro'
)
const toggleTheme = () => {
  const el = document.documentElement
  const isDark = el.classList.toggle('dark')
  try { localStorage.setItem('theme', isDark ? 'dark' : 'light') } catch {}
}
try {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') document.documentElement.classList.add('dark')
} catch {}

// Logout (sin cambios)
const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* (Tus estilos se mantienen exactamente igual) */
.nav-item {
  @apply relative flex items-center gap-3 rounded-md px-2.5 text-gray-700 transition
         hover:bg-gray-100 hover:text-gray-900
         focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600
         dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.is-active {
  @apply bg-indigo-50 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200;
  border-left: 3px solid rgb(67 56 202);
  padding-left: calc(0.625rem - 3px);
}
:global(.nav-item svg){ @apply text-gray-600 dark:text-gray-300; }
:global(.nav-item:hover svg){ @apply text-gray-900 dark:text-white; }
</style>