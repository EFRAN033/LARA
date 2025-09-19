<template>
  <div class="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
    
    <header class="mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
      <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        Hola, <span class="text-indigo-600 dark:text-indigo-400">{{ studentName }}</span>
      </h1>
      <p class="mt-2 text-lg text-gray-500 dark:text-gray-400">
        Aquí tienes un resumen de tu progreso académico. ¡Sigue así!
      </p>
    </header>

    <main class="space-y-12">

      <section>
        <div class="section-header">
          <div class="icon-wrapper bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="section-title">Mis Cursos Actuales</h2>
        </div>
        <div class="section-content">
          <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="course in courses" :key="course.name" class="list-item group">
              <div class="flex-grow">
                <p class="font-semibold text-gray-800 dark:text-gray-100">{{ course.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Docente: {{ course.teacher }}</p>
              </div>
              <span class="view-details-arrow">
                Ver detalles
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div class="section-header">
          <div class="icon-wrapper bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 class="section-title">Próximas Tareas y Evaluaciones</h2>
        </div>
        <div class="section-content">
          <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="task in tasks" :key="task.name" class="list-item">
              <div>
                <p class="font-semibold text-gray-800 dark:text-gray-100">{{ task.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ task.course }}</p>
              </div>
              <span :class="task.dueClass" class="due-date-pill">
                {{ task.dueDate }}
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <div class="section-header">
          <div class="icon-wrapper bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 class="section-title">Calificaciones Recientes</h2>
        </div>
        <div class="section-content">
          <ul class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="grade in grades" :key="grade.name" class="list-item">
              <div>
                <p class="font-semibold text-gray-800 dark:text-gray-100">{{ grade.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ grade.course }}</p>
              </div>
              <span class="text-xl font-bold" :class="grade.score >= 11 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'">
                {{ grade.score.toFixed(1) }}
              </span>
            </li>
          </ul>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// En el futuro, este nombre vendría del `userStore`
const studentName = ref('Efran');

// Datos de ejemplo que serían cargados desde una API
const courses = ref([
  { name: 'Matemática Avanzada', teacher: 'Carlos Ruiz' },
  { name: 'Historia del Siglo XX', teacher: 'Ana García' },
  { name: 'Programación Orientada a Objetos', teacher: 'Pedro Martinez' },
]);

const tasks = ref([
  { name: 'Ensayo Final', course: 'Historia del Siglo XX', dueDate: 'Vence en 3 días', dueClass: 'pill-warning' },
  { name: 'Proyecto de POO', course: 'Programación O.O.', dueDate: 'Vence en 1 semana', dueClass: 'pill-info' },
  { name: 'Examen de Unidad', course: 'Matemática Avanzada', dueDate: 'Vence Hoy', dueClass: 'pill-danger' },
]);

const grades = ref([
  { name: 'Examen Parcial de Matemática', course: 'Matemática Avanzada', score: 18.5 },
  { name: 'Práctica Calificada 1', course: 'Programación O.O.', score: 16.0 },
  { name: 'Control de Lectura', course: 'Historia del Siglo XX', score: 10.0 },
]);
</script>

<style scoped>
/* Estilos para los encabezados de sección */
.section-header {
  @apply flex items-center gap-4;
}

.icon-wrapper {
  @apply flex h-12 w-12 flex-none items-center justify-center rounded-full;
}

.section-title {
  @apply text-xl font-bold text-gray-800 dark:text-gray-200;
}

/* Contenedor del contenido de la sección con un borde izquierdo decorativo */
.section-content {
  @apply mt-4 ml-6 pl-10 border-l-2 border-gray-200 dark:border-gray-700;
}

/* Estilos para los elementos de la lista */
.list-item {
  @apply flex items-center justify-between py-4;
}

.view-details-arrow {
  @apply flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300;
}

/* Píldoras para las fechas de entrega */
.due-date-pill {
  @apply text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap;
}
.pill-danger {
  @apply bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300;
}
.pill-warning {
  @apply bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300;
}
.pill-info {
  @apply bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300;
}
</style>