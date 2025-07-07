<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased text-gray-900">
    <Header />

    <main class="relative z-10">
      <section class="relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center text-white py-28 sm:py-36 text-center shadow-xl">
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-[#9e0154]/90"></div>
        
        <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h50v50H0z\' fill=\'%23d7037b\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3Cpath d=\'M50 50h50v50H50z\' fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')"></div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#d7037b]/20 blur-xl"></div>
          <div class="absolute -bottom-5 -right-5 w-40 h-40 rounded-full bg-white/10 blur-xl"></div>
          
          <div class="max-w-4xl mx-auto">
            <div class="inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 border border-white/30 animate-pulse-slow">
              <HandHeartIcon class="h-6 w-6 mr-2 text-white" />
              <span class="text-sm font-semibold tracking-wider">JUNTOS CREAMOS IMPACTO</span>
            </div>
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#fce4ec]">Eventos que Transforman</span>
            </h1>
            
            <p class="text-xl sm:text-2xl opacity-95 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-100">
              Conectamos corazones solidarios a través de experiencias significativas en todo el Perú.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
              <router-link 
                to="/premium" 
                class="px-8 py-4 bg-white text-[#9e0154] font-bold rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <StarIcon class="h-5 w-5 mr-2" />
                Unirme a Premium
              </router-link>
              <button 
                @click="scrollToEvents"
                class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <CalendarDaysIcon class="h-5 w-5 mr-2" />
                Ver Eventos
              </button>
            </div>
          </div>
        </div>
        
        <div class="absolute -bottom-1 left-0 right-0 overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-16 sm:h-24">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
          </svg>
        </div>
      </section>

      <section id="events" class="py-20 sm:py-28 bg-white relative">
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5">
          <div class="absolute top-0 left-0 w-full h-full" style="background-image: url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239e0154\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E')"></div>
        </div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              <span class="relative inline-block">
                <span class="relative z-10">Encuentra Tu Causa</span>
                <span class="absolute bottom-0 left-0 w-full h-3 bg-[#fce4ec] opacity-60 -z-0" style="transform: skewX(-15deg);"></span>
              </span>
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre oportunidades para marcar la diferencia en tu comunidad
            </p>
          </div>
          
          <div class="mb-12 bg-gray-50 p-4 rounded-2xl shadow-inner border border-gray-100">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div class="flex-1 w-full">
                <label for="search" class="sr-only">Buscar eventos</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="text" 
                    id="search" 
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:border-transparent" 
                    placeholder="Buscar eventos por ubicación o tema..."
                  >
                </div>
              </div>
              
              <div class="flex items-center gap-2 flex-wrap justify-center">
                <button 
                  v-for="(filter, index) in filters" 
                  :key="index"
                  @click="toggleFilter(filter)"
                  :class="[
                    'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    activeFilters.includes(filter) 
                      ? 'bg-[#d7037b] text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  {{ filter }}
                </button>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="event in paginatedEvents" 
              :key="event.id" 
              class="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div v-if="event.featured" class="absolute top-4 right-4 z-10">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#d7037b] text-white shadow-lg">
                  <StarIcon class="h-3 w-3 mr-1" />
                  Destacado
                </span>
              </div>
              
              <div class="relative h-56 overflow-hidden">
                <img 
                  :src="event.imageUrl || 'https://via.placeholder.com/600x400?text=Evento+KambiaPe'" 
                  :alt="event.name" 
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                <div class="absolute bottom-4 left-4 flex items-center">
                  <div class="flex -space-x-2">
                    <img 
                      v-for="i in Math.min(event.participants, 5)" 
                      :key="i" 
                      :src="`https://i.pravatar.cc/150?img=${i + 10}`" 
                      class="w-8 h-8 rounded-full border-2 border-white" 
                      :alt="`Participante ${i}`"
                    >
                  </div>
                  <span class="ml-2 text-xs font-medium text-white bg-black/40 px-2 py-1 rounded-full">
                    +{{ event.participants }} unidos
                  </span>
                </div>
              </div>
              
              <div class="p-6">
                <div class="flex flex-wrap gap-2 mb-3">
                  <span 
                    v-for="(tag, i) in event.tags" 
                    :key="i"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="{
                      'bg-[#fdf2f8] text-[#d7037b]': i === 0,
                      'bg-gray-100 text-gray-800': i !== 0
                    }"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <h3 class="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-[#d7037b] transition-colors">
                  {{ event.name }}
                </h3>
                
                <div class="flex items-center text-sm text-gray-500 mb-3">
                  <MapPinIcon class="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span>{{ event.location }}</span>
                </div>
                
                <div class="flex items-center text-sm text-gray-500 mb-4">
                  <CalendarIcon class="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span>{{ event.date }}</span>
                  <span class="mx-2">•</span>
                  <ClockIcon class="h-4 w-4 mr-1.5 flex-shrink-0" />
                  <span>{{ event.time }}</span>
                </div>
                
                <p class="text-gray-600 mb-5 line-clamp-2">
                  {{ event.description }}
                </p>
                
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex items-center -space-x-2">
                      <img 
                        v-for="i in Math.min(event.organizers.length, 3)" 
                        :key="i" 
                        :src="`https://i.pravatar.cc/150?img=${i + 20}`" 
                        class="w-8 h-8 rounded-full border-2 border-white" 
                        :alt="`Organizador ${i}`"
                      >
                    </div>
                    <span class="ml-2 text-xs text-gray-500">
                      Organizado por {{ event.organizers.join(', ') }}
                    </span>
                  </div>
                  
                  <button 
                    v-if="!isPremium"
                    @click="showPremiumModal = true"
                    class="text-[#d7037b] hover:text-[#9e0154] transition-colors"
                    aria-label="Ver requisitos para participar"
                  >
                    <LockClosedIcon class="h-5 w-5" />
                  </button>
                </div>
                
                <div class="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-500">
                    <HeartOutlineIcon class="h-4 w-4 mr-1.5 text-[#d7037b]" />
                    <span>{{ event.likes }} personas interesadas</span>
                  </div>
                  
                  <button 
                    v-if="isPremium"
                    @click="joinEvent(event.id)"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] hover:from-[#9e0154] hover:to-[#d7037b] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b]"
                  >
                    Participar
                  </button>
                  
                  <router-link 
                    v-else
                    to="/premium"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] hover:from-[#9e0154] hover:to-[#d7037b] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b]"
                  >
                    Desbloquear
                  </router-link>
                </div>
              </div>
              
              <div class="absolute inset-0 border-2 border-transparent group-hover:border-[#fce4ec] rounded-2xl pointer-events-none transition-all duration-300"></div>
            </div>
          </div>
          
          <div v-if="filteredEvents.length === 0" class="text-center py-16">
            <div class="mx-auto h-24 w-24 text-gray-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No encontramos eventos</h3>
            <p class="text-gray-500 max-w-md mx-auto">Parece que no hay eventos que coincidan con tus filtros. Prueba con otros criterios o revisa más tarde.</p>
            <button 
              @click="resetFilters"
              class="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#d7037b] hover:bg-[#9e0154] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b]"
            >
              <ArrowPathIcon class="h-4 w-4 mr-2" />
              Reiniciar filtros
            </button>
          </div>
          
          <div v-if="filteredEvents.length > 0" class="mt-12 flex items-center justify-between border-t border-gray-200 pt-8">
            <button 
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >
              Anterior
            </button>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
              <div>
                <nav class="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button 
                    v-for="page in totalPages" 
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      page === currentPage 
                        ? 'z-10 bg-[#d7037b] border-[#d7037b] text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </nav>
              </div>
            </div>
            <button 
              class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>

      <section v-if="!isPremium" class="relative py-20 sm:py-28 bg-gradient-to-br from-[#9e0154] to-[#d7037b] text-white overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-full opacity-10">
          <div class="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div class="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
        </div>
        
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <div class="inline-flex items-center justify-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8 border border-white/30">
              <StarIcon class="h-6 w-6 mr-2 text-white animate-pulse" />
              <span class="text-sm font-semibold tracking-wider">EXPERIENCIA PREMIUM</span>
            </div>
            
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#fce4ec]">Acceso Exclusivo a Eventos Solidarios</span>
            </h2>
            
            <p class="text-lg sm:text-xl opacity-95 max-w-2xl mx-auto mb-10">
              Como miembro Premium de KambiaPe, tendrás acceso prioritario a eventos exclusivos, beneficios especiales y la oportunidad de crear un impacto aún mayor.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <router-link 
                to="/premium" 
                class="px-8 py-4 bg-white text-[#9e0154] font-bold rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <SparklesIcon class="h-5 w-5 mr-2" />
                Ver Beneficios Premium
              </router-link>
              
              <button 
                @click="showPremiumModal = true"
                class="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <QuestionMarkCircleIcon class="h-5 w-5 mr-2" />
                Saber Más
              </button>
            </div>
          </div>
        </div>
        
        <div class="absolute -bottom-1 left-0 right-0 overflow-hidden transform rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" class="w-full h-16 sm:h-24">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
          </svg>
        </div>
      </section>
    </main>

    <TransitionRoot as="template" :show="showPremiumModal">
      <Dialog as="div" class="relative z-50" @close="showPremiumModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#fdf2f8] sm:mx-0 sm:h-10 sm:w-10">
                      <StarIcon class="h-6 w-6 text-[#d7037b]" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Beneficios Premium</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Como miembro Premium de KambiaPe, disfrutarás de:
                        </p>
                        <ul class="mt-3 space-y-2 text-sm text-gray-500">
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Acceso prioritario a todos los eventos solidarios</span>
                          </li>
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Participación en eventos exclusivos para miembros Premium</span>
                          </li>
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Descuentos especiales en colaboraciones con aliados</span>
                          </li>
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Certificados digitales de participación</span>
                          </li>
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Reportes de impacto personalizado</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <router-link
                    to="/premium"
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#d7037b] to-[#9e0154] px-4 py-2 text-base font-medium text-white shadow-sm hover:from-[#9e0154] hover:to-[#d7037b] transition-all sm:ml-3 sm:w-auto sm:text-sm"
                    @click="showPremiumModal = false"
                  >
                    Ver Planes Premium
                  </router-link>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="showPremiumModal = false"
                  >
                    Cerrar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue'; // Import the Footer component
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  CalendarIcon, 
  LockClosedIcon, 
  ArrowRightIcon, 
  HandRaisedIcon,
  FaceSmileIcon,
  StarIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  HeartIcon as HeartOutlineIcon, // Renombrado para evitar conflicto con HandHeartIcon
  ArrowPathIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline';
import { 
  HeartIcon as HandHeartIcon, // Renombrado para evitar conflicto con HeartOutlineIcon
  StarIcon as StarSolidIcon // No utilizado directamente en template, pero mantenido por si acaso
} from '@heroicons/vue/24/solid';
import { 
  Dialog, 
  DialogPanel, 
  DialogTitle, 
  TransitionChild, 
  TransitionRoot 
} from '@headlessui/vue';

// Estado del modal
const showPremiumModal = ref(false);

// Dummy data for user premium status
const isPremium = ref(false); // Cambia a true para probar la vista premium

// Filtros
const filters = ref(['Todos', 'Educación', 'Alimentación', 'Medio Ambiente', 'Salud', 'Animales', 'Comunidad']);
const activeFilters = ref(['Todos']);

const toggleFilter = (filter) => {
  if (filter === 'Todos') {
    activeFilters.value = ['Todos'];
  } else {
    const index = activeFilters.value.indexOf(filter);
    if (index > -1) {
      activeFilters.value.splice(index, 1);
      // Si no hay filtros seleccionados, volver a "Todos"
      if (activeFilters.value.length === 0) {
        activeFilters.value = ['Todos'];
      }
    } else {
      // Eliminar "Todos" si se selecciona otro filtro
      const allIndex = activeFilters.value.indexOf('Todos');
      if (allIndex > -1) {
        activeFilters.value.splice(allIndex, 1);
      }
      activeFilters.value.push(filter);
    }
  }
  currentPage.value = 1; // Resetear a la primera página al cambiar filtros
};

const resetFilters = () => {
  activeFilters.value = ['Todos'];
  currentPage.value = 1;
};

// Paginación
const currentPage = ref(1);
const eventsPerPage = 6;

const events = ref([
  { 
    id: 1, 
    name: 'Donación de Útiles para Niños de Cusco', 
    date: '15 de Julio, 2025', 
    time: '9:00 AM - 2:00 PM',
    description: 'Recolección y entrega de material escolar a comunidades rurales en los Andes de Cusco. Un día para dibujar sonrisas y apoyar la educación en zonas alejadas.',
    location: 'Cusco, Cusco',
    imageUrl: 'https://images.unsplash.com/photo-1579782531093-68d830b533b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHw0fHxjdXNjbyUyMGNoaWxkcmVuJTIwZWR1Y2F0aW9ufGVufDB8fHx8MTcwMTU1NDg3NHww&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Educación', 'Niños', 'Andes'],
    participants: 42,
    likes: 87,
    organizers: ['Fundación Aprendiendo Juntos'],
    featured: true
  },
  { 
    id: 2, 
    name: 'Apoyo a Ollas Comunes de Ventanilla', 
    date: '1 de Agosto, 2025', 
    time: '8:00 AM - 4:00 PM',
    description: 'Jornada de apoyo en ollas comunes de Ventanilla, brindando alimentos y víveres esenciales a familias necesitadas. Ayúdanos a preparar y servir comidas.',
    location: 'Ventanilla, Callao',
    imageUrl: 'https://images.unsplash.com/photo-1627993046200-ee710b1a0d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwzfHxvbGxhJTIwY29tdW4lMjBsaW1hfGVufDB8fHx8MTcwMTU1NDg3NXww&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Alimentación', 'Comunidad', 'Lima'],
    participants: 35,
    likes: 64,
    organizers: ['Ollas Comunes Unidos'],
    featured: false
  },
  { 
    id: 3, 
    name: 'Reforestación en la Selva Central', 
    date: '10 de Septiembre, 2025', 
    time: '7:00 AM - 1:00 PM',
    description: 'Campaña de reforestación en Chanchamayo para restaurar áreas verdes y fomentar la conciencia ambiental. Plantaremos árboles nativos y aprenderemos sobre conservación.',
    location: 'Chanchamayo, Junín',
    imageUrl: 'https://images.unsplash.com/photo-1610492801453-2b225c52c2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHw3fHxwZXJ1JTIwcmFpbmZvcmVzdGF0aW9ufGVufDB8fHx8MTcwMTU1NDg3OXww&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Medio Ambiente', 'Selva', 'Sostenibilidad'],
    participants: 28,
    likes: 53,
    organizers: ['EcoPerú', 'Municipalidad de Chanchamayo'],
    featured: true
  },
  { 
    id: 4, 
    name: 'Visita y Entrega en Asilo de Ancianos de Arequipa', 
    date: '5 de Octubre, 2025', 
    time: '10:00 AM - 3:00 PM',
    description: 'Compartiremos un día con los adultos mayores, llevando donaciones y alegría a un hogar de ancianos en Arequipa. Actividades recreativas y acompañamiento.',
    location: 'Arequipa, Arequipa',
    imageUrl: 'https://images.unsplash.com/photo-1627049870344-e224e7828c46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwzfHxwZXJ1JTIwZWxkZXJseSUyMGNhcmV8ZW58MHx8fHwxNzAxNTU0ODgzfDA&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Adultos Mayores', 'Solidaridad', 'Sur'],
    participants: 19,
    likes: 41,
    organizers: ['Hogar San Vicente'],
    featured: false
  },
  { 
    id: 5, 
    name: 'Taller de Nutrición para Madres en Villa El Salvador', 
    date: '12 de Agosto, 2025', 
    time: '2:00 PM - 5:00 PM',
    description: 'Taller práctico sobre nutrición infantil para madres de familia en situación vulnerable. Incluye entrega de canastas nutricionales.',
    location: 'Villa El Salvador, Lima',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwY2hpbGRyZW4lMjBudXRyaXRpb258ZW58MHx8fHwxNzAxNTU0ODg0fDA&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Salud', 'Niños', 'Taller'],
    participants: 15,
    likes: 32,
    organizers: ['Nutriendo Perú'],
    featured: false
  },
  { 
    id: 6, 
    name: 'Rescate y Rehabilitación de Animales Callejeros', 
    date: '22 de Septiembre, 2025', 
    time: '9:00 AM - 6:00 PM',
    description: 'Jornada de rescate, atención veterinaria y rehabilitación para animales en situación de calle en el distrito de Miraflores.',
    location: 'Miraflores, Lima',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwZG9nfGVufDB8fHx8MTcwMTU1NDg4NXww&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Animales', 'Rescate', 'Veterinaria'],
    participants: 23,
    likes: 56,
    organizers: ['Patitas Perú'],
    featured: true
  },
  { 
    id: 7, 
    name: 'Limpieza de Playas en la Costa Verde', 
    date: '30 de Julio, 2025', 
    time: '8:00 AM - 12:00 PM',
    description: 'Campaña de limpieza para reducir la contaminación plástica en las playas de la Costa Verde. Ayúdanos a mantener nuestros océanos limpios.',
    location: 'Lima, Lima',
    imageUrl: 'https://images.unsplash.com/photo-1519046967733-a3ad230059c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwcGxhc3RpYyUyMGNvbmluYXRpb258ZW58MHx8fHwxNzAxNTU0ODg2fDA&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Medio Ambiente', 'Playas', 'Voluntariado'],
    participants: 50,
    likes: 95,
    organizers: ['Conservación Marina Perú'],
    featured: false
  },
  { 
    id: 8, 
    name: 'Charlas de Conciencia Ciudadana en Comas', 
    date: '8 de Agosto, 2025', 
    time: '3:00 PM - 6:00 PM',
    description: 'Serie de charlas educativas sobre derechos y deberes ciudadanos, fomentando la participación activa en la comunidad de Comas.',
    location: 'Comas, Lima',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwY2l0aXplbnNoaXAlMjBlZHVjYXRpb258ZW58MHx8fHwxNzAxNTU0ODg3fDA&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Comunidad', 'Educación', 'Derechos'],
    participants: 20,
    likes: 40,
    organizers: ['Vecinos Unidos por Comas'],
    featured: false
  },
  { 
    id: 9, 
    name: 'Campaña de Salud Gratuita en Puno', 
    date: '1 de Noviembre, 2025', 
    time: '8:00 AM - 5:00 PM',
    description: 'Atención médica general, despistaje de enfermedades y entrega de medicamentos básicos en comunidades rurales de Puno.',
    location: 'Puno, Puno',
    imageUrl: 'https://images.unsplash.com/photo-1582759714856-11f2780650d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwaGVhbHRoJTIwY2FtcGFpZ258ZW58MHx8fHwxNzAxNTU0ODg5fDA&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Salud', 'Comunidad', 'Andes'],
    participants: 30,
    likes: 70,
    organizers: ['Médicos Solidarios'],
    featured: true
  },
  { 
    id: 10, 
    name: 'Apoyo Escolar para Niños de Ayacucho', 
    date: '20 de Septiembre, 2025', 
    time: '9:00 AM - 1:00 PM',
    description: 'Reforzamiento escolar en matemáticas y comunicación para niños de primaria en Ayacucho. Voluntarios para tutorías personalizadas.',
    location: 'Ayacucho, Ayacucho',
    imageUrl: 'https://images.unsplash.com/photo-1529712490130-9b6d6f2e8f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwc2Nob29sJTIwY2hpbGRyZW58ZW58MHx8fHwxNzAxNTU0ODkwfDA&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Educación', 'Niños', 'Tutoría'],
    participants: 18,
    likes: 35,
    organizers: ['Maestros sin Fronteras'],
    featured: false
  },
  { 
    id: 11, 
    name: 'Caminata Canina Solidaria en Barranco', 
    date: '10 de Octubre, 2025', 
    time: '10:00 AM - 1:00 PM',
    description: 'Paseo con perros rescatados del albergue de Barranco para promover su adopción y recaudar fondos para su cuidado.',
    location: 'Barranco, Lima',
    imageUrl: 'https://images.unsplash.com/photo-1596700864319-f538e1e7e4a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwYW5pbWFsJTIwYWRvcHRpb258ZW58MHx8fHwxNzAxNTU0ODkxfDA&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Animales', 'Adopción', 'Recaudación'],
    participants: 25,
    likes: 60,
    organizers: ['Adopta un Amigo'],
    featured: false
  },
  { 
    id: 12, 
    name: 'Construcción de Biohuertos en Colegios Rurales de Cajamarca', 
    date: '5 de Noviembre, 2025', 
    time: '8:00 AM - 4:00 PM',
    description: 'Creación de biohuertos escolares para fomentar la agricultura sostenible y la educación ambiental en zonas rurales de Cajamarca.',
    location: 'Cajamarca, Cajamarca',
    imageUrl: 'https://images.unsplash.com/photo-1534066597-e85d99723223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwYmlvaHVlcnRvJTIwZXNjb2xhcnxlbnwwfHx8fDE3MDE1NTQ4OTJ8MA&ixlib=rb-4.0.3&q=80&w=1080',
    tags: ['Medio Ambiente', 'Educación', 'Sostenibilidad'],
    participants: 22,
    likes: 48,
    organizers: ['Sembrando Futuro'],
    featured: true
  },
]);

// Filtrar eventos
const filteredEvents = computed(() => {
  let filtered = events.value;
  
  // Aplicar filtros de categoría
  if (!activeFilters.value.includes('Todos')) {
    filtered = filtered.filter(event => 
      event.tags.some(tag => activeFilters.value.includes(tag))
    );
  }
    
  return filtered;
});

// Paginar eventos
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  return filteredEvents.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredEvents.value.length / eventsPerPage);
});

const joinEvent = (eventId) => {
  // Aquí iría la lógica para registrar al usuario premium en el evento.
  alert(`¡Genial! Te has unido al evento ID: ${eventId}. Revisa tu correo para más detalles.`);
};

const scrollToEvents = () => {
  const eventsSection = document.getElementById('events');
  if (eventsSection) {
    eventsSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
.animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
.animate-fade-in-up.delay-200 { animation-delay: 0.2s; }

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}

/* Efecto de recorte de texto para descripciones */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transiciones suaves para hover */
.transition-slow {
  transition: all 0.5s ease;
}

/* Efecto de gradiente animado */
.bg-gradient-animate {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Mejoras de accesibilidad para focus */
button:focus, a:focus {
  outline: 2px solid #d7037b;
  outline-offset: 2px;
}
</style>