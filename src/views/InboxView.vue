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
        
        <div 
          v-if="loading" 
          class="flex justify-center items-center h-[75vh] max-h-[850px] bg-white rounded-3xl shadow-2xl border border-gray-100"
        >
          <svg class="animate-spin h-10 w-10 text-[#d7037b]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="ml-3 text-lg text-[#d7037b]">Cargando tus conversaciones...</p>
        </div>

        <div v-else class="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row h-[75vh] max-h-[850px] animate-slide-in-bottom">
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
            
            <ul class="divide-y divide-gray-100" v-if="filteredConversations.length > 0">
              <li 
                v-for="conversation in filteredConversations" 
                :key="conversation.exchange.id"
                @click="selectConversation(conversation)"
                :class="[
                  'p-4 flex items-center gap-4 cursor-pointer transition-all duration-250 ease-out transform',
                  { 'bg-gray-100/70 shadow-inner scale-[1.01]': selectedConversation && selectedConversation.exchange.id === conversation.exchange.id },
                  { 'bg-gradient-to-r from-[#fdf2f8]/60 to-white border-l-4 border-[#d7037b] animate-pulse-once': conversation.unread_count > 0 },
                  'hover:bg-gray-50 hover:shadow-sm hover:scale-[1.01]'
                ]"
              >
                <div class="relative flex-shrink-0">
                  <img 
                    :src="conversation.user.avatar" 
                    :alt="conversation.user.full_name" 
                    class="h-12 w-12 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-200 group-hover:scale-105"
                  >
                  <span 
                    v-if="conversation.unread_count > 0" 
                    class="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white bg-red-500 rounded-full animate-bounce-custom z-20"
                  >
                    {{ conversation.unread_count }}
                  </span>
                </div>
                <div class="flex-grow min-w-0">
                  <p class="text-base font-semibold text-gray-900 truncate">{{ conversation.user.full_name }}</p>
                  <p class="text-sm text-gray-600 truncate mt-0.5">
                    {{ conversation.last_message.sender_id === userStore.user.id ? 'Tú: ' : '' }}{{ conversation.last_message.text }}
                  </p>
                </div>
                <div class="flex-shrink-0 text-right">
                  <p class="text-xs text-gray-500 whitespace-nowrap">{{ formatTime(conversation.last_message.timestamp) }}</p>
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
            <div v-else class="p-8 text-center text-gray-500 animate-fade-in">
                <ChatBubbleOvalLeftIcon class="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p class="text-lg font-medium">No hay conversaciones {{ filter === 'unread' ? 'no leídas' : 'activas' }} en este momento.</p>
            </div>
          </div>

          <div class="w-full lg:w-2/3 flex flex-col" v-if="selectedConversation">
            <div class="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 shadow-sm z-10 flex-wrap gap-y-2">
              <div class="flex items-center gap-3 animate-fade-in-right">
                <img :src="selectedConversation.user.avatar" :alt="selectedConversation.user.full_name" class="h-10 w-10 rounded-full object-cover border border-white shadow">
                <div>
                  <h3 class="font-semibold text-lg text-gray-900">{{ selectedConversation.user.full_name }}</h3>
                  <p class="text-sm text-gray-600 flex items-center gap-2 flex-wrap">
                    <span class="flex items-center gap-1">
                        Ofrece: <span class="font-medium text-gray-800">{{ selectedConversation.exchange.offer.title }}</span>
                    </span>
                    <ArrowRightIcon class="h-4 w-4 text-gray-400 flex-shrink-0 animate-bounce-horizontal-subtle" />
                    <span class="flex items-center gap-1">
                        Pide: <span class="font-medium text-gray-800">{{ selectedConversation.exchange.request.title }}</span>
                    </span>
                  </p>
                </div>
              </div>
              <div class="flex gap-2 animate-fade-in-left">
                <button 
                  v-if="selectedConversation.exchange.status === 'pending' && selectedConversation.exchange.request.user_id === userStore.user.id"
                  @click="updateProposalStatus('accepted')"
                  class="p-2 rounded-full text-green-600 bg-green-50 hover:bg-green-100 hover:text-green-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
                  title="Aceptar Intercambio"
                >
                  <CheckIcon class="h-6 w-6" />
                </button>
                <button 
                  v-if="selectedConversation.exchange.status === 'pending' && selectedConversation.exchange.request.user_id === userStore.user.id"
                  @click="updateProposalStatus('rejected')"
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

            <div class="flex-1 p-6 overflow-y-auto custom-scrollbar-unique space-y-4 bg-gray-100 relative group" ref="messagesContainer">
              <div 
                v-for="(message, index) in selectedConversation.messages" 
                :key="message.id"
                :class="[
                  'flex',
                  message.sender_id === userStore.user.id ? 'justify-end' : 'justify-start'
                ]"
              >
                <div 
                  :class="[
                    'max-w-[75%] px-4 py-2 rounded-xl shadow-sm relative transition-transform duration-300 ease-out animate-fade-in-message',
                    { 'bg-[#d7037b] text-white rounded-br-none': message.sender_id === userStore.user.id },
                    { 'bg-white text-gray-800 rounded-bl-none border border-gray-200': message.sender_id !== userStore.user.id },
                  ]"
                  :style="{ animationDelay: `${index * 0.05}s` }"
                >
                  <p class="text-sm leading-relaxed">{{ message.text }}</p>
                  <span 
                    :class="[
                      'absolute text-xs text-gray-400 transition-opacity duration-200',
                      message.sender_id === userStore.user.id ? 'bottom-1 right-2 text-white/70' : 'bottom-1 left-2 text-gray-500',
                      'opacity-0 group-hover:opacity-100 sm:opacity-100' 
                    ]"
                    style="font-size: 0.65rem;"
                  >
                    {{ formatTime(message.timestamp) }}
                    <span v-if="message.sender_id === userStore.user.id" class="ml-1">
                      <CheckCircleIcon v-if="message.is_read" class="h-3 w-3 inline-block text-white" />
                      <ClockIcon v-else class="h-3 w-3 inline-block text-pink-200" />
                    </span>
                  </span>
                  <div v-if="message.sender_id === userStore.user.id" class="message-tail-right"></div>
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
                  :disabled="sendingMessage || !isChatActive"
                >
                <button 
                  type="submit"
                  :disabled="!newMessageText.trim() || sendingMessage || !isChatActive"
                  :class="[
                    'p-3 rounded-full bg-[#d7037b] text-white transition-all duration-300 transform',
                    (!newMessageText.trim() || sendingMessage || !isChatActive) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-md hover:shadow-lg hover:rotate-6'
                  ]"
                  title="Enviar mensaje"
                >
                  <PaperAirplaneIcon v-if="!sendingMessage" class="h-6 w-6" />
                  <svg v-else class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </form>
              <p v-if="!isChatActive" class="text-sm text-red-500 mt-2 text-center">No puedes enviar mensajes a propuestas que no estén pendientes.</p>
            </div>
          </div>
          <div v-else class="w-full lg:w-2/3 flex items-center justify-center p-8 text-center text-gray-500 animate-fade-in">
            <div class="flex flex-col items-center gap-4">
                <ChatBubbleLeftRightIcon class="h-28 w-28 text-gray-200 mx-auto mb-4" />
                <p class="text-2xl font-semibold text-gray-700">¡Bienvenido a tus Intercambios!</p>
                <p class="max-w-md">Selecciona una conversación de la lista de la izquierda para ver los mensajes o comienza una nueva al enviar una propuesta.</p>
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
                              :alt="selectedConversation.user.full_name" 
                              class="h-16 w-16 rounded-full object-cover border-3 border-white shadow-lg"
                            >
                            <div>
                              <p class="text-lg font-semibold text-gray-900">{{ selectedConversation.user.full_name }}</p>
                              <p class="text-sm text-gray-600">Miembro desde {{ formatDate(selectedConversation.user.join_date) }}</p>
                            </div>
                          </div>
                          
                          <div class="bg-blue-50 p-5 rounded-xl border border-blue-100 animate-fade-in-up delay-100">
                            <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div class="text-center sm:text-left">
                                <p class="text-sm font-medium text-blue-700">Ofrece</p>
                                <p class="text-xl font-bold text-gray-900 mt-1">{{ selectedConversation.exchange.offer.title }}</p>
                              </div>
                              <ArrowRightIcon class="h-9 w-9 text-blue-400 flex-shrink-0 animate-bounce-horizontal" />
                              <div class="text-center sm:text-left">
                                <p class="text-sm font-medium text-blue-700">Solicita</p>
                                <p class="text-xl font-bold text-gray-900 mt-1">{{ selectedConversation.exchange.request.title }}</p>
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
                                <span class="text-sm text-gray-600">{{ formatDate(selectedConversation.exchange.created_at) }}</span>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse sm:px-8 gap-3 border-t border-gray-100">
                  <button
                    v-if="selectedConversation?.exchange.status === 'pending' && selectedConversation.exchange.request.user_id === userStore.user.id"
                    type="button"
                    class="inline-flex w-full justify-center rounded-xl border border-transparent bg-green-600 px-5 py-2.5 text-base font-medium text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto sm:text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
                    @click="updateProposalStatus('accepted')"
                  >
                    Aceptar Intercambio
                  </button>
                  <button
                    v-if="selectedConversation?.exchange.status === 'pending' && selectedConversation.exchange.request.user_id === userStore.user.id"
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#d7037b] focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
                    @click="updateProposalStatus('rejected')"
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
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from 'vue' // Añadido onMounted y watch
import { useUserStore } from '@/stores/user'; // Asegúrate de que esta ruta sea correcta
import axios from '@/axios'; // Asegúrate de que esta ruta sea correcta
import Header from './Header.vue' 
import Footer from './Footer.vue'; 
import { 
  ChatBubbleLeftRightIcon, 
  ArrowRightIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  PaperAirplaneIcon, 
  ChatBubbleOvalLeftIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon, // Añadido para el estado de leído
  ClockIcon // Añadido para el estado de no leído (enviado por mí)
} from '@heroicons/vue/24/outline'
import { 
  Dialog, 
  DialogPanel, 
  DialogTitle, 
  TransitionChild, 
  TransitionRoot 
} from '@headlessui/vue'

const userStore = useUserStore(); // Instanciar el userStore

// Estado del modal de detalles
const showDetailsModal = ref(false)

// Estado del filtro de conversaciones (all o unread)
const filter = ref('all')

// Conversación activa seleccionada
const selectedConversation = ref(null)

// Texto del nuevo mensaje
const newMessageText = ref('')

// Estado de carga de conversaciones
const loading = ref(true); // Nuevo estado de carga

// Estado de envío de mensaje
const sendingMessage = ref(false); // Nuevo estado para evitar envíos duplicados

// Ref para el contenedor de mensajes para el scroll automático
const messagesContainer = ref(null);

// Datos de ejemplo simulando conversaciones de intercambios
// Ahora se inicializa vacío, los datos vendrán del backend.
const conversations = ref([])

// Computed properties
const filteredConversations = computed(() => {
  let filtered = conversations.value
  
  // Aplicar filtro
  if (filter.value === 'unread') {
    filtered = filtered.filter(conv => conv.unread_count > 0)
  }
  
  // Ordenar por fecha del último mensaje (más recientes primero)
  filtered.sort((a, b) => {
    // Asegurarse de que `last_message` existe
    const dateA = a.last_message ? new Date(a.last_message.timestamp) : new Date(a.exchange.created_at);
    const dateB = b.last_message ? new Date(b.last_message.timestamp) : new Date(b.exchange.created_at);
    return dateB - dateA;
  });
  
  return filtered
})

const totalUnreadMessages = computed(() => {
  return conversations.value.reduce((sum, conv) => sum + conv.unread_count, 0)
})

// Computed para verificar si el chat está activo (solo si la propuesta está pendiente)
const isChatActive = computed(() => {
  return selectedConversation.value && selectedConversation.value.exchange.status === 'pending';
});

// Métodos
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options)
}

const formatTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const fetchConversations = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/proposals/me');
    // Adaptar la respuesta del backend a la estructura del frontend si es necesario
    // La respuesta del backend ya debería venir con la estructura adecuada de ConversationResponse
    conversations.value = response.data;
    console.log("Conversaciones cargadas:", conversations.value);

    // Si había una conversación seleccionada, intentar re-seleccionarla para mantener el chat abierto
    if (selectedConversation.value) {
      const reselected = conversations.value.find(conv => conv.exchange.id === selectedConversation.value.exchange.id);
      if (reselected) {
        selectConversation(reselected); // Llama a selectConversation para marcar como leídos también
      } else {
        selectedConversation.value = null; // La conversación ya no existe
      }
    }

  } catch (error) {
    console.error("Error al cargar conversaciones:", error);
    // TODO: Mostrar un mensaje de error al usuario
  } finally {
    loading.value = false;
  }
};

const selectConversation = async (conversation) => {
  selectedConversation.value = conversation;
  
  // Marcar los mensajes no leídos como leídos para el usuario actual
  const unreadMessageIds = conversation.messages
    .filter(msg => msg.sender_id !== userStore.user.id && !msg.is_read)
    .map(msg => msg.id);

  if (unreadMessageIds.length > 0) {
    try {
      await axios.patch('/messages/read_status', {
        message_ids: unreadMessageIds,
        is_read: true
      });
      // Actualizar el estado en el frontend sin recargar todo
      conversation.messages.forEach(msg => {
        if (unreadMessageIds.includes(msg.id)) {
          msg.is_read = true;
        }
      });
      conversation.unread_count = 0; // Resetear el contador de no leídos para esta conversación
    } catch (error) {
      console.error("Error al marcar mensajes como leídos:", error);
    }
  }

  // Scroll al final del chat
  await nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

const sendMessage = async () => {
  if (!newMessageText.value.trim() || !selectedConversation.value || sendingMessage.value || !isChatActive.value) {
    return;
  }

  sendingMessage.value = true;
  try {
    const response = await axios.post('/messages', {
      proposal_id: selectedConversation.value.exchange.id,
      text: newMessageText.value.trim()
    });
    
    // Añadir el nuevo mensaje a la conversación actual en el frontend
    selectedConversation.value.messages.push(response.data);
    selectedConversation.value.last_message = response.data; // Actualizar el último mensaje
    newMessageText.value = ''; // Limpiar el input

    // Reordenar las conversaciones para que la actual suba
    conversations.value.sort((a, b) => {
        const timeA = a.last_message ? new Date(a.last_message.timestamp) : new Date(a.exchange.created_at);
        const timeB = b.last_message ? new Date(b.last_message.timestamp) : new Date(b.exchange.created_at);
        return timeB.getTime() - timeA.getTime();
    });

    // Scroll al final del chat después de enviar
    await nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    });

  } catch (error) {
    console.error("Error al enviar mensaje:", error);
    // TODO: Mostrar un mensaje de error al usuario
  } finally {
    sendingMessage.value = false;
  }
}

const updateProposalStatus = async (status) => {
  if (!selectedConversation.value) return;

  try {
    await axios.put(`/proposals/${selectedConversation.value.exchange.id}/status`, { status });
    selectedConversation.value.exchange.status = status; // Actualizar el estado en el frontend
    
    // Añadir mensaje del sistema sobre el cambio de estado
    const systemMessage = {
      id: selectedConversation.value.messages.length + 1, // Asumiendo que los IDs son secuenciales para el frontend
      text: status === 'accepted' ? '¡Has aceptado este intercambio! Ahora pueden coordinar los detalles finales.' : 'Has rechazado este intercambio. La conversación se ha cerrado.',
      sender_id: 0, // ID 0 para mensajes del sistema
      timestamp: new Date().toISOString(),
      is_read: true // Los mensajes del sistema siempre se consideran leídos
    };
    selectedConversation.value.messages.push(systemMessage);
    selectedConversation.value.last_message = systemMessage;

    alert(`Propuesta ${selectedConversation.value.exchange.id} ${status === 'accepted' ? 'aceptada' : 'rechazada'}.`);
    // Opcional: Refrescar la lista de conversaciones para que se reflejen los cambios
    await fetchConversations(); 

  } catch (error) {
    console.error("Error al actualizar el estado de la propuesta:", error);
    const errorMessage = error.response?.data?.detail || "Error al actualizar la propuesta.";
    alert(`Error: ${errorMessage}`);
  } finally {
    showDetailsModal.value = false; // Cerrar modal si se abrió desde allí
  }
};

// Observar los mensajes de la conversación seleccionada para hacer scroll automático
watch(
  () => selectedConversation.value?.messages,
  async () => {
    await nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    });
  },
  { deep: true } // Observar cambios profundos dentro del array de mensajes
);

// Al montar el componente, cargar las conversaciones
onMounted(() => {
  fetchConversations();
  // Puedes añadir aquí un setInterval para refrescar las conversaciones periódicamente
  // para obtener nuevos mensajes y estados de propuesta.
  // Por ejemplo: setInterval(fetchConversations, 10000); // Cada 10 segundos
});

</script>

<style>
/* ... (Tus estilos CSS existentes) ... */
/* Asegúrate de que tus estilos para .message-tail-right y .message-tail-left estén correctos,
   ya que tu versión actual usa `right: -9px` y `left: -9px` en lugar de `translate-x-full` */

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