<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full animate-card-fade-in"
       tabindex="0"
       role="listitem"
       :aria-labelledby="'product-name-' + product.id"
       :aria-describedby="'product-description-' + product.id">
    <div class="relative w-full h-48 sm:h-56 overflow-hidden">
      <img :src="product.imageUrl" :alt="product.name" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div class="absolute top-3 right-3 bg-brand-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1 opacity-90">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm.94 13.06a.75.75 0 01-1.06 0l-4-4a.75.75 0 011.06-1.06L9.25 11.44V7a.75.75 0 011.5 0v4.44l2.19-2.19a.75.75 0 111.06 1.06l-4 4z" />
        </svg>
        <span>{{ getStarRating(product.value) }} Estrellas</span>
      </div>
    </div>
    <div class="p-4 flex flex-col flex-grow">
      <h3 :id="'product-name-' + product.id" class="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight truncate">
        {{ product.name }}
      </h3>
      <p :id="'product-description-' + product.id" class="text-gray-600 dark:text-gray-400 text-sm mb-3 flex-grow line-clamp-3">
        {{ product.description }}
      </p>
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-brand-accentBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5.99L17 8v9.99A2 2 0 0115 20H9.002A2 2 0 017 18V7zm0 0a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span class="font-medium text-gray-700 dark:text-gray-300">{{ product.category }}</span>
      </div>
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-brand-accentBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h8m-8 4h8m-6 4H8m0 0H6a2 2 0 01-2-2v-7a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2h-2m-8 0V7m0 0H8" />
        </svg>
        Publicado: <span class="font-medium text-gray-700 dark:text-gray-300 ml-1">{{ formatDate(product.publicationDate) }}</span>
      </div>
      <div class="flex justify-end mt-auto">
        <button
          @click="$emit('propose-trade', product)"
          class="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-brand-primary to-brand-accentPink text-white font-bold rounded-full text-base shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-98 focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
          aria-label="Proponer intercambio"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 8a6 6 0 01-7.116 5.867C9.362 14.815 8.1 16 6.5 16H3a1 1 0 01-1-1V9a1 1 0 011-1h3.5c1.284 0 2.443.834 2.871 2.057A5.996 5.996 0 0118 8zM5 8h.5a1.5 1.5 0 000-3H5v3zm8 0c0-2.485-2.015-4.5-4.5-4.5S4 5.515 4 8h9z" clip-rule="evenodd" />
          </svg>
          Proponer intercambio
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      name: 'Producto Desconocido',
      description: 'Sin descripción.',
      value: 0,
      category: 'General',
      publicationDate: '2025-01-01',
      imageUrl: 'https://via.placeholder.com/400x300.png?text=Producto',
      owner: 'Desconocido',
      status: 'disponible',
    }),
  },
});

const emit = defineEmits(['propose-trade']);

// Función de ayuda para obtener la calificación de estrellas
const getStarRating = (value) => {
  if (value >= 250) return 5;
  if (value >= 150) return 4;
  if (value >= 80) return 3;
  if (value >= 30) return 2;
  if (value >= 1) return 1;
  return 0;
};

// Función de ayuda para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};
</script>

<style scoped>
/* Estilos y animaciones (Styles and Animations) */
.animate-card-fade-in {
  animation: cardFadeIn 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>