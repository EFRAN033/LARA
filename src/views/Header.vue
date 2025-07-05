<template>
  <header class="bg-gradient-to-r from-[#d7037b] to-[#9e0154] shadow-lg sticky top-0 z-50 border-b border-white/10 backdrop-blur-sm">
    <div class="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
      
      <a href="/" class="flex items-center space-x-2 group" aria-label="KambiaPe - Inicio">
        <span class="text-xl md:text-2xl font-extrabold text-white tracking-tight">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#ffebf2]">Kambia</span>
          <span class="font-medium text-[#ffebf2]/90">Pe</span>
        </span>
      </a>

      <nav class="hidden lg:flex items-center space-x-1">
        <a href="#" class="px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative group">
          <span>Explorar</span>
          <span class="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
        </a>
        <a href="#" class="px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative group">
          <span>Publicar</span>
          <span class="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
        </a>
        <a href="#" class="px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative group">
          <span class="flex items-center">
            Eventos
            <span class="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-[#ff4081] text-white animate-bounce">Nuevo</span>
          </span>
          <span class="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
        </a>
        <a href="#" class="px-4 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 relative group">
          <span class="flex items-center">
            Buzón
            <span class="ml-1.5 px-1.5 py-0.5 text-xs font-bold rounded-full bg-white text-[#d7037b]">3</span>
          </span>
          <span class="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
        </a>
      </nav>

      <div class="hidden lg:flex items-center space-x-3">
        <div class="relative">
          <input 
            type="text" 
            placeholder="Buscar..." 
            class="pl-10 pr-4 py-2 w-48 text-sm rounded-full bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <a 
          href="#" 
          class="text-sm font-semibold text-white hover:text-[#ffebf2] transition duration-200 relative mr-20"
          @mouseenter="showTooltip = true"
          @mouseleave="showTooltip = false"
        >
          Iniciar Sesión
          <div v-if="showTooltip" class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-white text-[#d7037b] text-xs font-bold rounded-lg shadow-lg whitespace-nowrap">
            ¡Tus datos te esperan!
          </div>
        </a>
        
        <a 
          href="#" 
          class="relative overflow-hidden bg-white text-[#d7037b] px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.03] active:scale-95"
          id="cta-button"
        >
          <span class="relative z-10">Regístrate Gratis</span>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -rotate-45 -translate-x-full group-hover:translate-x-full"></span>
        </a>
      </div>

      <div class="lg:hidden flex items-center space-x-4">
        <button @click="toggleSearch" class="text-white p-2 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button @click="toggleMenu" class="text-white p-2 focus:outline-none transition-transform duration-200 active:scale-90">
          <span class="sr-only">{{ menuOpen ? 'Cerrar menú' : 'Abrir menú' }}</span>
          <div class="w-6 flex flex-col items-end space-y-1.5">
            <span class="block h-0.5 w-6 bg-white transition-all duration-300" :class="{'transform rotate-45 translate-y-2': menuOpen}"></span>
            <span class="block h-0.5 bg-white transition-all duration-300" :class="{'w-3': !menuOpen, 'w-6 opacity-0': menuOpen}"></span>
            <span class="block h-0.5 w-6 bg-white transition-all duration-300" :class="{'transform -rotate-45 -translate-y-2': menuOpen}"></span>
          </div>
        </button>
      </div>
    </div>

    <div v-show="searchOpen" class="lg:hidden bg-[#9e0154] px-4 py-3">
      <div class="relative max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Buscar en KambiaPe..." 
          class="w-full pl-10 pr-4 py-3 text-sm rounded-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
        >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white/60 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>

    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-show="menuOpen" class="lg:hidden bg-white shadow-xl">
        <div class="container mx-auto px-4 py-6">
          <nav class="flex flex-col space-y-1">
            <a href="#" class="px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-[#fce4ec] rounded-lg transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-[#d7037b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explorar
            </a>
            <a href="#" class="px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-[#fce4ec] rounded-lg transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-[#d7037b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Publicar
            </a>
            <a href="#" class="px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-[#fce4ec] rounded-lg transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-[#d7037b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Eventos
              <span class="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-[#d7037b] text-white">Nuevo</span>
            </a>
            <a href="#" class="px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-[#fce4ec] rounded-lg transition-colors duration-200 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-[#d7037b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Buzón
              <span class="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-[#d7037b] text-white">3</span>
            </a>
          </nav>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <a href="#" class="block text-center px-6 py-3 text-lg font-bold text-[#d7037b] hover:bg-[#fce4ec] rounded-lg transition-colors duration-200 mb-3">
              Iniciar Sesión
            </a>
            <a href="#" class="block text-center px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95">
              Regístrate Gratis
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);
const searchOpen = ref(false);
const showTooltip = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    searchOpen.value = false;
  }
};

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    menuOpen.value = false;
  }
};
</script>