<template>
  <section class="container mx-auto px-6 py-12 md:py-20">
    <div
      v-if="activeProposal"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-6 z-50 transition-opacity duration-300"
      @click.self="cancelProposal"
    >
      <div class="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl w-full text-center md:text-left animate-fade-in-down" role="dialog" aria-modal="true" aria-labelledby="proposal-title" aria-describedby="proposal-description">
        <h3 id="proposal-title" class="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
          ¡Haz una oferta por: "<span class="text-brand-primary">{{ activeProposal.productToGet.name }}</span>"!
        </h3>
        <p id="proposal-description" class="text-gray-600 dark:text-gray-400 mb-8 text-lg">
          Selecciona los productos de tu colección que te gustaría ofrecer a cambio.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-h-96 overflow-y-auto pr-2">
          <div
            v-for="product in myProducts"
            :key="product.id"
            @click="toggleProductSelection(product)"
            :class="{ 
              'border-brand-accentPink shadow-lg scale-[1.02] ring-4 ring-brand-light bg-brand-light dark:bg-brand-dark': isProductSelected(product) 
            }"
            class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border-2 border-transparent transition-all duration-200 cursor-pointer hover:border-brand-accentPink transform hover:shadow-md"
          >
            <img :src="product.imageUrl" :alt="product.name" class="w-full h-32 object-cover rounded-lg mb-2" />
            <h4 class="font-bold text-gray-900 dark:text-white truncate">{{ product.name }}</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">S/ {{ product.value }}</p>
            <div v-if="isProductSelected(product)" class="absolute top-2 right-2 p-1.5 bg-brand-primary rounded-full text-white flex items-center justify-center transform scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div v-if="myProducts.length === 0" class="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-8">
            ¡Ups! Parece que no tienes productos disponibles para ofrecer. <br> ¿Quizás sea un buen momento para añadir algunos?
          </div>
        </div>
        
        <div v-if="selectedProducts.length > 0" class="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl mb-8 border border-dashed border-gray-300 dark:border-gray-700">
          <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Tu Propuesta de Intercambio</h4>
          <div class="flex justify-around items-center gap-6 flex-wrap">
            <div class="text-center flex-1 min-w-[150px]">
                <p class="text-gray-600 dark:text-gray-400 text-lg font-semibold mb-1">Valor Ofrecido</p>
                <p class="text-3xl font-extrabold text-success">S/ {{ totalValueOffered }}</p>
            </div>
            
            <div class="hidden md:block border-l-2 border-gray-300 dark:border-gray-700 h-20 mx-4"></div>

            <div class="text-center flex-1 min-w-[150px]">
                <p class="text-gray-600 dark:text-gray-400 text-lg font-semibold mb-1">Valor del Producto</p>
                <p class="text-3xl font-extrabold text-accentBlue">S/ {{ activeProposal.productToGet.value }}</p>
            </div>

            <div class="hidden md:block border-l-2 border-gray-300 dark:border-gray-700 h-20 mx-4"></div>
            
            <div class="text-center flex-1 min-w-[180px]">
                <p class="text-gray-600 dark:text-gray-400 text-lg font-semibold mb-1">Diferencia Neta</p>
                <p :class="{ 'text-success': valueDifference >= 0, 'text-error': valueDifference < 0 }" class="text-4xl font-extrabold mt-2 animate-pulse">
                    S/ {{ Math.abs(valueDifference) }}
                </p>
                <span class="text-base font-semibold" :class="{ 'text-success': valueDifference >= 0, 'text-error': valueDifference < 0 }">
                    {{ valueDifference >= 0 ? 'A tu favor' : 'A su favor' }}
                </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            @click="cancelProposal"
            class="px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 shadow-sm hover:shadow-md"
          >
            Cancelar Propuesta
          </button>
          <button
            @click="sendProposal"
            :disabled="selectedProducts.length === 0"
            :class="{ 
              'bg-gradient-to-r from-brand-primary to-brand-dark hover:brightness-110 shadow-lg hover:shadow-xl': selectedProducts.length > 0, 
              'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed': selectedProducts.length === 0 
            }"
            class="px-8 py-4 rounded-xl text-white font-bold transition duration-300 transform hover:scale-105"
          >
            Confirmar y Enviar
          </button>
        </div>
      </div>
    </div>
    
    <transition name="fade-notification">
      <div
        v-if="showNotification"
        class="fixed bottom-6 right-6 p-5 bg-gradient-to-r from-success to-green-600 text-white rounded-xl shadow-lg flex items-center gap-3 z-50 transform"
        style="min-width: 280px;"
        role="status"
        aria-live="polite"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <p class="font-semibold text-lg">¡Propuesta enviada con éxito!</p>
      </div>
    </transition>

    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
      <div class="text-center sm:text-left">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Explora Intercambios Disponibles
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Hemos encontrado <span class="font-bold text-brand-primary">{{ filteredAndSortedProducts.length }}</span> productos listos para un trueque. ¡Anímate a explorar!
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-4 w-full sm:w-auto">
        <div class="relative w-full md:w-auto">
          <label for="category-select" class="sr-only">Filtrar por Categoría</label>
          <select
            id="category-select"
            v-model="selectedCategory"
            class="block w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm appearance-none"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
          <button v-if="selectedCategory" @click="selectedCategory = ''" class="absolute right-10 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none" aria-label="Limpiar filtro de categoría">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
          </button>
        </div>

        <div class="relative w-full md:w-auto">
          <label for="sort-select" class="sr-only">Ordenar por</label>
          <select
            id="sort-select"
            v-model="sortBy"
            class="block w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm appearance-none"
          >
            <option value="date-desc">Fecha de Publicación (Más reciente)</option>
            <option value="date-asc">Fecha de Publicación (Más antigua)</option>
            <option value="value-desc">Valor (Mayor a Menor)</option>
            <option value="value-asc">Valor (Menor a Mayor)</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-300">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <transition-group
      name="product-list"
      tag="div"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <ProductCard
        v-for="product in filteredAndSortedProducts"
        :key="product.id"
        :product="product"
        @propose-trade="startProposal"
      />
    </transition-group>
    
    <div v-if="filteredAndSortedProducts.length === 0" class="text-center py-16">
      <p class="text-2xl font-semibold text-gray-500 dark:text-gray-400">
        <span role="img" aria-label="emoji sorprendido">😮</span> ¡Vaya! No se encontraron productos con los filtros seleccionados.
      </p>
      <button @click="resetFilters" class="mt-6 px-6 py-3 bg-brand-primary text-white rounded-full font-semibold hover:bg-brand-dark transition duration-300 ease-in-out transform hover:scale-105">
        Restablecer Filtros
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductCard from './ProductCard.vue'; 

const allProducts = ref([
  { id: 1, name: 'Silla de Oficina Ergonómica', description: 'Silla con soporte lumbar y reposabrazos ajustables, ideal para largas jornadas de trabajo.', value: 532.5, category: 'Mobiliario', publicationDate: '2025-06-28', owner: 'Juan P.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1596541223126-2586e3002283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw0fHxzb2Zhc3xlbnwwfHx8fDE3MTk3MDA1MDN8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 2, name: 'Laptop Dell XPS 13', description: 'Laptop ultraligera y potente, perfecta para diseño gráfico y programación.', value: 3195.0, category: 'Electrónica', publicationDate: '2025-06-25', owner: 'Maria G.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1627885449272-d5761a29b6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfHx8fDE3MTk3MDA2MDN8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 3, name: 'Cámara Fotográfica DSLR Canon', description: 'Cámara semi-profesional con lente 50mm, en excelente estado.', value: 1608.75, category: 'Electrónica', publicationDate: '2025-06-29', owner: 'Carlos R.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1512790180421-ce0196236b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHwzfHxjYW1lcmF8ZW58MHx8fHwxNzE5NzAwNjE1fDA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 4, name: 'Bicicleta de Montaña', description: 'Bicicleta rodado 29, con frenos de disco y 21 velocidades.', value: 1065.0, category: 'Deportes', publicationDate: '2025-06-20', owner: 'Ana L.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1579758652431-7e8e9c2f664a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw1fHxiaWN5Y2xlfGVufDB8fHx8MTcxOTcwMDYzOXww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 5, name: 'Guitarra Acústica', description: 'Guitarra de madera de abeto, sonido cálido y resonante, incluye funda.', value: 710.0, category: 'Música', publicationDate: '2025-06-27', owner: 'Pedro S.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1616238622179-11c52d8c3621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw2fHxndWl0YXJyfGVufDB8fHx8MTcxOTcwMDY2NHww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 6, name: 'Monitor 4K de 27 pulgadas', description: 'Monitor con colores vibrantes y alta resolución, ideal para edición de video.', value: 1420.0, category: 'Electrónica', publicationDate: '2025-06-26', owner: 'Laura M.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1549492193-41c3de145d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHwyfHxtb25pdG9yfGVufDB8fHx8MTcxOTcwMDY4MHww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 7, name: 'Libro "El principito"', description: 'Edición especial de colección con ilustraciones originales.', value: 88.75, category: 'Libros', publicationDate: '2025-06-15', owner: 'Elena C.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1517431289124-7331804f3788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHwxNXx8Ym9va3xlbnwwfHx8fDE3MTk3MDA2OTl8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 8, name: 'Juego de sartenes de teflón', description: 'Set de 3 sartenes antiadherentes de diferentes tamaños.', value: 284.0, category: 'Hogar', publicationDate: '2025-06-21', owner: 'Roberto F.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1627708573434-2e2a046c8270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw2fHxwYW5zfGVufDB8fHx8MTcxOTcwMDcwN3ww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 9, name: 'Drone con cámara HD', description: 'Drone plegable con cámara 1080p y control remoto.', value: 639.0, category: 'Electrónica', publicationDate: '2025-06-30', owner: 'Sofía D.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1533220794503-4f107297d2e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw1fHxkcm9uZXxlbnwwfHx8fDE3MTk3MDA3Mjd8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 10, name: 'Consola Nintendo Switch', description: 'Consola portátil con controles Joy-Con, poco uso.', value: 994.0, category: 'Videojuegos', publicationDate: '2025-06-24', owner: 'Daniel V.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1601614749891-b3b3a3d5f303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw5fHxuaW50ZW5kbyUyMHN3aXRjaHxlbnwwfHx8fDE3MTk3MDA3NDF8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 11, name: 'Smartphone Google Pixel 7', description: 'Teléfono con cámara de alta calidad y excelente rendimiento.', value: 1775.0, category: 'Electrónica', publicationDate: '2025-05-10', owner: 'Usuario Actual', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1678170258079-6617a23c09f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw2fHxwYXJ0eSUyMGdhbWVzfGVufDB8fHx8MTcxOTcwMDc2NXww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 12, name: 'Reloj Inteligente Xiaomi', description: 'Smartwatch con monitor de ritmo cardíaco y GPS.', value: 355.0, category: 'Electrónica', publicationDate: '2025-04-22', owner: 'Usuario Actual', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1523275335684-c5fdc70387b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw0fHxjbG9ja3xlbnwwfHx8fDE3MTk3MDA3Njh8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 13, name: 'Cafetera Nespresso', description: 'Máquina de café de cápsulas, incluye espumador de leche.', value: 710.0, category: 'Hogar', publicationDate: '2025-03-01', owner: 'Usuario Actual', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHwzfHxjYWZlJTIwYW5kJTIwY2FwY2Frc2VzfGVufDB8fHx8MTcxOTcwMDc3NXww&ixlib=rb-4.0.3&q=80&w=400' },
]);

const selectedCategory = ref('');
const sortBy = ref('date-desc');

const activeProposal = ref(null); 
const selectedProducts = ref([]); 

const showNotification = ref(false); 

const myProducts = computed(() => allProducts.value.filter(p => p.owner === 'Usuario Actual' && p.status === 'disponible'));

const startProposal = (product) => {
  activeProposal.value = {
    productToGet: product,
    proposerId: 'usuario-actual-id', 
    recipientId: 'id-del-dueno-del-producto',
  };
  selectedProducts.value = []; 
};

const cancelProposal = () => {
  activeProposal.value = null;
  selectedProducts.value = [];
};

const toggleProductSelection = (product) => {
  const index = selectedProducts.value.findIndex(p => p.id === product.id);
  if (index > -1) {
    selectedProducts.value.splice(index, 1); 
  } else {
    selectedProducts.value.push(product); 
  }
};

const isProductSelected = (product) => {
  return selectedProducts.value.some(p => p.id === product.id);
};

const totalValueOffered = computed(() => {
  return selectedProducts.value.reduce((sum, product) => sum + product.value, 0).toFixed(2);
});

const valueDifference = computed(() => {
  if (!activeProposal.value) return 0;
  return (totalValueOffered.value - activeProposal.value.productToGet.value).toFixed(2);
});

const sendProposal = () => {
  if (selectedProducts.value.length === 0) return;
  
  console.log('Propuesta enviada:');
  console.log('  Producto a obtener:', activeProposal.value.productToGet.name);
  console.log('  Productos ofrecidos:', selectedProducts.value.map(p => p.name).join(', '));
  console.log('  Diferencia de valor:', `S/ ${valueDifference.value}`);

  setTimeout(() => {
    const productToGetId = activeProposal.value.productToGet.id;
    const offeredProductIds = selectedProducts.value.map(p => p.id);
    
    allProducts.value = allProducts.value.map(p => {
      if (p.id === productToGetId || offeredProductIds.includes(p.id)) {
        return { ...p, status: 'intercambiado' }; 
      }
      return p;
    });

    cancelProposal(); 
    showNotification.value = true;
    setTimeout(() => showNotification.value = false, 3000); 
  }, 1000);
};

const categories = computed(() => {
  const uniqueCategories = new Set(allProducts.value.map(product => product.category));
  return [...uniqueCategories].sort();
});

const filteredAndSortedProducts = computed(() => {
  let filtered = allProducts.value.filter(product => product.status === 'disponible');

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value);
  }

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy.value) {
      case 'value-asc':
        return a.value - b.value;
      case 'value-desc':
        return b.value - a.value;
      case 'date-asc':
        return new Date(a.publicationDate) - new Date(b.publicationDate);
      case 'date-desc':
        return new Date(b.publicationDate) - new Date(a.publicationDate);
      default:
        return 0;
    }
  });

  return sorted;
});

const resetFilters = () => {
  selectedCategory.value = '';
  sortBy.value = 'date-desc';
};
</script>

<style scoped>
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.5s ease-out forwards;
}

.fade-notification-enter-active {
  transition: all 0.5s ease-out;
}
.fade-notification-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-notification-enter-from, .fade-notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.product-list-move,
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.product-list-leave-active {
  position: absolute;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.animate-pulse {
  animation: pulse 1.5s infinite ease-in-out;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
}
</style>