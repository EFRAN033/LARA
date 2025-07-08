<template>
  <aside class="w-72 bg-white shadow-lg border-r border-gray-100 flex flex-col h-full z-30 transition-all duration-300 ease-in-out">
    <div class="p-6 bg-[#d7037b] text-white text-center">
      <h2 class="text-2xl font-bold mb-1">Mis Trueques</h2>
      <p class="text-rose-100 text-sm">Gestiona tus publicaciones</p>
    </div>

    <nav class="flex flex-col p-4 space-y-3 flex-grow">
      <router-link
        to="/publish-view" class="flex items-center px-4 py-3 bg-[#d7037b] text-white font-semibold rounded-lg shadow-md hover:bg-[#9e0154] transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:ring-offset-2"
        aria-label="Publicar un nuevo producto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Publicar Producto
      </router-link>

      <router-link
        to="/my-products" class="flex items-center px-4 py-3 bg-[#fce4ec] text-[#d7037b] font-semibold rounded-lg shadow-md hover:bg-pink-100 transition duration-200 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:ring-offset-2"
        aria-label="Ver y gestionar mis productos publicados"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0v10l-8 4m8-4l-8-4m0 0v10m0-10L4 7m6-4v10m6-4v10" />
        </svg>
        Mis Productos (<span v-if="!loading">{{ products.length }}</span><span v-else>...</span>)
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
// Importa tu store de usuario
import { useUserStore } from '@/stores/user'; // <--- AGREGADO

const products = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const userStore = useUserStore(); // <--- AGREGADO: Inicializa el store

// const USER_ID = 1; // <--- ELIMINA O COMENTA ESTA LÍNEA

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

const fetchUserProducts = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Obtén el ID del usuario autenticado desde el store
    const authenticatedUserId = userStore.user?.id; // Asumiendo que el ID está en userStore.user.id
    
    if (!authenticatedUserId) {
      // Si no hay un usuario autenticado, no hay productos que cargar
      products.value = []; // Asegura que la lista de productos esté vacía
      error.value = "No se ha encontrado un usuario autenticado para cargar productos.";
      loading.value = false;
      return;
    }

    const response = await fetch(`${API_BASE_URL}/users/${authenticatedUserId}/products`); // <--- CAMBIO AQUÍ

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
/* Puedes añadir estilos personalizados aquí si es necesario,
   además de las clases de Tailwind CSS. */

/* Animación de giro para el loading (ya no se usa, pero se mantiene si se reactiva el estado de carga) */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>