<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          <header class="page-header">
            <h1 class="page-title">Mis Cursos</h1>
            <p class="page-subtitle">Explora el material de estudio, tareas y progreso de cada uno de tus cursos matriculados.</p>
          </header>
  
          <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="i" class="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
          
          <div v-else-if="courses.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="course in courses" :key="course.id" class="course-card group">
              <div class="flex-grow">
                <span class="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Prof. {{ course.teacher }}</span>
                <h3 class="text-xl font-bold mt-1 text-gray-800 dark:text-gray-100">{{ course.name }}</h3>
              </div>
              <div class="mt-4">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Progreso</span>
                  <span class="text-xs font-bold text-gray-700 dark:text-gray-300">{{ course.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div class="bg-indigo-600 h-2 rounded-full" :style="{ width: course.progress + '%' }"></div>
                </div>
              </div>
              <router-link :to="`/student/courses/${course.id}`" class="absolute inset-0" aria-label="Ver curso"></router-link>
            </div>
          </div>
  
          <div v-else class="empty-state">
            <p>Aún no estás matriculado en ningún curso para este periodo.</p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Sidebar from './Sidebar.vue';
  // import apiClient from '@/axios';
  
  const courses = ref([]);
  const isLoading = ref(true);
  
  const fetchCourses = async () => {
    isLoading.value = true;
    try {
      // AQUÍ VA TU LLAMADA REAL A LA API
      await new Promise(resolve => setTimeout(resolve, 1000));
      courses.value = [
        { id: 1, name: 'Matemática Avanzada', teacher: 'Carlos Ruiz', progress: 75 },
        { id: 2, name: 'Historia del Siglo XX', teacher: 'Ana García', progress: 50 },
        { id: 3, name: 'Programación Orientada a Objetos', teacher: 'Pedro Martinez', progress: 90 },
      ];
    } catch (error) {
      console.error("Error al cargar los cursos:", error);
    } finally {
      isLoading.value = false;
    }
  };
  
  onMounted(() => fetchCourses());
  </script>
  
  <style scoped>
  .page-header { @apply mb-8 border-b border-gray-200 dark:border-gray-700 pb-5; }
  .page-title { @apply text-3xl font-bold tracking-tight text-gray-900 dark:text-white; }
  .page-subtitle { @apply mt-1 text-gray-500 dark:text-gray-400; }
  .course-card { @apply relative flex flex-col justify-between bg-white dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-indigo-500; }
  .empty-state { @apply text-center py-16 text-gray-500 dark:text-gray-400; }
  </style>