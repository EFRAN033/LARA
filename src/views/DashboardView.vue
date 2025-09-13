<template>
    <div class="antialiased bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <div class="flex h-screen overflow-y-hidden">
        <aside
          class="fixed inset-y-0 z-50 flex-shrink-0 w-64 px-4 py-5 transition-transform duration-300 ease-in-out bg-white border-r dark:bg-slate-800 dark:border-slate-700/60 lg:relative lg:translate-x-0"
          :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
        >
          <div class="flex items-center justify-between mb-8">
            <RouterLink to="/dashboard" class="inline-flex items-center gap-2 text-slate-900 dark:text-white">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 2 2 7l10 5 10-5-10-5Z"></path><path d="M2 12l10 5 10-5"></path><path d="M2 17l10 5 10-5"></path>
                </svg>
              </span>
              <span class="text-base font-bold tracking-tight">I.E. 20798</span>
            </RouterLink>
            <button @click="isSidebarOpen = false" class="lg:hidden icon-btn">
               <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
  
          <nav class="flex flex-col gap-1.5">
            <h3 class="px-3 mt-4 mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">Menú</h3>
            
            <a href="#" class="nav-item active">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              <span>Dashboard</span>
            </a>
            
            <a href="#" class="nav-item">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6-2.292m0 0A9.043 9.043 0 0 1 9 7.5a9.018 9.018 0 0 0-3 5.25m6-5.25c1.508 0 2.857.482 4 1.292m-4-1.292v14.25" /></svg>
              <span>Cursos</span>
            </a>
            
            <a href="#" class="nav-item">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
              <span>Alumnos</span>
            </a>
  
            <a href="#" class="nav-item">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
              <span>Docentes</span>
            </a>
            
            <h3 class="px-3 mt-4 mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">Académico</h3>
  
            <a href="#" class="nav-item">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
              <span>Matrículas</span>
            </a>
  
             <a href="#" class="nav-item">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" /></svg>
              <span>Notas</span>
            </a>
  
            <a href="#" class="nav-item">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M9.75 14.25h.008v.008h-.008v-.008zm3 0h.008v.008h-.008v-.008zm3 0h.008v.008h-.008v-.008z" /></svg>
              <span>Asistencias</span>
            </a>
  
          </nav>
        </aside>
  
        <div v-if="isSidebarOpen" class="fixed inset-0 z-40 bg-black/40 lg:hidden" @click="isSidebarOpen = false"></div>
  
        <div class="flex flex-col flex-1 overflow-y-auto">
          <header class="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/60 sm:px-6 backdrop-blur dark:bg-slate-800/60 dark:border-b dark:border-slate-700/60">
            <button @click="isSidebarOpen = !isSidebarOpen" class="icon-btn lg:hidden">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            </button>
            <div class="text-sm font-semibold uppercase text-slate-500 dark:text-slate-400 lg:hidden">Portal Académico</div>
            
            <div class="flex items-center gap-4 ml-auto">
               <button @click="toggleTheme" class="icon-btn">
                <svg v-if="theme==='light'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.95-4.243l-1.59-1.591M5.25 12H3m4.243-4.95l-1.59-1.591M12 8.25A3.75 3.75 0 0115.75 12 3.75 3.75 0 0112 15.75 3.75 3.75 0 018.25 12 3.75 3.75 0 0112 8.25z"></path></svg>
                <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"></path></svg>
               </button>
  
              <div class="relative">
                <button class="flex items-center gap-2">
                  <img class="object-cover w-8 h-8 rounded-full" src="https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff&bold=true" alt="User avatar" />
                  <span class="hidden text-sm font-semibold sm:block">{{ user.name }}</span>
                </button>
              </div>
  
              <button @click="logout" class="icon-btn" title="Cerrar Sesión">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
              </button>
            </div>
          </header>
  
          <main class="flex-1 p-4 sm:p-6 lg:p-8">
            <div class="p-8 bg-white rounded-lg shadow-md dark:bg-slate-800">
              <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                ¡Bienvenido al Portal Académico!
              </h1>
              <p class="mt-2 text-slate-600 dark:text-slate-400">
                Usa el menú de la izquierda para navegar por los diferentes módulos del sistema.
              </p>
            </div>
            
            </main>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // --- ESTADO DEL SIDEBAR ---
  const isSidebarOpen = ref(window.innerWidth >= 1024) // Abierto por defecto en desktop
  window.addEventListener('resize', () => { isSidebarOpen.value = window.innerWidth >= 1024 })
  
  
  // --- MANEJO DEL TEMA (OSCURO/CLARO) ---
  const theme = ref('light')
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    applyTheme()
  }
  function applyTheme() {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme.value)
  }
  
  
  // --- DATOS DEL USUARIO Y LOGOUT ---
  // Esto es un placeholder. En una app real, obtendrías estos datos de Pinia o una API.
  const user = ref({
    name: localStorage.getItem('lastUser') || 'Usuario', // Recupera el usuario del login
    // rol: 'admin' // Podrías tener el rol para mostrar/ocultar menú
  })
  
  const logout = () => {
    // Limpia los datos de sesión
    localStorage.removeItem('lastUser')
    localStorage.removeItem('auth_token') // Si usas tokens
  
    // Redirige al login
    router.push('/login')
  }
  
  
  // --- SE EJECUTA CUANDO EL COMPONENTE SE MONTA ---
  onMounted(() => {
    // Carga el tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light'
    theme.value = savedTheme
    applyTheme()
  })
  </script>
  
  <style scoped>
  /* Scoped styles para este componente */
  .icon-btn {
    @apply rounded-full p-1.5 text-slate-500 transition hover:text-slate-800 hover:bg-slate-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50;
  }
  
  .nav-item {
    @apply flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 transition-colors duration-200;
    @apply hover:bg-slate-100 hover:text-slate-900;
    @apply dark:text-slate-300 dark:hover:bg-slate-700/50 dark:hover:text-white;
  }
  .nav-item.active {
    @apply bg-blue-50 text-blue-600 dark:bg-slate-700 dark:text-white;
  }
  </style>