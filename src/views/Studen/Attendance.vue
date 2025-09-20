<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Sidebar intacto -->
      <Sidebar />
  
      <!-- Pane derecho -->
      <div class="flex-1 min-w-0 flex flex-col">
        <!-- ===== Header compacto (py-3) ===== -->
        <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-3">
            <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Mi Asistencia</h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Revisa tu historial de asistencias, tardanzas y faltas del periodo actual.
            </p>
          </div>
        </header>
  
        <!-- ===== Contenido ===== -->
        <main class="flex-1 overflow-y-auto">
          <div class="att-root mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
            <!-- ===== Resumen (sin tarjetas): anillos + etiquetas ===== -->
            <section class="mb-8" aria-label="Resumen de asistencia">
              <ul class="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <!-- Presente -->
                <li class="flex items-center gap-4">
                  <div
                    class="ring h-24 w-24 sm:h-28 sm:w-28"
                    :style="ringStyle(pct.present, 'indigo')"
                    role="img"
                    :aria-label="`Presente: ${summary.present} (${pct.present}%)`"
                  >
                    <div class="ring-center">
                      <span v-if="!isLoading" class="ring-value text-indigo-700 dark:text-indigo-300">{{ summary.present }}</span>
                      <span v-else class="ring-skel"></span>
                      <span class="ring-unit">clases</span>
                    </div>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="dot dot-indigo"></span>
                      <h3 class="text-sm font-extrabold text-gray-900 dark:text-gray-100">Presente</h3>
                      <span class="text-sm font-bold text-indigo-700 dark:text-indigo-300 ml-auto">{{ pct.present }}%</span>
                    </div>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Clases asistidas del total.</p>
                  </div>
                </li>
  
                <!-- Tardanza -->
                <li class="flex items-center gap-4">
                  <div
                    class="ring h-24 w-24 sm:h-28 sm:w-28"
                    :style="ringStyle(pct.tardy, 'amber')"
                    role="img"
                    :aria-label="`Tardanzas: ${summary.tardy} (${pct.tardy}%)`"
                  >
                    <div class="ring-center">
                      <span v-if="!isLoading" class="ring-value text-amber-700 dark:text-amber-300">{{ summary.tardy }}</span>
                      <span v-else class="ring-skel"></span>
                      <span class="ring-unit">eventos</span>
                    </div>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="dot dot-amber"></span>
                      <h3 class="text-sm font-extrabold text-gray-900 dark:text-gray-100">Tardanza</h3>
                      <span class="text-sm font-bold text-amber-700 dark:text-amber-300 ml-auto">{{ pct.tardy }}%</span>
                    </div>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Llegadas tarde registradas.</p>
                  </div>
                </li>
  
                <!-- Falta -->
                <li class="flex items-center gap-4">
                  <div
                    class="ring h-24 w-24 sm:h-28 sm:w-28"
                    :style="ringStyle(pct.absent, 'rose')"
                    role="img"
                    :aria-label="`Faltas: ${summary.absent} (${pct.absent}%)`"
                  >
                    <div class="ring-center">
                      <span v-if="!isLoading" class="ring-value text-rose-700 dark:text-rose-300">{{ summary.absent }}</span>
                      <span v-else class="ring-skel"></span>
                      <span class="ring-unit">eventos</span>
                    </div>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <span class="dot dot-rose"></span>
                      <h3 class="text-sm font-extrabold text-gray-900 dark:text-gray-100">Falta</h3>
                      <span class="text-sm font-bold text-rose-700 dark:text-rose-300 ml-auto">{{ pct.absent }}%</span>
                    </div>
                    <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">Ausencias del periodo.</p>
                  </div>
                </li>
              </ul>
            </section>
  
            <!-- ===== Historial ===== -->
            <section aria-label="Historial de asistencia">
              <div class="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-800">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                  <thead class="sticky top-0 bg-gray-100 dark:bg-gray-900 z-10">
                    <tr>
                      <th scope="col" class="th w-40">Fecha</th>
                      <th scope="col" class="th">Curso</th>
                      <th scope="col" class="th w-40">Estado</th>
                    </tr>
                  </thead>
  
                  <!-- Skeleton -->
                  <tbody v-if="isLoading" class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr v-for="i in 6" :key="'skel-'+i" class="animate-pulse">
                      <td class="td"><span class="skel w-24"></span></td>
                      <td class="td"><span class="skel w-48"></span></td>
                      <td class="td"><span class="skel w-20"></span></td>
                    </tr>
                  </tbody>
  
                  <!-- Data -->
                  <tbody v-else class="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr v-for="record in attendanceRecords" :key="record.id" class="row">
                      <td class="td tabular-nums">{{ formatDate(record.date) }}</td>
                      <td class="td before-accent">{{ record.course }}</td>
                      <td class="td">
                        <span class="pill" :class="statusPill(record.status)">{{ record.status }}</span>
                      </td>
                    </tr>
                    <tr v-if="attendanceRecords.length === 0">
                      <td colspan="3" class="px-4 py-10 text-center text-sm text-gray-600 dark:text-gray-400">
                        No hay registros de asistencia.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import Sidebar from './Sidebar.vue'
  
  const attendanceRecords = ref([])
  const summary = ref({ present: 0, absent: 0, tardy: 0 })
  const isLoading = ref(true)
  
  /* Totales y % */
  const total = computed(() => {
    const t = summary.value.present + summary.value.absent + summary.value.tardy
    return t || 1
  })
  const pct = computed(() => ({
    present: Math.round((summary.value.present / total.value) * 100),
    tardy:   Math.round((summary.value.tardy   / total.value) * 100),
    absent:  Math.round((summary.value.absent  / total.value) * 100),
  }))
  
  /* Anillo con conic-gradient, usando paleta sólida coherente con el sidebar (indigo) */
  const ringStyle = (percent, tone = 'indigo') => {
    const safe = Math.max(0, Math.min(100, percent)) * 3.6
    const colorMap = {
      indigo: ['#4f46e5', '#e5e7eb', '#374151'],
      amber:  ['#f59e0b', '#e5e7eb', '#374151'],
      rose:   ['#e11d48', '#e5e7eb', '#374151'],
    }
    const [fg, trackLight, trackDark] = colorMap[tone] || colorMap.indigo
    const track = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? trackDark : trackLight
    return {
      background: `conic-gradient(${fg} ${safe}deg, ${track} 0)`,
    }
  }
  
  /* Píldoras de estado (sólidas, sin tarjetas) */
  const statusPill = (status) => {
    if (status === 'Presente') return 'pill-indigo'
    if (status === 'Tardanza') return 'pill-amber'
    return 'pill-rose'
  }
  
  const formatDate = (iso) => {
    try {
      const d = new Date(iso)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    } catch { return iso }
  }
  
  const fetchAttendance = async () => {
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 800))
      attendanceRecords.value = [
        { id: 1, date: '2025-09-18', course: 'Matemática Avanzada', status: 'Presente' },
        { id: 2, date: '2025-09-17', course: 'Historia del Siglo XX', status: 'Presente' },
        { id: 3, date: '2025-09-16', course: 'Programación O.O.',  status: 'Falta'    },
        { id: 4, date: '2025-09-15', course: 'Matemática Avanzada', status: 'Tardanza' },
      ]
      summary.value = { present: 128, tardy: 2, absent: 1 }
    } catch (e) {
      console.error('Error al cargar la asistencia', e)
    } finally {
      isLoading.value = false
    }
  }
  
  onMounted(fetchAttendance)
  </script>
  
  <style scoped>
  /* ===== Raíz del módulo (para futuras vars si las quieres globales) ===== */
  .att-root {}
  
  /* ===== Ring base (sin tarjetas) ===== */
  .ring {
    @apply rounded-full flex items-center justify-center p-2;
  }
  .ring-center {
    @apply h-full w-full rounded-full bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center;
  }
  .ring-value { @apply text-2xl sm:text-3xl font-black; }
  .ring-unit { @apply text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 -mt-0.5; }
  .ring-skel { @apply h-7 w-10 rounded bg-gray-300 dark:bg-gray-700 animate-pulse; }
  
  /* Dots para etiquetas */
  .dot { @apply h-2.5 w-2.5 rounded-full; }
  .dot-indigo { background:#4f46e5; }
  .dot-amber  { background:#f59e0b; }
  .dot-rose   { background:#e11d48; }
  
  /* ===== Tabla ===== */
  .th { @apply px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400; }
  .td { @apply whitespace-nowrap px-4 py-3 text-sm text-gray-800 dark:text-gray-200; }
  .skel { @apply block h-4 rounded-md bg-gray-200 dark:bg-gray-700; }
  .row { @apply transition-colors hover:bg-gray-50 dark:hover:bg-gray-900; }
  .tabular-nums { font-variant-numeric: tabular-nums; }
  
  /* Acento antes del curso (barrita fina) */
  .before-accent {
    position: relative;
    padding-left: 10px;
  }
  .before-accent::before {
    content: "";
    position: absolute;
    left: 0; top: 50%; transform: translateY(-50%);
    width: 3px; height: 60%;
    background: #4f46e5; /* indigo-600 */
    border-radius: 2px;
    opacity: .85;
  }
  
  /* ===== Pills de estado ===== */
  .pill { @apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold; }
  .pill-indigo { @apply bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300; }
  .pill-amber  { @apply bg-amber-100  text-amber-800  dark:bg-amber-900/40  dark:text-amber-300; }
  .pill-rose   { @apply bg-rose-100   text-rose-800   dark:bg-rose-900/40   dark:text-rose-300; }
  </style>
  