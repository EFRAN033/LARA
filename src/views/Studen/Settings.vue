<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Sidebar intacto -->
      <Sidebar />
  
      <!-- Pane derecho -->
      <div class="flex-1 min-w-0 flex flex-col">
        <!-- ===== Header compacto (sticky, no tapa el sidebar) ===== -->
        <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 py-3">
            <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Ajustes</h1>
            <p class="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Configura tus preferencias de notificaciones e idioma.
            </p>
          </div>
        </header>
  
        <!-- ===== Contenido ===== -->
        <main class="flex-1 overflow-y-auto">
          <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 py-6 lg:py-10">
  
            <!-- ===== Idioma (ES/EN) ===== -->
            <section aria-labelledby="lang" class="pref-block">
              <div class="pref-title-wrap">
                <div class="pref-bullet"></div>
                <h2 id="lang" class="pref-title">Idioma de la interfaz</h2>
              </div>
  
              <div class="pref-row">
                <div class="pref-col-label">
                  <h3 class="pref-label">Idioma</h3>
                  <p class="pref-help">Selecciona el idioma preferido para la aplicación.</p>
                </div>
  
                <div class="pref-col-control">
                  <div role="group" aria-label="Seleccionar idioma" class="segmented">
                    <button
                      type="button"
                      :class="segLangClass('es')"
                      @click="lang = 'es'"
                      title="Español"
                    >
                      ES <span class="sr-only">Español</span>
                    </button>
                    <button
                      type="button"
                      :class="segLangClass('en')"
                      @click="lang = 'en'"
                      title="English"
                    >
                      EN <span class="sr-only">English</span>
                    </button>
                  </div>
                  <p class="pref-hint">Guardaremos tu preferencia y la aplicaremos en tu próxima visita.</p>
                </div>
              </div>
            </section>
  
            <!-- ===== Notificaciones por correo ===== -->
            <section aria-labelledby="mail" class="pref-block">
              <div class="pref-title-wrap">
                <div class="pref-bullet"></div>
                <h2 id="mail" class="pref-title">Notificaciones por correo</h2>
              </div>
  
              <div class="pref-row">
                <div class="pref-col-label">
                  <h3 class="pref-label">Calificaciones</h3>
                  <p class="pref-help">Recibe un correo cuando se publique una nueva nota.</p>
                </div>
  
                <div class="pref-col-control">
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="notifications.emailOnGrade"
                      class="switch-input"
                      aria-label="Correo al publicar calificación"
                    />
                    <span class="switch-track" aria-hidden="true">
                      <span class="switch-thumb"></span>
                    </span>
                    <span class="switch-label">Activar</span>
                  </label>
                </div>
              </div>
  
              <div class="pref-row">
                <div class="pref-col-label">
                  <h3 class="pref-label">Anuncios</h3>
                  <p class="pref-help">Entérate cuando haya un nuevo anuncio en tus cursos.</p>
                </div>
  
                <div class="pref-col-control">
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="notifications.emailOnAnnouncement"
                      class="switch-input"
                      aria-label="Correo ante nuevos anuncios"
                    />
                    <span class="switch-track" aria-hidden="true">
                      <span class="switch-thumb"></span>
                    </span>
                    <span class="switch-label">Activar</span>
                  </label>
                </div>
              </div>
            </section>
  
            <!-- ===== CTA final ===== -->
            <div class="mt-10 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-800 pt-6">
              <button
                type="button"
                @click="resetToDefaults"
                class="inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                Restablecer
              </button>
              <button
                type="button"
                @click="saveSettings"
                class="inline-flex items-center rounded-md bg-indigo-700 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                Guardar Preferencias
              </button>
            </div>
  
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import Sidebar from './Sidebar.vue' // mantiene tu estructura/BD
  
  /* ===== Estado ===== */
  const lang = ref('es') // 'es' | 'en'
  const notifications = ref({
    emailOnGrade: true,
    emailOnAnnouncement: false,
  })
  
  /* ===== Persistencia ===== */
  const loadSettings = () => {
    try {
      const savedLang = localStorage.getItem('settings:lang')
      const savedNotifications = localStorage.getItem('settings:notifications')
      if (savedLang) lang.value = savedLang
      if (savedNotifications) notifications.value = JSON.parse(savedNotifications)
    } catch (e) {
      console.error('No se pudieron cargar las configuraciones.')
    }
  }
  
  const saveSettings = () => {
    try {
      localStorage.setItem('settings:lang', lang.value)
      localStorage.setItem('settings:notifications', JSON.stringify(notifications.value))
      window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Configuración guardada.' } }))
      alert('Configuración guardada.')
    } catch (e) {
      console.error('No se pudieron guardar las configuraciones.')
    }
  }
  
  const resetToDefaults = () => {
    lang.value = 'es'
    notifications.value = { emailOnGrade: true, emailOnAnnouncement: false }
    saveSettings()
  }
  
  onMounted(loadSettings)
  
  /* ===== UI helpers ===== */
  const segLangClass = (value) => {
    const active = lang.value === value
    return [
      'seg-btn',
      active ? 'seg-btn-active' : 'seg-btn-idle'
    ].join(' ')
  }
  </script>
  
  <style scoped>
  /* ===== Titulares / sección ===== */
  .pref-title-wrap { @apply mb-4 flex items-center gap-3; }
  .pref-bullet { @apply h-3 w-3 rounded-full bg-indigo-700 dark:bg-indigo-500; }
  .pref-title { @apply text-lg sm:text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight; }
  
  /* ===== Layout “spec sheet” (sin tarjetas) ===== */
  .pref-row { @apply grid grid-cols-1 md:grid-cols-12 items-start gap-4 py-5 border-t border-gray-200 dark:border-gray-800; }
  .pref-row:first-of-type { @apply border-t-0; }
  .pref-col-label { @apply md:col-span-5; }
  .pref-col-control { @apply md:col-span-7; }
  .pref-label { @apply text-base font-semibold text-gray-900 dark:text-gray-100; }
  .pref-help { @apply mt-1 text-sm text-gray-600 dark:text-gray-400; }
  .pref-hint { @apply mt-2 text-xs text-gray-500 dark:text-gray-400; }
  .code { @apply rounded px-1.5 py-0.5 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200; }
  
  /* ===== Segmentado (para idioma) ===== */
  .segmented { @apply inline-flex overflow-hidden rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900; }
  .seg-btn { @apply px-3 py-1.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600; }
  .seg-btn-idle { @apply text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800; }
  .seg-btn-active { @apply bg-indigo-700 text-white hover:bg-indigo-800; }
  
  /* ===== Switch sólido ===== */
  .switch { @apply inline-flex items-center gap-3 select-none; }
  .switch-input { @apply sr-only; }
  .switch-track { @apply relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-700; }
  .switch-input:checked + .switch-track { @apply bg-indigo-700; }
  .switch-thumb { @apply absolute left-1 h-4 w-4 rounded-full bg-white transition-transform; transform: translateX(0); }
  .switch-input:checked + .switch-track .switch-thumb { transform: translateX(20px); }
  .switch-label { @apply text-sm font-medium text-gray-700 dark:text-gray-300; }
  
  /* ===== Accesibilidad ===== */
  .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0; }
  </style>
  