<template>
  <section class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 font-inter">
    <Transition name="fade-overlay">
      <div
        v-if="activeProposal"
        class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 sm:p-6 z-50 transition-opacity duration-300 backdrop-blur-sm"
        @click.self="cancelProposal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="proposal-title"
        aria-describedby="proposal-description"
      >
        <div class="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-10 shadow-2xl max-w-4xl w-full text-center md:text-left transform scale-95 opacity-0 animate-scale-in-fade" @click.stop>
          <h3 id="proposal-title" class="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 text-center">
            ¡Tu propuesta por: "<span class="text-brand-primary animate-pulse-text">{{ activeProposal.productToGet.name }}</span>"!
          </h3>
          <p id="proposal-description" class="text-gray-600 dark:text-gray-400 mb-8 text-lg text-center leading-relaxed">
            Selecciona los productos de tu colección que te gustaría ofrecer a cambio.
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 max-h-96 overflow-y-auto pr-2 custom-scrollbar-minimal">
            <div
              v-for="product in myProducts"
              :key="product.id"
              @click="toggleProductSelection(product)"
              :class="{
                'border-brand-accentPink shadow-lg ring-4 ring-brand-light bg-brand-light dark:bg-brand-dark scale-[1.02]': isProductSelected(product),
                // Eliminado 'opacity-60': isProductSelected(product) && !isProductSelected(product) ya que la lógica es redundante
              }"
              class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-xl border-2 border-transparent transition-all duration-300 ease-out cursor-pointer hover:border-brand-accentPink transform hover:shadow-md hover:scale-[1.01] overflow-hidden group"
              tabindex="0"
              role="checkbox"
              :aria-checked="isProductSelected(product)"
            >
              <img :src="product.imageUrl" :alt="product.name" class="w-full h-32 object-cover rounded-lg mb-3 transform transition-transform duration-300 group-hover:scale-105" />
              <h4 class="font-bold text-lg text-gray-900 dark:text-white truncate mb-1">{{ product.name }}</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">Valor: <span class="font-semibold text-brand-accentBlue">{{ product.value.toFixed(0) }} ★</span></p>
              <div v-if="isProductSelected(product)" class="absolute top-3 right-3 p-1.5 bg-brand-primary rounded-full text-white flex items-center justify-center transform scale-105 shadow-md animate-pop-in">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <div v-if="myProducts.length === 0" class="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg py-8">
              <p class="mb-4">¡Ups! Parece que no tienes productos disponibles para ofrecer.</p>
              <p class="font-semibold">¿Quizás sea un buen momento para añadir algunos?</p>
            </div>
          </div>

          <div v-if="selectedProducts.length > 0" class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-850 dark:to-gray-900 p-6 rounded-2xl mb-8 border border-brand-light dark:border-gray-700 shadow-inner animate-fade-in-up">
            <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-5 text-center">Tu Propuesta en Cifras</h4>
            <div class="flex flex-col md:flex-row justify-around items-center gap-6">
              <div class="text-center flex-1 min-w-[150px] p-3">
                  <p class="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-1">Valor Ofrecido</p>
                  <p class="text-4xl font-extrabold text-success animate-grow-text">{{ totalValueOffered }} ★</p>
              </div>

              <div class="hidden md:block border-l-2 border-gray-300 dark:border-gray-700 h-24 mx-4"></div>

              <div class="text-center flex-1 min-w-[150px] p-3">
                  <p class="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-1">Valor del Producto</p>
                  <p class="text-4xl font-extrabold text-brand-accentBlue animate-grow-text">{{ activeProposal.productToGet.value.toFixed(0) }} ★</p>
              </div>

              <div class="hidden md:block border-l-2 border-gray-300 dark:border-gray-700 h-24 mx-4"></div>

              <div class="text-center flex-1 min-w-[180px] p-3">
                  <p class="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-1">Diferencia Neta</p>
                  <p :class="{ 'text-success': valueDifference >= 0, 'text-error': valueDifference < 0 }" class="text-5xl font-extrabold mt-2 animate-bounce-subtle">
                      {{ Math.abs(valueDifference).toFixed(0) }} ★
                  </p>
                  <span class="text-lg font-semibold" :class="{ 'text-success': valueDifference >= 0, 'text-error': valueDifference < 0 }">
                      {{ valueDifference >= 0 ? 'A tu favor' : 'A su favor' }}
                  </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <button
              @click="cancelProposal"
              class="px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 animate-slide-up-button"
            >
              Cancelar Propuesta
            </button>
            <button
              @click="sendProposal"
              :disabled="selectedProducts.length === 0"
              :class="{
                'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-98 transition duration-300 focus:ring-2 focus:ring-pink-300 dark:focus:ring-rose-800 focus:ring-offset-2': selectedProducts.length > 0,
                'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed': selectedProducts.length === 0
              }"
              class="px-8 py-4 rounded-xl text-white font-bold animate-slide-up-button delay-100"
            >
              <span v-if="selectedProducts.length > 0">Confirmar y Enviar</span>
              <span v-else>Selecciona al menos un producto</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="slide-in-right">
      <div
        v-if="showNotification"
        class="fixed bottom-6 right-6 p-5 bg-gradient-to-r from-success to-green-600 text-white rounded-xl shadow-lg flex items-center gap-3 z-50 transform ring-2 ring-green-300 animate-slide-in-from-right"
        style="min-width: 280px;"
        role="status"
        aria-live="polite"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 animate-check-pulse" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <p class="font-semibold text-lg">¡Propuesta enviada con éxito!</p>
      </div>
    </Transition>

    <div class="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 animate-fade-in-up">
      <div class="text-center sm:text-left">
        <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Explora Intercambios Disponibles
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mt-2">
          Hemos encontrado <span class="font-bold text-brand-primary">{{ filteredAndSortedProducts.length }}</span> productos listos para un trueque. ¡Anímate a explorar!
        </p>
      </div>

      <div class="flex flex-col md:flex-row gap-4 w-full sm:w-auto">
        <div class="relative w-full md:w-auto">
          <label for="category-select" class="sr-only">Filtrar por Categoría</label>
          <div class="relative">
            <select
              id="category-select"
              v-model="selectedCategory"
              class="block w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm appearance-none cursor-pointer"
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
        </div>

        <div class="relative w-full md:w-auto">
          <label for="sort-select" class="sr-only">Ordenar por</label>
          <div class="relative">
            <select
              id="sort-select"
              v-model="sortBy"
              class="block w-full pl-4 pr-12 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm appearance-none cursor-pointer"
            >
              <option value="date-desc">Fecha (Más reciente)</option>
              <option value="date-asc">Fecha (Más antigua)</option>
              <option value="value-desc">Valor (Mayor a Menor)</option>
              <option value="value-asc">Valor (Menor a Mayor)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
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
        class="animate-card-fade-in"
      />
    </transition-group>

    <div v-if="filteredAndSortedProducts.length === 0" class="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-inner border border-gray-100 dark:border-gray-700 mt-10 animate-fade-in">
      <p class="text-3xl font-bold text-gray-700 dark:text-gray-300 mb-4">
        <span role="img" aria-label="emoji sorprendido">🤔</span> ¡Vaya!
      </p>
      <p class="text-xl font-medium text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
        No se encontraron productos que coincidan con los filtros aplicados.
      </p>
      <button
        @click="resetFilters"
        class="mt-8 px-8 py-4 bg-brand-primary text-white rounded-full font-bold text-lg hover:bg-brand-dark transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-primary/50"
      >
        Restablecer Filtros
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import ProductCard from './ProductCard.vue'; // Asume que ProductCard.vue existe y es tu componente de tarjeta de producto.

// Definición de colores de la marca (para referencia en JS, las CSS Custom Properties son para el CSS)
const brandColors = {
  'brand-primary': '#d7037b', // Pinkish-Red
  'brand-dark': '#b30262',    // Darker Pink for hover
  'brand-light': '#fce5f1',   // Light Pink for accents
  'brand-accentBlue': '#3b82f6', // A vibrant blue for contrast, e.g., product value
  'brand-accentPink': '#ff6699', // A lighter, more playful pink
  'success': '#10b981',      // Green for success
  'error': '#ef4444',        // Red for error
  'gray-850': '#1f2937'      // Darker gray for dark mode backgrounds
};

// Estados reactivos - NOTA: Los valores ahora son enteros para representar estrellas.
const allProducts = ref([
  { id: 1, name: 'Silla de Oficina Ergonómica', description: 'Silla con soporte lumbar y reposabrazos ajustables, ideal para largas jornadas de trabajo.', value: 50, category: 'Mobiliario', publicationDate: '2025-06-28', owner: 'Juan P.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1596541223126-2586e3002283?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw0fHxzb2Zhc3xlbnwwfHx8fDE3MTk3MDA1MDN8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 2, name: 'Laptop Dell XPS 13', description: 'Laptop ultraligera y potente, perfecta para diseño gráfico y programación.', value: 300, category: 'Electrónica', publicationDate: '2025-06-25', owner: 'Maria G.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1627885449272-d5761a29b6f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfHx8fDE3MTk3MDA2MDN8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 3, name: 'Cámara Fotográfica DSLR Canon', description: 'Cámara semi-profesional con lente 50mm, en excelente estado.', value: 150, category: 'Electrónica', publicationDate: '2025-06-29', owner: 'Carlos R.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1512790180421-ce0196236b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHwzfHxjYW1lcmF8ZW58MHx8fHwxNzE5NzAwNjE1fDA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 4, name: 'Bicicleta de Montaña', description: 'Bicicleta rodado 29, con frenos de disco y 21 velocidades.', value: 100, category: 'Deportes', publicationDate: '2025-06-20', owner: 'Ana L.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1579758652431-7e8e9c2f664a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw1fHxiaWN5Y2xlfGVufDB8fHx8MTcxOTcwMDYzOXww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 5, name: 'Guitarra Acústica', description: 'Guitarra de madera de abeto, sonido cálido y resonante, incluye funda.', value: 70, category: 'Música', publicationDate: '2025-06-27', owner: 'Pedro S.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1616238622179-11c52d8c3621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw2fHxndWl0YXJyfGVufDB8fHx8MTcxOTcwMDY2NHww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 6, name: 'Monitor 4K de 27 pulgadas', description: 'Monitor con colores vibrantes y alta resolución, ideal para edición de video.', value: 140, category: 'Electrónica', publicationDate: '2025-06-26', owner: 'Laura M.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1549492193-41c3de145d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHwyfHxtb25pdG9yfGVufDB8fHx8MTcxOTcwMDY4MHww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 7, name: 'Libro "El principito"', description: 'Edición especial de colección con ilustraciones originales.', value: 10, category: 'Libros', publicationDate: '2025-06-15', owner: 'Elena C.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1517431289124-7331804f3788?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHwxNXx8Ym9va3xlbnwwfHx8fDE3MTk3MDA2OTl8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 8, name: 'Juego de sartenes de teflón', description: 'Set de 3 sartenes antiadherentes de diferentes tamaños.', value: 30, category: 'Hogar', publicationDate: '2025-06-21', owner: 'Roberto F.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1627708573434-2e2a046c8270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw2fHxwYW5zfGVufDB8fHx8MTcxOTcwMDcwN3ww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 9, name: 'Drone con cámara HD', description: 'Drone plegable con cámara 1080p y control remoto.', value: 60, category: 'Electrónica', publicationDate: '2025-06-30', owner: 'Sofía D.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1533220794503-4f107297d2e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw1fHxkcm9uZXxlbnwwfHx8fDE3MTk3MDA3Mjd8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 10, name: 'Consola Nintendo Switch', description: 'Consola portátil con controles Joy-Con, poco uso.', value: 90, category: 'Videojuegos', publicationDate: '2025-06-24', owner: 'Daniel V.', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1601614749891-b3b3a3d5f303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw5fHxuaW50ZW5kbyUyMHN3aXRjaHxlbnwwfHx8fDE3MTk3MDA3NDF8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 11, name: 'Smartphone Google Pixel 7', description: 'Teléfono con cámara de alta calidad y excelente rendimiento.', value: 180, category: 'Electrónica', publicationDate: '2025-05-10', owner: 'Usuario Actual', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1678170258079-6617a23c09f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw2fHxwYXJ0eSUyMGdhbWVzfGVufDB8fHx8MTcxOTcwMDc2NXww&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 12, name: 'Reloj Inteligente Xiaomi', description: 'Smartwatch con monitor de ritmo cardíaco y GPS.', value: 40, category: 'Electrónica', publicationDate: '2025-04-22', owner: 'Usuario Actual', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1523275335684-c5fdc70387b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHw0fHxjbG9ja3xlbnwwfHx8fDE3MTk3MDA3Njh8MA&ixlib=rb-4.0.3&q=80&w=400' },
  { id: 13, name: 'Cafetera Nespresso', description: 'Máquina de café de cápsulas, incluye espumador de leche.', value: 70, category: 'Hogar', publicationDate: '2025-03-01', owner: 'Usuario Actual', status: 'disponible', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjgyMjd8MHwxfHNlYXJjaHwzfHxjYWZlJTIwYW5kJTIwY2FwY2Frc2VzfGVufDB8fHx8MTcxOTcwMDc3NXww&ixlib=rb-4.0.3&q=80&w=400' },
]);

const selectedCategory = ref('');
const sortBy = ref('date-desc');

const activeProposal = ref(null); // Contiene los detalles de la propuesta activa
const selectedProducts = ref([]); // Productos que el usuario elige para ofrecer

const showNotification = ref(false); // Controla la visibilidad de la notificación de éxito

// Computed properties
const myProducts = computed(() => {
  return allProducts.value.filter(p => p.owner === 'Usuario Actual' && p.status === 'disponible');
});

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
        return 0; // No change in order
    }
  });

  return sorted;
});

const totalValueOffered = computed(() => {
  return selectedProducts.value.reduce((sum, product) => sum + product.value, 0).toFixed(0); // Ahora sin decimales para estrellas
});

const valueDifference = computed(() => {
  if (!activeProposal.value) return 0;
  return (parseFloat(totalValueOffered.value) - activeProposal.value.productToGet.value);
});

// Métodos de interacción
const startProposal = (product) => {
  activeProposal.value = {
    productToGet: product,
    proposerId: 'usuario-actual-id', // ID del usuario que inicia la propuesta (simulado)
    recipientId: product.ownerId || 'id-del-dueno-del-producto', // Asume que ProductCard pasa ownerId
  };
  selectedProducts.value = []; // Reiniciar la selección al iniciar una nueva propuesta
  // Enfocar el primer elemento seleccionable en el modal para accesibilidad
  setTimeout(() => {
    const firstSelectable = document.querySelector('.grid [role="checkbox"]');
    if (firstSelectable) {
      firstSelectable.focus();
    }
  }, 300); // Pequeño retraso para que el modal se renderice
};

const cancelProposal = () => {
  activeProposal.value = null;
  selectedProducts.value = [];
};

const toggleProductSelection = (product) => {
  const index = selectedProducts.value.findIndex(p => p.id === product.id);
  if (index > -1) {
    selectedProducts.value.splice(index, 1); // Deseleccionar
  } else {
    selectedProducts.value.push(product); // Seleccionar
  }
};

const isProductSelected = (product) => {
  return selectedProducts.value.some(p => p.id === product.id);
};

const sendProposal = () => {
  if (selectedProducts.value.length === 0) {
    // Podrías añadir un feedback visual aquí, como agitar el botón o un tooltip
    return;
  }

  // Lógica para enviar la propuesta a un backend (simulada)
  console.log('Propuesta enviada:');
  console.log('  Producto a obtener:', activeProposal.value.productToGet.name);
  console.log('  Productos ofrecidos:', selectedProducts.value.map(p => p.name).join(', '));
  console.log('  Diferencia de valor:', `${valueDifference.value.toFixed(0)} ★`); // Mostrar en estrellas

  // Simulación de un proceso de backend
  setTimeout(() => {
    const productToGetId = activeProposal.value.productToGet.id;
    const offeredProductIds = selectedProducts.value.map(p => p.id);

    // Actualizar el estado de los productos a 'intercambiado' (o 'pendiente' si el trueque debe ser aceptado)
    allProducts.value = allProducts.value.map(p => {
      if (p.id === productToGetId || offeredProductIds.includes(p.id)) {
        return { ...p, status: 'intercambiado' }; // O 'pending_trade'
      }
      return p;
    });

    cancelProposal(); // Cerrar el modal
    showNotification.value = true; // Mostrar la notificación de éxito
    setTimeout(() => showNotification.value = false, 3000); // Ocultar notificación después de 3 segundos
  }, 1000); // Simular un retardo de red
};

const resetFilters = () => {
  selectedCategory.value = '';
  sortBy.value = 'date-desc';
};
</script>

<style>
/* Estilos CSS Globales (o en un archivo base.css si usas PostCSS/Tailwind)
  Aquí se definen las custom properties para los colores de la marca
  y las animaciones personalizadas.
*/
:root {
  --brand-primary: #d7037b;
  --brand-dark: #b30262;
  --brand-light: #fce5f1;
  --brand-accentBlue: #3b82f6;
  --brand-accentPink: #ff6699; /* Este color se está usando ahora en el botón principal para la categoría */
  --success: #10b981;
  --error: #ef4444;
  --gray-850: #1f2937; /* Usado para dark mode en modal */
}

/* Fuente Inter para un look moderno */
.font-inter {
  font-family: 'Inter', sans-serif;
}

/* Animaciones de Entrada y Salida */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes scaleInFade {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes fadeAndSlideUp {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInFromRight {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes pulseText {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes popIn {
  0% { transform: scale(0.5); opacity: 0; }
  80% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}

@keyframes bounceSubtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes growText {
  0% { font-size: 1rem; } /* Define un tamaño inicial si es necesario, o usa el tamaño de la clase */
  50% { transform: scale(1.03); }
  100% { transform: scale(1); }
}

@keyframes checkPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}


/* Aplicación de Animaciones */
.animate-fade-in-down { animation: fadeInDown 0.5s ease-out forwards; }
.animate-scale-in-fade { animation: scaleInFade 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
.animate-fade-in-up { animation: fadeAndSlideUp 0.6s ease-out forwards; }
.animate-slide-in-from-right { animation: slideInFromRight 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
.animate-pulse-text { animation: pulseText 2s infinite ease-in-out; }
.animate-pop-in { animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards; }
.animate-bounce-subtle { animation: bounceSubtle 1.5s infinite ease-in-out; }
.animate-grow-text { animation: growText 0.3s ease-out forwards; }
.animate-check-pulse { animation: checkPulse 1s ease-out infinite; } /* Para el icono de check en la notificación */


/* Transiciones de Vue.js */
.fade-overlay-enter-active, .fade-overlay-leave-active { transition: opacity 0.3s ease-out; }
.fade-overlay-enter-from, .fade-overlay-leave-to { opacity: 0; }

.slide-in-right-enter-active { transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.slide-in-right-leave-active { transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53); }
.slide-in-right-enter-from, .slide-in-right-leave-to { opacity: 0; transform: translateX(100%); }

.product-list-move,
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.product-list-enter-from,
.product-list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.product-list-leave-active {
  position: absolute; /* Permite que los elementos se muevan y no solo desaparezcan */
}

/* Animación para las tarjetas de producto al cargar */
.animate-card-fade-in {
  opacity: 0;
  animation: fadeAndSlideUp 0.6s ease-out forwards;
  /* staggered delay for each card would be ideal, but requires JS in template */
}

/* Animación para los botones del modal al aparecer */
.animate-slide-up-button {
  opacity: 0;
  animation: fadeAndSlideUp 0.5s ease-out forwards;
}
.animate-slide-up-button.delay-100 { animation-delay: 0.1s; }


/* Custom Scrollbar (más elegante y compatible con dark mode) */
.custom-scrollbar-minimal::-webkit-scrollbar {
  width: 8px; /* Ancho del scrollbar vertical */
  height: 8px; /* Alto del scrollbar horizontal (si aplica) */
}

.custom-scrollbar-minimal::-webkit-scrollbar-track {
  background: var(--brand-light); /* Fondo del track, usando variable de color */
  border-radius: 10px;
}

.dark .custom-scrollbar-minimal::-webkit-scrollbar-track {
  background: var(--gray-850); /* Fondo para dark mode */
}

.custom-scrollbar-minimal::-webkit-scrollbar-thumb {
  background-color: var(--brand-primary); /* Color del "pulgar" */
  border-radius: 10px;
  border: 2px solid transparent; /* Borde transparente para efecto de "relleno" */
  background-clip: padding-box; /* Asegura que el borde no esté dentro del color */
}

.dark .custom-scrollbar-minimal::-webkit-scrollbar-thumb {
  background-color: var(--brand-accentPink); /* Color para dark mode */
}

.custom-scrollbar-minimal::-webkit-scrollbar-thumb:hover {
  background-color: var(--brand-dark); /* Color al pasar el ratón */
}

.dark .custom-scrollbar-minimal::-webkit-scrollbar-thumb:hover {
  background-color: var(--brand-primary); /* Color al pasar el ratón en dark mode */
}

/* Firefox scrollbar support */
.custom-scrollbar-minimal {
  scrollbar-width: thin; /* "auto" o "thin" */
  scrollbar-color: var(--brand-primary) var(--brand-light); /* thumb color track color */
}

.dark .custom-scrollbar-minimal {
  scrollbar-color: var(--brand-accentPink) var(--gray-850);
}
</style>