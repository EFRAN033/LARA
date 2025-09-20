<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Sidebar intacto -->
    <Sidebar />

    <!-- Pane derecho -->
    <div class="flex-1 min-w-0 flex flex-col">
      <!-- ===== Header compacto (py-3, sin tapar sidebar) ===== -->
      <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-3">
          <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
            Hola, <span class="text-indigo-700 dark:text-indigo-400">{{ studentName }}</span>
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Vista clara de tu avance académico.
          </p>
        </div>
      </header>

      <!-- ===== Contenido ===== -->
      <main class="flex-1 overflow-y-auto">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-10">

          <!-- Sub-nav pegajosa (chips sólidas, sin tarjetas) -->
          <nav
            class="sticky top-[48px] z-10 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 py-2.5 bg-gray-50/95 dark:bg-gray-950/95 backdrop-blur border-y border-gray-200 dark:border-gray-800"
            aria-label="Secciones del tablero"
          >
            <ul class="flex items-center gap-2 text-sm">
              <li><a href="#cursos" class="chip">Cursos</a></li>
              <li><a href="#tareas" class="chip">Tareas</a></li>
              <li><a href="#rendimiento" class="chip">Rendimiento</a></li>
            </ul>
          </nav>

          <!-- Cuerpo -->
          <div class="mt-8 space-y-14">

            <!-- ===== Sección: Cursos (lista sólida, sin cards) ===== -->
            <section id="cursos" aria-labelledby="cursos-title">
              <div class="section-head">
                <div class="section-icon bg-indigo-700 text-white">
                  <!-- Libro -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6l-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h4l2-2m0-12l2-2h4a2 2 0 012 2v12a2 2 0 01-2 2h-4l-2-2m0-12v12"/>
                  </svg>
                </div>
                <h2 id="cursos-title" class="section-title">Mis Cursos Actuales</h2>
              </div>

              <ul class="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
                <li
                  v-for="course in courses"
                  :key="course.name"
                  class="item-row group"
                >
                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">{{ course.name }}</p>
                    <p class="truncate text-xs text-gray-600 dark:text-gray-400">Docente: {{ course.teacher }}</p>
                  </div>

                  <button
                    type="button"
                    class="inline-flex items-center text-xs font-semibold text-indigo-700 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200"
                    @click="$router.push({ path: '/student/courses', query: { q: course.name } })"
                  >
                    Ver detalles
                    <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                </li>
              </ul>
            </section>

            <!-- ===== Sección: Tareas (timeline simple, sin cards) ===== -->
            <section id="tareas" aria-labelledby="tareas-title">
              <div class="section-head">
                <div class="section-icon bg-amber-600 text-white">
                  <!-- Calendario -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h2 id="tareas-title" class="section-title">Próximas Tareas y Evaluaciones</h2>
              </div>

              <!-- Línea vertical con puntos -->
              <ol class="mt-6 relative ml-5 pl-6 border-l-2 border-gray-200 dark:border-gray-800">
                <li v-for="task in tasks" :key="task.name" class="relative pb-6 last:pb-0">
                  <span class="absolute -left-[10px] top-1.5 inline-block h-2.5 w-2.5 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                  <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0">
                      <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ task.name }}</p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">{{ task.course }}</p>
                    </div>
                    <span :class="['pill', task.dueClass]">{{ task.dueDate }}</span>
                  </div>
                </li>
              </ol>
            </section>

            <!-- ===== Sección: Rendimiento (tabla compacta, sólida) ===== -->
            <section id="rendimiento" aria-labelledby="rend-title">
              <div class="section-head">
                <div class="section-icon bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900">
                  <!-- Gráfico -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 3v18M5 13l6-6 6 6"/>
                  </svg>
                </div>
                <h2 id="rend-title" class="section-title">Rendimiento Reciente</h2>
              </div>

              <div class="mt-4 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                <table class="min-w-full text-sm">
                  <thead class="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                    <tr>
                      <th scope="col" class="table-th">Evaluación</th>
                      <th scope="col" class="table-th">Curso</th>
                      <th scope="col" class="table-th text-right">Nota</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr v-for="g in grades" :key="g.name" class="hover:bg-gray-50 dark:hover:bg-gray-900">
                      <td class="table-td font-medium text-gray-900 dark:text-gray-100">{{ g.name }}</td>
                      <td class="table-td text-gray-700 dark:text-gray-300">{{ g.course }}</td>
                      <td class="table-td text-right">
                        <span :class="gradeColor(g.score)" class="inline-flex items-center rounded px-2 py-0.5 text-xs font-bold">
                          {{ g.score }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import Sidebar from './Sidebar.vue' // mantiene tu estructura y BD

const userStore = useUserStore()

const studentName = computed(() => userStore.user?.full_name || 'Estudiante')

/* Datos de ejemplo; en producción vienen de tu API/BD */
const courses = ref([
  { name: 'Matemática Avanzada', teacher: 'Carlos Ruiz' },
  { name: 'Historia del Siglo XX', teacher: 'Ana García' },
  { name: 'Programación Orientada a Objetos', teacher: 'Pedro Martinez' }
])

const tasks = ref([
  { name: 'Ensayo Final', course: 'Historia del Siglo XX', dueDate: 'Vence en 3 días', dueClass: 'pill-warning' },
  { name: 'Proyecto de POO', course: 'Programación O.O.', dueDate: 'Vence en 1 semana', dueClass: 'pill-info' },
  { name: 'Examen de Unidad', course: 'Matemática Avanzada', dueDate: 'Vence hoy', dueClass: 'pill-danger' }
])

const grades = ref([
  { name: 'Parcial de Matemática', course: 'Matemática Avanzada', score: 18.5 },
  { name: 'Práctica 1', course: 'Programación O.O.', score: 16.0 },
  { name: 'Control de Lectura', course: 'Historia del Siglo XX', score: 10.0 }
])

/* Color sólido para notas */
const gradeColor = (score) => {
  if (score >= 17) return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
  if (score >= 13) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
  return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
}
</script>

<style scoped>
/* ===== Chips del subnav ===== */
.chip {
  @apply inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1 text-gray-700
         hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600
         dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800;
}

/* ===== Encabezados de sección ===== */
.section-head { @apply flex items-center gap-3; }
.section-icon { @apply inline-flex h-9 w-9 items-center justify-center rounded; }
.section-title { @apply text-lg sm:text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight; }

/* ===== Filas de cursos ===== */
.item-row { @apply flex items-center justify-between py-3 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition; }

/* ===== Pills de vencimiento ===== */
.pill { @apply text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap; }
.pill-danger { @apply bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300; }
.pill-warning { @apply bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300; }
.pill-info { @apply bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200; }

/* ===== Tabla compacta ===== */
.table-th { @apply px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide; }
.table-td { @apply px-4 py-3 align-middle; }
</style>
