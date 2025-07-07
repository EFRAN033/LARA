<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.03] transition-all duration-500 ease-in-out cursor-pointer group relative z-0
           border border-gray-100 dark:border-gray-700
           hover:shadow-purple-500/20 dark:hover:shadow-purple-700/30"
  >
    <div class="relative overflow-hidden w-full h-64 md:h-72">
      <img
        :src="product.imageUrl"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-800 group-hover:scale-120 transform group-hover:rotate-2 group-hover:brightness-90"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-400"></div>
      
      <span class="absolute top-6 right-6 bg-gradient-to-br from-purple-600 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg transform -rotate-3 group-hover:rotate-0 transition-all duration-400 ease-out z-10">
        {{ product.category }}
      </span>
      
      <transition name="pop-in">
        <div v-if="product.status === 'intercambiado'" 
             class="absolute bottom-6 left-6 bg-red-600 text-white text-sm font-semibold px-5 py-2 rounded-full animate-pulse shadow-xl transform -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 z-10">
          <span class="flex items-center">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clip-rule="evenodd"></path></svg>
            Intercambiado
          </span>
        </div>
      </transition>
    </div>

    <div class="p-7 md:p-8 relative">
      <div class="absolute top-0 right-8 -mt-7 transform -skew-x-12">
        <div class="bg-blue-100/70 dark:bg-blue-900/50 text-white px-5 py-2 rounded-lg shadow-md flex items-center justify-center border border-blue-200/50 dark:border-blue-700/50 transform skew-x-12 backdrop-blur-sm">
          <template v-for="n in 5" :key="n">
            <svg 
              :class="{'text-yellow-400': n <= product.value, 'text-gray-300 dark:text-blue-200 opacity-60': n > product.value}" 
              class="w-5 h-5 mx-[1px] transition-colors duration-200" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.929 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
            </svg>
          </template>
        </div>
      </div>

      <div class="mb-4 pt-4"> <h3 class="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight truncate pr-20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {{ product.name }}
        </h3>
      </div>
      
      <p class="text-base text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
        {{ product.description }}
      </p>
      
      <div class="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6 space-x-4">
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 1 0 00-2 2v10a2 1 0 002 2h12a2 1 0 002-2V6a2 1 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
          </svg>
          <span>{{ formatDate(product.publicationDate) }}</span>
        </div>
        
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-2 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
          </svg>
          <span>{{ product.owner }}</span>
        </div>
      </div>

      <button
        @click.stop="proposeTrade"
        :disabled="product.status === 'intercambiado'"
        :class="{ 
          'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-xl group-hover:shadow-blue-500/40 dark:group-hover:shadow-blue-700/50': product.status !== 'intercambiado', 
          'bg-gray-400 dark:bg-gray-600 cursor-not-allowed shadow-md': product.status === 'intercambiado' 
        }"
        class="w-full text-white px-6 py-3.5 rounded-xl font-bold text-xl transition duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-[1.01]"
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
/* Animación de entrada/salida para "Intercambiado" con un efecto de "pop" */
.pop-in-enter-active {
  animation: pop-in 0.5s ease-out;
}
.pop-in-leave-active {
  animation: pop-in 0.5s ease-in reverse;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0.5) translate(-10px, 10px);
  }
  80% {
    opacity: 1;
    transform: scale(1.05) translate(0, 0);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(0, 0);
  }
}
</style>