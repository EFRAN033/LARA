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

    <div class="bg-gradient-to-br from-rose-50 to-pink-100 py-16 sm:py-20 text-center relative overflow-hidden shadow-md rounded-lg mb-8">
      <div class="absolute inset-0 opacity-30" style="background-image: url('data:image/svg+xml,%3Csvg width=\\'100\\' height=\\'100\\' viewBox=\\'0 0 100 100\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M0 0h50v50H0z\\' fill=\\'%23d7037b\\' fill-opacity=\\'0.1\\' fill-rule=\\'evenodd\\'/%3E%3Cpath d=\\'M50 50h50v50H50z\\' fill=\\'%23ffffff\\' fill-opacity=\\'0.05\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E');"></div>
      <div class="relative z-10">
        <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4 animate-fade-in-up">
          Explora Intercambios Disponibles
        </h1>
        <p class="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in-up delay-100">
          Encuentra el producto perfecto para ti. Conéctate con otros usuarios para un trueque justo y emocionante.
        </p>
        <div class="mt-8 animate-fade-in-up delay-200">
          <router-link
            to="/publish"
            class="inline-flex items-center px-8 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-rose-50"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Publica tu Producto
          </router-link>
        </div>
      </div>
    </div>

    <div class="bg-white py-6 shadow-sm border-b border-gray-100 rounded-lg mb-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div class="w-full sm:w-auto flex-grow">
          <label for="category-filter" class="sr-only">Filtrar por Categoría</label>
          <div class="relative">
            <select
              id="category-filter"
              v-model="selectedCategory"
              class="block w-full px-4 py-2.5 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition duration-200 text-gray-800 appearance-none pr-10 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="">Todas las categorías</option>
              <option>Electrónica</option>
              <option>Mobiliario</option>
              <option>Deportes</option>
              <option>Libros</option>
              <option>Ropa y Accesorios</option>
              <option>Hogar</option>
              <option>Juguetes</option>
              <option>Herramientas</option>
              <option>Música</option>
              <option>Videojuegos</option>
              <option>Coleccionables</option>
              <option>Arte</option>
              <option>Otros</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
              <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>
        </div>

        <div class="w-full sm:w-auto flex-grow">
          <label for="sort-by" class="sr-only">Ordenar por</label>
          <div class="relative">
            <select
              id="sort-by"
              v-model="sortBy"
              class="block w-full px-4 py-2.5 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition duration-200 text-gray-800 appearance-none pr-10 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
            >
              <option value="date-desc">Más Recientes</option>
              <option value="date-asc">Más Antiguos</option>
              <option value="name-asc">Nombre (A-Z)</option>
              <option value="name-desc">Nombre (Z-A)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700 dark:text-gray-300">
              <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
            </div>
          </div>
        </div>

        <button
          @click="resetFilters"
          class="w-full sm:w-auto flex-shrink-0 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-6 rounded-full transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
        >
          Reiniciar Filtros
        </button>
      </div>
    </div>

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

const products = ref([]);
const userProducts = ref([]);
const loading = ref(true);
const selectedCategory = ref('');
const sortBy = ref('date-desc');
const activeProposal = ref(null);
const selectedProductForProposal = ref(null);
const showNotification = ref(false);

const userStore = useUserStore();
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

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
      // Filtra los propios productos del usuario de la lista principal
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

  console.log("--- DEBUG ProductFeed.vue ---");
  console.log("ID de usuario en userStore:", loggedInUserId);
  console.log("Token en userStore:", authToken ? 'Token presente' : 'Token AUSENTE');

  if (!loggedInUserId || !authToken) {
    userProducts.value = [];
    console.warn("No hay usuario autenticado o token para cargar productos del usuario.");
    console.log("userProducts.value después de la advertencia:", userProducts.value);
    return;
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${loggedInUserId}/products`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
    userProducts.value = response.data;

    console.log("Respuesta de /users/{id}/products:", response.data);
    console.log("userProducts.value (después de la asignación):", userProducts.value);

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


onMounted(() => {
  fetchAllProducts();
});

// Observar el estado de autenticación para cargar productos del usuario
watch(() => userStore.isLoggedIn, (newVal) => {
  console.log('ProductFeed: userStore.isLoggedIn cambió a:', newVal);
  if (newVal) {
    fetchLoggedInUserProducts();
  } else {
    userProducts.value = [];
  }
}, { immediate: true });

const filteredProducts = computed(() => {
  let filtered = [...products.value];

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category_name === selectedCategory.value);
  }

  filtered.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    
    switch (sortBy.value) {
      case 'date-desc':
        return dateB.getTime() - dateA.getTime();
      case 'date-asc':
        return dateA.getTime() - dateB.getTime();
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return filtered;
});

const openProposalModal = (product) => {
  activeProposal.value = product;
  selectedProductForProposal.value = null;
  // Solo llama a fetchLoggedInUserProducts si la lista aún no se ha cargado
  // Esto evita llamadas redundantes si el watch ya lo hizo.
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

  console.log("Enviando propuesta:", {
    offeredProductId: selectedProductForProposal.value.id,
    requestedProductId: activeProposal.value.id,
    proposerUserId: userStore.user?.id,
    ownerOfRequestedProductId: activeProposal.value.user_id
  });

  try {
    const authToken = userStore.token;
    if (!authToken) {
      throw new Error("No hay token de autenticación disponible para enviar la propuesta.");
    }

    const response = await axios.post(`${API_BASE_URL}/proposals`, {
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

const resetFilters = () => {
  selectedCategory.value = '';
  sortBy.value = 'date-desc';
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