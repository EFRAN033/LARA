<template>
    <div>
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Panel del Docente</h2>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="widget">
          <div class="widget-header">
            <h3 class="widget-title">Mis Cursos Asignados</h3>
            <span class="widget-icon bg-purple-100 text-purple-600">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-9-5.747h18"/></svg>
            </span>
          </div>
          <div class="p-4">
             <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Matemática Avanzada - 5to A</li>
              <li>Física Fundamental - 4to B</li>
            </ul>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">
            <h3 class="widget-title">Tareas por Calificar</h3>
             <span class="widget-icon bg-red-100 text-red-600">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
            </span>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400"><span class="font-semibold">12 entregas</span> en Ensayo de Física</p>
          </div>
        </div>
  
        <div class="widget bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800">
           <div class="widget-header border-green-200 dark:border-green-800">
            <h3 class="widget-title text-green-800 dark:text-green-300">Acción Rápida</h3>
            <span class="widget-icon bg-green-100 text-green-600">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
            </span>
          </div>
          <div class="p-4 text-center">
              <button class="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700">Crear Anuncio</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // En el futuro, aquí iría la lógica para cargar los datos del docente
  </script>
  
  <style scoped>
  .widget {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1;
  }
  .widget-header {
    @apply flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700;
  }
  .widget-title {
    @apply text-lg font-semibold text-gray-700 dark:text-gray-200;
  }
  .widget-icon {
    @apply h-10 w-10 flex items-center justify-center rounded-full;
  }
  </style>