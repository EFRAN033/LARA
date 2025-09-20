<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Sidebar intacto -->
      <Sidebar />
  
      <!-- Pane derecho -->
      <div class="flex-1 min-w-0 flex flex-col">
        <!-- ===== Header compacto (py-3) ===== -->
        <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
            <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Proceso de Matrícula</h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Consulta el estado del periodo y descarga tu constancia.
            </p>
          </div>
        </header>
  
        <!-- ===== Contenido ===== -->
        <main class="flex-1 overflow-y-auto">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <!-- Skeleton -->
            <div v-if="isLoading" class="space-y-6">
              <div class="h-5 w-56 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div class="h-3 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              <div class="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              <div class="grid sm:grid-cols-2 gap-4 pt-4">
                <div class="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div class="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
                <div class="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
  
            <!-- Contenido real -->
            <template v-else>
              <!-- Encabezado de estado (sin tarjetas) -->
              <section aria-label="Estado actual" class="mb-8">
                <div class="flex flex-wrap items-end gap-x-3 gap-y-2">
                  <h2 class="text-xl font-extrabold text-gray-900 dark:text-gray-100">
                    Periodo {{ enrollmentDetails?.period }}
                  </h2>
                  <span class="badge" :class="badgeClass">{{ enrollmentStatus }}</span>
                </div>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Proceso realizado el <time :datetime="enrollmentDetails?.date">{{ enrollmentDetails?.date }}</time>
                </p>
  
                <!-- Barra de progreso por etapas (sin tarjetas) -->
                <ol class="mt-6 grid grid-cols-3 gap-2">
                  <li class="step" :class="stepState(1)">
                    <span class="dot"></span>
                    <span class="label">Preinscrito</span>
                  </li>
                  <li class="step" :class="stepState(2)">
                    <span class="dot"></span>
                    <span class="label">Pago verificado</span>
                  </li>
                  <li class="step" :class="stepState(3)">
                    <span class="dot"></span>
                    <span class="label">Matriculado</span>
                  </li>
                </ol>
                <div class="track">
                  <div class="fill" :style="{ width: progressPct + '%' }"></div>
                </div>
              </section>
  
              <!-- Resumen y cursos (estilo “spec sheet”, sin tarjetas) -->
              <section aria-label="Detalle de matrícula" class="spec">
                <div class="spec-row">
                  <div class="spec-label">
                    <h3 class="lbl">Periodo</h3>
                    <p class="hint">Ciclo académico vigente.</p>
                  </div>
                  <div class="spec-field">
                    <p class="value">{{ enrollmentDetails?.period }}</p>
                  </div>
                </div>
  
                <div class="spec-row">
                  <div class="spec-label">
                    <h3 class="lbl">Fecha de proceso</h3>
                    <p class="hint">Registro en el sistema.</p>
                  </div>
                  <div class="spec-field">
                    <p class="value">{{ enrollmentDetails?.date }}</p>
                  </div>
                </div>
  
                <div class="spec-row">
                  <div class="spec-label">
                    <h3 class="lbl">Cursos matriculados</h3>
                    <p class="hint">Lista oficial del periodo.</p>
                  </div>
                  <div class="spec-field">
                    <ul class="list">
                      <li v-for="course in enrollmentDetails?.enrolledCourses" :key="course" class="list-item">
                        <span class="tick" aria-hidden="true"></span>
                        <span class="text">{{ course }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
  
              <!-- CTA alineado al final -->
              <div class="mt-8 flex items-center justify-end border-t border-gray-200 dark:border-gray-800 pt-6">
                <button
                  v-if="enrollmentDetails?.canDownloadCertificate"
                  @click="downloadCertificate"
                  class="btn-primary"
                >
                  Descargar Constancia
                </button>
              </div>
            </template>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import Sidebar from './Sidebar.vue'
  
  const enrollmentStatus = ref('')
  const enrollmentDetails = ref(null)
  const isLoading = ref(true)
  
  /* Mapeo de estado → etapa y progreso */
  const stage = computed(() => {
    if (enrollmentStatus.value === 'Matriculado') return 3
    if (enrollmentStatus.value === 'Pendiente') return 2
    return 1
  })
  const progressPct = computed(() => (stage.value - 1) * 50 + (stage.value === 3 ? 50 : 0))
  
  const badgeClass = computed(() => {
    return {
      'badge-emerald': enrollmentStatus.value === 'Matriculado',
      'badge-amber': enrollmentStatus.value === 'Pendiente',
      'badge-red': !['Matriculado', 'Pendiente'].includes(enrollmentStatus.value),
    }
  })
  const stepState = (n) => ({
    'is-done': stage.value > n,
    'is-current': stage.value === n,
  })
  
  const fetchEnrollment = async () => {
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 1000))
      enrollmentStatus.value = 'Matriculado'
      enrollmentDetails.value = {
        period: '2025-II',
        date: '2025-08-01',
        enrolledCourses: ['Matemática Avanzada', 'Historia del Siglo XX', 'Programación Orientada a Objetos'],
        canDownloadCertificate: true,
      }
    } catch (e) {
      console.error('Error al cargar la matrícula:', e)
    } finally {
      isLoading.value = false
    }
  }
  
  const downloadCertificate = () => alert('Descargando constancia de matrícula...')
  
  onMounted(fetchEnrollment)
  </script>
  
  <style scoped>
  /* ===== Badges (colores sólidos, alineados a tu paleta) ===== */
  .badge {
    @apply inline-flex items-center rounded-full px-3 py-1 text-xs font-bold;
  }
  .badge-emerald { @apply bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300; }
  .badge-amber  { @apply bg-amber-100  text-amber-800  dark:bg-amber-900/40  dark:text-amber-300; }
  .badge-red    { @apply bg-red-100    text-red-800    dark:bg-red-900/40    dark:text-red-300; }
  
  /* ===== Pasos (sin tarjetas) ===== */
  .step { @apply relative flex items-center gap-2; }
  .step .dot {
    @apply h-3.5 w-3.5 rounded-full bg-gray-300 dark:bg-gray-700;
  }
  .step .label { @apply text-xs font-semibold text-gray-600 dark:text-gray-300; }
  .step.is-current .dot { @apply bg-indigo-600; }
  .step.is-done .dot { @apply bg-indigo-600; opacity: .7; }
  
  /* Track / progress line */
  .track {
    @apply relative mt-4 h-1.5 w-full rounded bg-gray-200 dark:bg-gray-800 overflow-hidden;
  }
  .fill {
    @apply absolute left-0 top-0 h-full bg-indigo-600;
    transition: width .25s ease;
  }
  
  /* ===== “Spec sheet” layout (sin tarjetas) ===== */
  .spec { @apply mt-8; }
  .spec .spec-row { @apply grid grid-cols-1 md:grid-cols-12 gap-4 py-5 border-t border-gray-200 dark:border-gray-800; }
  .spec .spec-row:first-of-type { @apply border-t-0; }
  .spec .spec-label { @apply md:col-span-4; }
  .spec .spec-field { @apply md:col-span-8; }
  .lbl { @apply text-sm font-extrabold text-gray-900 dark:text-gray-100; }
  .hint { @apply mt-1 text-xs text-gray-600 dark:text-gray-400; }
  .value { @apply text-sm text-gray-800 dark:text-gray-200; }
  
  /* Lista de cursos (línea limpia con check sólido) */
  .list { @apply space-y-2; }
  .list-item { @apply flex items-center gap-2; }
  .tick {
    --s: 18px;
    width: var(--s); height: var(--s); border-radius: 999px;
    background: #10b981; /* emerald-500 */
    position: relative; flex-shrink: 0;
  }
  .tick::after {
    content: ""; position: absolute; inset: 0;
    background:
      linear-gradient(45deg, transparent 45%, white 45% 55%, transparent 55%) left 6px top 9px / 6px 2px no-repeat,
      linear-gradient(135deg, transparent 45%, white 45% 55%, transparent 55%) left 3px top 11px / 8px 2px no-repeat;
  }
  
  /* CTA */
  .btn-primary {
    @apply inline-flex items-center rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white
           hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600;
  }
  </style>
  