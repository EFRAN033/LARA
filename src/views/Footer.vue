<template>
  <footer class="bg-gray-900 text-white py-6 px-4 font-sans antialiased">
    <div class="container mx-auto">
      <div class="md:hidden space-y-6">
        <div v-for="(section, index) in mobileSections" :key="index">
          <button 
            @click="toggleSection(index)"
            class="flex justify-between items-center w-full text-left font-bold py-2 focus:outline-none text-lg text-pink-300 hover:text-pink-400"
          >
            <span>{{ section.title }}</span>
            <svg 
              class="w-5 h-5 transition-transform duration-200"
              :class="{ 'transform rotate-180': openSections[index] }"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div 
            v-show="openSections[index]"
            class="pl-2 space-y-2 mt-2 text-gray-300"
          >
            <router-link 
              v-for="(link, linkIndex) in section.links" 
              :key="linkIndex"
              :to="link.path"
              class="block py-1 hover:text-pink-400 transition"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-700">
          <button 
            @click="navigateToRegister"
            class="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-4 py-3 rounded-lg transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
          >
            Subir mis productos
          </button>
        </div>
      </div>

      <div class="hidden md:grid md:grid-cols-5 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4 text-pink-300">KambiaPe</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="hover:text-pink-400 transition">Inicio</router-link></li>
            <li><router-link to="/explorar" class="hover:text-pink-400 transition">Explorar productos</router-link></li>
            <li><router-link to="/como-funciona" class="hover:text-pink-400 transition">Cómo funciona</router-link></li>
            <li><router-link to="/faqs" class="hover:text-pink-400 transition">FAQs</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4 text-pink-300">Contacto</h3>
          <p class="mb-2 text-gray-300">¿Necesitas ayuda?</p>
          <a href="mailto:soporte@kambiape.com" class="text-pink-400 hover:underline hover:text-pink-300 transition">soporte@kambiape.com</a>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4 text-pink-300">Comentarios</h3>
          <p class="mb-4 text-gray-300">Tu opinión nos ayuda a mejorar. ¡Déjanos tus comentarios!</p>
          <router-link 
            to="/comentarios"
            class="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-lg transition transform hover:scale-105 shadow-md"
          >
            Enviar Comentario
          </router-link>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4 text-pink-300">Nuestros Almacenes</h3>
          <ul class="space-y-2 text-gray-300">
            <li><p>Av. Principal 123, Lima, Perú</p></li>
            <li><p>Calle Falsa 456, Arequipa, Perú</p></li>
            <li><router-link to="/almacenes" class="text-pink-400 hover:underline hover:text-pink-300 transition">Ver en mapa</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4 text-pink-300">¿Quieres subir tus productos para intercambio?</h3>
          <p class="mb-4 text-gray-300">Únete como facilitador de intercambios y da nueva vida a tus productos.</p>
          <button 
            @click="navigateToRegister"
            class="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105 shadow-md"
          >
            Comenzar ahora
          </button>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400 text-sm">
        <p>© 2025 KambiaPe. Todos los derechos reservados.</p>
        <div class="mt-2 flex justify-center space-x-4">
          <router-link to="/terminos" class="hover:text-white transition">Términos y Condiciones</router-link>
          <router-link to="/privacidad" class="hover:text-white transition">Política de Privacidad</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado para controlar la apertura/cierre de secciones en móvil
const openSections = ref([false, false, false, false]); // Se ajusta para 4 secciones móviles ahora

// Definición de las secciones para la vista móvil
const mobileSections = ref([
  {
    title: 'Enlaces rápidos',
    links: [
      { label: 'Inicio', path: '/' },
      { label: 'Explorar productos', path: '/explorar' },
      { label: 'Cómo funciona', path: '/como-funciona' },
      { label: 'FAQs', path: '/faqs' }
    ]
  },
  {
    title: 'Contacto',
    links: [
      { label: 'soporte@kambiape.com', path: 'mailto:soporte@kambiape.com' },
      { label: 'Lima, Perú', path: '#' }
    ]
  },
  {
    title: 'Comentarios',
    links: [
      { label: 'Dejar un comentario', path: '/comentarios' }
    ]
  },
  {
    title: 'Nuestros Almacenes',
    links: [
      { label: 'Lima, Perú', path: '#' },
      { label: 'Arequipa, Perú', path: '#' },
      { label: 'Ver en mapa', path: '/almacenes' }
    ]
  }
]);

// Función para alternar la visibilidad de las secciones móviles
const toggleSection = (index) => {
  openSections.value[index] = !openSections.value[index];
};

// Función para navegar a la página de registro
const navigateToRegister = () => {
  router.push('/Register');
};
</script>

<style scoped>
/* Transiciones para la expansión/colapso en móvil */
@media (max-width: 767px) {
  /* Estilos específicos para la línea divisoria si es necesario */
  .border-t {
    border-top-width: 1px;
  }
  
  /* Transición para el v-show en secciones móviles */
  /* Aunque v-show no soporta transiciones CSS directamente sin un envoltorio,
     el efecto visual de `max-height` se puede lograr si se gestiona con `v-if`
     o con un componente de transición de Vue. Aquí se deja para referencia. */
  [v-show] {
    transition: opacity 0.2s ease, max-height 0.3s ease;
    overflow: hidden; /* Asegura que el contenido se recorte durante la transición */
  }

  /* Nota: Para un control de altura animado con v-show, a menudo se necesita
     un wrapper con CSS de `max-height` y `transition` en su estado `enter/leave`.
     Aquí solo se aplica una transición de opacidad si se usa con v-show. */
}
</style>