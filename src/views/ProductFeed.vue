<template>
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-inter antialiased">
    <Transition name="fade-overlay">
      <div
        v-if="activeProposal"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 sm:p-6 z-50 transition-opacity duration-300 backdrop-blur-sm"
        @click.self="cancelProposal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-title"
        aria-describedby="proposal-description"
      >
        <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl max-w-3xl w-full text-center md:text-left transform scale-95 opacity-0 animate-scale-in-fade relative" @click.stop>
          <button @click="cancelProposal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200" aria-label="Cerrar modal">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h3 id="proposal-title" class="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white mb-2 text-center leading-tight">
            Propón un <span class="text-rose-500 animate-pulse-text">Intercambio</span> por:
          </h3>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 p-3 mb-6 bg-rose-50 dark:bg-gray-800 rounded-xl shadow-inner border border-rose-100 dark:border-gray-700">
            <div class="flex-shrink-0">
              <img :src="`${API_BASE_URL}${activeProposal.thumbnail_image_url}`" :alt="activeProposal.title" class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl shadow-md border-2 border-rose-200 dark:border-gray-700" />
            </div>
            <div class="text-center sm:text-left">
              <p class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ activeProposal.title }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ activeProposal.category_name }}</p>
            </div>
          </div>

          <p id="proposal-description" class="text-gray-700 dark:text-gray-300 mb-6 text-center md:text-left">
            Selecciona el producto de tu lista que te gustaría ofrecer para este intercambio:
          </p>

          <div class="max-h-60 overflow-y-auto custom-scrollbar-pink p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div
              v-for="product in userProducts"
              :key="product.id"
              @click="selectProductForProposal(product)"
              :class="{
                'border-rose-500 ring-2 ring-rose-300 dark:border-rose-400 dark:ring-rose-400': selectedProductForProposal && selectedProductForProposal.id === product.id,
                'border-gray-200 dark:border-gray-700': !selectedProductForProposal || selectedProductForProposal.id !== product.id
              }"
              class="flex items-center p-3 mb-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm cursor-pointer hover:bg-rose-50 hover:dark:bg-gray-700 transition duration-200 last:mb-0 border-2"
              tabindex="0"
              role="button"
              :aria-pressed="selectedProductForProposal && selectedProductForProposal.id === product.id"
            >
              <img :src="`${API_BASE_URL}${product.thumbnail_image_url}`" :alt="product.title" class="w-16 h-16 object-cover rounded-md mr-4 border border-gray-200 dark:border-gray-600" />
              <div class="flex-1">
                <p class="font-semibold text-gray-800 dark:text-gray-100">{{ product.title }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ product.category_name }}</p>
              </div>
              <div v-if="selectedProductForProposal && selectedProductForProposal.id === product.id" class="text-rose-500 dark:text-rose-400 ml-auto animate-check-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div v-if="userProducts.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-4">
              <p class="mb-4">Parece que no tienes productos publicados para intercambiar.</p>
              <router-link to="/publish" class="inline-flex items-center px-5 py-2.5 rounded-full bg-rose-500 text-white font-semibold shadow-md hover:bg-rose-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                Publicar un Producto
              </router-link>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="cancelProposal"
              class="px-5 py-2.5 rounded-full text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              @click="sendProposal"
              :disabled="!selectedProductForProposal"
              class="px-6 py-2.5 rounded-full bg-rose-500 text-white font-semibold shadow-md hover:bg-rose-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            >
              Enviar Propuesta
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <transition name="slide-in-right">
      <div v-if="showNotification" class="fixed top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-xl z-50 flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>¡Propuesta enviada con éxito!</span>
      </div>
    </transition>

<!-- Banner Principal con Parallax -->
  <div class="relative bg-slate-50 dark:bg-slate-900 py-16 sm:py-24 rounded-2xl overflow-hidden mb-8">
    <div class="absolute inset-x-0 top-0 h-[800px] w-full -translate-y-1/3">
      <div class="absolute inset-0 bg-gradient-to-br from-rose-100 via-transparent to-transparent dark:from-rose-900/20 dark:via-transparent"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 items-center">
        
        <div>
          <p class="font-semibold text-rose-500 uppercase tracking-wider mb-3">
            Tu círculo de intercambio
          </p>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
            Dale una segunda vida a tus objetos.
          </h1>
          <p class="text-lg text-slate-600 dark:text-slate-300 max-w-lg mb-8">
            Únete a la comunidad y redescubre el valor de lo que tienes. El trueque perfecto te espera.
          </p>
          <div class="flex flex-col sm:flex-row items-start gap-4">
            <a 
              href="/publish" 
              class="inline-flex items-center justify-center px-7 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:focus:ring-rose-800"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Publicar un Objeto
            </a>
            <a 
              href="/explore" 
              class="inline-flex items-center justify-center px-7 py-3 text-slate-700 dark:text-slate-200 font-semibold rounded-lg ring-2 ring-slate-300 dark:ring-slate-700 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-300 dark:focus:ring-slate-600"
            >
              Explorar
            </a>
          </div>
        </div>

        <div class="relative w-full h-80 lg:h-96">
          <div class="group w-full h-full">
            <div class="absolute top-1/2 left-0 w-40 h-56 -translate-y-[70%] rounded-3xl shadow-xl overflow-hidden transition-all duration-700 ease-out group-hover:-translate-x-16 group-hover:scale-105 animate-[float_6s_ease-in-out_infinite]">
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800" alt="Auriculares" class="h-full w-full object-cover">
            </div>
            
            <div class="absolute top-1/2 right-0 w-40 h-56 -translate-y-[30%] rounded-3xl shadow-xl overflow-hidden transition-all duration-700 ease-out group-hover:translate-x-16 group-hover:scale-105 animate-[float_7s_ease-in-out_infinite_0.5s]">
              <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800" alt="Zapatillas Deportivas" class="h-full w-full object-cover">
            </div>

            <div class="absolute top-1/2 left-1/2 w-56 h-72 -translate-x-1/2 -translate-y-1/2 rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 ease-out group-hover:scale-110 z-10 animate-[float_5s_ease-in-out_infinite_1s]">
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800" alt="Cámara de Fotos" class="h-full w-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!--fin del banner principal-->

<!-- filtros -->
<div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md mb-8 p-4">
  <div class="container mx-auto px-2 sm:px-4">
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">

      <div class="w-full md:w-1/3 relative">
        <label for="search-filter" class="sr-only">Buscar productos</label>
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" /></svg>
        </div>
        <input 
          type="search" 
          id="search-filter" 
          placeholder="Buscar por nombre, marca..."
          v-model="searchQuery"
          class="block w-full rounded-full border-0 bg-gray-50 dark:bg-gray-700/50 py-2.5 pl-11 pr-5 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500 transition duration-200 sm:text-sm"
        />
      </div>

      <div class="flex items-center gap-3">
        <div class="relative">
          <button @click="isCategoryDropdownOpen = !isCategoryDropdownOpen" type="button" class="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <svg class="h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM2.5 6.25c0-.414.336-.75.75-.75h7.5c.414 0 .75.336.75.75v7.5c0 .414-.336-.75-.75-.75h-7.5a.75.75 0 01-.75-.75v-7.5z" /><path d="M15.25 5.5a.75.75 0 00-1.5 0v7a.75.75 0 001.5 0v-7zM17.5 5.5a.75.75 0 00-1.5 0v7a.75.75 0 001.5 0v-7z" /></svg>
            <span class="text-gray-600 dark:text-gray-400">Categoría:</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ selectedCategory || 'Todas' }}</span>
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>
          </button>
          <Transition name="dropdown">
            <div v-if="isCategoryDropdownOpen" class="absolute top-full mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div class="py-1">
                <a @click="selectCategory('')" href="#" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-rose-50 dark:hover:bg-gray-700">Todas las categorías</a>
                <a v-for="category in categories" :key="category" @click="selectCategory(category)" href="#" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-rose-50 dark:hover:bg-gray-700">{{ category }}</a>
              </div>
            </div>
          </Transition>
        </div>

        <div class="relative">
          <button @click="isSortDropdownOpen = !isSortDropdownOpen" type="button" class="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700/50 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <svg class="h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M2.24 6.5A.75.75 0 013 6h14a.75.75 0 010 1.5H3a.75.75 0 01-.76-.5zM3 10h14a.75.75 0 010 1.5H3a.75.75 0 010-1.5zM3.75 14a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z" clip-rule="evenodd" /></svg>
            <span class="text-gray-600 dark:text-gray-400">Ordenar:</span>
            <span class="font-bold text-gray-900 dark:text-white">{{ sortOptions.find(opt => opt.value === sortBy)?.label }}</span>
            <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clip-rule="evenodd" /></svg>
          </button>
          <Transition name="dropdown">
            <div v-if="isSortDropdownOpen" class="absolute top-full mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div class="py-1">
                <a v-for="option in sortOptions" :key="option.value" @click="selectSortBy(option.value)" href="#" class="text-gray-700 dark:text-gray-200 block px-4 py-2 text-sm hover:bg-rose-50 dark:hover:bg-gray-700">{{ option.label }}</a>
              </div>
            </div>
          </Transition>
        </div>
      </div>
      
      <div class="w-full md:w-auto">
        <button @click="resetFilters" class="w-full md:w-auto flex-shrink-0 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-medium py-2.5 px-6 rounded-full transition duration-200 shadow-sm ring-1 ring-inset ring-transparent hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-rose-600 dark:hover:text-white">
          Reiniciar
        </button>
      </div>

    </div>
  </div>
</div>
<!-- fin de los filstros -->

    <div class="py-10 md:py-12 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
        <div v-for="n in 12" :key="n" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-pulse">
          <div class="w-full h-48 sm:h-56 bg-gray-200 dark:bg-gray-700"></div>
          <div class="p-5">
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              <div class="h-10 bg-rose-200 dark:bg-rose-700 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-20">
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">No se encontraron productos que coincidan con tus criterios.</p>
        <button @click="resetFilters" class="mt-6 px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2">
          Mostrar todos los productos
        </button>
      </div>

      <TransitionGroup name="product-list" tag="div" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6 lg:px-8">
        <div v-for="product in filteredProducts" :key="product.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group border border-gray-100 dark:border-gray-700">
          <div class="relative">
            <img :src="`${API_BASE_URL}${product.thumbnail_image_url}`" :alt="product.title" class="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-3 right-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              {{ product.category_name }}
            </div>
          </div>
          <div class="p-5">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">{{ product.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{{ product.description }}</p>
            <div class="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
              <svg class="w-4 h-4 mr-2 text-rose-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
              <span>{{ product.condition }}</span>
            </div>
            <div class="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
              <span class="text-lg font-semibold text-gray-700 dark:text-gray-200">Hace {{ calculateAgeDays(product.created_at) }} días</span>
              <button 
                @click="openProposalModal(product)"
                class="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
              >
                Intercambiar
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import router from '@/router';

// --- Estado y Lógica del Componente ---
const products = ref([]);
const userProducts = ref([]);
const loading = ref(true);
const activeProposal = ref(null);
const selectedProductForProposal = ref(null);
const showNotification = ref(false);

// --- Estado para Filtros ---
const selectedCategory = ref('');
const sortBy = ref('date-desc');
const searchQuery = ref('');

// --- Estado para UI de Filtros y Parallax ---
const isCategoryDropdownOpen = ref(false);
const isSortDropdownOpen = ref(false);

const categories = ref(['Electrónica', 'Mobiliario', 'Deportes', 'Libros', 'Ropa y Accesorios', 'Hogar', 'Juguetes', 'Herramientas', 'Música', 'Videojuegos', 'Coleccionables', 'Arte', 'Otros']);
const sortOptions = ref([
  { value: 'date-desc', label: 'Más Recientes' },
  { value: 'date-asc', label: 'Más Antiguos' },
  { value: 'name-asc', label: 'Nombre (A-Z)' },
  { value: 'name-desc', label: 'Nombre (Z-A)' },
]);

const userStore = useUserStore();
const API_BASE_URL = 'http://localhost:8000';

// --- Lógica de Fetching y Datos (sin cambios) ---
const calculateAgeDays = (dateString) => {
  const today = new Date();
  const productDate = new Date(dateString);
  const diffTime = Math.abs(today.getTime() - productDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const fetchAllProducts = async () => {
  try {
    loading.value = true;
    const response = await fetch(`${API_BASE_URL}/products_feed`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    const loggedInUserId = userStore.user?.id;
    if (loggedInUserId) {
      products.value = data.filter(product => product.user_id !== loggedInUserId);
    } else {
      products.value = data;
    }

  } catch (error) {
    console.error("Error fetching all products:", error);
  } finally {
    loading.value = false;
  }
};

const fetchLoggedInUserProducts = async () => {
  const loggedInUserId = userStore.user?.id;
  const authToken = userStore.token;

  if (!loggedInUserId || !authToken) {
    userProducts.value = [];
    return;
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${loggedInUserId}/products`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    userProducts.value = response.data;
  } catch (error) {
    console.error("Error al obtener los productos del usuario autenticado:", error);
    userProducts.value = [];
    if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
            userStore.clearUser();
            router.push('/login');
            alert('Tu sesión ha expirado o no tienes permisos. Por favor, inicia sesión de nuevo si necesitas ver tus productos.');
        } else {
            console.error("Detalle del error de Axios:", error.response.data);
        }
    } else {
        alert(`Hubo un error al cargar tus productos: ${error.message}. Inténtalo de nuevo.`);
    }
  }
};


// --- onMounted: Inicializa todo ---
onMounted(() => {
  fetchAllProducts();

  // Lógica para el Parallax Hero Section
  const container = document.getElementById('parallax-container');
  if (!container) return;
  const elements = container.querySelectorAll('.parallax-element');
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    elements.forEach(el => {
      const depth = parseFloat(el.getAttribute('data-depth'));
      const moveX = x * depth * 30;
      const moveY = y * depth * 30;
      el.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
  });
  container.addEventListener('mouseleave', () => {
    elements.forEach(el => {
      el.style.transform = 'translate3d(0, 0, 0)';
    });
  });
});

// --- Lógica de Watcher (sin cambios) ---
watch(() => userStore.isLoggedIn, (newVal) => {
  if (newVal) {
    fetchLoggedInUserProducts();
  } else {
    userProducts.value = [];
  }
}, { immediate: true });

// --- Lógica Central de Filtrado ---
const filteredProducts = computed(() => {
  let filtered = [...products.value];
  if (searchQuery.value.trim() !== '') {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    filtered = filtered.filter(product => product.title.toLowerCase().includes(lowerCaseQuery));
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category_name === selectedCategory.value);
  }
  filtered.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    switch (sortBy.value) {
      case 'date-desc': return dateB.getTime() - dateA.getTime();
      case 'date-asc': return dateA.getTime() - dateB.getTime();
      case 'name-asc': return a.title.localeCompare(b.title);
      case 'name-desc': return b.title.localeCompare(a.title);
      default: return 0;
    }
  });
  return filtered;
});

// --- Lógica para los menús desplegables ---
const selectCategory = (category) => {
  selectedCategory.value = category;
  isCategoryDropdownOpen.value = false;
};

const selectSortBy = (value) => {
  sortBy.value = value;
  isSortDropdownOpen.value = false;
};

const resetFilters = () => {
  selectedCategory.value = '';
  sortBy.value = 'date-desc';
  searchQuery.value = '';
};

// --- Lógica del Modal de Propuesta (sin cambios) ---
const openProposalModal = (product) => {
  activeProposal.value = product;
  selectedProductForProposal.value = null;
  if (userProducts.value.length === 0 && userStore.isLoggedIn) {
      fetchLoggedInUserProducts(); 
  }
};

const cancelProposal = () => {
  activeProposal.value = null;
  selectedProductForProposal.value = null;
};

const selectProductForProposal = (product) => {
  selectedProductForProposal.value = product;
};

const sendProposal = async () => {
  if (!selectedProductForProposal.value || !activeProposal.value) {
    alert('Por favor, selecciona un producto para la propuesta.');
    return;
  }
  try {
    const authToken = userStore.token;
    if (!authToken) {
      throw new Error("No hay token de autenticación disponible para enviar la propuesta.");
    }

    await axios.post(`${API_BASE_URL}/proposals`, {
      offered_product_id: selectedProductForProposal.value.id,
      requested_product_id: activeProposal.value.id,
      proposer_user_id: userStore.user?.id,
      owner_of_requested_product_id: activeProposal.value.user_id,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });

    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);

    cancelProposal();
  } catch (error) {
    console.error('Error al enviar la propuesta:', error);
    if (axios.isAxiosError(error) && error.response) {
        alert(`Hubo un error al enviar tu propuesta: ${error.response.data.detail || error.message}. Inténtalo de nuevo.`);
    } else {
        alert(`Hubo un error al enviar tu propuesta: ${error.message}. Inténtalo de nuevo.`);
    }
  }
};
</script>

<style scoped>
/* Las animaciones y estilos existentes se mantienen */

/* Transiciones para el overlay */
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.3s ease;
}
.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}

/* Animación para el modal */
@keyframes scale-in-fade {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
.animate-scale-in-fade {
  animation: scale-in-fade 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

/* Animación para el texto del título "Intercambio" */
@keyframes pulse-text {
  0%, 100% { opacity: 1; text-shadow: 0 0 5px rgba(255, 105, 180, 0.7); }
  50% { opacity: 0.7; text-shadow: none; }
}
.animate-pulse-text {
  animation: pulse-text 2s infinite ease-in-out;
}

/* Estilos de scrollbar personalizados */
.custom-scrollbar-pink::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar-pink::-webkit-scrollbar-track {
  background: #fbcfe8; /* pink-200 */
  border-radius: 10px;
}

.custom-scrollbar-pink::-webkit-scrollbar-thumb {
  background-color: #db2777; /* rose-600 */
  border-radius: 10px;
  border: 2px solid #fbcfe8; /* pink-200 */
}

.custom-scrollbar-pink::-webkit-scrollbar-thumb:hover {
  background-color: #e11d48; /* rose-500 */
}

/* Firefox scrollbar */
.custom-scrollbar-pink {
  scrollbar-width: thin;
  scrollbar-color: #db2777 #fbcfe8; /* thumb track */
}

/* Animación para el botón de Publicar tu Producto en el header */
@keyframes slideUpButton {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Transición para la notificación de éxito */
.slide-in-right-enter-active,
.slide-in-right-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
.slide-in-right-enter-from,
.slide-in-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Animación para el check de selección de producto */
.animate-check-pulse {
  animation: checkPulse 1s infinite;
}

@keyframes checkPulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
}

/* Animación de fade-in-up para elementos del header */
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transiciones para la lista de productos (cuando se filtra/ordena) */
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.5s ease;
}
.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.product-list-leave-active {
  position: absolute;
}

/* Efecto de recorte de texto para descripciones y nombres de producto */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>