<template>
    <div>
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Resumen Académico</h2>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="widget">
          <div class="widget-header">
            <h3 class="widget-title">Mis Cursos Actuales</h3>
            <span class="widget-icon bg-blue-100 text-blue-600">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-9-5.747h18"/></svg>
            </span>
          </div>
          <div class="p-4">
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Matemática Avanzada</li>
              <li>Historia del Siglo XX</li>
              <li>Programación Orientada a Objetos</li>
            </ul>
          </div>
        </div>
  
        <div class="widget">
          <div class="widget-header">
            <h3 class="widget-title">Próximas Tareas</h3>
             <span class="widget-icon bg-yellow-100 text-yellow-600">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </span>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-600 dark:text-gray-400">Ensayo de Historia - <span class="font-semibold">Vence en 3 días</span></p>
          </div>
        </div>
  
        <div class="widget">
           <div class="widget-header">
            <h3 class="widget-title">Calificaciones Recientes</h3>
            <span class="widget-icon bg-green-100 text-green-600">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </span>
          </div>
          <div class="p-4">
            <p class="text-sm text-gray-700 dark:text-gray-300">Examen de Matemática: <span class="font-bold text-lg text-green-600">18.5</span></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // En el futuro, aquí iría la lógica para cargar los datos del estudiante
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