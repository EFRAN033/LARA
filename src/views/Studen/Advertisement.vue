<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          <header class="page-header">
            <h1 class="page-title">Anuncios y Comunicados</h1>
            <p class="page-subtitle">Mantente al día con las últimas noticias de tus docentes y la institución.</p>
          </header>
  
          <div v-if="isLoading" class="space-y-6">
            <div v-for="i in 2" :key="i" class="h-28 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
          </div>
  
          <div v-else-if="announcements.length > 0" class="space-y-6">
            <article v-for="announcement in announcements" :key="announcement.id" class="p-6 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100">{{ announcement.title }}</h2>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">
                <span>Publicado por <strong>{{ announcement.author }}</strong> el {{ announcement.date }}</span>
              </div>
              <p class="text-gray-600 dark:text-gray-300">{{ announcement.content }}</p>
            </article>
          </div>
          
          <div v-else class="empty-state">
            <p>No hay anuncios recientes.</p>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Sidebar from './Sidebar.vue';
  
  const announcements = ref([]);
  const isLoading = ref(true);
  
  const fetchAnnouncements = async () => {
    isLoading.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 900));
      announcements.value = [
        { id: 1, title: 'Inicio de Clases 2025-II', content: 'Las clases del segundo semestre iniciarán el 15 de Octubre. Por favor, revisen sus horarios en la sección "Mis Cursos".', date: '2025-09-15', author: 'Dirección Académica' },
        { id: 2, title: 'Recordatorio Examen Parcial', content: 'No olviden que el examen parcial de Matemática es este viernes. Los temas a evaluar son: Límites y Derivadas.', date: '2025-09-18', author: 'Carlos Ruiz' },
      ];
    } catch (error) { console.error("Error al cargar los anuncios:", error); } 
    finally { isLoading.value = false; }
  };
  
  onMounted(() => fetchAnnouncements());
  </script>
  
  <style scoped>
  .page-header { @apply mb-8 border-b border-gray-200 dark:border-gray-700 pb-5; }
  .page-title { @apply text-3xl font-bold tracking-tight text-gray-900 dark:text-white; }
  .page-subtitle { @apply mt-1 text-gray-500 dark:text-gray-400; }
  .empty-state { @apply text-center py-16 text-gray-500 dark:text-gray-400; }
  </style>