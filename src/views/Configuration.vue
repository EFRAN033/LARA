<template>
    <div class="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 flex flex-col items-center font-sans antialiased text-gray-800">
      <header class="w-full bg-gradient-to-r from-pink-600 to-pink-700 shadow-md sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm bg-opacity-90">
        <div class="container mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <button
            @click="goBack"
            class="p-2 rounded-full text-white/90 hover:bg-white/10 hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95 text-lg"
            aria-label="Regresar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
  
          <h1 class="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold text-white tracking-tight whitespace-nowrap">
            <span class="inline-block transition-all duration-300 hover:scale-105 hover:drop-shadow-lg">AJUSTES<span class="font-black">PE</span></span>
          </h1>
  
          <div class="w-6 h-6 sm:w-10 sm:h-10 invisible"></div>
        </div>
      </header>
  
      <div class="max-w-3xl w-full bg-white rounded-xl shadow-lg overflow-hidden mt-6 mb-8 transition-all duration-300 hover:shadow-xl border border-pink-100">
        <div class="p-5 sm:p-7 md:p-8 space-y-8">
          <div class="text-center mb-6">
            <h2 class="text-3xl font-extrabold text-pink-700 leading-tight animate-fade-in-up">
              Configuración de la Cuenta
            </h2>
            <p class="mt-2 text-pink-500 text-lg animate-fade-in-up" style="animation-delay: 100ms;">
              Administra tus preferencias y seguridad
            </p>
          </div>
  
          <section class="animate-fade-in-up" style="animation-delay: 200ms;">
            <div class="flex items-center mb-5 pb-3 border-b border-pink-100">
              <div class="bg-pink-100 p-2 rounded-lg mr-3 shadow-inner">
                <svg class="w-5 h-5 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-pink-900 uppercase">Preferencias Generales</h3>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-pink-50 rounded-lg shadow-sm border border-pink-100">
                <label for="notifications" class="text-base font-medium text-pink-800 flex items-center">
                  <svg class="w-5 h-5 text-pink-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a2 2 0 11-4 0m4 0h-4"></path>
                  </svg>
                  Recibir notificaciones por correo
                </label>
                <label class="switch">
                  <input type="checkbox" v-model="settings.notificationsEnabled" @change="saveSetting('notificationsEnabled')">
                  <span class="slider round"></span>
                </label>
              </div>
  
              <div class="flex items-center justify-between p-3 bg-pink-50 rounded-lg shadow-sm border border-pink-100">
                <label for="darkMode" class="text-base font-medium text-pink-800 flex items-center">
                  <svg class="w-5 h-5 text-pink-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                  Habilitar modo oscuro
                </label>
                <label class="switch">
                  <input type="checkbox" v-model="settings.darkModeEnabled" @change="saveSetting('darkModeEnabled')">
                  <span class="slider round"></span>
                </label>
              </div>
  
              <div class="flex items-center justify-between p-3 bg-pink-50 rounded-lg shadow-sm border border-pink-100">
                <label for="language" class="text-base font-medium text-pink-800 flex items-center">
                  <svg class="w-5 h-5 text-pink-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088-9.5V5m0 0a2.002 2.002 0 100 4m-7.5 3.5h7.5M14 12a2 2 0 100-4m-7.5 3.5h7.5M14 12a2 2 0 100-4"></path>
                  </svg>
                  Idioma preferido
                </label>
                <select v-model="settings.preferredLanguage" @change="saveSetting('preferredLanguage')"
                  class="block w-auto border border-pink-200 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300 transition-all duration-200 bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2Q0OWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvcm49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSI2IDkgMTIgMTUgMTggOSI+PC9wb2x5bGluZT48L3N2Zz4=')].bg-no-repeat bg-[right_0.5rem_center] bg-[length:1rem]">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </section>
  
          <section class="animate-fade-in-up" style="animation-delay: 300ms;">
            <div class="flex items-center mb-5 pb-3 border-b border-pink-100">
              <div class="bg-pink-100 p-2 rounded-lg mr-3 shadow-inner">
                <svg class="w-5 h-5 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.922 12c0 3.072 1.272 5.862 3.046 7.896l-.534.534-.002.002a21.464 21.464 0 0013.064-.002l-.002-.002-.534-.534A12.001 12.001 0 0021.078 12c0-4.072-1.272-7.862-3.046-9.896z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-pink-900 uppercase">Seguridad y Privacidad</h3>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-3 bg-pink-50 rounded-lg shadow-sm border border-pink-100">
                <label for="twoFactor" class="text-base font-medium text-pink-800 flex items-center">
                  <svg class="w-5 h-5 text-pink-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  Autenticación de dos factores
                </label>
                <button @click="manageTwoFactor" class="text-pink-600 hover:text-pink-800 text-sm font-semibold hover:underline">
                  Gestionar
                </button>
              </div>
  
              <div class="flex items-center justify-between p-3 bg-pink-50 rounded-lg shadow-sm border border-pink-100">
                <label for="sessionHistory" class="text-base font-medium text-pink-800 flex items-center">
                  <svg class="w-5 h-5 text-pink-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Ver historial de sesiones
                </label>
                <button @click="viewSessionHistory" class="text-pink-600 hover:text-pink-800 text-sm font-semibold hover:underline">
                  Ver
                </button>
              </div>
  
               <div class="flex items-center justify-between p-3 bg-pink-50 rounded-lg shadow-sm border border-pink-100">
                <label for="deleteAccount" class="text-base font-medium text-pink-800 flex items-center">
                  <svg class="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Eliminar mi cuenta
                </label>
                <button @click="deleteAccount" class="text-red-600 hover:text-red-800 text-sm font-bold hover:underline">
                  Eliminar
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
  
      <transition name="slide-fade">
        <div v-if="showToast" :class="['fixed bottom-4 right-4 px-5 py-3 rounded-xl shadow-lg flex items-center space-x-2 z-50 max-w-xs border-l-4', toastClasses]">
          <svg v-if="toastType === 'success'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else-if="toastType === 'error'" class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span class="text-xs font-semibold">{{ toastMessage }}</span>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import { ref, computed, onMounted } from 'vue';
  
  export default {
    name: 'ConfigurationView',
    setup() {
      const router = useRouter();
  
      // Estado local para las configuraciones
      const settings = ref({
        notificationsEnabled: true,
        darkModeEnabled: false,
        preferredLanguage: 'es',
      });
      
      // Reactive variables for Toast (reutilizadas de MyProfile)
      const showToast = ref(false);
      const toastMessage = ref('');
      const toastType = ref('info'); // 'success', 'error', 'info'
  
      // Computed property for toast classes (reutilizadas)
      const toastClasses = computed(() => {
        const base = 'bg-white';
        switch(toastType.value) {
          case 'success':
            return `${base} text-pink-800 border-l-green-500`;
          case 'error':
            return `${base} text-pink-800 border-l-red-500`;
          default:
            return `${base} text-pink-800 border-l-blue-500`;
        }
      });
  
      // Función para mostrar el Toast notification (reutilizada)
      const showNotification = (message, type = 'info') => {
        toastMessage.value = message;
        toastType.value = type;
        showToast.value = true;
        setTimeout(() => {
          showToast.value = false;
        }, 4000);
      };
  
      // Navegación hacia atrás (reutilizada)
      const goBack = () => {
        router.back();
      };
  
      // Cargar configuraciones al montar el componente
      onMounted(() => {
        // Aquí simularías cargar las configuraciones del usuario desde tu backend o localStorage
        // Por ahora, usamos valores por defecto o los que estén en `settings.value`
        console.log('Cargando configuraciones...');
        // Ejemplo: settings.value.notificationsEnabled = someUserPreference.notifications;
        // settings.value.darkModeEnabled = localStorage.getItem('darkMode') === 'true';
      });
  
      // Simula guardar una configuración
      const saveSetting = (settingName) => {
        console.log(`Guardando configuración: ${settingName} = ${settings.value[settingName]}`);
        showNotification(`Configuración "${settingName}" actualizada.`, 'success');
        // Aquí integrarías la lógica para enviar el cambio a tu backend
        // Ejemplo: await api.updateUserSetting(settingName, settings.value[settingName]);
      };
  
      // Funciones de acción simuladas para seguridad
      const manageTwoFactor = () => {
        showNotification('Redirigiendo a la gestión de Autenticación de Dos Factores...', 'info');
        // router.push('/manage-two-factor');
      };
  
      const viewSessionHistory = () => {
        showNotification('Cargando historial de sesiones...', 'info');
        // router.push('/session-history');
      };
  
      const deleteAccount = () => {
        if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.')) {
          showNotification('Procesando eliminación de cuenta...', 'error');
          // Aquí llamarías a tu API para eliminar la cuenta.
          // Después de la eliminación exitosa, redirigirías al login o a una página de confirmación.
          // Ejemplo: await api.deleteUserAccount();
          // router.push('/goodbye');
        }
      };
  
      return {
        settings,
        goBack,
        saveSetting,
        manageTwoFactor,
        viewSessionHistory,
        deleteAccount,
        showToast,
        toastMessage,
        toastType,
        toastClasses,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Las animaciones y estilos base se mantienen para consistencia */
  .bg-pattern {
    background-size: 50px 50px;
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .group:hover .group-hover\:animate-bounce-x {
    animation: bounceX 0.8s cubic-bezier(0.5, 0, 0.5, 1.5) infinite;
  }
  
  @keyframes bounceX {
    0%, 100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
  }
  
  .slide-fade-enter-active {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(30px);
    opacity: 0;
  }
  
  /* Estilos para el switch (toggle) */
  .switch {
    position: relative;
    display: inline-block;
    width: 40px; /* Más compacto */
    height: 22px; /* Más compacto */
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fce4ec; /* Rosa muy claro */
    transition: .4s;
    border: 1px solid #f8bbd0; /* Borde rosa claro */
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px; /* Más compacto */
    width: 16px; /* Más compacto */
    left: 3px; /* Más compacto */
    bottom: 3px; /* Más compacto */
    background-color: white;
    transition: .4s;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  
  input:checked + .slider {
    background-color: #ec4899; /* Rosa fuerte */
    border-color: #db2777; /* Rosa oscuro */
  }
  
  input:focus + .slider {
    box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2);
  }
  
  input:checked + .slider:before {
    transform: translateX(18px); /* Más compacto */
  }
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 22px; /* Más compacto */
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  
  /* Mejoras en los inputs y selects */
  input[type="checkbox"], select {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  select {
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
  }
  
  select:focus {
    box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2);
    border-color: rgba(236, 72, 153, 0.5);
  }
  
  /* Efecto de profundidad en la tarjeta principal */
  .shadow-lg {
    box-shadow: 0 5px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  
  .hover\:shadow-xl:hover {
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
  }
  
  /* Mejora en el header sticky */
  .sticky {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  </style>