<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          <header class="page-header">
            <h1 class="page-title">Proceso de Matrícula</h1>
            <p class="page-subtitle">Consulta el estado de tu matrícula para el periodo actual y accede a tu constancia.</p>
          </header>
  
          <div v-if="isLoading" class="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          
          <div v-else class="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">Estado de Matrícula: {{ enrollmentDetails.period }}</h2>
                <p class="mt-1 text-gray-500 dark:text-gray-400">Fecha de proceso: {{ enrollmentDetails.date }}</p>
              </div>
              <div class="mt-4 sm:mt-0 px-4 py-2 rounded-full text-sm font-semibold" :class="statusClass">{{ enrollmentStatus }}</div>
            </div>
            
            <hr class="my-6 border-gray-200 dark:border-gray-700" />
            
            <div>
              <h3 class="font-semibold text-gray-700 dark:text-gray-300 mb-3">Cursos Matriculados</h3>
              <ul class="space-y-2">
                <li v-for="course in enrollmentDetails.enrolledCourses" :key="course" class="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <svg class="h-5 w-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>
                  <span>{{ course }}</span>
                </li>
              </ul>
            </div>
  
            <div class="mt-8 text-center" v-if="enrollmentDetails.canDownloadCertificate">
              <button @click="downloadCertificate" class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                Descargar Constancia
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import Sidebar from './Sidebar.vue';
  
  const enrollmentStatus = ref('');
  const enrollmentDetails = ref(null);
  const isLoading = ref(true);
  
  const statusClass = computed(() => {
    return {
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300': enrollmentStatus.value === 'Matriculado',
      'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300': enrollmentStatus.value === 'Pendiente',
      'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300': enrollmentStatus.value !== 'Matriculado' && enrollmentStatus.value !== 'Pendiente',
    };
  });
  
  const fetchEnrollment = async () => {
    isLoading.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      enrollmentStatus.value = 'Matriculado';
      enrollmentDetails.value = {
        period: '2025-II',
        date: '2025-08-01',
        enrolledCourses: ['Matemática Avanzada', 'Historia del Siglo XX', 'Programación Orientada a Objetos'],
        canDownloadCertificate: true,
      };
    } catch (error) { console.error("Error al cargar la matrícula:", error); } 
    finally { isLoading.value = false; }
  };
  
  const downloadCertificate = () => alert('Descargando constancia de matrícula...');
  
  onMounted(() => fetchEnrollment());
  </script>
  
  <style scoped>
  .page-header { @apply mb-8 border-b border-gray-200 dark:border-gray-700 pb-5; }
  .page-title { @apply text-3xl font-bold tracking-tight text-gray-900 dark:text-white; }
  .page-subtitle { @apply mt-1 text-gray-500 dark:text-gray-400; }
  </style>