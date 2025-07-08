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
          <span class="inline-block transition-all duration-300 hover:scale-105 hover:drop-shadow-lg">KAMBIA<span class="font-black">PE</span></span>
        </h1>

        <div class="w-6 h-6 sm:w-10 sm:h-10 invisible"></div>
      </div>
    </header>

    <div class="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden mt-6 mb-8 transition-all duration-300 hover:shadow-xl border border-pink-100">
      <div class="relative bg-gradient-to-r from-pink-600 to-pink-700 h-40 sm:h-48 flex items-center justify-center p-4 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-black/10"></div>
        <div class="absolute inset-0 bg-pattern opacity-10" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgZmlsbD0iI2ZmZiIgY3g9IjIwIiBjeT0iMjAiIHI9IjEuNSIvPjwvZz48L3N2Zz4=');"></div>
        
        <div class="relative z-10 flex flex-col items-center animate-fade-in-up">
          <div class="relative group">
            <div class="h-28 w-28 rounded-full border-3 border-white/90 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-white overflow-hidden ring-1 ring-pink-400/20">
              <img
                class="w-full h-full object-cover"
                :src="userProfile.profilePicture || 'https://source.unsplash.com/300x300/?portrait,person'"
                alt="Foto de perfil"
                loading="lazy"
              />
            </div>
            <div v-if="editMode" class="absolute inset-0 rounded-full bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer" @click="changeProfilePicture">
              <span class="text-white text-xs font-semibold bg-pink-600/80 px-2 py-1 rounded-full backdrop-blur-sm">CAMBIAR FOTO</span>
            </div>
          </div>
          <h1 class="mt-4 text-2xl sm:text-3xl font-extrabold text-white text-center drop-shadow-md tracking-tight">
            {{ capitalizeFirstLetter(userProfile.fullName) }}
          </h1>
          <p class="mt-1 text-base text-pink-100/90 text-center font-medium">{{ userProfile.email }}</p>
        </div>
      </div>

      <div class="p-5 sm:p-7 md:p-8 space-y-8">
        <section class="animate-fade-in-up" style="animation-delay: 100ms">
          <div class="flex items-center mb-5 pb-3 border-b border-pink-100">
            <div class="bg-pink-100 p-2 rounded-lg mr-3 shadow-inner">
              <svg class="w-5 h-5 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-pink-900 uppercase">Información Personal</h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div class="space-y-1">
              <label class="block text-xs font-medium text-pink-600/80 tracking-wide uppercase">Nombre Completo</label>
              <p v-if="!editMode" class="text-base font-semibold text-pink-900 leading-tight">{{ capitalizeFirstLetter(userProfile.fullName) }}</p>
              <input v-else v-model="editableProfile.fullName" type="text" class="block w-full border border-pink-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300 transition-all duration-200 bg-pink-50/50 placeholder-pink-300/70">
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-medium text-pink-600/80 tracking-wide uppercase">Correo Electrónico</label>
              <p class="text-base font-semibold text-pink-900 leading-tight">{{ userProfile.email }}</p>
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-medium text-pink-600/80 tracking-wide uppercase">Teléfono</label>
              <p v-if="!editMode" class="text-base font-semibold text-pink-900 leading-tight">{{ userProfile.phone || 'No especificado' }}</p>
              <input v-else v-model="editableProfile.phone" type="tel" class="block w-full border border-pink-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300 transition-all duration-200 bg-pink-50/50 placeholder-pink-300/70">
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-medium text-pink-600/80 tracking-wide uppercase">Dirección</label>
              <p v-if="!editMode" class="text-base font-semibold text-pink-900 leading-tight">{{ userProfile.address || 'No especificada' }}</p>
              <input v-else v-model="editableProfile.address" type="text" class="block w-full border border-pink-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300 transition-all duration-200 bg-pink-50/50 placeholder-pink-300/70">
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-medium text-pink-600/80 tracking-wide uppercase">Fecha de Nacimiento</label>
              <p v-if="!editMode" class="text-base font-semibold text-pink-900 leading-tight">{{ userProfile.dateOfBirth || 'No especificada' }}</p>
              <input v-else v-model="editableProfile.dateOfBirth" type="date" class="block w-full border border-pink-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300 transition-all duration-200 bg-pink-50/50 placeholder-pink-300/70 appearance-none">
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-medium text-pink-600/80 tracking-wide uppercase">Género</label>
              <p v-if="!editMode" class="text-base font-semibold text-pink-900 leading-tight">{{ userProfile.gender || 'No especificado' }}</p>
              <select v-else v-model="editableProfile.gender" class="block w-full border border-pink-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300 transition-all duration-200 bg-pink-50/50 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNlY2Q0OWEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZxqvbWluPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')].bg-no-repeat bg-[right_0.75rem_center] bg-[length:1rem]">
                <option value="">Selecciona</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                <option value="No especificar">Prefiero no especificar</option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="block text-xs font-medium text-pink-600/80 tracking-wide uppercase">Ocupación</label>
              <p v-if="!editMode" class="text-base font-semibold text-pink-900 leading-tight">{{ userProfile.occupation || 'No especificada' }}</p>
              <input v-else v-model="editableProfile.occupation" type="text" class="block w-full border border-pink-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300 transition-all duration-200 bg-pink-50/50 placeholder-pink-300/70">
            </div>

            <div class="space-y-1 md:col-span-2">
              <label class="block text-xs font-medium text-pink-600/80 tracking-wide uppercase">Acerca de mí</label>
              <p v-if="!editMode" class="text-sm text-pink-800/90 leading-relaxed">{{ userProfile.bio || 'No hay información adicional sobre ti.' }}</p>
              <textarea v-else v-model="editableProfile.bio" rows="3" class="block w-full border border-pink-200 rounded-md py-2.5 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-300 transition-all duration-200 bg-pink-50/50 placeholder-pink-300/70"></textarea>
            </div>
          </div>
        </section>

        <section class="animate-fade-in-up" style="animation-delay: 200ms">
          <div class="flex items-center mb-5 pb-3 border-b border-pink-100">
            <div class="bg-pink-100 p-2 rounded-lg mr-3 shadow-inner">
              <svg class="w-5 h-5 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-pink-900 uppercase">Ajustes y Acciones</h2>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            <template v-if="!editMode">
              <button
                @click="enterEditMode"
                class="col-span-1 flex items-center justify-center px-5 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <svg class="w-4 h-4 mr-2 group-hover:animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                EDITAR PERFIL
              </button>
            </template>
            <template v-else>
              <button
                @click="saveProfile"
                :disabled="userStore.loading"
                class="col-span-1 flex items-center justify-center px-5 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg v-if="userStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else class="w-4 h-4 mr-2 group-hover:animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ userStore.loading ? 'GUARDANDO...' : 'GUARDAR CAMBIOS' }}
              </button>
              <button
                @click="cancelEdit"
                class="col-span-1 flex items-center justify-center px-5 py-3 border border-pink-300 text-sm font-bold rounded-lg text-pink-700 bg-white hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-200 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <svg class="w-4 h-4 mr-2 group-hover:animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                CANCELAR
              </button>
            </template>
            
            <button
              @click="changePassword"
              class="col-span-1 flex items-center justify-center px-5 py-3 border border-pink-300 text-sm font-bold rounded-lg text-pink-700 bg-white hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-200 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <svg class="w-4 h-4 mr-2 group-hover:animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              CAMBIAR CONTRASEÑA
            </button>
            <button
              @click="logout"
              class="col-span-1 flex items-center justify-center px-5 py-3 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <svg class="w-4 h-4 mr-2 group-hover:animate-bounce-x" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              CERRAR SESIÓN
            </button>
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
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';

export default {
  name: 'MyProfile',
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    
    // Reactive variables for Toast
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastType = ref('info'); // 'success', 'error', 'info'

    // Computed property for toast classes
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

    // Capitalize first letter function
    const capitalizeFirstLetter = (str) => {
      if (!str) return '';
      return str.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    };

    // Reactive variable for edit mode
    const editMode = ref(false);

    // Temporary object to hold changes while editing
    const editableProfile = ref({});

    // Get userProfile from the store (reactive)
    const userProfile = userStore.getUserProfile;

    // Watch for changes in userProfile
    watch(userProfile, (newProfile) => {
      if (!editMode.value) {
        editableProfile.value = { ...newProfile };
      }
    }, { immediate: true, deep: true });

    // When the component is mounted, try to load the full profile
    onMounted(async () => {
      if (userStore.isLoggedIn && userStore.user?.id) {
        await userStore.fetchUserProfile(userStore.user.id);
      } else if (!userStore.isLoggedIn) {
        router.push('/login');
      }
    });

    // Function to show the Toast notification
    const showNotification = (message, type = 'info') => {
      toastMessage.value = message;
      toastType.value = type;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 4000);
    };

    // Navigation back
    const goBack = () => {
      router.back();
    };

    // Enter edit mode
    const enterEditMode = () => {
      editableProfile.value = { ...userProfile };
      editMode.value = true;
      showNotification('Modo edición activado. Realiza tus cambios.', 'info');
    };

    // Cancel edit mode
    const cancelEdit = () => {
      editMode.value = false;
      showNotification('Edición cancelada. Los cambios no se guardaron.', 'info');
    };

    // Save profile changes
    const saveProfile = async () => {
      if (!userStore.user?.id) {
        showNotification('Error: No se pudo identificar al usuario para guardar el perfil.', 'error');
        return;
      }

      // Basic validation
      if (!editableProfile.value.fullName || !editableProfile.value.email) {
        showNotification('El nombre completo y el correo electrónico son campos obligatorios.', 'error');
        return;
      }

      showNotification('Guardando cambios...', 'info');
      
      const success = await userStore.updateProfile(userStore.user.id, editableProfile.value);

      if (success) {
        editMode.value = false;
        showNotification('¡Perfil actualizado exitosamente!', 'success');
      } else {
        showNotification(userStore.error || 'Hubo un error al actualizar el perfil.', 'error');
      }
    };

    // Function for changing profile picture
    const changeProfilePicture = () => {
      showNotification('Funcionalidad para cambiar foto de perfil aún no implementada.', 'info');
    };

    const changePassword = () => {
      showNotification('Redirigiendo a la página de cambio de contraseña...', 'info');
      setTimeout(() => {
        router.push('/change-password');
      }, 800);
    };

    const logout = async () => {
      showNotification('Cerrando sesión...', 'info');
      await new Promise(resolve => setTimeout(resolve, 1000));
      userStore.clearUser();
      router.push('/login');
    };

    return {
      userProfile,
      editMode,
      editableProfile,
      goBack,
      enterEditMode,
      cancelEdit,
      saveProfile,
      changeProfilePicture,
      changePassword,
      logout,
      showToast,
      toastMessage,
      toastType,
      toastClasses,
      capitalizeFirstLetter,
      userStore
    };
  },
};
</script>

<style scoped>
/* Animaciones premium */
.bg-pattern {
  background-size: 50px 50px;
}

/* Animación de aparición premium */
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

/* Animación de rebote horizontal premium */
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

/* Transición de toast premium */
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

/* Mejoras en los inputs premium */
input, select, textarea {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
}

input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.2);
  border-color: rgba(236, 72, 153, 0.5);
}

/* Mejora en la imagen de perfil premium */
img {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Efecto de hover en botones secundarios */
button.border-pink-300:hover {
  box-shadow: 0 2px 8px -1px rgba(236, 72, 153, 0.2);
}

/* Efecto de profundidad en la tarjeta principal */
.shadow-xl {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.hover\:shadow-2xl:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

/* Mejora en el header sticky */
.sticky {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>