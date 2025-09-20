<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          <header class="page-header">
            <h1 class="page-title">Ajustes</h1>
            <p class="page-subtitle">Personaliza la apariencia y el comportamiento de la aplicación.</p>
          </header>
  
          <div class="space-y-10">
            <div class="setting-section">
              <div class="setting-text">
                <h3 class="setting-title">Apariencia</h3>
                <p class="setting-description">Elige cómo se ve el portal académico en tu dispositivo.</p>
              </div>
              <div class="setting-control">
                <select v-model="theme" @change="applyTheme" class="form-input">
                  <option value="light">Claro</option>
                  <option value="dark">Oscuro</option>
                  <option value="system">Automático (Sistema)</option>
                </select>
              </div>
            </div>
            <div class="setting-section">
              <div class="setting-text">
                <h3 class="setting-title">Notificaciones por Correo</h3>
                <p class="setting-description">Selecciona qué notificaciones deseas recibir en tu email.</p>
              </div>
              <div class="setting-control space-y-3">
                <label class="flex items-center">
                  <input type="checkbox" v-model="notifications.emailOnGrade" class="form-checkbox" />
                  <span class="ml-2">Cuando se publica una nueva calificación.</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" v-model="notifications.emailOnAnnouncement" class="form-checkbox" />
                  <span class="ml-2">Cuando hay un nuevo anuncio.</span>
                </label>
              </div>
            </div>
            <div class="pt-5 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button @click="saveSettings" class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
                Guardar Preferencias
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import Sidebar from '@/components/Sidebar.vue'; // Ajusta la ruta si es necesario
  
  const theme = ref('system');
  const notifications = ref({
    emailOnGrade: true,
    emailOnAnnouncement: false,
  });
  
  const applyTheme = () => {
    try {
      localStorage.setItem('settings:theme', theme.value);
      if (theme.value === 'dark' || (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) { console.error("No se pudo aplicar el tema."); }
  };
  
  const loadSettings = () => {
    try {
      const savedTheme = localStorage.getItem('settings:theme');
      const savedNotifications = localStorage.getItem('settings:notifications');
      if (savedTheme) theme.value = savedTheme;
      if (savedNotifications) notifications.value = JSON.parse(savedNotifications);
    } catch (e) { console.error("No se pudieron cargar las configuraciones."); }
  };
  
  const saveSettings = () => {
    try {
      localStorage.setItem('settings:notifications', JSON.stringify(notifications.value));
      applyTheme(); // Llama a applyTheme para guardar también el tema
      alert('Configuración guardada.');
    } catch (e) { console.error("No se pudieron guardar las configuraciones."); }
  };
  
  onMounted(() => {
    loadSettings();
  });
  </script>
  
  <style scoped>
  .page-header { @apply mb-8 border-b border-gray-200 dark:border-gray-700 pb-5; }
  .page-title { @apply text-3xl font-bold tracking-tight text-gray-900 dark:text-white; }
  .page-subtitle { @apply mt-1 text-gray-500 dark:text-gray-400; }
  .setting-section { @apply grid md:grid-cols-3 gap-4; }
  .setting-text { @apply md:col-span-2; }
  .setting-control { @apply bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700; }
  .setting-title { @apply font-semibold text-lg text-gray-800 dark:text-gray-100; }
  .setting-description { @apply text-sm text-gray-600 dark:text-gray-400; }
  .form-input { @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white; }
  .form-checkbox { @apply h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500; }
  </style>