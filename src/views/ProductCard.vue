<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group"
  >
    <div class="relative overflow-hidden w-full aspect-video">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
      
      <span class="absolute top-4 right-4 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
        {{ product.category }}
      </span>
      
      <span v-if="product.status === 'intercambiado'" class="absolute bottom-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
        Intercambiado
      </span>
    </div>

    <div class="p-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white truncate">
          {{ product.name }}
        </h3>
        <span class="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
          S/ {{ product.value }}
        </span>
      </div>
      
      <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
        {{ product.description }}
      </p>
      
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
        </svg>
        <span class="mr-3">{{ formatDate(product.publicationDate) }}</span>
        
        <svg class="w-4 h-4 mr-1 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
        </svg>
        <span>{{ product.owner }}</span>
      </div>

      <button
        @click.stop="proposeTrade"
        :disabled="product.status === 'intercambiado'"
        :class="{ 
          'bg-blue-600 hover:bg-blue-700': product.status !== 'intercambiado', 
          'bg-gray-400 cursor-not-allowed': product.status === 'intercambiado' 
        }"
        class="w-full text-white px-4 py-3 rounded-xl font-bold transition duration-300 ease-in-out transform hover:scale-105"
      >
        {{ product.status === 'intercambiado' ? 'Ya Intercambiado' : 'Proponer Intercambio' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['propose-trade']);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const proposeTrade = () => {
  if (props.product.status !== 'intercambiado') {
    emit('propose-trade', props.product);
  }
};
</script>

<style scoped>
</style>