<template>
  <div class="bg-gray-50 min-h-screen">
    <Header />

    <main class="relative z-10">
      <section class="bg-gradient-to-br from-[#d7037b] to-[#9e0154] text-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
        <div class="absolute inset-0 bg-pattern-light opacity-10"></div> <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Conoce el Corazón de <span class="block mt-2 sm:inline">Kambia<span class="font-bold">Pe</span></span>
          </h1>
          <p class="text-lg sm:text-xl lg:text-2xl opacity-90 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-200">
            Somos la plataforma digital peruana que promueve el trueque como una alternativa **solidaria, sostenible y moderna**.
            Más que intercambiar cosas, ¡intercambiamos confianza, historias y oportunidades!
          </p>
          <router-link to="/publicar" class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-[#d7037b] bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-400">
            <SparklesIcon class="h-5 w-5 mr-2" />
            Empieza a Intercambiar
          </router-link>
        </div>
      </section>

      <section class="py-16 sm:py-20 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="space-y-6">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 flex items-center">
              <RocketLaunchIcon class="h-8 w-8 text-[#d7037b] mr-3" />
              Nuestra Misión
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              Facilitar el **intercambio justo** de productos, servicios y conocimientos a través de una plataforma **confiable, segura y fácil de usar**. Buscamos que las personas satisfagan sus necesidades sin dinero, promoviendo la inclusión económica, la confianza mutua y el desarrollo local sostenible.
            </p>
          </div>
          <div class="space-y-6">
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 flex items-center">
              <EyeIcon class="h-8 w-8 text-[#9e0154] mr-3" />
              Nuestra Visión
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed">
              Ser la **plataforma líder de intercambio solidario en Perú**, impulsando una nueva economía basada en la colaboración, la sostenibilidad y la inclusión. Aspiramos a fortalecer el tejido social, reducir la dependencia del dinero y empoderar a las comunidades.
            </p>
          </div>
        </div>
      </section>

      <section class="py-16 sm:py-20 bg-gray-50 border-t border-b border-gray-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 flex items-center justify-center">
            <HandRaisedIcon class="h-8 w-8 text-[#d7037b] mr-3" />
            Valores que nos Impulsan
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300 border border-gray-200">
              <LightBulbIcon class="h-12 w-12 text-[#d7037b] mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Innovación</h3>
              <p class="text-gray-600">Buscamos constantemente nuevas formas de mejorar la experiencia de intercambio.</p>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300 border border-gray-200">
              <UsersIcon class="h-12 w-12 text-[#9e0154] mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Comunidad</h3>
              <p class="text-gray-600">Fomentamos conexiones genuinas y una red de confianza entre nuestros usuarios.</p>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-all duration-300 border border-gray-200">
              <CubeTransparentIcon class="h-12 w-12 text-[#d7037b] mx-auto mb-4" />
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Sostenibilidad</h3>
              <p class="text-gray-600">Promovemos un consumo consciente y la reducción del impacto ambiental.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 sm:py-20 bg-white">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 text-center flex items-center justify-center">
            <QuestionMarkCircleIcon class="h-8 w-8 text-[#9e0154] mr-3" />
            ¿Por Qué Elegir Kambia<span class="font-extrabold">Pe</span>?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 items-center">
            <div class="space-y-6">
              <div class="flex items-start">
                <CheckCircleIcon class="h-7 w-7 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-1">Fácil y Rápido</h3>
                  <p class="text-gray-600">Publica tus artículos en minutos y empieza a explorar ofertas de inmediato.</p>
                </div>
              </div>
              <div class="flex items-start">
                <ShieldCheckIcon class="h-7 w-7 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-1">Intercambios Seguros</h3>
                  <p class="text-gray-600">Herramientas y guías para asegurar transacciones transparentes y confiables.</p>
                </div>
              </div>
              <div class="flex items-start">
                <HeartIcon class="h-7 w-7 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-1">Impacto Positivo</h3>
                  <p class="text-gray-600">Contribuye a una comunidad sostenible y reduce tu huella ecológica.</p>
                </div>
              </div>
              <div class="flex items-start">
                <ChatBubbleLeftRightIcon class="h-7 w-7 text-green-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-1">Comunidad Activa</h3>
                  <p class="text-gray-600">Conéctate con personas que comparten tus intereses en el intercambio.</p>
                </div>
              </div>
            </div>
            <div class="relative overflow-hidden rounded-xl shadow-xl h-64 md:h-96 bg-gray-200 flex items-center justify-center">
              <img src="https://via.placeholder.com/600x400?text=Intercambios+en+Comunidad" alt="Personas intercambiando productos" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent opacity-50"></div>
              <p class="absolute bottom-4 left-4 text-white text-lg font-semibold">Transformando el valor.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 sm:py-20 bg-gray-50 border-t border-b border-gray-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-800 mb-10 flex items-center justify-center">
            <UsersIcon class="h-8 w-8 text-[#d7037b] mr-3" />
            Conoce a Nuestro Equipo
          </h2>
          <p class="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
            Detrás de KambiaPe hay un grupo de apasionados por la economía colaborativa y la tecnología, trabajando para hacer del intercambio una experiencia excepcional.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300">
              <img src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=Marco" alt="Avatar de Marco" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[#fce4ec] shadow-sm">
              <h3 class="text-xl font-semibold text-gray-800 mb-1">Marco Torres</h3>
              <p class="text-[#d7037b] text-sm font-medium mb-3">Fundador & CEO</p>
              <p class="text-gray-600 text-sm">Visionario de la economía circular y experto en desarrollo de plataformas.</p>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300">
              <img src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=Ana" alt="Avatar de Ana" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[#fce4ec] shadow-sm">
              <h3 class="text-xl font-semibold text-gray-800 mb-1">Ana Sofía Ríos</h3>
              <p class="text-[#d7037b] text-sm font-medium mb-3">Jefa de Producto</p>
              <p class="text-gray-600 text-sm">Apasionada por la UX/UI y el diseño centrado en el usuario.</p>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 border border-gray-200 transform hover:-translate-y-2 transition-transform duration-300">
              <img src="https://api.dicebear.com/8.x/fun-emoji/svg?seed=Carlos" alt="Avatar de Carlos" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[#fce4ec] shadow-sm">
              <h3 class="text-xl font-semibold text-gray-800 mb-1">Carlos Mendoza</h3>
              <p class="text-[#d7037b] text-sm font-medium mb-3">Líder de Tecnología</p>
              <p class="text-gray-600 text-sm">Arquitecto de sistemas robustos y escalables.</p>
            </div>
            </div>
        </div>
      </section>

      <section class="py-16 sm:py-20 bg-gradient-to-r from-[#9e0154] to-[#d7037b] text-white text-center">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Únete a la Revolución del Intercambio
          </h2>
          <p class="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Sé parte de una comunidad que valora la conexión, la sostenibilidad y las infinitas posibilidades que ofrece el intercambio.
          </p>
          <router-link to="/register" class="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-[#d7037b] bg-white hover:bg-gray-100 transition duration-300 transform hover:scale-105">
            <UserPlusIcon class="h-6 w-6 mr-3" />
            Registrarse Gratis
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import Header from './Header.vue'; // Asegúrate de que la ruta sea correcta
import { 
  SparklesIcon, 
  RocketLaunchIcon, 
  EyeIcon, 
  LightBulbIcon, 
  UsersIcon, 
  CubeTransparentIcon, // Importa CubeTransparentIcon
  QuestionMarkCircleIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  HandRaisedIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'; 
</script>

<style scoped>
/* Animaciones para la Hero Section (si necesitas control más allá de Tailwind) */
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

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
.animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
.animate-fade-in-up.delay-400 { animation-delay: 0.4s; }

/* Patrón sutil para el fondo de la hero section */
.bg-pattern-light {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm10 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm10 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm-30 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm-20 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm7 30c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm-20 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm7-30c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zM22 6c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm10 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm10 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm10 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zM12 21c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm30 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm7 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4zm-20 0c0 2.209-1.791 4-4 4s-4-1.791-4-4 1.791-4 4-4 4 1.791 4 4z'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px; /* Tamaño del patrón */
}
</style>