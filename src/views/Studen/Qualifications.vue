<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          <header class="page-header">
            <h1 class="page-title">Mis Calificaciones</h1>
            <p class="page-subtitle">Consulta el detalle de tus notas y promedios por cada curso.</p>
          </header>
  
          <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 3" :key="i" class="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
  
          <div v-else-if="Object.keys(gradesByCourse).length > 0" class="space-y-4">
            <div v-for="(grades, courseName) in gradesByCourse" :key="courseName" class="accordion-item">
              <button @click="toggleAccordion(courseName)" class="accordion-header">
                <span class="font-bold text-lg text-gray-800 dark:text-gray-100">{{ courseName }}</span>
                <span class="flex items-center gap-4">
                  <span class="text-sm font-medium text-gray-500">
                    Promedio: 
                    <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ calculateAverage(grades) }}</span>
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform text-gray-500" :class="{ 'rotate-180': activeAccordion === courseName }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div v-show="activeAccordion === courseName" class="accordion-content">
                <ul class="divide-y divide-gray-200 dark:divide-gray-700">
                  <li v-for="grade in grades" :key="grade.id" class="py-3 px-4 flex justify-between items-center">
                    <span class="text-gray-700 dark:text-gray-300">{{ grade.name }}</span>
                    <span class="font-bold text-lg" :class="grade.score >= 11 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'">
                      {{ grade.score.toFixed(1) }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <div v-else class="empty-state">
            <p>Aún no se han registrado calificaciones para este periodo.</p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Sidebar from './Sidebar.vue'; // Asegúrate que la ruta al Sidebar sea correcta
  
  const gradesByCourse = ref({});
  const isLoading = ref(true);
  const activeAccordion = ref(null);
  
  const toggleAccordion = (courseName) => {
    // Permite abrir y cerrar el acordeón
    activeAccordion.value = activeAccordion.value === courseName ? null : courseName;
  };
  
  const calculateAverage = (grades) => {
    if (!grades || grades.length === 0) return 'N/A';
    const total = grades.reduce((sum, grade) => sum + grade.score, 0);
    return (total / grades.length).toFixed(1);
  };
  
  const fetchGrades = async () => {
    isLoading.value = true;
    try {
      // AQUÍ IRÍA TU LLAMADA A LA API
      // const response = await apiClient.get('/student/grades');
      // const data = response.data;
      
      // Simulación de datos
      await new Promise(resolve => setTimeout(resolve, 1200));
      const data = {
        'Matemática Avanzada': [
          { id: 1, name: 'Examen Parcial', score: 18.5 },
          { id: 2, name: 'Práctica 1', score: 15.0 },
        ],
        'Historia del Siglo XX': [
          { id: 3, name: 'Ensayo Final', score: 19.0 },
        ],
        'Programación Orientada a Objetos': [
          { id: 4, name: 'Proyecto Final', score: 10.0 },
        ]
      };
  
      gradesByCourse.value = data;
      // Abrir el primer curso por defecto al cargar la página
      if (Object.keys(data).length > 0) {
        activeAccordion.value = Object.keys(data)[0];
      }
    } catch (error) {
      console.error("Error al cargar las calificaciones:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(() => {
    fetchGrades();
  });
  </script>
  
  <style scoped>
  .page-header { @apply mb-8 border-b border-gray-200 dark:border-gray-700 pb-5; }
  .page-title { @apply text-3xl font-bold tracking-tight text-gray-900 dark:text-white; }
  .page-subtitle { @apply mt-1 text-gray-500 dark:text-gray-400; }
  .accordion-item { @apply bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-shadow hover:shadow-md; }
  .accordion-header { @apply w-full flex justify-between items-center p-4 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800; }
  .accordion-content { @apply border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/20; }
  .empty-state { @apply text-center py-16 text-gray-500 dark:text-gray-400; }
  </style>