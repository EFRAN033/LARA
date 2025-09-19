<template>
    <div>
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Panel de Administración</h2>
  
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="stat-card bg-blue-500">
          <div class="stat-icon">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div class="stat-info">
            <p class="stat-title">Total de Estudiantes</p>
            <p class="stat-value">1,250</p>
          </div>
        </div>
        <div class="stat-card bg-teal-500">
           <div class="stat-icon">
             <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <div class="stat-info">
            <p class="stat-title">Total de Docentes</p>
            <p class="stat-value">85</p>
          </div>
        </div>
        <div class="stat-card bg-indigo-500">
           <div class="stat-icon">
             <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-9-5.747h18" /></svg>
          </div>
          <div class="stat-info">
            <p class="stat-title">Cursos Activos</p>
            <p class="stat-value">150</p>
          </div>
        </div>
         <div class="stat-card bg-orange-500">
           <div class="stat-icon">
             <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
          </div>
          <div class="stat-info">
            <p class="stat-title">Nuevos Registros (Hoy)</p>
            <p class="stat-value">12</p>
          </div>
        </div>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="widget">
              <div class="widget-header">
                  <h3 class="widget-title">Acciones Rápidas</h3>
              </div>
              <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button class="action-button bg-blue-500 hover:bg-blue-600">Gestionar Usuarios</button>
                  <button class="action-button bg-indigo-500 hover:bg-indigo-600">Crear Nuevo Curso</button>
                  <button class="action-button bg-teal-500 hover:bg-teal-600">Ver Matrículas</button>
                  <button class="action-button bg-orange-500 hover:bg-orange-600">Enviar Anuncio Global</button>
              </div>
          </div>
  
          <div class="widget">
              <div class="widget-header">
                  <h3 class="widget-title">Actividad Reciente</h3>
              </div>
               <div class="p-4">
                  <ul class="space-y-3 text-sm">
                      <li class="flex items-center">
                          <span class="text-gray-500 dark:text-gray-400 w-24">10:30 AM</span>
                          <span class="text-gray-800 dark:text-gray-200">Nuevo docente 'Carlos Ruiz' registrado.</span>
                      </li>
                      <li class="flex items-center">
                          <span class="text-gray-500 dark:text-gray-400 w-24">09:15 AM</span>
                          <span class="text-gray-800 dark:text-gray-200">Curso 'Cálculo II' ha sido creado.</span>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // En el futuro, aquí iría la lógica para cargar los datos del admin
  </script>
  
  <style scoped>
  .stat-card {
    @apply flex items-center p-4 text-white rounded-lg shadow-lg;
  }
  .stat-icon {
    @apply p-3 bg-white bg-opacity-20 rounded-full mr-4;
  }
  .stat-info {
    @apply flex flex-col;
  }
  .stat-title {
    @apply text-sm font-medium;
  }
  .stat-value {
    @apply text-3xl font-bold;
  }
  .widget {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden;
  }
  .widget-header {
    @apply flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700;
  }
  .widget-title {
    @apply text-lg font-semibold text-gray-700 dark:text-gray-200;
  }
  .action-button {
      @apply w-full text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:-translate-y-0.5;
  }
  </style>