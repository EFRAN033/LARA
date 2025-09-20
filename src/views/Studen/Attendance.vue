<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          <header class="page-header">
            <h1 class="page-title">Mi Asistencia</h1>
            <p class="page-subtitle">Revisa tu historial de asistencias, tardanzas y faltas del periodo actual.</p>
          </header>
  
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div class="summary-card bg-emerald-50 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800">
              <h3 class="summary-title text-emerald-800 dark:text-emerald-300">Presente</h3>
              <p v-if="isLoading" class="summary-value animate-pulse bg-gray-300 w-12 h-8 rounded-md"></p>
              <p v-else class="summary-value text-emerald-600 dark:text-emerald-400">{{ summary.present }}</p>
            </div>
            <div class="summary-card bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800">
              <h3 class="summary-title text-amber-800 dark:text-amber-300">Tardanzas</h3>
              <p v-if="isLoading" class="summary-value animate-pulse bg-gray-300 w-12 h-8 rounded-md"></p>
              <p v-else class="summary-value text-amber-600 dark:text-amber-400">{{ summary.tardy }}</p>
            </div>
            <div class="summary-card bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800">
              <h3 class="summary-title text-red-800 dark:text-red-300">Faltas</h3>
              <p v-if="isLoading" class="summary-value animate-pulse bg-gray-300 w-12 h-8 rounded-md"></p>
              <p v-else class="summary-value text-red-600 dark:text-red-400">{{ summary.absent }}</p>
            </div>
          </div>
  
          <div class="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="table-header">Fecha</th>
                  <th class="table-header">Curso</th>
                  <th class="table-header">Estado</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-if="isLoading"><td colspan="3" class="p-4 text-center text-gray-500">Cargando historial...</td></tr>
                <tr v-else v-for="record in attendanceRecords" :key="record.id">
                  <td class="table-cell">{{ record.date }}</td>
                  <td class="table-cell">{{ record.course }}</td>
                  <td class="table-cell">
                    <span class="status-pill" :class="getStatusClass(record.status)">{{ record.status }}</span>
                  </td>
                </tr>
                <tr v-if="!isLoading && attendanceRecords.length === 0"><td colspan="3" class="p-8 text-center text-gray-500">No hay registros de asistencia.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Sidebar from './Sidebar.vue';
  
  const attendanceRecords = ref([]);
  const summary = ref({ present: 0, absent: 0, tardy: 0 });
  const isLoading = ref(true);
  
  const getStatusClass = (status) => {
    return {
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300': status === 'Presente',
      'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300': status === 'Tardanza',
      'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300': status === 'Falta',
    };
  };
  
  const fetchAttendance = async () => {
    isLoading.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      attendanceRecords.value = [
        { id: 1, date: '2025-09-18', course: 'Matemática Avanzada', status: 'Presente' },
        { id: 2, date: '2025-09-17', course: 'Historia del Siglo XX', status: 'Presente' },
        { id: 3, date: '2025-09-16', course: 'Programación O.O.', status: 'Falta' },
        { id: 4, date: '2025-09-15', course: 'Matemática Avanzada', status: 'Tardanza' },
      ];
      summary.value = { present: 120, absent: 1, tardy: 2 };
    } catch (error) { console.error("Error al cargar la asistencia:", error); } 
    finally { isLoading.value = false; }
  };
  
  onMounted(() => fetchAttendance());
  </script>
  
  <style scoped>
  .page-header { @apply mb-8 border-b border-gray-200 dark:border-gray-700 pb-5; }
  .page-title { @apply text-3xl font-bold tracking-tight text-gray-900 dark:text-white; }
  .page-subtitle { @apply mt-1 text-gray-500 dark:text-gray-400; }
  .summary-card { @apply p-4 rounded-lg border; }
  .summary-title { @apply text-sm font-medium; }
  .summary-value { @apply text-3xl font-bold mt-1; }
  .table-header { @apply px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider; }
  .table-cell { @apply px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300; }
  .status-pill { @apply px-2 inline-flex text-xs leading-5 font-semibold rounded-full; }
  </style>