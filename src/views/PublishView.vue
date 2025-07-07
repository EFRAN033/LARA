<template>
  <div class="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
    <Header />

    <!-- Contenedor principal con efecto de carta flotante -->
    <main class="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-6 transform transition-all duration-300 hover:scale-[1.002]">
      <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
        
        <!-- Cabecera con gradiente animado -->
        <div class="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#f8e1ee] to-[#fdedf5] text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#d7037b] mb-3 relative z-10">
            ¡Publica tu Intercambio!
          </h1>
          <p class="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto relative z-10">
            Completa los siguientes pasos para ofrecer tu artículo y encontrar el intercambio perfecto.
          </p>
          
          <!-- Elemento decorativo -->
          <div class="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#d7037b] opacity-10 blur-xl"></div>
          <div class="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-[#9e0154] opacity-10 blur-xl"></div>
        </div>

        <!-- Indicador de progreso mejorado -->
        <div class="relative pt-8 px-6 sm:px-8 md:px-10">
          <div class="flex items-center justify-between text-sm font-medium text-gray-500 mb-2">
            <span class="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-full">Paso {{ currentStep }} de {{ totalSteps }}</span>
            <span v-if="currentStep === 1" class="text-[#d7037b] font-semibold flex items-center">
              <InformationCircleIcon class="h-4 w-4 mr-1" /> Información Básica
            </span>
            <span v-if="currentStep === 2" class="text-[#d7037b] font-semibold flex items-center">
              <PhotoIcon class="h-4 w-4 mr-1" /> Imágenes Brillantes
            </span>
            <span v-if="currentStep === 3" class="text-[#d7037b] font-semibold flex items-center">
              <GiftIcon class="h-4 w-4 mr-1" /> Tu Deseo de Intercambio
            </span>
          </div>
          
          <!-- Barra de progreso con animación -->
          <div class="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div 
              class="bg-gradient-to-r from-[#d7037b] via-[#c1026d] to-[#9e0154] h-2.5 rounded-full transition-all duration-700 ease-out"
              :style="{ width: progressPercentage }"
            ></div>
          </div>
          
          <!-- Indicadores de pasos con animación -->
          <div class="flex justify-between mt-4 text-xs text-gray-500 relative">
            <div v-for="step in totalSteps" :key="step" 
                 class="flex flex-col items-center relative z-10"
                 @click="goToStep(step)">
              <div class="w-8 h-8 rounded-full flex items-center justify-center mb-1 cursor-pointer transition-all"
                   :class="{
                     'bg-[#d7037b] text-white shadow-md': currentStep >= step,
                     'bg-white border-2 border-gray-300 text-gray-400': currentStep < step,
                     'ring-2 ring-[#d7037b] ring-offset-2': currentStep === step
                   }">
                <span v-if="currentStep > step || currentStep === step">
                  <CheckIcon v-if="currentStep > step" class="h-4 w-4" />
                  <span v-else class="font-bold">{{ step }}</span>
                </span>
                <span v-else class="font-medium">{{ step }}</span>
              </div>
              <span class="text-xs font-medium text-center"
                    :class="{
                      'text-[#d7037b]': currentStep >= step,
                      'text-gray-400': currentStep < step
                    }">
                {{ getStepName(step) }}
              </span>
            </div>
            
            <!-- Línea decorativa detrás de los círculos -->
            <div class="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0"></div>
          </div>
        </div>

        <!-- Formulario con transiciones mejoradas -->
        <form @submit.prevent="handleFormSubmission" class="p-6 sm:p-8 md:p-10 space-y-8">
          <transition name="slide-fade" mode="out-in">
            <div v-if="currentStep === 1" key="step1" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                <div class="w-10 h-10 rounded-full bg-[#f8e1ee] flex items-center justify-center mr-3">
                  <InformationCircleIcon class="h-6 w-6 text-[#d7037b]" />
                </div>
                Detalles de tu Artículo
              </h2>

              <!-- Campo de título con contador de caracteres -->
              <div>
                <label for="title" class="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                  <span>Título del Artículo <span class="text-red-500">*</span></span>
                  <span class="text-xs font-medium" :class="{
                    'text-gray-500': product.title.length <= 60,
                    'text-amber-500': product.title.length > 60 && product.title.length <= 70,
                    'text-red-500': product.title.length > 70
                  }">
                    {{ product.title.length }}/70
                  </span>
                </label>
                <div class="relative mt-1">
                  <input 
                    type="text" 
                    id="title" 
                    v-model="product.title" 
                    maxlength="70"
                    placeholder="Ej: Consola de videojuegos Nintendo Switch"
                    class="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b] sm:text-sm transition duration-150 ease-in-out pr-10"
                    :class="{ 'border-red-500': step1Errors.title }"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <SparklesIcon v-if="product.title.length > 5 && !step1Errors.title" class="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <p v-if="step1Errors.title" class="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon class="h-4 w-4 mr-1" /> {{ step1Errors.title }}
                </p>
                <p v-else class="mt-1 text-xs text-gray-500">
                  Ejemplo: "iPhone 12 Pro Max 128GB - Como nuevo con accesorios"
                </p>
              </div>

              <!-- Campo de descripción con contador y ejemplos -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                  <span>Descripción Detallada <span class="text-red-500">*</span></span>
                  <span class="text-xs font-medium" :class="{
                    'text-gray-500': product.description.length <= 300,
                    'text-amber-500': product.description.length > 300 && product.description.length <= 400,
                    'text-red-500': product.description.length > 400
                  }">
                    {{ product.description.length }}/400
                  </span>
                </label>
                <textarea 
                  id="description" 
                  v-model="product.description" 
                  rows="6" 
                  maxlength="400"
                  placeholder="Describe el artículo, sus características, estado, defectos (si los hay), accesorios incluidos, etc."
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b] sm:text-sm transition duration-150 ease-in-out resize-y"
                  :class="{ 'border-red-500': step1Errors.description }"
                ></textarea>
                <p v-if="step1Errors.description" class="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon class="h-4 w-4 mr-1" /> {{ step1Errors.description }}
                </p>
                <div class="mt-1 text-xs text-gray-500">
                  <p class="font-medium">Sugerencias para una buena descripción:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>Estado real del artículo (nuevo, usado, detalles)</li>
                    <li>Tiempo de uso o antigüedad</li>
                    <li>Accesorios incluidos</li>
                    <li>Razón del intercambio</li>
                  </ul>
                </div>
              </div>

              <!-- Campos de categoría y condición en grid responsive -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Selector de categoría con iconos -->
                <div>
                  <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                    Categoría <span class="text-red-500">*</span>
                  </label>
                  <div class="relative mt-1">
                    <select 
                      id="category" 
                      v-model="product.category"
                      class="block w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b] sm:text-sm transition duration-150 ease-in-out bg-white appearance-none"
                      :class="{ 'border-red-500': step1Errors.category }"
                    >
                      <option value="" disabled>Selecciona una categoría</option>
                      <option value="electronics">📱 Electrónica</option>
                      <option value="books">📚 Libros</option>
                      <option value="clothing">👕 Ropa y Accesorios</option>
                      <option value="home">🏠 Hogar y Jardín</option>
                      <option value="sports">⚽ Deportes y Ocio</option>
                      <option value="collectibles">🎨 Coleccionables</option>
                      <option value="vehicles">🚗 Vehículos y Partes</option>
                      <option value="services">🛠️ Servicios</option>
                      <option value="other">❓ Otro</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDownIcon class="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <p v-if="step1Errors.category" class="mt-1 text-sm text-red-600 flex items-center">
                    <ExclamationTriangleIcon class="h-4 w-4 mr-1" /> {{ step1Errors.category }}
                  </p>
                </div>

                <!-- Selector de condición con descripciones emergentes -->
                <div>
                  <label for="condition" class="block text-sm font-medium text-gray-700 mb-1">
                    Condición <span class="text-red-500">*</span>
                  </label>
                  <div class="relative mt-1">
                    <select 
                      id="condition" 
                      v-model="product.condition"
                      class="block w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b] sm:text-sm transition duration-150 ease-in-out bg-white appearance-none"
                      :class="{ 'border-red-500': step1Errors.condition }"
                    >
                      <option value="" disabled>Selecciona la condición</option>
                      <option value="new">✨ Nuevo - Sin uso, con etiquetas</option>
                      <option value="like-new">👍 Como Nuevo - Usado poco, impecable</option>
                      <option value="used-good">👌 Usado - Buen Estado - Algunos signos de uso</option>
                      <option value="used-fair">🤔 Usado - Estado Regular - Funciona pero con detalles</option>
                      <option value="for-parts">⚠️ Para Partes / Reparar - No funciona completamente</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronDownIcon class="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <p v-if="step1Errors.condition" class="mt-1 text-sm text-red-600 flex items-center">
                    <ExclamationTriangleIcon class="h-4 w-4 mr-1" /> {{ step1Errors.condition }}
                  </p>
                </div>
              </div>
            </div>
          </transition>

          <transition name="slide-fade" mode="out-in">
            <div v-if="currentStep === 2" key="step2" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                <div class="w-10 h-10 rounded-full bg-[#f8e1ee] flex items-center justify-center mr-3">
                  <PhotoIcon class="h-6 w-6 text-[#d7037b]" />
                </div>
                Sube las Mejores Fotos
              </h2>
              
              <div class="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-md flex items-start">
                <LightBulbIcon class="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="font-semibold">Consejo profesional:</p>
                  <p class="text-sm mt-1">Las fotos claras y bien iluminadas aumentan hasta un 70% las posibilidades de intercambio. Usa fondo neutro y muestra detalles importantes.</p>
                </div>
              </div>

              <!-- Área de carga de imágenes mejorada -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Imágenes del Artículo <span class="text-red-500">*</span>
                  <span class="text-xs font-normal text-gray-500 ml-1">({{ product.images.length }}/5)</span>
                </label>
                
                <div v-if="imagePreviews.length < 5" 
                     class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer hover:border-[#d7037b] transition-all duration-200 group"
                     @click="triggerFileInput"
                     @dragover.prevent="dragOver = true"
                     @dragleave="dragOver = false"
                     @drop.prevent="handleDrop"
                     :class="{ 
                       'border-[#d7037b] bg-[#fdf2f8]': dragOver,
                       'border-red-500': step2Errors.images 
                     }">
                  <input type="file" ref="fileInput" @change="handleImageUpload" multiple accept="image/*" class="sr-only">
                  <div class="space-y-2 text-center">
                    <div class="flex justify-center">
                      <div class="p-3 rounded-full bg-[#fce7f3] group-hover:bg-[#fbcfe8] transition-colors">
                        <CloudArrowUpIcon class="h-8 w-8 text-[#d7037b]" />
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-center text-sm text-gray-600">
                      <span class="relative cursor-pointer bg-white rounded-md font-medium text-[#d7037b] hover:text-[#9e0154]">
                        Haz clic para subir
                      </span>
                      <p class="sm:pl-1">o arrastra y suelta</p>
                    </div>
                    <p class="text-xs text-gray-500">PNG, JPG, GIF hasta 5MB por foto</p>
                    <p class="text-xs text-gray-400">Recomendado: 3-5 fotos desde diferentes ángulos</p>
                  </div>
                </div>
                
                <p v-if="step2Errors.images" class="mt-1 text-sm text-red-600 flex items-center">
                  <ExclamationTriangleIcon class="h-4 w-4 mr-1" /> {{ step2Errors.images }}
                </p>
                
                <!-- Galería de imágenes con miniaturas -->
                <div v-if="imagePreviews.length" class="mt-4">
                  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div v-for="(src, index) in imagePreviews" :key="index" 
                         class="relative group overflow-hidden rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200">
                      <img :src="src" class="w-full h-40 object-cover" />
                      
                      <!-- Botón de eliminar con efecto hover -->
                      <button 
                        @click.stop="removeImage(index)" 
                        class="absolute top-2 right-2 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm hover:bg-red-100"
                        aria-label="Eliminar imagen"
                      >
                        <XMarkIcon class="h-4 w-4 text-gray-600 hover:text-red-600" />
                      </button>
                      
                      <!-- Indicador de posición -->
                      <div class="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
                        {{ index + 1 }}
                      </div>
                      
                      <!-- Botón para establecer como imagen principal -->
                      <button 
                        v-if="index !== 0"
                        @click.stop="setAsPrimary(index)"
                        class="absolute bottom-2 right-2 bg-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm hover:bg-[#fce7f3]"
                      >
                        Principal
                      </button>
                    </div>
                    
                    <!-- Slot para añadir más imágenes si hay menos de 5 -->
                    <div v-if="imagePreviews.length < 5" 
                         class="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-[#d7037b] transition-colors h-40"
                         @click="triggerFileInput">
                      <PlusCircleIcon class="h-8 w-8 text-gray-400 hover:text-[#d7037b]" />
                    </div>
                  </div>
                  
                  <p class="mt-2 text-xs text-gray-500 flex items-center">
                    <InformationCircleIcon class="h-4 w-4 mr-1 text-gray-400" />
                    La primera imagen será la principal. Arrastra para reordenar (próximamente).
                  </p>
                </div>
              </div>
            </div>
          </transition>

          <transition name="slide-fade" mode="out-in">
            <div v-if="currentStep === 3" key="step3" class="space-y-6">
              <h2 class="text-2xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                <div class="w-10 h-10 rounded-full bg-[#f8e1ee] flex items-center justify-center mr-3">
                  <GiftIcon class="h-6 w-6 text-[#d7037b]" />
                </div>
                ¿Qué te gustaría Recibir?
              </h2>
              
              <div class="bg-purple-50 border-l-4 border-purple-400 text-purple-800 p-4 rounded-md">
                <div class="flex items-start">
                  <SparklesIcon class="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p class="font-semibold">¡Aumenta tus posibilidades!</p>
                    <p class="text-sm mt-1">Los intercambios con descripciones claras de lo que buscas tienen un 60% más de éxito. Sé específico pero flexible.</p>
                  </div>
                </div>
              </div>

              <!-- Campo de intercambio deseado con sugerencias -->
              <div>
                <label for="exchange_for" class="block text-sm font-medium text-gray-700 mb-1">
                  Tu Interés de Intercambio <span class="text-gray-500">(Opcional, pero muy recomendado)</span>
                </label>
                <textarea 
                  id="exchange_for" 
                  v-model="product.exchange_for" 
                  rows="5" 
                  placeholder="Ej: Busco una tablet Android reciente (Samsung, Xiaomi) en buen estado, o una bicicleta de montaña para principiantes. También podría considerar herramientas eléctricas."
                  class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b] sm:text-sm transition duration-150 ease-in-out resize-y"
                ></textarea>
                <div class="mt-2 text-xs text-gray-500">
                  <p class="font-medium mb-1">Ejemplos efectivos:</p>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>"Interesado en intercambiar por un portátil con características similares"</li>
                    <li>"Abierto a ofertas de muebles para oficina o equipos de sonido"</li>
                    <li>"Busco principalmente bicicletas urbanas, pero considero otras opciones"</li>
                  </ul>
                </div>
              </div>

              <!-- Resumen de la publicación -->
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <EyeIcon class="h-5 w-5 text-gray-600 mr-2" />
                  Así verán los demás tu publicación
                </h3>
                
                <div class="space-y-3">
                  <div class="flex items-start">
                    <span class="text-sm font-medium text-gray-600 w-24 flex-shrink-0">Título:</span>
                    <span class="text-sm text-gray-800">{{ product.title || "(No especificado)" }}</span>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="text-sm font-medium text-gray-600 w-24 flex-shrink-0">Categoría:</span>
                    <span class="text-sm text-gray-800">{{ getCategoryName(product.category) || "(No especificada)" }}</span>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="text-sm font-medium text-gray-600 w-24 flex-shrink-0">Condición:</span>
                    <span class="text-sm text-gray-800">{{ getConditionName(product.condition) || "(No especificada)" }}</span>
                  </div>
                  
                  <div class="flex items-start">
                    <span class="text-sm font-medium text-gray-600 w-24 flex-shrink-0">Fotos:</span>
                    <span class="text-sm text-gray-800">{{ imagePreviews.length }} {{ imagePreviews.length === 1 ? 'imagen' : 'imágenes' }}</span>
                  </div>
                </div>
              </div>

              <!-- Nota final con animación -->
              <div class="bg-gradient-to-r from-[#f8e1ee] to-[#fdf2f8] p-4 rounded-lg border border-[#fbcfe8]">
                <div class="flex items-center">
                  <RocketLaunchIcon class="h-6 w-6 text-[#d7037b] mr-3 animate-bounce" />
                  <p class="font-semibold text-[#9e0154]">¡Estás a un paso de encontrar el intercambio perfecto!</p>
                </div>
                <p class="mt-2 text-sm text-gray-700">
                  Revisa que toda la información sea correcta antes de publicar. Podrás editar algunos detalles después.
                </p>
              </div>
            </div>
          </transition>

          <!-- Navegación entre pasos mejorada -->
          <div class="flex justify-between items-center pt-6 border-t mt-8">
            <button 
              type="button" 
              @click="prevStep" 
              v-if="currentStep > 1"
              class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b] transition-colors duration-200"
            >
              <ArrowLeftIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Atrás
            </button>
            <div v-else></div>
            
            <button 
              type="button" 
              @click="nextStep" 
              v-if="currentStep < totalSteps"
              class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#9e0154] to-[#d7037b] hover:from-[#d7037b] hover:to-[#9e0154] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b] transition-all duration-200 group"
            >
              Siguiente
              <ArrowRightIcon class="ml-2 -mr-1 h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              v-if="currentStep === totalSteps"
              class="inline-flex justify-center items-center py-3 px-8 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] hover:from-[#9e0154] hover:to-[#d7037b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <template v-if="!isSubmitting">
                <RocketLaunchIcon class="-ml-1 mr-2 h-5 w-5 text-white group-hover:animate-pulse" />
                ¡Publicar Ahora!
              </template>
              <template v-else>
                <ArrowPathIcon class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Publicando...
              </template>
            </button>
          </div>
        </form>

        <!-- Mensajes de feedback mejorados -->
        <transition name="fade">
          <div v-if="successMessage" class="mx-6 sm:mx-8 md:mx-10 mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 flex items-start shadow-lg">
            <CheckCircleIcon class="h-6 w-6 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p class="font-semibold">{{ successMessage }}</p>
              <p class="text-sm mt-1">Puedes ver tu publicación en tu perfil o esperar ofertas de intercambio.</p>
            </div>
          </div>
        </transition>
        
        <transition name="fade">
          <div v-if="errorMessage" class="mx-6 sm:mx-8 md:mx-10 mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start shadow-lg">
            <ExclamationCircleIcon class="h-6 w-6 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p class="font-semibold">¡Ups! Algo salió mal</p>
              <p class="text-sm mt-1">{{ errorMessage }}</p>
            </div>
          </div>
        </transition>

        <!-- Pie de página con enlace -->
        <div class="mt-8 mb-6 text-center">
          <router-link to="/" class="inline-flex items-center text-gray-600 hover:text-[#d7037b] font-medium transition-colors text-sm group">
            <ArrowLeftIcon class="h-4 w-4 mr-1 text-gray-500 group-hover:text-[#d7037b] transition-colors" />
            Volver a la página principal
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import Header from './Header.vue';
import { 
  CloudArrowUpIcon, 
  XMarkIcon, 
  ArrowPathIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  PhotoIcon,
  GiftIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  SparklesIcon,
  CheckIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'; 

const currentStep = ref(1);
const totalSteps = 3;
const dragOver = ref(false);

const product = reactive({
  title: '',
  description: '',
  category: '',
  condition: '',
  exchange_for: '',
  images: [] 
});

const imagePreviews = ref([]); 
const step1Errors = reactive({});
const step2Errors = reactive({});
const isSubmitting = ref(false); 
const successMessage = ref('');
const errorMessage = ref('');
const fileInput = ref(null); 

// Computed properties
const progressPercentage = computed(() => {
    return `${(currentStep.value / totalSteps) * 100}%`;
});

// Helper functions
const getStepName = (step) => {
  switch(step) {
    case 1: return 'Artículo';
    case 2: return 'Fotos';
    case 3: return 'Intercambio';
    default: return '';
  }
};

const getCategoryName = (category) => {
  const categories = {
    'electronics': 'Electrónica',
    'books': 'Libros',
    'clothing': 'Ropa y Accesorios',
    'home': 'Hogar y Jardín',
    'sports': 'Deportes y Ocio',
    'collectibles': 'Coleccionables',
    'vehicles': 'Vehículos y Partes',
    'services': 'Servicios',
    'other': 'Otro'
  };
  return categories[category] || '';
};

const getConditionName = (condition) => {
  const conditions = {
    'new': 'Nuevo',
    'like-new': 'Como Nuevo',
    'used-good': 'Usado - Buen Estado',
    'used-fair': 'Usado - Estado Regular',
    'for-parts': 'Para Partes / Reparar'
  };
  return conditions[condition] || '';
};

// Step navigation
const goToStep = (step) => {
  if (step < currentStep.value) {
    currentStep.value = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const validateStep = (step) => {
    let isValid = true;
    
    if (step === 1) {
        step1Errors.title = '';
        step1Errors.description = '';
        step1Errors.category = '';
        step1Errors.condition = '';

        if (!product.title.trim()) {
            step1Errors.title = 'El título es obligatorio.';
            isValid = false;
        } else if (product.title.trim().length < 5) {
            step1Errors.title = 'El título debe tener al menos 5 caracteres.';
            isValid = false;
        }

        if (!product.description.trim()) {
            step1Errors.description = 'La descripción es obligatoria.';
            isValid = false;
        } else if (product.description.trim().length < 20) {
            step1Errors.description = 'La descripción debe tener al menos 20 caracteres.';
            isValid = false;
        }
        
        if (!product.category) {
            step1Errors.category = 'La categoría es obligatoria.';
            isValid = false;
        }
        
        if (!product.condition) {
            step1Errors.condition = 'La condición es obligatoria.';
            isValid = false;
        }
    } else if (step === 2) {
        step2Errors.images = '';
        if (product.images.length === 0) {
            step2Errors.images = 'Debes subir al menos una imagen de tu artículo.';
            isValid = false;
        } else if (product.images.length > 5) {
            step2Errors.images = 'Puedes subir un máximo de 5 imágenes.';
            isValid = false;
        }
    }
    
    return isValid;
};

const nextStep = () => {
    successMessage.value = '';
    errorMessage.value = '';

    if (validateStep(currentStep.value)) {
        if (currentStep.value < totalSteps) {
            currentStep.value++;
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } else {
        errorMessage.value = 'Por favor, completa los campos obligatorios del paso actual.';
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' 
        });
    }
};

const prevStep = () => {
    successMessage.value = '';
    errorMessage.value = '';
    if (currentStep.value > 1) {
        currentStep.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Image handling
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleDrop = (e) => {
  dragOver.value = false;
  fileInput.value.files = e.dataTransfer.files;
  handleImageUpload(e);
};

const handleImageUpload = (event) => {
  const files = Array.from(event.target.files || event.dataTransfer.files);
  const maxFiles = 5;
  const maxFileSizeMB = 5;

  errorMessage.value = '';
  step2Errors.images = '';

  if ((product.images.length + files.length) > maxFiles) {
    step2Errors.images = `Solo puedes subir un máximo de ${maxFiles} imágenes (ya tienes ${product.images.length}).`;
    return;
  }

  const newValidFiles = [];
  files.forEach(file => {
    const isImage = file.type.startsWith('image/');
    const isSizeValid = file.size <= maxFileSizeMB * 1024 * 1024; 
    
    if (!isImage) {
        errorMessage.value = `El archivo "${file.name}" no es una imagen válida.`;
    } else if (!isSizeValid) {
        errorMessage.value = `El archivo "${file.name}" excede el tamaño máximo de ${maxFileSizeMB}MB.`;
    } else {
      newValidFiles.push(file);
    }
  });

  product.images.push(...newValidFiles);

  newValidFiles.forEach(file => {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
  
  if (product.images.length > 0 && step2Errors.images === 'Debes subir al menos una imagen de tu artículo.') {
      step2Errors.images = '';
  }
};

const removeImage = (index) => {
  product.images.splice(index, 1);
  imagePreviews.value.splice(index, 1);
  if (product.images.length === 0) {
      step2Errors.images = 'Debes subir al menos una imagen de tu artículo.';
  } else {
      step2Errors.images = '';
  }
  errorMessage.value = ''; 
};

const setAsPrimary = (index) => {
  // Mover la imagen seleccionada a la primera posición
  const img = imagePreviews.value[index];
  const file = product.images[index];
  
  imagePreviews.value.splice(index, 1);
  imagePreviews.value.unshift(img);
  
  product.images.splice(index, 1);
  product.images.unshift(file);
};

// Form submission
const handleFormSubmission = async () => {
    successMessage.value = '';
    errorMessage.value = '';

    if (!validateStep(1) || !validateStep(2)) {
        errorMessage.value = 'Por favor, revisa todos los pasos y completa los campos obligatorios.';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    isSubmitting.value = true;
    console.log('Datos finales a enviar:', product);

    try {
        // Simulación de envío a API
        await new Promise(resolve => setTimeout(resolve, 2500));

        successMessage.value = '¡Tu artículo ha sido publicado con éxito! 🎉';
        
        // Resetear el formulario
        Object.assign(product, {
          title: '',
          description: '',
          category: '',
          condition: '',
          exchange_for: '',
          images: []
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
/* Transiciones mejoradas */
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

/* Estilo personalizado para el select */
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* Efecto de hover para las imágenes */
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>