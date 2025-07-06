<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans text-gray-900 antialiased">
    <Header />

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-[#d7037b] to-[#9e0154] text-white py-24 sm:py-32 lg:py-40">
      <!-- Background pattern -->
      <div class="absolute inset-0">
        <div class="absolute inset-0 opacity-20" 
             style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Subtitle with typewriter effect -->
        <p class="text-xl sm:text-2xl lg:text-3xl font-light mb-6 overflow-hidden whitespace-nowrap animate-[typewriter_2s_steps(40)_0.5s_1_normal_both]">
          Más que una plataforma, un movimiento.
        </p>
        
        <!-- Main title with animated gradient -->
        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight mb-8">
          <span class="block mb-3">Revolucionando el</span>
          <span class="bg-gradient-to-r from-white to-[#fbcfe8] bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]">
            Trueque en Perú
          </span>
        </h1>
        
        <!-- Description with staggered animation -->
        <div class="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-12 opacity-90 leading-relaxed">
          <p class="inline-block opacity-0 animate-[fade-in-up_0.8s_ease-out_0.25s_forwards]">En KambiaPe, conectamos personas,</p>
          <p class="inline-block opacity-0 animate-[fade-in-up_0.8s_ease-out_0.3s_forwards]">valoramos lo que tienes</p>
          <p class="inline-block opacity-0 animate-[fade-in-up_0.8s_ease-out_0.35s_forwards]">y transformamos necesidades</p>
          <p class="inline-block opacity-0 animate-[fade-in-up_0.8s_ease-out_0.4s_forwards]">en oportunidades.</p>
        </div>
        
        <!-- CTA with 3D hover effect -->
        <div class="[perspective:1000px] animate-[fade-in-up_0.8s_ease-out_0.5s_forwards]">
          <router-link 
            to="/publicar" 
            class="inline-flex items-center justify-center px-12 py-5 border-2 border-white text-xl font-bold rounded-full shadow-2xl text-[#d7037b] bg-white hover:bg-gray-50 transition-all duration-300 [transform-style:preserve-3d] hover:[transform:rotateX(15deg)_translateY(-5px)] group"
          >
            <SparklesIcon class="h-7 w-7 mr-3 animate-[pulse_2s_ease-in-out_infinite]" />
            Publica tu Artículo Ahora
            <span class="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 [transform:translateZ(-10px)]"></span>
          </router-link>
        </div>
      </div>
      
      <!-- Floating decorative element -->
      <div class="absolute bottom-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#fbcfe8] opacity-20 blur-[80px] animate-[float-slow_6s_ease-in-out_infinite]"></div>
    </section>

    <!-- History Section -->
    <section 
      class="py-20 bg-white"
      v-intersect="{
        handler: onHistoryIntersect,
        options: { threshold: 0.1 }
      }"
      :class="{ 'opacity-100 translate-y-0': historyVisible, 'opacity-0 translate-y-10': !historyVisible }"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <p class="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 transition-all duration-1000 delay-150">
          KambiaPe nace de la visión de un grupo de jóvenes peruanos, comprometidos con la innovación social y la economía circular. Buscamos revivir el ancestral arte del trueque, adaptándolo a la era digital para construir una comunidad más unida y consciente.
        </p>
        <div class="inline-block px-6 py-3 bg-gradient-to-r from-[#fdf2f8] to-[#fce7f3] rounded-full shadow-inner mt-8 transition-all duration-1000 delay-300">
          <p class="text-xl sm:text-2xl font-semibold text-[#9e0154]">
            No solo intercambiamos cosas; intercambiamos confianza, historias y oportunidades.
          </p>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-16 sm:py-24 bg-gray-50 border-y border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <!-- Mission Card -->
        <div 
          class="[perspective:1000px] h-full" 
          @mouseenter="flipCard('mission')" 
          @mouseleave="unflipCard('mission')"
        >
          <div 
            class="h-full transition-all duration-500 [transform-style:preserve-3d]"
            :class="{ '[transform:rotateY(180deg)]': missionFlipped }"
          >
            <div class="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 h-full flex flex-col [backface-visibility:hidden]">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-[#fdf2f8] flex items-center justify-center mr-4">
                  <RocketLaunchIcon class="h-8 w-8 text-[#d7037b] animate-[bounce-slow_3s_ease-in-out_infinite]" />
                </div>
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800">Nuestra Misión</h2>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed flex-grow">
                Facilitar el intercambio justo de productos, servicios y conocimientos entre personas, a través de una plataforma digital confiable, segura y fácil de usar.
              </p>
              <div class="mt-6 text-sm text-[#d7037b] font-medium flex items-center">
                <span>Pasa el cursor para más detalles</span>
                <ArrowRightIcon class="h-4 w-4 ml-2" />
              </div>
            </div>
            <div class="bg-gradient-to-br from-[#d7037b] to-[#9e0154] rounded-3xl shadow-2xl p-8 text-white h-full flex flex-col justify-center absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <h3 class="text-2xl font-bold mb-4">Impacto que buscamos</h3>
              <ul class="space-y-3 text-gray-100">
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Generar un ecosistema de economía colaborativa</span>
                </li>
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Promover inclusión económica y desarrollo local</span>
                </li>
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reducir el desperdicio mediante la reutilización</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Vision Card -->
        <div 
          class="[perspective:1000px] h-full" 
          @mouseenter="flipCard('vision')" 
          @mouseleave="unflipCard('vision')"
        >
          <div 
            class="h-full transition-all duration-500 [transform-style:preserve-3d]"
            :class="{ '[transform:rotateY(180deg)]': visionFlipped }"
          >
            <div class="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 h-full flex flex-col [backface-visibility:hidden]">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-[#fdf2f8] flex items-center justify-center mr-4">
                  <EyeIcon class="h-8 w-8 text-[#9e0154] animate-[pulse-slow_3s_ease-in-out_infinite]" />
                </div>
                <h2 class="text-3xl sm:text-4xl font-bold text-gray-800">Nuestra Visión</h2>
              </div>
              <p class="text-lg text-gray-700 leading-relaxed flex-grow">
                Convertirnos en la plataforma líder de intercambio solidario en Perú, impulsando una nueva economía basada en la colaboración y sostenibilidad.
              </p>
              <div class="mt-6 text-sm text-[#9e0154] font-medium flex items-center">
                <span>Pasa el cursor para más detalles</span>
                <ArrowRightIcon class="h-4 w-4 ml-2" />
              </div>
            </div>
            <div class="bg-gradient-to-br from-[#9e0154] to-[#7a0142] rounded-3xl shadow-2xl p-8 text-white h-full flex flex-col justify-center absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <h3 class="text-2xl font-bold mb-4">Metas a 2025</h3>
              <ul class="space-y-3 text-gray-100">
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>+50,000 usuarios activos en la plataforma</span>
                </li>
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Presencia en 15 regiones del Perú</span>
                </li>
                <li class="flex items-start">
                  <CheckCircleIcon class="h-5 w-5 text-white mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reducir +10 toneladas de desperdicio anual</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-16 relative inline-block">
          <span class="relative z-10 flex items-center justify-center">
            <HandRaisedIcon class="h-9 w-9 text-[#d7037b] mr-4" />
            Valores que nos Impulsan
          </span>
          <span class="absolute bottom-[-8px] left-0 right-0 h-1 bg-gradient-to-r from-[#d7037b] to-[#9e0154] rounded-full"></span>
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="(value, index) in values" 
            :key="index" 
            class="group [perspective:1000px]"
            @mouseenter="activateRadial(index)"
          >
            <div class="relative h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)]">
              <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-full flex flex-col items-center transition-all duration-300 group-hover:shadow-2xl">
                <!-- Radial chart -->
                <div class="relative w-40 h-40 mb-6">
                  <svg class="w-full h-full" viewBox="0 0 100 100">
                    <!-- Background -->
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" stroke-width="8" />
                    <!-- Animated segment -->
                    <circle 
                      cx="50" cy="50" r="45" fill="none" 
                      :stroke="value.color" 
                      stroke-width="8" 
                      stroke-linecap="round"
                      stroke-dasharray="283"
                      :stroke-dashoffset="283 - (283 * (activeRadial === index ? 0.9 : 0.7))"
                      transform="rotate(-90 50 50)"
                      class="transition-all duration-700 ease-out"
                    />
                    <!-- Center icon -->
                    <foreignObject x="25" y="25" width="50" height="50">
                      <div class="w-full h-full flex items-center justify-center">
                        <component 
                          :is="value.icon" 
                          class="h-12 w-12 transition-all duration-300" 
                          :class="[value.textColor, activeRadial === index ? 'scale-110' : '']" 
                        />
                      </div>
                    </foreignObject>
                  </svg>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-900 mb-3 transition-all duration-300" :class="activeRadial === index ? 'text-[1.75rem]' : ''">
                  {{ value.title }}
                </h3>
                <p class="text-gray-600 transition-all duration-300" :class="activeRadial === index ? 'text-gray-700 font-medium' : ''">
                  {{ value.description }}
                </p>
                
                <!-- Hover effect -->
                <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#d7037b] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-20 bg-gray-50 border-y border-gray-100">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-16 text-center relative">
          <span class="inline-flex items-center justify-center px-6 py-2 bg-[#fdf2f8] rounded-full">
            <QuestionMarkCircleIcon class="h-8 w-8 text-[#9e0154] mr-3" />
            Por Qué Elegir KambiaPe
          </span>
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Benefits list -->
          <div class="space-y-8">
            <div 
              v-for="(benefit, index) in benefits" 
              :key="index" 
              class="flex items-start bg-white rounded-xl p-6 shadow-lg border-l-4 transition-all duration-300"
              :class="[
                activeBenefit === index ? 'border-[#d7037b] scale-[1.02] shadow-xl' : 'border-transparent',
                benefit.borderColor
              ]"
              @mouseenter="activeBenefit = index"
            >
              <div class="flex-shrink-0 mr-5">
                <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="activeBenefit === index ? 'bg-[#fdf2f8]' : 'bg-gray-100'">
                  <component 
                    :is="benefit.icon" 
                    class="h-6 w-6 transition-colors duration-300" 
                    :class="activeBenefit === index ? 'text-[#d7037b]' : 'text-gray-500'" 
                  />
                </div>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300" :class="activeBenefit === index ? 'text-[#d7037b]' : ''">
                  {{ benefit.title }}
                </h3>
                <p class="text-gray-600">
                  {{ benefit.description }}
                </p>
              </div>
            </div>
          </div>
          
          <!-- Interactive visualization -->
          <div class="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <!-- Animated background -->
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <div class="absolute inset-0 opacity-20" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgxMDIsMTI2LDIzNCwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')"></div>
              
              <!-- Content based on active benefit -->
              <transition 
                enter-active-class="transition-opacity duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-300 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <div :key="activeBenefit" class="text-center px-8">
                  <div class="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full" :class="benefits[activeBenefit].bgColor">
                    <component 
                      :is="benefits[activeBenefit].icon" 
                      class="h-12 w-12 text-white" 
                    />
                  </div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-3">
                    {{ benefits[activeBenefit].visualTitle }}
                  </h3>
                  <p class="text-gray-600 max-w-md mx-auto">
                    {{ benefits[activeBenefit].visualDescription }}
                  </p>
                  <div class="mt-8 flex justify-center space-x-3">
                    <div v-for="i in 5" :key="i" class="w-3 h-3 rounded-full transition-all duration-300" :class="i-1 === activeBenefit ? 'bg-[#d7037b] w-6' : 'bg-gray-300'"></div>
                  </div>
                </div>
              </transition>
            </div>
            
            <!-- Overlay effect -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent flex items-end p-6">
              <p class="text-white text-lg font-bold">
                {{ benefits[activeBenefit].tagline }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          <span class="inline-flex items-center justify-center">
            <UsersIcon class="h-9 w-9 text-[#d7037b] mr-4" />
            Conoce a Nuestro Equipo
          </span>
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
          Un grupo de apasionados por la economía colaborativa y la tecnología, trabajando para que cada intercambio sea una experiencia excepcional.
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="(member, index) in team" 
            :key="index" 
            class="[perspective:1000px]"
            @mousemove="handleTeamHover($event, index)"
            @mouseenter="activeTeamMember = index"
            @mouseleave="activeTeamMember = null"
          >
            <div 
              class="bg-white rounded-xl shadow-lg p-7 border border-gray-100 h-full transition-all duration-300 [transform-style:preserve-3d]"
              :style="activeTeamMember === index ? teamCardTransform[index] : ''"
            >
              <div class="relative mb-6 flex justify-center">
                <!-- Avatar with hover effect -->
                <div class="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border-4 transition-all duration-300"
                  :class="activeTeamMember === index ? 'border-[#d7037b] scale-110' : 'border-[#fce4ec]'">
                  <UserCircleIcon class="h-20 w-20 transition-all duration-300" 
                    :class="activeTeamMember === index ? 'text-gray-500 scale-105' : 'text-gray-400'" />
                </div>
                <!-- Badge -->
                <span class="absolute bottom-0 right-1/2 translate-x-1/2 text-white rounded-full px-3 py-1 text-xs font-bold transform translate-y-1/2 shadow-md transition-all duration-300"
                  :class="[
                    activeTeamMember === index ? 'scale-110' : '',
                    member.badgeColor
                  ]">
                  {{ member.badgeText }}
                </span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 mb-1 transition-colors duration-300"
                :class="activeTeamMember === index ? 'text-[#d7037b]' : ''">
                {{ member.name }}
              </h3>
              
              <p class="text-sm font-medium mb-4 transition-all duration-300"
                :class="activeTeamMember === index ? 'text-[#9e0154] scale-105' : 'text-[#d7037b]'">
                {{ member.role }}
              </p>
              
              <p class="text-gray-600 text-sm leading-relaxed mb-6">
                {{ member.bio }}
              </p>
              
              <div class="flex justify-center space-x-4">
                <a v-for="(social, i) in member.social" :key="i" 
                  :href="social.url" 
                  class="text-gray-400 hover:text-[#d7037b] transition-colors duration-300 transform hover:scale-125"
                  target="_blank" rel="noopener noreferrer">
                  <span class="sr-only">{{ social.name }}</span>
                  <component :is="social.icon" class="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="relative py-24 sm:py-32 bg-gradient-to-r from-[#9e0154] to-[#d7037b] text-white text-center overflow-hidden">
      <!-- Animated particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div v-for="i in 30" :key="i" 
          class="absolute rounded-full bg-white opacity-[0.03]"
          :style="{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }"></div>
      </div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
          <span class="block mb-3">Listo para unirte a la</span>
          <span class="bg-gradient-to-r from-white to-[#fbcfe8] bg-clip-text text-transparent">
            revolución del trueque?
          </span>
        </h2>
        
        <p class="text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-90 leading-relaxed">
          Regístrate ahora y comienza a intercambiar en minutos. Descubre una nueva forma de obtener lo que necesitas.
        </p>
        
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link 
            to="/register" 
            class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-full shadow-xl text-[#d7037b] bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <UserPlusIcon class="h-6 w-6 mr-3" />
            Crear Cuenta Gratis
          </router-link>
          
          <router-link 
            to="/login" 
            class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-full shadow-xl text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <ArrowRightIcon class="h-6 w-6 mr-3" />
            Iniciar Sesión
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Header from './Header.vue';
import { 
  SparklesIcon,
  RocketLaunchIcon,
  EyeIcon,
  HandRaisedIcon,
  UserPlusIcon,
  UserCircleIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
  LightBulbIcon,
  UsersIcon,
  CubeTransparentIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  LinkIcon,
  TwitterIcon,
  LinkedInIcon,
  InstagramIcon
} from '@heroicons/vue/24/outline';

// Animation states
const historyVisible = ref(false);
const missionFlipped = ref(false);
const visionFlipped = ref(false);
const activeRadial = ref(null);
const activeBenefit = ref(0);
const activeTeamMember = ref(null);
const teamCardTransform = reactive([{}, {}, {}, {}]);

// Team data
const team = ref([
  {
    name: 'Marco Torres',
    role: 'Fundador & CEO',
    bio: 'Visionario de la economía circular y estratega digital. Impulsor del trueque moderno.',
    badgeText: 'Líder',
    badgeColor: 'bg-blue-500',
    social: [
      { name: 'Twitter', url: '#', icon: TwitterIcon },
      { name: 'LinkedIn', url: '#', icon: LinkedInIcon }
    ]
  },
  {
    name: 'Ana Sofía Ríos',
    role: 'Jefa de Producto',
    bio: 'Diseñadora de experiencias intuitivas y centradas en el usuario de KambiaPe.',
    badgeText: 'UX/UI',
    badgeColor: 'bg-purple-500',
    social: [
      { name: 'Instagram', url: '#', icon: InstagramIcon },
      { name: 'LinkedIn', url: '#', icon: LinkedInIcon }
    ]
  },
  {
    name: 'Carlos Mendoza',
    role: 'Líder de Tecnología',
    bio: 'Arquitecto de sistemas robustos y escalables para una plataforma fiable.',
    badgeText: 'Dev',
    badgeColor: 'bg-teal-500',
    social: [
      { name: 'GitHub', url: '#', icon: LinkIcon },
      { name: 'Twitter', url: '#', icon: TwitterIcon }
    ]
  },
  {
    name: 'María Quispe',
    role: 'Gerente de Comunidad',
    bio: 'Conecta con nuestros usuarios y fortalece el espíritu de KambiaPe día a día.',
    badgeText: 'Comms',
    badgeColor: 'bg-yellow-500',
    social: [
      { name: 'Instagram', url: '#', icon: InstagramIcon },
      { name: 'Twitter', url: '#', icon: TwitterIcon }
    ]
  }
]);

// Values data
const values = ref([
  {
    title: 'Innovación',
    description: 'Construimos el futuro del trueque con soluciones creativas y adaptables.',
    icon: LightBulbIcon,
    color: '#d7037b',
    textColor: 'text-[#d7037b]'
  },
  {
    title: 'Comunidad',
    description: 'Fomentamos la conexión, confianza y colaboración entre nuestros usuarios.',
    icon: UsersIcon,
    color: '#9e0154',
    textColor: 'text-[#9e0154]'
  },
  {
    title: 'Sostenibilidad',
    description: 'Promovemos un consumo consciente, la reutilización y el respeto por nuestro planeta.',
    icon: CubeTransparentIcon,
    color: '#d7037b',
    textColor: 'text-[#d7037b]'
  }
]);

// Benefits data
const benefits = ref([
  {
    title: 'Simplicidad & Rapidez',
    description: 'Publica en minutos, encuentra lo que necesitas al instante. Un trueque sin complicaciones.',
    icon: CheckCircleIcon,
    borderColor: 'hover:border-green-500',
    bgColor: 'bg-green-500',
    visualTitle: 'Intercambios en 3 pasos',
    visualDescription: 'Publica, encuentra y acuerda. Nuestra plataforma hace el proceso increíblemente simple.',
    tagline: 'La simplicidad es la máxima sofisticación'
  },
  {
    title: 'Confianza & Seguridad',
    description: 'Con herramientas de verificación y una comunidad basada en el respeto mutuo.',
    icon: ShieldCheckIcon,
    borderColor: 'hover:border-blue-500',
    bgColor: 'bg-blue-500',
    visualTitle: 'Perfiles verificados',
    visualDescription: 'Sistema de reputación y verificación para intercambios seguros y confiables.',
    tagline: 'Tu seguridad es nuestra prioridad'
  },
  {
    title: 'Impacto Positivo',
    description: 'Contribuye a una economía más justa, reduce el desperdicio y protege el medio ambiente.',
    icon: HeartIcon,
    borderColor: 'hover:border-pink-500',
    bgColor: 'bg-pink-500',
    visualTitle: 'Trueque sostenible',
    visualDescription: 'Cada intercambio en KambiaPe ayuda a reducir el desperdicio y promover la reutilización.',
    tagline: 'Pequeñas acciones, grandes cambios'
  },
  {
    title: 'Conexión Comunitaria',
    description: 'Únete a una red de vecinos y emprendedores que valoran la colaboración local.',
    icon: ChatBubbleLeftRightIcon,
    borderColor: 'hover:border-purple-500',
    bgColor: 'bg-purple-500',
    visualTitle: 'Comunidad activa',
    visualDescription: 'Conecta con personas cerca de ti que comparten tus intereses y necesidades.',
    tagline: 'Juntos creamos más valor'
  }
]);

// Methods
const onHistoryIntersect = (isIntersecting) => {
  if (isIntersecting) {
    historyVisible.value = true;
  }
};

const flipCard = (card) => {
  if (card === 'mission') missionFlipped.value = true;
  if (card === 'vision') visionFlipped.value = true;
};

const unflipCard = (card) => {
  if (card === 'mission') missionFlipped.value = false;
  if (card === 'vision') visionFlipped.value = false;
};

const activateRadial = (index) => {
  activeRadial.value = index;
};

const handleTeamHover = (e, index) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const angleX = (y - centerY) / 20;
  const angleY = (centerX - x) / 20;
  
  teamCardTransform[index] = {
    transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`
  };
};
</script>

<style>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typewriter {
  from { width: 0 }
  to { width: 100% }
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0) rotate(0deg); }
}

@keyframes float-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
</style>