<template>
  <footer class="bg-gray-900 text-white py-6 px-4">
    <div class="container mx-auto">
      <div class="md:hidden space-y-6">
        <div v-for="(section, index) in mobileSections" :key="index">
          <button 
            @click="toggleSection(index)"
            class="flex justify-between items-center w-full text-left font-bold py-2 focus:outline-none"
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
            class="pl-2 space-y-2 mt-2"
          >
            <router-link 
              v-for="(link, linkIndex) in section.links" 
              :key="linkIndex"
              :to="link.path"
              class="block py-1 text-gray-300 hover:text-pink-400 transition"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>

        <div class="pt-2">
          <button 
            @click="navigateToRegister"
            class="w-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-3 rounded-lg transition transform hover:scale-[1.02] focus:outline-none"
          >
            Subir mis prendas
          </button>
        </div>
      </div>

      <div class="hidden md:grid md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4">KambiaPe</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="hover:text-pink-400 transition">Inicio</router-link></li>
            <li><router-link to="/explorar" class="hover:text-pink-400 transition">Explorar prendas</router-link></li>
            <li><router-link to="/como-funciona" class="hover:text-pink-400 transition">Cómo funciona</router-link></li>
            <li><router-link to="/faqs" class="hover:text-pink-400 transition">FAQs</router-link></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4">Contacto</h3>
          <p class="mb-2">¿Necesitas ayuda?</p>
          <a href="mailto:soporte@visteteya.com" class="text-pink-400 hover:underline hover:text-pink-300">soporte@visteteYA.com</a>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4">¿Quieres subir tus prendas?</h3>
          <p class="mb-4">Únete como arrendador y gana dinero con tu armario.</p>
          <button 
            @click="navigateToRegister"
            class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg transition transform hover:scale-105"
          >
            Comenzar ahora
          </button>
        </div>
      </div>

      <div class="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400 text-sm">
        <p>© 2025 VisteteYA. Todos los derechos reservados.</p>
        <div class="mt-2 flex justify-center space-x-4">
          <router-link to="/terminos" class="hover:text-white transition">Términos</router-link>
          <router-link to="/privacidad" class="hover:text-white transition">Privacidad</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const openSections = ref([false, false]);
const mobileSections = ref([
  {
    title: 'Enlaces rápidos',
    links: [
      { label: 'Inicio', path: '/' },
      { label: 'Explorar prendas', path: '/explorar' },
      { label: 'Cómo funciona', path: '/como-funciona' },
      { label: 'FAQs', path: '/faqs' }
    ]
  },
  {
    title: 'Contacto',
    links: [
      { label: 'soporte@visteteYA.com', path: 'mailto:soporte@visteteya.com' },
      { label: 'Lima, Perú', path: '#' }
    ]
  }
]);

const toggleSection = (index) => {
  openSections.value[index] = !openSections.value[index];
};

const navigateToRegister = () => {
  router.push('/Register');
};
</script>

<style scoped>
@media (max-width: 767px) {
  .border-t {
    border-top-width: 1px;
  }
  
  [v-show] {
    transition: opacity 0.2s ease, max-height 0.3s ease;
  }
}
</style>