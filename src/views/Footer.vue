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
              @click="link.label === 'Dejar un comentario' && openCommentModal()"
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
          <button
            @click="openCommentModal"
            class="inline-block bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-lg transition transform hover:scale-105 shadow-md"
          >
            Enviar Comentario
          </button>
        </div>

        <div>
          <h3 class="text-lg font-bold mb-4 text-pink-300">Nuestros Almacenes</h3>
          <ul class="space-y-2 text-gray-300">
            <li><p>Av. Mariscal Sucre #1032, en Pueblo Nuevo, Chincha (Ref. Frente al colegio Fe y AlegríaN°30)</p></li>
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

    <transition name="modal-fade">
      <div v-if="isCommentModalVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          class="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm"
          @click="closeCommentModal"
        ></div>

        <div
          class="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative z-10
                 border border-pink-500 transform transition-all duration-300 ease-out"
          :class="{'scale-95 opacity-0': !isCommentModalVisible, 'scale-100 opacity-100': isCommentModalVisible}"
        >
          <button
            @click="closeCommentModal"
            class="absolute top-3 right-3 text-gray-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-full p-1"
            aria-label="Cerrar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          <h2 class="text-2xl font-bold text-pink-300 mb-6 text-center">Envíanos tus Comentarios</h2>

          <form @submit.prevent="submitComment">
            <div class="mb-4">
              <label for="commentType" class="block text-gray-300 text-sm font-medium mb-2">Tipo de comentario (opcional)</label>
              <select
                id="commentType"
                v-model="comment.type"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
              >
                <option value="">Selecciona una opción</option>
                <option value="suggestion">Sugerencia</option>
                <option value="problem">Reportar un problema</option>
                <option value="question">Pregunta general</option>
                <option value="compliment">Felicitación</option>
              </select>
            </div>

            <div class="mb-4">
              <label for="commentMessage" class="block text-gray-300 text-sm font-medium mb-2">Tu mensaje <span class="text-red-400">*</span></label>
              <textarea
                id="commentMessage"
                v-model="comment.message"
                rows="5"
                required
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400 resize-y"
                placeholder="Escribe tu comentario aquí..."
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="commentName" class="block text-gray-300 text-sm font-medium mb-2">Tu nombre (opcional)</label>
              <input
                type="text"
                id="commentName"
                v-model="comment.name"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                placeholder="Ej. Juan Pérez"
              />
            </div>

            <div class="mb-6">
              <label for="commentEmail" class="block text-gray-300 text-sm font-medium mb-2">Tu correo electrónico (opcional)</label>
              <input
                type="email"
                id="commentEmail"
                v-model="comment.email"
                class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400"
                placeholder="ejemplo@dominio.com"
              />
              <p v-if="emailError" class="text-red-400 text-xs mt-1">{{ emailError }}</p>
            </div>

            <div class="flex justify-end space-x-4">
              <button
                type="button"
                @click="closeCommentModal"
                class="px-6 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-2 rounded-md transition transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span v-if="!isSubmitting">Enviar Comentario</span>
                <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>
          </form>

          <div v-if="feedbackMessage" :class="{'text-gray-300': isSuccess, 'text-red-400': !isSuccess}" class="mt-6 text-center text-lg font-semibold">
            {{ feedbackMessage }}
          </div>
        </div>
      </div>
    </transition>
  </footer>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Estado para controlar la apertura/cierre de secciones en móvil
const openSections = ref([false, false, false, false]);

// Estado para controlar la visibilidad de la modal de comentarios
const isCommentModalVisible = ref(false);

// Datos del formulario de comentarios
const comment = ref({
  type: '',
  message: '',
  name: '',
  email: ''
});

const isSubmitting = ref(false);
const feedbackMessage = ref('');
const isSuccess = ref(false); // Mantener para la lógica, pero ajustamos la clase de color
const emailError = ref('');

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
      { label: 'Dejar un comentario', path: '#' } // Cambiado a '#' para abrir la modal
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

// --- Lógica de la Modal de Comentarios ---
const openCommentModal = () => {
  isCommentModalVisible.value = true;
  // Resetear el formulario y mensajes cuando se abre la modal
  comment.value = {
    type: '',
    message: '',
    name: '',
    email: ''
  };
  feedbackMessage.value = '';
  isSuccess.value = false; // Resetear también
  emailError.value = '';
  isSubmitting.value = false;
};

const closeCommentModal = () => {
  isCommentModalVisible.value = false;
};

const validateEmail = (email) => {
  if (!email) return true; // Si es opcional y está vacío, es válido
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const submitComment = async () => {
  emailError.value = '';
  if (comment.value.email && !validateEmail(comment.value.email)) {
    emailError.value = 'Por favor, ingresa un correo electrónico válido.';
    return;
  }

  if (!comment.value.message.trim()) {
    feedbackMessage.value = 'El mensaje no puede estar vacío.';
    isSuccess.value = false;
    return;
  }

  isSubmitting.value = true;
  feedbackMessage.value = ''; // Limpiar mensaje anterior

  try {
    // --- AQUÍ IRÍA TU LÓGICA DE ENVÍO AL BACKEND ---
    // En un entorno real, harías una llamada HTTP a tu API aquí.
    // Ejemplo:
    // const response = await fetch('/api/comments', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(comment.value),
    // });
    // if (!response.ok) {
    //   throw new Error('Error al enviar el comentario.');
    // }

    // Simulación de una llamada a la API exitosa
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula un retraso de 1.5 segundos

    isSuccess.value = true; // El envío fue exitoso
    feedbackMessage.value = '¡Gracias por tu comentario! Lo hemos recibido exitosamente.';

    // Opcional: Cerrar la modal automáticamente después de un tiempo si fue exitoso
    setTimeout(() => {
      closeCommentModal();
    }, 2500);

  } catch (error) {
    isSuccess.value = false; // Hubo un error
    feedbackMessage.value = 'Hubo un error al enviar tu comentario. Inténtalo de nuevo.';
    console.error('Error al enviar comentario:', error);
  } finally {
    isSubmitting.value = false;
  }
};

// --- Accesibilidad: Escuchar la tecla 'Escape' para cerrar la modal ---
const handleEscapeKey = (e) => {
  if (e.key === 'Escape' && isCommentModalVisible.value) {
    closeCommentModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscapeKey);
});

</script>

<style scoped>
/* Transiciones de entrada y salida para la modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Transición para el contenido de la modal (transform/scale) */
.modal-fade-enter-active > div:last-child, /* Selecciona el contenedor de la modal */
.modal-fade-leave-active > div:last-child {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}

.modal-fade-enter-from > div:last-child,
.modal-fade-leave-to > div:last-child {
  transform: translateY(-20px) scale(0.95);
  opacity: 0;
}
</style>