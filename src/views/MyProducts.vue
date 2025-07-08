<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <Header />

    <div class="flex flex-1">
      <Sidebar />

      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div class="max-w-full mx-auto">
          <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center">Mis Productos Publicados</h1>

          <div v-if="loading" class="text-center py-16">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d7037b] mx-auto mb-4"></div>
            <p class="text-gray-600 text-lg">Cargando tus productos...</p>
            <p class="text-gray-500 text-sm mt-1">Esto puede tardar un momento.</p>
          </div>

          <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-6 py-5 rounded-lg relative text-center" role="alert">
            <strong class="font-bold text-xl block mb-2">¡Error al cargar!</strong>
            <span class="block text-lg">{{ error }}</span>
            <p class="text-sm mt-3">Por favor, intenta de nuevo más tarde o contacta a soporte.</p>
          </div>

          <div v-else-if="products.length === 0" class="text-center py-16 bg-white rounded-lg shadow-inner border border-gray-200">
            <p class="text-2xl mb-4 font-semibold text-gray-700">¡Aún no tienes productos publicados!</p>
            <p class="text-lg text-gray-600 mb-6">Parece que tu inventario de trueques está vacío.</p>
            <router-link
              to="/publicar"
              class="inline-flex items-center px-6 py-3 bg-[#d7037b] hover:bg-[#9e0154] text-white font-semibold text-lg rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Publica tu primer Producto
            </router-link>
            <p class="text-sm text-gray-500 mt-4">¡Es rápido y fácil empezar a intercambiar!</p>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-for="product in products" :key="product.id" class="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div class="relative w-full h-48 bg-gray-100 overflow-hidden">
                <img
                  v-if="product.images && product.images.length > 0"
                  :src="`${API_BASE_URL}${product.images[0].image_url}`"
                  :alt="product.title"
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-sm bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span :class="{
                  'bg-green-500 text-white': product.status === 'available',
                  'bg-blue-500 text-white': product.status === 'pending_exchange',
                  'bg-gray-500 text-white': product.status === 'exchanged'
                }" class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {{ product.status === 'available' ? 'Disponible' : product.status === 'pending_exchange' ? 'En Intercambio' : 'Intercambiado' }}
                </span>
              </div>
              <div class="p-4">
                <h4 class="text-xl font-bold text-gray-900 truncate mb-1">{{ product.title }}</h4>
                <p class="text-sm text-gray-600 mb-3">{{ product.category_name }}</p>
                <div class="flex justify-between items-center border-t border-gray-100 pt-4">
                  <router-link :to="`/product/${product.id}`" class="text-[#d7037b] hover:text-[#9e0154] text-base font-medium transition-colors duration-200">
                    Ver Detalle
                  </router-link>
                  <div class="flex space-x-2">
                    <button class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors" title="Editar Producto">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button class="text-gray-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors" title="Eliminar Producto">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// Importa los componentes Header y Sidebar desde el directorio 'views'
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
// Importa tu store de usuario
import { useUserStore } from '@/stores/user';

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const userStore = useUserStore();

// Define API_BASE_URL aquí para que esté disponible en el template
const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

const fetchUserProducts = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Obtén el ID del usuario autenticado desde el store
    const authenticatedUserId = userStore.user?.id;
    
    if (!authenticatedUserId) {
      error.value = "No se ha encontrado un usuario autenticado. Por favor, inicia sesión.";
      loading.value = false;
      // Opcional: redirigir a la página de inicio de sesión
      // router.push('/login');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/users/${authenticatedUserId}/products`, {
      headers: {
        'Authorization': `Bearer ${userStore.token}` // Asegúrate de enviar el token JWT
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error al cargar productos: ${response.statusText}`);
    }

    const data = await response.json();
    products.value = data;

  } catch (err) {
    console.error("Error al cargar los productos del usuario:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUserProducts();
});
</script>

<style scoped>
/* Animación de giro para el loading */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>