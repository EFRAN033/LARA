<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Sidebar intacto -->
      <Sidebar />
  
      <!-- Pane derecho -->
      <div class="flex-1 min-w-0 flex flex-col">
        <!-- ===== Header compacto (py-3, no tapa el sidebar) ===== -->
        <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-3">
            <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Mis Calificaciones</h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Consulta tus notas y promedios por curso.
            </p>
          </div>
        </header>
  
        <!-- ===== Contenido ===== -->
        <main class="flex-1 overflow-y-auto">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
  
            <!-- Skeleton (sin tarjetas) -->
            <div v-if="isLoading" class="space-y-4">
              <div v-for="i in 4" :key="'skel-'+i" class="flex items-center gap-4">
                <div class="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                <div class="flex-1">
                  <div class="h-4 w-56 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                  <div class="mt-2 h-3 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                </div>
              </div>
            </div>
  
            <!-- Lista por cursos (estilo “spec sheet”, sin tarjetas) -->
            <section v-else-if="Object.keys(gradesByCourse).length" aria-label="Calificaciones por curso">
              <ul class="divide-y divide-gray-200 dark:divide-gray-800">
                <li
                  v-for="(grades, courseName) in gradesByCourse"
                  :key="courseName"
                  class="py-3"
                >
                  <!-- Cabezal del acordeón -->
                  <button
                    type="button"
                    class="acc-head"
                    @click="toggleAccordion(courseName)"
                    :aria-expanded="activeAccordion === courseName ? 'true' : 'false'"
                    :aria-controls="`panel-${slug(courseName)}`"
                  >
                    <div class="min-w-0">
                      <h2 class="acc-title truncate">
                        {{ courseName }}
                      </h2>
                      <p class="acc-sub">Promedio del curso</p>
                    </div>
  
                    <div class="ml-auto flex items-center gap-3">
                      <span
                        class="pill"
                        :class="avgPillClass(calculateAverageNumber(grades))"
                      >
                        {{ calculateAverage(grades) }}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5 text-gray-500 transition-transform duration-200"
                        :class="{ 'rotate-180': activeAccordion === courseName }"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        aria-hidden="true"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </button>
  
                  <!-- Panel -->
                  <div
                    v-show="activeAccordion === courseName"
                    :id="`panel-${slug(courseName)}`"
                    class="acc-panel"
                  >
                    <table class="min-w-full text-sm">
                      <thead class="bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                        <tr>
                          <th scope="col" class="th">Evaluación</th>
                          <th scope="col" class="th w-28 text-right">Nota</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                        <tr v-for="g in grades" :key="g.id" class="hover:bg-gray-50 dark:hover:bg-gray-900">
                          <td class="td font-medium text-gray-900 dark:text-gray-100">{{ g.name }}</td>
                          <td class="td text-right">
                            <span :class="gradePillClass(g.score)" class="pill font-bold">
                              {{ g.score.toFixed(1) }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </section>
  
            <!-- Estado vacío -->
            <div v-else class="empty">
              Aún no se han registrado calificaciones para este periodo.
            </div>
  
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import Sidebar from './Sidebar.vue'
  
  const gradesByCourse = ref({})
  const isLoading = ref(true)
  const activeAccordion = ref(null)
  
  /* Helpers */
  const slug = (s) => s.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9\-]/g,'')
  
  const toggleAccordion = (courseName) => {
    activeAccordion.value = activeAccordion.value === courseName ? null : courseName
  }
  
  const calculateAverageNumber = (grades) => {
    if (!grades?.length) return NaN
    return grades.reduce((sum, g) => sum + g.score, 0) / grades.length
  }
  const calculateAverage = (grades) => {
    const n = calculateAverageNumber(grades)
    return isNaN(n) ? 'N/A' : n.toFixed(1)
  }
  
  /* Pills de color según nota */
  const gradePillClass = (score) => {
    if (score >= 17) return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300'
    if (score >= 11) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
    return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
  }
  /* Pill del promedio (usa indigo si es alto para cohesión con tu sidebar) */
  const avgPillClass = (avg) => {
    if (isNaN(avg)) return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    if (avg >= 17) return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300'
    if (avg >= 11) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
    return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
  }
  
  /* Carga simulada (mantiene tu BD/APIs intactas) */
  const fetchGrades = async () => {
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 900))
      gradesByCourse.value = {
        'Matemática Avanzada': [
          { id: 1, name: 'Examen Parcial', score: 18.5 },
          { id: 2, name: 'Práctica 1',     score: 15.0 },
        ],
        'Historia del Siglo XX': [
          { id: 3, name: 'Ensayo Final',   score: 19.0 },
        ],
        'Programación Orientada a Objetos': [
          { id: 4, name: 'Proyecto Final', score: 10.0 },
        ],
      }
      const first = Object.keys(gradesByCourse.value)[0]
      activeAccordion.value = first || null
    } catch (e) {
      console.error('Error al cargar las calificaciones:', e)
    } finally {
      isLoading.value = false
    }
  }
  onMounted(fetchGrades)
  </script>
  
  <style scoped>
  /* ===== Encabezados y estructura ===== */
  .th { @apply px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide; }
  .td { @apply px-4 py-3; }
  
  /* ===== Acordeón “sin tarjetas” (líneas limpias) ===== */
  .acc-head {
    @apply w-full flex items-center gap-3 text-left px-1 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-900 transition;
  }
  .acc-title {
    @apply text-base sm:text-lg font-extrabold text-gray-900 dark:text-gray-100 tracking-tight;
  }
  .acc-sub {
    @apply text-xs text-gray-600 dark:text-gray-400;
  }
  .acc-panel {
    @apply mt-3;
  }
  
  /* ===== Pills ===== */
  .pill {
    @apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs;
  }
  
  /* ===== Estado vacío ===== */
  .empty {
    @apply text-center py-16 text-gray-600 dark:text-gray-400;
  }
  </style>
  