<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Sidebar intacto -->
      <Sidebar />
  
      <!-- Pane derecho -->
      <div class="flex-1 min-w-0 flex flex-col">
        <!-- ===== Header compacto (py-3) ===== -->
        <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-3">
            <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Mis Cursos</h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Explora material, tareas y tu progreso por curso.
            </p>
          </div>
        </header>
  
        <!-- ===== Contenido ===== -->
        <main class="flex-1 overflow-y-auto">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
            <!-- Subfiltros simples (sin tarjetas) -->
            <div class="mb-6 flex flex-wrap items-center gap-2">
              <button type="button" :class="['chip', filter==='all' ? 'chip-active' : 'chip-idle']" @click="filter='all'">Todos</button>
              <button type="button" :class="['chip', filter==='inprogress' ? 'chip-active' : 'chip-idle']" @click="filter='inprogress'">En progreso</button>
              <button type="button" :class="['chip', filter==='completed' ? 'chip-active' : 'chip-idle']" @click="filter='completed'">Completados</button>
  
              <div class="ml-auto flex items-center gap-2">
                <label for="order" class="sr-only">Ordenar</label>
                <select id="order" v-model="order" class="select">
                  <option value="name_asc">Nombre (A-Z)</option>
                  <option value="name_desc">Nombre (Z-A)</option>
                  <option value="progress_desc">Progreso ↓</option>
                  <option value="progress_asc">Progreso ↑</option>
                </select>
              </div>
            </div>
  
            <!-- Skeleton -->
            <div v-if="isLoading" class="space-y-4">
              <div v-for="i in 4" :key="'skel-'+i" class="row">
                <div class="avatar-skel"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 w-56 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                  <div class="h-3 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                  <div class="h-2 w-full max-w-md rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                </div>
              </div>
            </div>
  
            <!-- Lista de cursos (líneas sólidas, sin tarjetas) -->
            <section v-else-if="visible.length">
              <ul class="divide-y divide-gray-200 dark:divide-gray-800">
                <li
                  v-for="course in visible"
                  :key="course.id"
                  class="row group"
                  @click="goCourse(course.id)"
                >
                  <!-- Avatar con iniciales -->
                  <div class="avatar" :style="avatarStyle(course.name)">
                    {{ initials(course.name) }}
                  </div>
  
                  <!-- Texto -->
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                      <h3 class="title truncate">{{ course.name }}</h3>
                      <span class="pill tiny" :class="pillClass(course.progress)">
                        {{ labelProgress(course.progress) }}
                      </span>
                    </div>
                    <p class="meta truncate">Prof. {{ course.teacher }}</p>
  
                    <!-- Barra de progreso sólida -->
                    <div class="mt-2">
                      <div class="track">
                        <div class="fill" :style="{ width: course.progress + '%' }"></div>
                      </div>
                      <div class="mt-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Progreso</span>
                        <span class="font-bold text-gray-800 dark:text-gray-200">{{ course.progress }}%</span>
                      </div>
                    </div>
                  </div>
  
                  <!-- CTA minimal -->
                  <div class="cta">
                    <span class="cta-text">Ver</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </li>
              </ul>
            </section>
  
            <!-- Vacío -->
            <div v-else class="empty">
              Aún no estás matriculado en ningún curso para este periodo.
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import Sidebar from './Sidebar.vue'
  
  const courses = ref([])
  const isLoading = ref(true)
  
  /* Filtros simples */
  const filter = ref('all')         // 'all' | 'inprogress' | 'completed'
  const order  = ref('name_asc')    // 'name_asc' | 'name_desc' | 'progress_desc' | 'progress_asc'
  
  /* Helpers UI */
  const initials = (name) => {
    if (!name) return 'C'
    const p = name.trim().split(/\s+/)
    return (p[0][0] + (p[1]?.[0] || '')).toUpperCase()
  }
  const avatarStyle = (name) => {
    // degrade sólido basado en indigo (coherente con tu sidebar)
    // variación leve por hash del nombre para hacerlo menos monótono
    const seed = [...name].reduce((a,c)=>a+c.charCodeAt(0),0) % 3
    const palettes = [
      ['#4f46e5', '#4338ca'], // indigo-600 → indigo-700
      ['#4338ca', '#3730a3'], // indigo-700 → indigo-800
      ['#6366f1', '#4f46e5'], // indigo-500 → indigo-600
    ]
    const [c1,c2] = palettes[seed]
    return { background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)` }
  }
  
  const labelProgress = (p) => p >= 90 ? 'Completado' : (p >= 40 ? 'En progreso' : 'Inicio')
  const pillClass = (p) => {
    if (p >= 90) return 'pill-green'
    if (p >= 40) return 'pill-amber'
    return 'pill-gray'
  }
  
  /* Computados de filtro + orden */
  const filtered = computed(() => {
    if (filter.value === 'completed') return courses.value.filter(c => c.progress >= 90)
    if (filter.value === 'inprogress') return courses.value.filter(c => c.progress < 90 && c.progress >= 0)
    return courses.value
  })
  
  const visible = computed(() => {
    const arr = [...filtered.value]
    switch (order.value) {
      case 'name_desc':      return arr.sort((a,b) => b.name.localeCompare(a.name))
      case 'progress_desc':  return arr.sort((a,b) => b.progress - a.progress)
      case 'progress_asc':   return arr.sort((a,b) => a.progress - b.progress)
      default:               return arr.sort((a,b) => a.name.localeCompare(b.name))
    }
  })
  
  /* Navegación */
  const goCourse = (id) => {
    // Evita overlay absoluto; navega de forma explícita
    window.location.href = `/student/courses/${id}`
  }
  
  /* Carga (simulada; tu app real llama a la API) */
  const fetchCourses = async () => {
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 800))
      courses.value = [
        { id: 1, name: 'Matemática Avanzada',            teacher: 'Carlos Ruiz',   progress: 75 },
        { id: 2, name: 'Historia del Siglo XX',          teacher: 'Ana García',     progress: 50 },
        { id: 3, name: 'Programación Orientada a Objetos', teacher: 'Pedro Martinez', progress: 90 },
        { id: 4, name: 'Física Básica',                  teacher: 'María Torres',   progress: 15 },
      ]
    } catch (e) {
      console.error('Error al cargar los cursos:', e)
    } finally {
      isLoading.value = false
    }
  }
  onMounted(fetchCourses)
  </script>
  
  <style scoped>
  /* ===== Chips / select ===== */
  .chip {
    @apply inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600;
  }
  .chip-idle { @apply bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700; }
  .chip-active { @apply text-white bg-indigo-600; }
  .select {
    @apply rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800
           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600
           dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100;
  }
  
  /* ===== Fila (sin tarjetas) ===== */
  .row { @apply relative flex items-start gap-4 py-4; }
  .row + .row { @apply border-t border-gray-200 dark:border-gray-800; }
  .row:hover .cta-text { @apply underline; }
  .row:hover .cta-icon { transform: translateX(2px); }
  
  /* Avatar con iniciales */
  .avatar {
    @apply h-10 w-10 sm:h-12 sm:w-12 rounded-full flex items-center justify-center text-white font-extrabold select-none flex-shrink-0;
  }
  .avatar-skel { @apply h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse; }
  
  /* Tipografía */
  .title { @apply text-sm sm:text-base font-extrabold text-gray-900 dark:text-gray-100; }
  .meta { @apply text-xs text-gray-600 dark:text-gray-400; }
  
  /* Progreso */
  .track {
    @apply h-2 w-full rounded bg-gray-200 dark:bg-gray-800 overflow-hidden;
  }
  .fill {
    @apply h-full bg-indigo-600;
    transition: width .25s ease;
  }
  
  /* Pills de estado */
  .pill { @apply inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold; }
  .tiny { @apply ml-1; }
  .pill-green { @apply bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300; }
  .pill-amber { @apply bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300; }
  .pill-gray  { @apply bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200; }
  
  /* CTA minimal */
  .cta { @apply ml-2 flex items-center gap-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300; }
  .cta-icon { transition: transform .2s ease; }
  
  /* Estado vacío */
  .empty { @apply text-center py-16 text-gray-600 dark:text-gray-400; }
  
  /* Accesibilidad */
  .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0; }
  </style>
  