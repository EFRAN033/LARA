<template>
  <footer class="bg-gray-950 text-white font-sans antialiased">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div class="md:hidden space-y-3">
        <Disclosure
          v-for="(section, idx) in mobileSections"
          :key="idx"
          as="div"
          class="rounded-lg border border-white/10 bg-white/5 backdrop-blur"
        >
          <DisclosureButton class="flex w-full items-center justify-between px-3 py-2.5 text-left">
            <span class="text-sm font-semibold text-pink-300">{{ section.title }}</span>
            <svg class="h-4 w-4 text-pink-300 ui-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </DisclosureButton>

          <DisclosurePanel class="px-3 pb-3 text-gray-300">
            <div v-if="section.type === 'newsletter'" class="space-y-2">
              <p class="text-xs text-gray-400">Recibe novedades y oportunidades solidarias.</p>
              <form @submit.prevent="submitNewsletter" class="flex gap-2">
                <input
                  v-model="newsletterEmail"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="tu@email.com"
                  class="flex-1 rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  :disabled="newsletterSubmitting"
                  class="rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-3.5 py-2 text-sm font-semibold text-white shadow disabled:opacity-50"
                >
                  {{ newsletterSubmitting ? 'Enviando…' : 'Suscribirme' }}
                </button>
              </form>
              <p v-if="newsletterMsg" class="text-xs" :class="newsletterOk ? 'text-emerald-400' : 'text-rose-400'">
                {{ newsletterMsg }}
              </p>
              <div class="flex items-center gap-3 pt-1">
                <a v-for="s in socialLinks" :key="s.name" :href="s.href" target="_blank" rel="noopener" class="text-gray-300 hover:text-white transition">
                  <component :is="s.icon" class="h-4 w-4" />
                </a>
              </div>
            </div>

            <ul v-else class="space-y-1.5">
              <li v-for="(link, i) in section.links" :key="i">
                <router-link
                  v-if="link.to && link.to.startsWith('/')"
                  :to="link.to"
                  class="block rounded-md px-2 py-1 text-sm hover:text-pink-300"
                  @click="link.action === 'comment' && openCommentModal()"
                >{{ link.label }}</router-link>

                <a
                  v-else-if="link.to"
                  :href="link.to"
                  class="block rounded-md px-2 py-1 text-sm hover:text-pink-300"
                  target="_blank" rel="noopener"
                >{{ link.label }}</a>

                <button
                  v-else
                  class="block w-full rounded-md px-2 py-1 text-left text-sm hover:text-pink-300"
                  @click="handleAction(link)"
                >{{ link.label }}</button>
              </li>
            </ul>
          </DisclosurePanel>
        </Disclosure>

        <button
          @click="navigateToRegister"
          class="mt-2 w-full rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2.5 text-sm font-semibold shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-950"
        >
          Subir mis productos
        </button>
      </div>

      <div class="hidden md:grid grid-cols-12 gap-6">
        <div class="col-span-4">
          <h3 class="text-base font-bold text-pink-300">KambiaPe</h3>
          <p class="mt-1.5 text-sm text-gray-400">
            Intercambia, dona y potencia el impacto social en tu comunidad.
          </p>

          <form @submit.prevent="submitNewsletter" class="mt-3 flex gap-2">
            <input
              v-model="newsletterEmail"
              type="email"
              required
              autocomplete="email"
              placeholder="tu@email.com"
              class="w-full rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              :disabled="newsletterSubmitting"
              class="rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-pink-700 shadow hover:shadow-md disabled:opacity-50"
            >
              {{ newsletterSubmitting ? 'Enviando…' : 'Suscribirme' }}
            </button>
          </form>
          <p v-if="newsletterMsg" class="mt-1.5 text-xs" :class="newsletterOk ? 'text-emerald-400' : 'text-rose-400'">
            {{ newsletterMsg }}
          </p>

          <div class="mt-3.5 flex items-center gap-3">
            <a v-for="s in socialLinks" :key="s.name" :href="s.href" target="_blank" rel="noopener" class="text-gray-300 hover:text-white transition">
              <component :is="s.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <div class="col-span-3">
          <h3 class="text-base font-bold text-pink-300 mb-3">Navegación</h3>
          <ul class="space-y-1.5 text-gray-300 text-sm">
            <li><router-link to="/" class="hover:text-pink-300">Inicio</router-link></li>
            <li><router-link to="/explorar" class="hover:text-pink-300">Explorar productos</router-link></li>
            <li><router-link to="/como-funciona" class="hover:text-pink-300">Cómo funciona</router-link></li>
            <li><router-link to="/faqs" class="hover:text-pink-300">FAQs</router-link></li>
          </ul>
        </div>

        <div class="col-span-3">
          <h3 class="text-base font-bold text-pink-300 mb-3">Soporte</h3>
          <ul class="space-y-1.5 text-gray-300 text-sm">
            <li><a href="mailto:soporte@kambiape.com" class="hover:text-pink-300">soporte@kambiape.com</a></li>
            <li><button @click="openCommentModal" class="hover:text-pink-300">Dejar un comentario</button></li>
          </ul>
        </div>

        <div class="col-span-2">
          <h3 class="text-base font-bold text-pink-300 mb-3">¿Quieres publicar?</h3>
          <p class="text-gray-300 text-sm mb-3">Sube tus productos y dales una segunda vida.</p>
          <button
            @click="navigateToRegister"
            class="w-full rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-5 py-2.5 text-sm font-semibold shadow hover:brightness-110"
          >
            Comenzar ahora
          </button>
        </div>
      </div>

      <div class="mt-8 border-t border-white/10 pt-4 text-center text-sm text-gray-400">
        <div class="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p class="text-xs sm:text-sm">© {{ year }} KambiaPe. Todos los derechos reservados.</p>
          <div class="flex items-center gap-4">
            <router-link to="/terminos" class="text-xs sm:text-sm hover:text-white">Términos</router-link>
            <router-link to="/privacidad" class="text-xs sm:text-sm hover:text-white">Privacidad</router-link>
            <select
              v-model="lang"
              class="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <TransitionRoot :show="isCommentModalVisible" as="template">
      <Dialog @close="closeCommentModal" class="relative z-50">
        <TransitionChild
          as="template"
          enter="transition ease-out duration-200"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition ease-in duration-150"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="transition ease-out duration-200"
              enter-from="opacity-0 translate-y-3 scale-95"
              enter-to="opacity-100 translate-y-0 scale-100"
              leave="transition ease-in duration-150"
              leave-from="opacity-100 translate-y-0 scale-100"
              leave-to="opacity-0 translate-y-3 scale-95"
            >
              <DialogPanel class="w-full max-w-md rounded-lg border border-white/10 bg-gray-900 p-5 shadow-xl">
                <DialogTitle class="text-center text-xl font-bold text-pink-300">Envíanos tus Comentarios</DialogTitle>

                <form class="mt-5 space-y-3" @submit.prevent="submitComment">
                  <div>
                    <label for="commentType" class="mb-1.5 block text-sm text-gray-300">Tipo (opcional)</label>
                    <select
                      id="commentType"
                      v-model="comment.type"
                      class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Selecciona</option>
                      <option value="suggestion">Sugerencia</option>
                      <option value="problem">Reportar un problema</option>
                      <option value="question">Pregunta</option>
                      <option value="compliment">Felicitación</option>
                    </select>
                  </div>

                  <div>
                    <label for="commentMessage" class="mb-1.5 block text-sm text-gray-300">
                      Mensaje <span class="text-rose-400">*</span>
                    </label>
                    <textarea
                      id="commentMessage"
                      v-model="comment.message"
                      rows="4"
                      required
                      class="w-full resize-y rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Escribe tu comentario..."
                    ></textarea>
                  </div>

                  <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label for="commentName" class="mb-1.5 block text-sm text-gray-300">Tu nombre (opcional)</label>
                      <input
                        id="commentName"
                        v-model="comment.name"
                        type="text"
                        class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label for="commentEmail" class="mb-1.5 block text-sm text-gray-300">Correo (opcional)</label>
                      <input
                        id="commentEmail"
                        v-model="comment.email"
                        type="email"
                        class="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                      <p v-if="emailError" class="mt-1 text-xs text-rose-400">{{ emailError }}</p>
                    </div>
                  </div>

                  <div class="flex justify-end gap-2.5 pt-1">
                    <button
                      type="button"
                      @click="closeCommentModal"
                      class="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      :disabled="isSubmitting"
                      class="inline-flex items-center rounded-md bg-gradient-to-r from-pink-600 to-rose-600 px-4 py-2 text-sm font-medium text-white shadow hover:brightness-110 disabled:opacity-50"
                    >
                      <span v-if="!isSubmitting">Enviar</span>
                      <svg v-else class="ml-1 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0A12 12 0 000 12h4z"/>
                      </svg>
                    </button>
                  </div>
                </form>

                <p
                  v-if="feedbackMessage"
                  class="mt-3 text-center text-sm"
                  :class="isSuccess ? 'text-gray-300' : 'text-rose-400'"
                >
                  {{ feedbackMessage }}
                </p>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </footer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'

/* Iconos sociales compactos */
const IconX = { name: 'IconX', template: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.53 3H20l-7.06 8.08L20.5 21h-5.1l-4.02-4.83L6.7 21H3l7.54-8.64L3.5 3h5.18l3.62 4.35L17.53 3z"/></svg>' }
const IconInstagram = { name: 'IconInstagram', template: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4"><path fill-rule="evenodd" d="M12.315 2.518a.75.75 0 01.63 0C13.232 2.72 13.914 3 14.75 3h.25a7.5 7.5 0 017.5 7.5v.25c0 .836.28 1.518.482 2.315a.75.75 0 010 .63c-.202.797-.482 1.479-.482 2.315v.25a7.5 7.5 0 01-7.5 7.5h-.25c-.836 0-1.518-.28-2.315-.482a.75.75 0 01-.63 0c-.797.202-1.479.482-2.315.482h-.25a7.5 7.5 0 01-7.5-7.5v-.25c0-.836-.28-1.518-.482-2.315a.75.75 0 010-.63c.202-.797.482-1.479.482-2.315v-.25a7.5 7.5 0 017.5-7.5h.25c.836 0 1.518.28 2.315.482zM12 17.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM12 15a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" /><path d="M18.75 5.25h.008v.008h-.008V5.25z" /></svg>' }
const IconFacebook = { name: 'IconFacebook', template: '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M13 22v-8h3l1-4h-4V7a1 1 0 011-1h3V2h-3a5 5 0 00-5 5v3H6v4h3v8h4z"/></svg>' }

const router = useRouter()

/* ------- Newsletter ------- */
const newsletterEmail = ref('')
const newsletterSubmitting = ref(false)
const newsletterMsg = ref('')
const newsletterOk = ref(false)

const submitNewsletter = async () => {
  newsletterMsg.value = ''
  newsletterOk.value = false
  if (!newsletterEmail.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.value)) {
    newsletterMsg.value = 'Ingresa un correo válido.'
    return
  }
  newsletterSubmitting.value = true
  await new Promise(r => setTimeout(r, 900))
  newsletterSubmitting.value = false
  newsletterOk.value = true
  newsletterMsg.value = '¡Gracias por suscribirte!'
  newsletterEmail.value = ''
}

const socialLinks = [
  { name: 'X', href: 'https://x.com/', icon: IconX },
  { name: 'Instagram', href: 'https://www.instagram.com/kambia_pe', icon: IconInstagram },
  { name: 'Facebook', href: 'https://facebook.com/', icon: IconFacebook },
]

/* ------- Mobile sections ------- */
const mobileSections = [
  { title: 'KambiaPe', type: 'newsletter' },
  {
    title: 'Enlaces rápidos',
    links: [
      { label: 'Inicio', to: '/' },
      { label: 'Explorar productos', to: '/explorar' },
      { label: 'Cómo funciona', to: '/como-funciona' },
      { label: 'FAQs', to: '/faqs' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'soporte@kambiape.com', to: 'mailto:soporte@kambiape.com' },
      { label: 'Dejar un comentario', action: 'comment' },
    ],
  },
  {
    title: 'Almacenes',
    links: [
      { label: 'Chincha – Av. Mariscal Sucre #1032', to: 'https://maps.google.com/?q=Av.+Mariscal+Sucre+1032+Chincha' },
      { label: 'Ver todos', to: '/almacenes' },
    ],
  },
]

const handleAction = (link) => {
  if (link.action === 'comment') openCommentModal()
  else if (link.to?.startsWith('/')) router.push(link.to)
}

/* ------- Warehouses ------- */
const warehouses = [
  {
    city: 'Chincha',
    address: 'Av. Mariscal Sucre #1032, Pueblo Nuevo. Ref: Frente al colegio Fe y Alegría N°30',
    map: 'https://maps.google.com/?q=Av.+Mariscal+Sucre+1032+Chincha',
  },
]

/* ------- CTA navegación ------- */
const navigateToRegister = () => router.push('/Register')

/* ------- Modal Comentarios (compacta) ------- */
const isCommentModalVisible = ref(false)
const comment = ref({ type: '', message: '', name: '', email: '' })
const isSubmitting = ref(false)
const feedbackMessage = ref('')
const isSuccess = ref(false)
const emailError = ref('')

const openCommentModal = () => {
  isCommentModalVisible.value = true
  comment.value = { type: '', message: '', name: '', email: '' }
  feedbackMessage.value = ''
  isSuccess.value = false
  emailError.value = ''
  isSubmitting.value = false
}
const closeCommentModal = () => (isCommentModalVisible.value = false)

const validateEmail = (email) => !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase())

const submitComment = async () => {
  emailError.value = ''
  if (!validateEmail(comment.value.email)) {
    emailError.value = 'Correo inválido.'
    return
  }
  if (!comment.value.message.trim()) {
    feedbackMessage.value = 'El mensaje no puede estar vacío.'
    isSuccess.value = false
    return
  }
  isSubmitting.value = true
  feedbackMessage.value = ''
  try {
    await new Promise((r) => setTimeout(r, 900))
    isSuccess.value = true
    feedbackMessage.value = '¡Gracias! Recibimos tu comentario.'
    setTimeout(() => closeCommentModal(), 1800)
  } catch {
    isSuccess.value = false
    feedbackMessage.value = 'Ocurrió un error. Intenta nuevamente.'
  } finally {
    isSubmitting.value = false
  }
}

/* ------- Barra inferior ------- */
const year = computed(() => new Date().getFullYear())
const lang = ref('es')
</script>