<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main class="flex-1 overflow-y-auto">
        <div class="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
          <header class="page-header">
            <h1 class="page-title">Mi Perfil</h1>
            <p class="page-subtitle">Administra tu información personal, de contacto y de seguridad.</p>
          </header>
  
          <div v-if="isLoading" class="h-96 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
  
          <form v-else @submit.prevent="saveProfile" class="space-y-8 bg-white dark:bg-gray-800/50 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <h3 class="form-section-title">Información Personal</h3>
              <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="full_name" class="form-label">Nombre Completo</label>
                  <input type="text" id="full_name" v-model="userProfile.full_name" class="form-input" disabled />
                </div>
                <div>
                  <label for="dni" class="form-label">DNI</label>
                  <input type="text" id="dni" v-model="userProfile.dni" class="form-input" disabled />
                </div>
              </div>
            </div>
            <div>
              <h3 class="form-section-title">Información de Contacto</h3>
              <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label for="email" class="form-label">Correo Electrónico</label>
                  <input type="email" id="email" v-model="userProfile.email" class="form-input" />
                </div>
                <div>
                  <label for="phone" class="form-label">Teléfono</label>
                  <input type="tel" id="phone" v-model="userProfile.phone" class="form-input" />
                </div>
              </div>
            </div>
            <div class="pt-5 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button type="submit" :disabled="isSaving" class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                {{ isSaving ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import Sidebar from './Sidebar.vue';
  
  const userStore = useUserStore();
  const userProfile = ref({ full_name: '', email: '', phone: '', dni: '' });
  const isLoading = ref(true);
  const isSaving = ref(false);
  
  const fetchProfile = async () => {
    isLoading.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      userProfile.value = {
        full_name: userStore.user?.full_name || 'Efran Guzman',
        email: userStore.user?.sub || 'efran@example.com',
        phone: '987654321',
        dni: '71234567',
      };
    } catch (error) { console.error("Error al cargar el perfil:", error); } 
    finally { isLoading.value = false; }
  };
  
  const saveProfile = async () => {
    isSaving.value = true;
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Perfil guardado con éxito!');
    } catch (error) {
      alert('Hubo un error al guardar.');
    } finally {
      isSaving.value = false;
    }
  };
  
  onMounted(() => fetchProfile());
  </script>
  
  <style scoped>
  .page-header { @apply mb-8 border-b border-gray-200 dark:border-gray-700 pb-5; }
  .page-title { @apply text-3xl font-bold tracking-tight text-gray-900 dark:text-white; }
  .page-subtitle { @apply mt-1 text-gray-500 dark:text-gray-400; }
  .form-section-title { @apply text-lg font-semibold text-gray-800 dark:text-gray-100; }
  .form-label { @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1; }
  .form-input { @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white; }
  .form-input:disabled { @apply bg-gray-100 dark:bg-gray-800 cursor-not-allowed; }
  </style>