<template>
  <div class="bg-gradient-to-b from-gray-50 to-rose-50 min-h-screen font-sans antialiased">
    <Header />

    <main class="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-6 transform transition-all duration-300 hover:scale-[1.002]">
      <div class="bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        
        <div class="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-rose-50 to-pink-100 text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zv..."></div>
          <h1 class="relative z-10 text-4xl sm:text-5xl font-extrabold text-gray-900 mb-3 drop-shadow-md animate-fade-in-down">
            Publica tu Producto
          </h1>
          <p class="relative z-10 text-lg sm:text-xl text-gray-700 font-medium max-w-2xl mx-auto animate-fade-in">
            ¡Dale una segunda vida a tus objetos! Completa los detalles de tu producto para iniciar un trueque.
          </p>
        </div>

        <div class="relative px-6 pt-6 sm:px-8 bg-white z-20">
          <div class="flex justify-between items-center mb-6">
            <div class="flex-1 text-center">
              <span :class="{'text-rose-600 font-bold': currentStep === 1, 'text-gray-500': currentStep !== 1}" class="text-sm sm:text-base transition-colors duration-300">Paso 1: Detalles Básicos</span>
            </div>
            <div class="flex-1 text-center">
              <span :class="{'text-rose-600 font-bold': currentStep === 2, 'text-gray-500': currentStep !== 2}" class="text-sm sm:text-base transition-colors duration-300">Paso 2: Fotos</span>
            </div>
          </div>
          <div class="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div :style="{ width: currentStep === 1 ? '50%' : '100%' }" class="h-full bg-gradient-to-r from-rose-500 to-purple-600 transition-all duration-500 ease-out"></div>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 sm:p-8 md:p-10 bg-white">
          <transition name="slide-fade" mode="out-in">
            <div v-if="currentStep === 1" key="step1">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Nombre del Producto <span class="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    v-model="product.name"
                    placeholder="Ej. Consola de Videojuegos, Bicicleta de Montaña"
                    class="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition duration-200 text-gray-800 placeholder-gray-400"
                    :class="{'border-red-500': step1Errors.name}"
                    aria-required="true"
                    aria-describedby="name-error"
                  />
                  <p v-if="step1Errors.name" id="name-error" class="text-red-500 text-xs mt-1">{{ step1Errors.name }}</p>
                </div>

                <div>
                  <label for="category" class="block text-sm font-semibold text-gray-700 mb-2">Categoría <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <select
                      id="category"
                      v-model="product.category"
                      class="block w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition duration-200 text-gray-800 appearance-none bg-white pr-10"
                      :class="{'border-red-500': step1Errors.category}"
                      aria-required="true"
                      aria-describedby="category-error"
                    >
                      <option value="" disabled>Selecciona una categoría</option>
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
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
                    </div>
                  </div>
                  <p v-if="step1Errors.category" id="category-error" class="text-red-500 text-xs mt-1">{{ step1Errors.category }}</p>
                </div>

                <div>
                  <label for="condition" class="block text-sm font-semibold text-gray-700 mb-2">Estado del Producto <span class="text-red-500">*</span></label>
                  <div class="relative">
                    <select
                      id="condition"
                      v-model="product.condition"
                      class="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition duration-200 text-gray-800 appearance-none bg-white pr-10"
                      :class="{'border-red-500': step1Errors.condition}"
                      aria-required="true"
                      aria-describedby="condition-error"
                    >
                      <option value="" disabled>Selecciona el estado</option>
                      <option>Nuevo</option>
                      <option>Como Nuevo</option>
                      <option>Usado - Buen Estado</option>
                      <option>Usado - Aceptable</option>
                      <option>Para Piezas/Reparar</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/></svg>
                    </div>
                  </div>
                  <p v-if="step1Errors.condition" id="condition-error" class="text-red-500 text-xs mt-1">{{ step1Errors.condition }}</p>
                </div>

                <div class="md:col-span-2">
                  <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Descripción <span class="text-red-500">*</span></label>
                  <textarea
                    id="description"
                    v-model="product.description"
                    rows="4"
                    placeholder="Describe tu producto, su estado, características, y cualquier detalle relevante para un posible trueque. Máximo 500 caracteres."
                    class="w-full px-4 py-2.5 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-500 transition duration-200 text-gray-800 placeholder-gray-400 resize-y"
                    :class="{'border-red-500': step1Errors.description}"
                    maxlength="500"
                    aria-required="true"
                    aria-describedby="description-error"
                  ></textarea>
                  <p v-if="step1Errors.description" id="description-error" class="text-red-500 text-xs mt-1">{{ step1Errors.description }}</p>
                  <p class="text-xs text-gray-500 text-right mt-1">{{ product.description.length }}/500</p>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="button"
                  @click="goToNextStep"
                  class="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold rounded-full shadow-lg hover:from-rose-600 hover:to-pink-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-offset-2"
                >
                  Siguiente Paso
                </button>
              </div>
            </div>

            <div v-else-if="currentStep === 2" key="step2">
              <div class="grid grid-cols-1 gap-6 mb-8">
                <div>
                  <label for="photos" class="block text-sm font-semibold text-gray-700 mb-2">Fotos del Producto <span class="text-red-500">*</span></label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-rose-400 transition duration-200"
                       :class="{'border-red-500': step2Errors.photos}"
                       @click="triggerFileInput"
                       @dragover.prevent="handleDragOver"
                       @dragleave.prevent="handleDragLeave"
                       @drop.prevent="handleDrop"
                       role="button"
                       aria-describedby="photos-error"
                       tabindex="0"
                  >
                    <input type="file" id="photos" ref="fileInput" @change="handleFileChange" multiple accept="image/*" class="hidden" aria-hidden="true" />
                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m-4-4l5.172 5.172a4 4 0 005.656 0L40 32M28 8a4 4 0 100 8 4 4 0 000-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-600">Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar</p>
                    <p class="text-xs text-gray-500">(Máximo 4 imágenes, JPG, PNG)</p>
                  </div>
                  <p v-if="step2Errors.photos" id="photos-error" class="text-red-500 text-xs mt-1">{{ step2Errors.photos }}</p>
                  
                  <div v-if="imagePreviews.length" class="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div v-for="(image, index) in imagePreviews" :key="index" class="relative group">
                      <img :src="image" :alt="`Preview ${index + 1}`" class="w-full h-32 object-cover rounded-lg shadow-md" />
                      <button @click="removeImage(index)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-label="Eliminar imagen">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-between mt-8">
                <button
                  type="button"
                  @click="goToPreviousStep"
                  class="px-6 py-2.5 bg-gray-300 text-gray-800 font-bold rounded-full shadow hover:bg-gray-400 transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Paso Anterior
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-bold rounded-full shadow-lg hover:from-green-600 hover:to-teal-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isSubmitting">Publicar Producto</span>
                  <span v-else>Publicando...</span>
                </button>
              </div>
              <transition name="fade">
                <div v-if="errorMessage" class="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center" role="alert">
                  {{ errorMessage }}
                </div>
              </transition>
            </div>
          </transition>
        </form>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Header from './Header.vue'; // Asume que Header.vue existe
import Footer from './Footer.vue'; // Importa el componente Footer

const currentStep = ref(1);
const isSubmitting = ref(false);
const errorMessage = ref('');

const product = reactive({
  name: '',
  category: '',
  condition: '',
  description: '',
  photos: [],
});

const imagePreviews = ref([]); // Para almacenar las URLs de previsualización de imágenes

const step1Errors = reactive({
  name: '',
  category: '',
  condition: '',
  description: '',
});

const step2Errors = reactive({
  photos: '',
});

const fileInput = ref(null); // Ref para el input de tipo file

const validateStep1 = () => {
  let isValid = true;
  // Resetear errores
  Object.keys(step1Errors).forEach(key => step1Errors[key] = '');

  if (!product.name.trim()) {
    step1Errors.name = 'El nombre del producto es obligatorio.';
    isValid = false;
  }
  if (!product.category) {
    step1Errors.category = 'Selecciona una categoría.';
    isValid = false;
  }
  if (!product.condition) {
    step1Errors.condition = 'Selecciona el estado del producto.';
    isValid = false;
  }
  if (!product.description.trim()) {
    step1Errors.description = 'La descripción es obligatoria.';
    isValid = false;
  } else if (product.description.length > 500) {
    step1Errors.description = 'La descripción no debe exceder los 500 caracteres.';
    isValid = false;
  }
  return isValid;
};

const validateStep2 = () => {
  let isValid = true;
  // Resetear errores
  Object.keys(step2Errors).forEach(key => step2Errors[key] = '');

  if (product.photos.length === 0) {
    step2Errors.photos = 'Sube al menos una foto de tu producto.';
    isValid = false;
  }
  return isValid;
};

const goToNextStep = () => {
  if (validateStep1()) {
    currentStep.value = 2;
    errorMessage.value = ''; // Limpiar mensaje de error al avanzar
  } else {
    errorMessage.value = 'Por favor, corrige los errores en los detalles básicos.';
  }
};

const goToPreviousStep = () => {
  currentStep.value = 1;
  errorMessage.value = ''; // Limpiar mensaje de error al retroceder
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const files = event.target.files;
  processFiles(files);
};

const handleDragOver = (event) => {
  event.target.classList.add('border-rose-500', 'bg-rose-50');
};

const handleDragLeave = (event) => {
  event.target.classList.remove('border-rose-500', 'bg-rose-50');
};

const handleDrop = (event) => {
  event.target.classList.remove('border-rose-500', 'bg-rose-50');
  const files = event.dataTransfer.files;
  processFiles(files);
};

const processFiles = (files) => {
  errorMessage.value = ''; // Limpiar errores de fotos
  if (product.photos.length + files.length > 4) {
    errorMessage.value = 'Solo puedes subir un máximo de 4 imágenes.';
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (file.type.startsWith('image/') && product.photos.length < 4) {
      product.photos.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreviews.value.push(e.target.result);
      };
      reader.readAsDataURL(file);
    } else if (!file.type.startsWith('image/')) {
        errorMessage.value = 'Solo se permiten archivos de imagen.';
    }
  }
  // Limpiar el input de archivo para permitir la misma selección de nuevo
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const removeImage = (index) => {
  product.photos.splice(index, 1);
  imagePreviews.value.splice(index, 1);
  if (product.photos.length === 0 && step2Errors.photos) {
    step2Errors.photos = 'Sube al menos una foto de tu producto.';
  }
};

const handleSubmit = async () => {
    errorMessage.value = '';
    if (!validateStep2()) {
        errorMessage.value = 'Por favor, sube al menos una imagen.';
        return;
    }

    isSubmitting.value = true;
    
    // Simular el envío de datos a un backend
    // En un caso real, aquí usarías FormData para enviar archivos y otros datos
    // const formData = new FormData();
    // formData.append('name', product.name);
    // formData.append('category', product.category);
    // formData.append('condition', product.condition);
    // formData.append('description', product.description);
    // product.photos.forEach((photo, index) => {
    //     formData.append(`photo_${index}`, photo);
    // });

    try {
        // Ejemplo de fetch (descomentar y adaptar para un backend real)
        // const response = await fetch('/api/products', {
        //     method: 'POST',
        //     body: formData,
        // });

        // if (!response.ok) {
        //     const errorData = await response.json();
        //     throw new Error(errorData.message || 'Error al publicar el producto.');
        // }

        // const result = await response.json();
        // console.log('Producto publicado:', result);

        // Simulación de éxito
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        alert('¡Producto publicado con éxito!');

        // Resetear formulario y estado
        Object.assign(product, {
            name: '',
            category: '',
            condition: '',
            description: '',
            photos: [],
        });
        imagePreviews.value = [];
        Object.keys(step1Errors).forEach(key => step1Errors[key] = '');
        Object.keys(step2Errors).forEach(key => step2Errors[key] = '');
        currentStep.value = 1;

    } catch (error) {
        console.error('Error al publicar:', error);
        errorMessage.value = `Ocurrió un error: ${error.message || 'Inténtalo de nuevo.'}`;
    } finally {
        isSubmitting.value = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
</script>

<style scoped>
/* Transiciones Vue - se mantienen porque son específicas de Vue */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilo personalizado para el select - mantenido para el icono SVG */
/* Este SVG codificado en base64 es un patrón común para personalizar el icono de flecha del select */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.8em 0.8em;
  padding-right: 2.5rem;
}

/* Animaciones de keyframes - generalmente se definirían en un CSS global o tailwind.config.js */
/* Si no están en tu config de Tailwind, déjalas aquí, si sí, remuévelas */
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
  animation: fadeInDown 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  animation-delay: 0.3s;
}
</style>