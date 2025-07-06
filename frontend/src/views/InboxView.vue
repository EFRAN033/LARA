<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-sans antialiased text-gray-800">
    <Header />
    
    <main class="py-10 sm:py-14">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div class="mb-8 sm:mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 relative z-10">
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 flex items-center">
              <div class="relative inline-flex mr-4 group animate-fade-in">
                <ChatBubbleLeftRightIcon class="h-10 w-10 text-[#d7037b] drop-shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 ease-out" />
                <span 
                  v-if="totalUnreadMessages > 0" 
                  class="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full animate-bounce-custom z-20"
                >
                  {{ totalUnreadMessages }}
                </span>
              </div>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#d7037b] to-[#ff6699] animate-fade-in-up">
                Tu Centro de Intercambios
              </span>
            </h1>
            <p class="text-lg text-gray-700 mt-2 animate-fade-in-up delay-100">
              Conecta, chatea y realiza intercambios asombrosos
            </p>
          </div>
        </div>
        
        <div class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row h-[75vh] max-h-[850px] animate-slide-in-bottom">
          <div class="w-full lg:w-1/3 border-r border-gray-200 overflow-y-auto custom-scrollbar-unique flex-shrink-0 relative">
            <div class="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between z-10 shadow-sm">
              <h2 class="text-xl font-semibold text-gray-900">Conversaciones</h2>
              <button 
                @click="filter = filter === 'all' ? 'unread' : 'all'"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out shadow-sm',
                  filter === 'unread' 
                    ? 'bg-[#d7037b] text-white hover:bg-[#b30262] transform hover:scale-105 active:scale-95'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:text-gray-800'
                ]"
              >
                {{ filter === 'all' ? 'Ver Solo No Leídos' : 'Ver Todas' }}
              </button>
            </div>
            
            <ul class="divide-y divide-gray-100">
              <li 
                v-for="conversation in filteredConversations" 
                :key="conversation.exchange.id"
                @click="selectConversation(conversation)"
                :class="[
                  'p-4 flex items-center gap-4 cursor-pointer transition-all duration-250 ease-out transform',
                  { 'bg-gray-100/70 shadow-inner scale-[1.01]': selectedConversation && selectedConversation.exchange.id === conversation.exchange.id },
                  { 'bg-gradient-to-r from-[#fdf2f8]/60 to-white border-l-4 border-[#d7037b] animate-pulse-once': conversation.unreadCount > 0 },
                  'hover:bg-gray-50 hover:shadow-sm hover:scale-[1.01]'
                ]"
              >
                <div class="relative flex-shrink-0">
                  <img 
                    :src="conversation.user.avatar" 
                    :alt="conversation.user.name" 
                    class="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-105"
                  >
                  <span 
                    v-if="conversation.unreadCount > 0" 
                    class="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full animate-bounce-custom z-20"
                  >
                    {{ conversation.unreadCount }}
                  </span>
                </div>
                <div class="flex-grow min-w-0">
                  <p class="text-base font-semibold text-gray-900 truncate">{{ conversation.user.name }}</p>
                  <p class="text-sm text-gray-600 truncate mt-0.5">
                    {{ conversation.lastMessage.sender === 'You' ? 'Tú: ' : '' }}{{ conversation.lastMessage.text }}
                  </p>
                </div>
                <div class="flex-shrink-0 text-right">
                  <p class="text-xs text-gray-500 whitespace-nowrap">{{ formatTime(conversation.lastMessage.timestamp) }}</p>
                  <span 
                    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize mt-1 transition-colors duration-200"
                    :class="{
                      'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200': conversation.exchange.status === 'pending',
                      'bg-green-100 text-green-800 ring-1 ring-green-200': conversation.exchange.status === 'accepted',
                      'bg-red-100 text-red-800 ring-1 ring-red-200': conversation.exchange.status === 'rejected',
                      'bg-gray-100 text-gray-800 ring-1 ring-gray-200': conversation.exchange.status === 'completed'
                    }"
                  >
                    {{ conversation.exchange.status === 'pending' ? 'pendiente' : conversation.exchange.status }}
                  </span>
                </div>
              </li>
            </ul>
            <div v-if="filteredConversations.length === 0" class="p-8 text-center text-gray-500 animate-fade-in">
                <ChatBubbleOvalLeftIcon class="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p class="text-lg font-medium">No hay conversaciones {{ filter === 'unread' ? 'no leídas' : 'activas' }} en este momento.</p>
            </div>
          </div>

          <div class="w-full lg:w-2/3 flex flex-col" v-if="selectedConversation">
            <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 shadow-sm z-10 flex-wrap gap-y-2">
              <div class="flex items-center gap-3 animate-fade-in-right">
                <img :src="selectedConversation.user.avatar" :alt="selectedConversation.user.name" class="h-10 w-10 rounded-full object-cover border border-white shadow">
                <div>
                  <h3 class="font-semibold text-lg text-gray-900">{{ selectedConversation.user.name }}</h3>
                  <p class="text-sm text-gray-600 flex items-center gap-2 flex-wrap">
                    <span class="flex items-center gap-1">
                        Ofrece: <span class="font-medium text-gray-800">{{ selectedConversation.exchange.offer }}</span>
                    </span>
                    <ArrowRightIcon class="h-4 w-4 text-gray-400 flex-shrink-0 animate-bounce-horizontal-subtle" />
                    <span class="flex items-center gap-1">
                        Pide: <span class="font-medium text-gray-800">{{ selectedConversation.exchange.request }}</span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="flex gap-2 animate-fade-in-left">
                <button 
                  v-if="selectedConversation.exchange.status === 'pending'"
                  @click="acceptExchange(selectedConversation.exchange.id)"
                  class="p-2 rounded-full text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                  title="Aceptar Intercambio"
                >
                  <CheckIcon class="h-6 w-6" />
                </button>
                <button 
                  v-if="selectedConversation.exchange.status === 'pending'"
                  @click="rejectExchange(selectedConversation.exchange.id)"
                  class="p-2 rounded-full text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                  title="Rechazar Intercambio"
                >
                  <XMarkIcon class="h-6 w-6" />
                </button>
                <button 
                  @click="showDetailsModal = true"
                  class="p-2 rounded-full text-[#d7037b] bg-[#fce5f1] hover:bg-[#fbd1e6] hover:text-[#b30262] transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                  title="Ver Detalles del Intercambio"
                >
                  <EyeIcon class="h-6 w-6" />
                </button>
              </div>
            </div>

            <div class="flex-1 p-6 overflow-y-auto custom-scrollbar-unique space-y-4 bg-gray-100 relative group">
              <div 
                v-for="(message, index) in selectedConversation.messages" 
                :key="message.id"
                :class="[
                  'flex',
                  message.sender === 'You' ? 'justify-end' : 'justify-start'
                ]"
              >
                <div 
                  :class="[
                    'max-w-[75%] px-4 py-2 rounded-xl shadow-sm relative transition-transform duration-300 ease-out animate-fade-in-message',
                    { 'bg-[#d7037b] text-white rounded-br-none': message.sender === 'You' },
                    { 'bg-white text-gray-800 rounded-bl-none border border-gray-200': message.sender !== 'You' },
                    { 'self-start mr-8': message.sender === 'You' }, /* Espacio para avatar falso del otro */
                    { 'self-end ml-8': message.sender !== 'You' } /* Espacio para avatar falso propio */
                  ]"
                  :style="{ animationDelay: `${index * 0.05}s` }"
                >
                  <p class="text-sm leading-relaxed">{{ message.text }}</p>
                  <span 
                    :class="[
                      'absolute text-xs text-gray-400 transition-opacity duration-200',
                      message.sender === 'You' ? 'bottom-1 right-2 text-white/70' : 'bottom-1 left-2 text-gray-500',
                      'opacity-0 group-hover:opacity-100 sm:opacity-100' // Siempre visible en desktop, solo en hover en mobile (no real en CSS)
                    ]"
                    style="font-size: 0.65rem;"
                  >
                    {{ formatTime(message.timestamp) }}
                  </span>
                  <div v-if="message.sender === 'You'" class="message-tail-right"></div>
                  <div v-else class="message-tail-left"></div>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-gray-200 bg-white animate-fade-in-up delay-200">
              <form @submit.prevent="sendMessage" class="flex items-center gap-3">
                <input 
                  type="text" 
                  v-model="newMessageText" 
                  placeholder="Escribe tu mensaje aquí..." 
                  class="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#d7037b] focus:border-transparent transition-all duration-200 shadow-sm"
                >
                <button 
                  type="submit"
                  :disabled="!newMessageText.trim()"
                  :class="[
                    'p-3 rounded-full bg-[#d7037b] text-white transition-all duration-300 transform',
                    !newMessageText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-md hover:shadow-lg hover:rotate-6'
                  ]"
                  title="Enviar mensaje"
                >
                  <PaperAirplaneIcon class="h-6 w-6" />
                </button>
              </form>
            </div>
          </div>
          <div v-else class="w-full lg:w-2/3 flex items-center justify-center p-8 text-center text-gray-500 animate-fade-in">
            <div class="flex flex-col items-center gap-4">
                <ChatBubbleLeftRightIcon class="h-28 w-28 text-gray-200 mx-auto mb-4" />
                <p class="text-2xl font-semibold text-gray-700">¡Bienvenido a tus Intercambios!</p>
                <p class="max-w-md">Selecciona una conversación de la lista de la izquierda para ver los mensajes o comenzar una nueva.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <TransitionRoot as="template" :show="showDetailsModal">
      <Dialog as="div" class="relative z-50" @close="showDetailsModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity backdrop-blur-sm" />
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
              <DialogPanel class="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-gray-100">
                <div class="bg-white px-6 pt-6 pb-5 sm:p-8 sm:pb-6">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#fce5f1] sm:mx-0 sm:h-12 sm:w-12 shadow-inner">
                      <ArrowsRightLeftIcon class="h-7 w-7 text-[#d7037b] animate-spin-slow" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <DialogTitle as="h3" class="text-xl font-bold leading-6 text-gray-900">
                        Detalles del Intercambio
                      </DialogTitle>
                      <div class="mt-5">
                        <div v-if="selectedConversation" class="space-y-6">
                          <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in-up">
                            <img 
                              :src="selectedConversation.user.avatar" 
                              :alt="selectedConversation.user.name" 
                              class="h-16 w-16 rounded-full object-cover border-3 border-white shadow-lg"
                            >
                            <div>
                              <p class="text-lg font-semibold text-gray-900">{{ selectedConversation.user.name }}</p>
                              <p class="text-sm text-gray-600">Miembro desde {{ formatDate(selectedConversation.user.joinDate) }}</p>
                            </div>
                          </div>
                          
                          <div class="bg-blue-50 p-5 rounded-xl border border-blue-100 animate-fade-in-up delay-100">
                            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div class="text-center sm:text-left">
                                <p class="text-sm font-medium text-blue-700">Ofrece</p>
                                <p class="text-xl font-bold text-gray-900 mt-1">{{ selectedConversation.exchange.offer }}</p>
                              </div>
                              <ArrowRightIcon class="h-9 w-9 text-blue-400 flex-shrink-0 animate-bounce-horizontal" />
                              <div class="text-center sm:text-left">
                                <p class="text-sm font-medium text-blue-700">Solicita</p>
                                <p class="text-xl font-bold text-gray-900 mt-1">{{ selectedConversation.exchange.request }}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div class="animate-fade-in-up delay-200">
                            <h4 class="text-base font-semibold text-gray-900 mb-2">Mensaje original de la propuesta:</h4>
                            <p class="text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">{{ selectedConversation.exchange.message }}</p>
                          </div>
                          
                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up delay-300">
                              <div class="flex items-center gap-2">
                                <span class="text-sm font-medium text-gray-900">Estado:</span>
                                <span 
                                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize"
                                  :class="{
                                    'bg-yellow-100 text-yellow-800 ring-1 ring-yellow-200': selectedConversation.exchange.status === 'pending',
                                    'bg-green-100 text-green-800 ring-1 ring-green-200': selectedConversation.exchange.status === 'accepted',
                                    'bg-red-100 text-red-800 ring-1 ring-red-200': selectedConversation.exchange.status === 'rejected',
                                    'bg-gray-100 text-gray-800 ring-1 ring-gray-200': selectedConversation.exchange.status === 'completed'
                                  }"
                                >
                                  {{ selectedConversation.exchange.status === 'pending' ? 'pendiente' : selectedConversation.exchange.status }}
                                </span>
                              </div>
                              <div class="flex items-center gap-2">
                                <span class="text-sm font-medium text-gray-900">Fecha de la Propuesta:</span>
                                <span class="text-sm text-gray-600">{{ formatDate(selectedConversation.exchange.date) }}</span>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 gap-3 border-t border-gray-100">
                  <button
                    v-if="selectedConversation?.exchange.status === 'pending'"
                    type="button"
                    class="inline-flex w-full justify-center rounded-xl border border-transparent bg-green-600 px-5 py-2.5 text-base font-medium text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
                    @click="acceptExchange(selectedConversation.exchange.id)"
                  >
                    Aceptar Intercambio
                  </button>
                  <button
                    v-if="selectedConversation?.exchange.status === 'pending'"
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
                    @click="rejectExchange(selectedConversation.exchange.id)"
                  >
                    Rechazar Intercambio
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
                    @click="showDetailsModal = false"
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
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import Header from './Header.vue' // Asegúrate de que tu Header.vue esté en el mismo directorio.
import { 
  ChatBubbleLeftRightIcon, // Icono principal para el buzón de chat
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  PaperAirplaneIcon, // Icono para enviar mensaje
  ChatBubbleOvalLeftIcon // Icono para el estado vacío
} from '@heroicons/vue/24/outline'
import { 
  Dialog, 
  DialogPanel, 
  DialogTitle, 
  TransitionChild, 
  TransitionRoot 
} from '@headlessui/vue'

// Estado del modal de detalles
const showDetailsModal = ref(false)

// Estado del filtro de conversaciones (all o unread)
const filter = ref('all')

// Conversación activa seleccionada
const selectedConversation = ref(null)

// Texto del nuevo mensaje
const newMessageText = ref('')

// Datos de ejemplo simulando conversaciones de intercambios
const conversations = ref([
  {
    exchange: {
      id: 1,
      offer: 'Libros de cocina (5)',
      request: 'Ropa para niños',
      details: 'Libros en buen estado por ropa tallas 6-8',
      message: 'Hola, tengo varios libros de cocina que ya no uso y me gustaría cambiarlos por ropa para mi hijo de 7 años. ¿Te interesa mi propuesta? Podemos coordinar la entrega en un punto intermedio si estás de acuerdo.',
      date: '2025-07-04T14:30:00', // Fecha de la propuesta original
      status: 'pending',
    },
    user: {
      name: 'María Gómez',
      avatar: 'https://i.pravatar.cc/150?img=31',
      joinDate: '2023-05-15'
    },
    messages: [
      { id: 1, text: 'Hola, me interesa tu propuesta de los libros de cocina. ¿Podrías enviarme fotos?', sender: 'Other', timestamp: '2025-07-04T14:35:00' },
      { id: 2, text: 'Claro, te las envío. ¿Qué tipo de ropa para niños buscas específicamente? Tengo de varias tallas.', sender: 'You', timestamp: '2025-07-04T14:38:00' },
      { id: 3, text: 'Principalmente camisetas y pantalones talla 6-8. ¿Están los libros en buen estado?', sender: 'Other', timestamp: '2025-07-04T14:45:00' },
      { id: 4, text: 'Sí, están en muy buen estado. Te adjunto algunas fotos de la ropa que tengo. Dime si te sirve.', sender: 'You', timestamp: '2025-07-04T14:48:00' },
    ],
    unreadCount: 1 // Mensajes no leídos en esta conversación
  },
  {
    exchange: {
      id: 2,
      offer: 'Servicio de plomería',
      request: 'Clases de inglés',
      details: '2 horas de servicio por 1 hora de clase',
      message: 'Soy plomero profesional con experiencia de 10 años. Ofrezco mis servicios a cambio de clases de inglés para mejorar mi fluidez. Estoy disponible los fines de semana.',
      date: '2025-07-03T09:15:00',
      status: 'accepted',
    },
    user: {
      name: 'Carlos Mendoza',
      avatar: 'https://i.pravatar.cc/150?img=45',
      joinDate: '2023-02-20'
    },
    messages: [
      { id: 1, text: '¡Excelente! He aceptado tu propuesta. ¿Cuándo podemos coordinar la primera clase?', sender: 'You', timestamp: '2025-07-03T09:20:00' },
      { id: 2, text: 'Genial. Podría ser este sábado por la mañana, ¿te viene bien?', sender: 'Other', timestamp: '2025-07-03T09:25:00' },
    ],
    unreadCount: 0
  },
  {
    exchange: {
      id: 3,
      offer: 'Plantas ornamentales',
      request: 'Utensilios de cocina',
      details: '3 plantas por juego de ollas',
      message: 'Tengo plantas de interior muy bonitas que ya no tengo espacio para cuidar. Busco utensilios de cocina básicos en buen estado, como un juego de ollas o sartenes.',
      date: '2025-07-02T16:45:00',
      status: 'pending',
    },
    user: {
      name: 'Ana Torres',
      avatar: 'https://i.pravatar.cc/150?img=28',
      joinDate: '2023-07-10'
    },
    messages: [
      { id: 1, text: 'Hola Ana, me interesan tus plantas. ¿Qué tipo de utensilios de cocina necesitas?', sender: 'You', timestamp: '2025-07-02T16:50:00' },
      { id: 2, text: 'Busco un juego básico de ollas y sartenes, no importa que sean usados, siempre que estén en buen estado. ¿Podrías enviarme fotos de tus plantas?', sender: 'Other', timestamp: '2025-07-02T17:00:00' },
      { id: 3, text: 'Claro, te las envío en un momento. Tengo varias opciones.', sender: 'You', timestamp: '2025-07-02T17:05:00' },
      { id: 4, text: 'Ok, espero las fotos. Gracias!', sender: 'Other', timestamp: '2025-07-02T17:08:00' },
    ],
    unreadCount: 0
  },
  {
    exchange: {
      id: 4,
      offer: 'Bicicleta usada',
      request: 'Laptop funcional',
      details: 'Bicicleta mountain bike por laptop básica',
      message: 'Tengo una bicicleta de montaña en buen estado que ya no uso. Necesito una laptop básica para que mi hija pueda hacer sus tareas escolares y conectarse a clases online.',
      date: '2025-07-01T11:20:00',
      status: 'rejected',
    },
    user: {
      name: 'Luis Ramírez',
      avatar: 'https://i.pravatar.cc/150?img=50',
      joinDate: '2023-01-05'
    },
    messages: [
      { id: 1, text: 'Hola Luis, tu propuesta de la bicicleta me interesa. ¿Qué modelo y año es la bici?', sender: 'You', timestamp: '2025-07-01T11:25:00' },
      { id: 2, text: 'Es una Mountain Bike, modelo X, año 2021. Está en muy buen estado.', sender: 'Other', timestamp: '2025-07-01T11:30:00' },
      { id: 3, text: 'Lo siento, he encontrado otra oferta que se ajusta mejor. He rechazado el intercambio. ¡Gracias de todos modos!', sender: 'You', timestamp: '2025-07-01T12:00:00' },
    ],
    unreadCount: 0
  },
  {
    exchange: {
      id: 5,
      offer: 'Clases de yoga',
      request: 'Servicio de jardinería',
      details: '4 clases por poda de jardín',
      message: 'Soy instructora de yoga certificada y ofrezco clases personalizadas (en línea o presenciales) a cambio de ayuda con la poda y el mantenimiento de mi jardín pequeño. ¡Hagamos un intercambio beneficioso!',
      date: '2025-06-30T13:10:00',
      status: 'completed',
    },
    user: {
      name: 'Sofía Castro',
      avatar: 'https://i.pravatar.cc/150?img=60',
      joinDate: '2023-03-22'
    },
    messages: [
      { id: 1, text: 'Hola Sofía, tu propuesta me parece ideal. ¿Tienes disponibilidad los jueves por la tarde para las clases?', sender: 'You', timestamp: '2025-06-30T13:15:00' },
      { id: 2, text: 'Sí, los jueves por la tarde me viene genial. Podemos empezar la próxima semana.', sender: 'Other', timestamp: '2025-06-30T13:20:00' },
      { id: 3, text: 'Perfecto, hemos completado el intercambio satisfactoriamente.', sender: 'You', timestamp: '2025-07-07T10:00:00' },
    ],
    unreadCount: 0
  },
  {
    exchange: {
      id: 6,
      offer: 'Mueble para TV',
      request: 'Microondas',
      details: 'Mueble de madera por microondas funcional',
      message: 'Tengo un mueble para TV de madera sólida en excelentes condiciones que ya no necesito por redecoración. Busco un microondas funcional y en buen estado.',
      date: '2025-06-28T17:30:00',
      status: 'pending',
    },
    user: {
      name: 'Jorge Paredes',
      avatar: 'https://i.pravatar.cc/150?img=33',
      joinDate: '2023-06-18'
    },
    messages: [
      { id: 1, text: 'Me interesa tu mueble, Jorge. ¿Puedes enviarme las medidas y algunas fotos detalladas?', sender: 'You', timestamp: '2025-06-28T17:35:00' },
      { id: 2, text: 'Claro, te las mando ahora. Es un mueble robusto, ideal para una sala grande.', sender: 'Other', timestamp: '2025-06-28T17:40:00' },
    ],
    unreadCount: 0
  },
  {
    exchange: {
      id: 9, // Nueva conversación con mensaje no leído
      offer: 'Cochecito de bebé',
      request: 'Silla de coche para bebé',
      details: 'Cochecito en buen estado por silla de coche para recién nacido',
      message: 'Mi bebé ya no usa el cochecito. Busco una silla de coche segura para mi segundo bebé que viene en camino.',
      date: '2025-06-19T10:45:00',
      status: 'pending',
    },
    user: {
      name: 'Elena Díaz',
      avatar: 'https://i.pravatar.cc/150?img=25',
      joinDate: '2024-03-01'
    },
    messages: [
      { id: 1, text: 'Hola Elena, me interesa el cochecito. ¿De qué marca es y qué edad tiene?', sender: 'You', timestamp: '2025-06-19T10:50:00' },
      { id: 2, text: 'Es marca ABC, tiene 1 año y medio de uso. Está en muy buen estado, lo he cuidado mucho. ¿Tienes una silla de coche que cumpla con los estándares de seguridad?', sender: 'Other', timestamp: '2025-06-19T10:55:00' },
      { id: 3, text: 'Sí, la silla es casi nueva y cumple con la norma i-Size. Te envío las especificaciones y fotos.', sender: 'You', timestamp: '2025-07-05T21:00:00' },
      { id: 4, text: '¡Excelente! La silla se ve muy bien. Me interesa mucho el intercambio. ¿Cuándo podríamos vernos para el intercambio?', sender: 'Other', timestamp: '2025-07-05T21:10:00' }, // Este será el mensaje no leído
    ],
    unreadCount: 1 // Este es el mensaje no leído
  }
])

// Computed properties
const filteredConversations = computed(() => {
  let filtered = conversations.value
  
  // Aplicar filtro
  if (filter.value === 'unread') {
    filtered = filtered.filter(conv => conv.unreadCount > 0)
  }
  
  // Ordenar por fecha del último mensaje (más recientes primero)
  filtered.sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp))
  
  return filtered
})

const totalUnreadMessages = computed(() => {
  return conversations.value.reduce((sum, conv) => sum + conv.unreadCount, 0)
})

// Métodos
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const date = new Date(dateString);
  // Ajustar a la zona horaria de Sunampe, Ica, Perú (GMT-5)
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60 - 5); 
  return date.toLocaleDateString('es-ES', options)
}

const formatTime = (isoString) => {
  const date = new Date(isoString);
  // Ajustar a la zona horaria de Sunampe, Ica, Perú (GMT-5)
  date.setHours(date.getHours() + date.getTimezoneOffset() / 60 - 5); 
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const selectConversation = (conversation) => {
  selectedConversation.value = conversation
  // Marcar mensajes como leídos al seleccionar la conversación
  if (selectedConversation.value) {
    selectedConversation.value.unreadCount = 0
  }
  // Scroll al final del chat
  nextTick(() => {
    const chatContainer = document.querySelector('.flex-1.p-6.overflow-y-auto');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });
}

const sendMessage = () => {
  if (newMessageText.value.trim() && selectedConversation.value) {
    const newMessage = {
      id: selectedConversation.value.messages.length + 1,
      text: newMessageText.value.trim(),
      sender: 'You', // Asumimos que somos el emisor
      timestamp: new Date().toISOString()
    }
    selectedConversation.value.messages.push(newMessage)
    selectedConversation.value.lastMessage = newMessage; // Actualizar el último mensaje para el orden

    // Opcional: simular respuesta del otro usuario después de un tiempo
    setTimeout(() => {
        if (selectedConversation.value && selectedConversation.value.exchange.id) { // Asegura que aún estamos en una conversación
            const replyMessage = {
                id: selectedConversation.value.messages.length + 1,
                text: "¡Gracias por tu mensaje! Lo reviso y te confirmo.",
                sender: "Other",
                timestamp: new Date(new Date().getTime() + 10000).toISOString() // 10 segundos después
            };
            selectedConversation.value.messages.push(replyMessage);
            selectedConversation.value.unreadCount++; // Marcar como no leído para el otro usuario
            selectedConversation.value.lastMessage = replyMessage; // Actualizar el último mensaje
            nextTick(() => {
                const chatContainer = document.querySelector('.flex-1.p-6.overflow-y-auto');
                if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            });
        }
    }, 2000); // Simula una respuesta después de 2 segundos

    newMessageText.value = '' // Limpiar el input
    // Scroll al final del chat
    nextTick(() => {
      const chatContainer = document.querySelector('.flex-1.p-6.overflow-y-auto');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    });
  }
}

const acceptExchange = (exchangeId) => {
  const conversation = conversations.value.find(conv => conv.exchange.id === exchangeId)
  if (conversation) {
    conversation.exchange.status = 'accepted'
    conversation.messages.push({
      id: conversation.messages.length + 1,
      text: '¡Has aceptado este intercambio! Ahora pueden coordinar los detalles finales.',
      sender: 'System', // Mensaje del sistema
      timestamp: new Date().toISOString()
    })
    conversation.lastMessage = conversation.messages[conversation.messages.length -1];
  }
  showDetailsModal.value = false // Cerrar modal si se abrió desde allí
}

const rejectExchange = (exchangeId) => {
  const conversation = conversations.value.find(conv => conv.exchange.id === exchangeId)
  if (conversation) {
    conversation.exchange.status = 'rejected'
    conversation.messages.push({
      id: conversation.messages.length + 1,
      text: 'Has rechazado este intercambio. La conversación se ha cerrado.',
      sender: 'System', // Mensaje del sistema
      timestamp: new Date().toISOString()
    })
    conversation.lastMessage = conversation.messages[conversation.messages.length -1];
  }
  showDetailsModal.value = false // Cerrar modal si se abrió desde allí
}

// Inicializar `lastMessage` para cada conversación al cargar
conversations.value.forEach(conv => {
  conv.lastMessage = conv.messages[conv.messages.length - 1];
});
</script>

<style>
/* Estilos Globales y Animaciones Únicas */

/* Fondo degradado sutil en el body */
body {
  margin: 0;
}

/* Animaciones personalizadas con Keyframes */
@keyframes bounce-custom {
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(-5px);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

@keyframes pulse-small-custom {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-right {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-left {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in-message {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slide-in-bottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-horizontal-subtle {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(2px); /* Un rebote muy suave */
  }
}

@keyframes pulse-once {
  0% { background-color: #fdf2f8; border-color: #d7037b; }
  50% { background-color: #fbd1e6; border-color: #b30262; }
  100% { background-color: #fdf2f8; border-color: #d7037b; }
}


/* Aplicación de animaciones */
.animate-bounce-custom {
  animation: bounce-custom 0.8s infinite;
}

.animate-pulse-small {
  animation: pulse-small-custom 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}

.animate-fade-in-right {
  animation: fade-in-right 0.6s ease-out forwards;
}

.animate-fade-in-left {
  animation: fade-in-left 0.6s ease-out forwards;
}

.animate-fade-in-message {
  animation: fade-in-message 0.3s ease-out forwards;
  opacity: 0; /* Asegura que no se muestre hasta que la animación comience */
}

.animate-slide-in-bottom {
  animation: slide-in-bottom 0.7s ease-out forwards;
}

.animate-bounce-horizontal-subtle {
  animation: bounce-horizontal-subtle 1.5s ease-in-out infinite;
}

.animate-pulse-once {
  animation: pulse-once 1.2s ease-in-out forwards;
}

/* Scrollbar Único */
.custom-scrollbar-unique::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar-unique::-webkit-scrollbar-track {
  background: rgba(220, 220, 220, 0.3); /* Transparencia para integrarse con el fondo */
  border-radius: 10px;
}

.custom-scrollbar-unique::-webkit-scrollbar-thumb {
  background: rgba(215, 3, 123, 0.5); /* Color principal con transparencia */
  border-radius: 10px;
  border: 1px solid rgba(215, 3, 123, 0.3); /* Borde sutil */
}

.custom-scrollbar-unique::-webkit-scrollbar-thumb:hover {
  background: rgba(215, 3, 123, 0.7); /* Más opaco al pasar el ratón */
}

/* Flechas de las burbujas de chat */
.message-tail-right, .message-tail-left {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.message-tail-right {
  border-width: 0 0 10px 10px;
  border-color: transparent transparent transparent #d7037b;
  right: -9px; /* Ajusta para que la punta toque la burbuja */
  bottom: 0;
}

.message-tail-left {
  border-width: 0 10px 10px 0;
  border-color: transparent white transparent transparent;
  left: -9px; /* Ajusta para que la punta toque la burbuja */
  bottom: 0;
}
</style>