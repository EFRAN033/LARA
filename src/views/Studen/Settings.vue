<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Lateral existente (no tocamos tu base de datos ni stores) -->
    <Sidebar />

    <!-- Contenido -->
    <main class="flex-1 overflow-y-auto">
      <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-12 py-6 lg:py-10">

        <!-- Encabezado de página (sólido, sin tarjetas) -->
        <header class="mb-10">
          <div class="flex items-baseline justify-between gap-4">
            <div>
              <h1 class="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 dark:text-white">Ajustes</h1>
              <p class="mt-1 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Personaliza la apariencia y el comportamiento de la aplicación.
              </p>
            </div>
          </div>

          <!-- Línea de énfasis (sin tarjeta) -->
          <div class="mt-6 h-1 w-24 rounded bg-indigo-700 dark:bg-indigo-500"></div>
        </header>

        <!-- Preferencias (layout tipo “form spec”, sin tarjetas) -->
        <section aria-labelledby="appearance" class="pref-block">
          <div class="pref-title-wrap">
            <div class="pref-bullet"></div>
            <h2 id="appearance" class="pref-title">Apariencia</h2>
          </div>

          <div class="pref-row">
            <div class="pref-col-label">
              <h3 class="pref-label">Tema</h3>
              <p class="pref-help">Elige cómo se ve el portal en tu dispositivo.</p>
            </div>

            <!-- Control: Segmentado sólido (sin tarjetas) -->
            <div class="pref-col-control">
              <div role="group" aria-label="Seleccionar tema" class="segmented">
                <button
                  type="button"
                  :class="segClass('light')"
                  @click="theme = 'light'; applyTheme()"
                >Claro</button>
                <button
                  type="button"
                  :class="segClass('dark')"
                  @click="theme = 'dark'; applyTheme()"
                >Oscuro</button>
                <button
                  type="button"
                  :class="segClass('system')"
                  @click="theme = 'system'; applyTheme()"
                  title="Seguir preferencia del sistema"
                >Automático</button>
              </div>
              <p class="pref-hint">El modo automático sigue <code class="code">prefers-color-scheme</code> del sistema.</p>
            </div>
          </div>
        </section>

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

            <!-- Control: Switch sólido (sin tarjetas) -->
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

        <!-- Línea final y CTA pegado (sin tarjetas) -->
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './Sidebar.vue' // mantenemos tu estructura y conexión a BD/APIs

const theme = ref('system')
const notifications = ref({
  emailOnGrade: true,
  emailOnAnnouncement: false
})

/* ---------------- LÓGICA: sin tocar tu base de datos ---------------- */

const applyTheme = () => {
  try {
    localStorage.setItem('settings:theme', theme.value)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const enableDark = theme.value === 'dark' || (theme.value === 'system' && prefersDark)
    document.documentElement.classList.toggle('dark', enableDark)
  } catch (e) {
    console.error('No se pudo aplicar el tema.')
  }
}

const loadSettings = () => {
  try {
    const savedTheme = localStorage.getItem('settings:theme')
    const savedNotifications = localStorage.getItem('settings:notifications')
    if (savedTheme) theme.value = savedTheme
    if (savedNotifications) notifications.value = JSON.parse(savedNotifications)
    // aplicar inmediatamente
    applyTheme()
  } catch (e) {
    console.error('No se pudieron cargar las configuraciones.')
  }
}

const saveSettings = () => {
  try {
    localStorage.setItem('settings:notifications', JSON.stringify(notifications.value))
    applyTheme()
    // feedback ligero (sin tarjeta)
    window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'Configuración guardada.' } }))
    alert('Configuración guardada.')
  } catch (e) {
    console.error('No se pudieron guardar las configuraciones.')
  }
}

const resetToDefaults = () => {
  theme.value = 'system'
  notifications.value = { emailOnGrade: true, emailOnAnnouncement: false }
  saveSettings()
}

onMounted(() => {
  loadSettings()
})

/* ---------------- UI helpers ---------------- */
const segClass = (value) => {
  const isActive = theme.value === value
  return [
    'seg-btn',
    isActive ? 'seg-btn-active' : 'seg-btn-idle'
  ].join(' ')
}
</script>

<style scoped>
/* ---------- Bloques de preferencias (sin “tarjetas”) ---------- */

/* Encabezado de bloque con viñeta sólida y línea guía */
.pref-title-wrap {
  @apply mb-4 flex items-center gap-3;
}
.pref-bullet {
  @apply h-3 w-3 rounded-full bg-indigo-700 dark:bg-indigo-500;
}
.pref-title {
  @apply text-lg sm:text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight;
}

/* Cada fila de preferencia: layout tipo “spec sheet” */
.pref-row {
  @apply grid grid-cols-1 md:grid-cols-12 items-start gap-4 py-5 border-t border-gray-200 dark:border-gray-800;
}
.pref-row:first-of-type {
  @apply border-t-0;
}
.pref-col-label {
  @apply md:col-span-5;
}
.pref-col-control {
  @apply md:col-span-7;
}
.pref-label {
  @apply text-base font-semibold text-gray-900 dark:text-gray-100;
}
.pref-help {
  @apply mt-1 text-sm text-gray-600 dark:text-gray-400;
}
.pref-hint {
  @apply mt-2 text-xs text-gray-500 dark:text-gray-400;
}
.code {
  @apply rounded px-1.5 py-0.5 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200;
}

/* ---------- Segmentado sólido (tema) ---------- */
.segmented {
  @apply inline-flex overflow-hidden rounded-md border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900;
}
.seg-btn {
  @apply px-3 py-1.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600;
}
.seg-btn-idle {
  @apply text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800;
}
.seg-btn-active {
  @apply bg-indigo-700 text-white hover:bg-indigo-800;
}

/* ---------- Switch sólido (sin tarjetas) ---------- */
.switch {
  @apply inline-flex items-center gap-3 select-none;
}
.switch-input {
  @apply sr-only;
}
.switch-track {
  @apply relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors dark:bg-gray-700;
}
.switch-input:checked + .switch-track {
  @apply bg-indigo-700;
}
.switch-thumb {
  @apply absolute left-1 h-4 w-4 rounded-full bg-white transition-transform;
  transform: translateX(0);
}
.switch-input:checked + .switch-track .switch-thumb {
  transform: translateX(20px);
}
.switch-label {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300;
}

/* ---------- Chips / botones de acción ya definidos en el template superior ---------- */
</style>
