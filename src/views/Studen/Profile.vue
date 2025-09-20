<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Sidebar intacto (no tocamos tu BD ni stores) -->
      <Sidebar />
  
      <!-- Pane derecho -->
      <div class="flex-1 min-w-0 flex flex-col">
        <!-- ===== Header superior minimal (no tapa el sidebar) ===== -->
        <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
            <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Mi Perfil</h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Administra tu información personal, de contacto y de seguridad.
            </p>
          </div>
        </header>
  
        <!-- ===== Contenido ===== -->
        <main class="flex-1 overflow-y-auto">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
  
            <!-- ===== Cargando (skeleton sin tarjetas) ===== -->
            <div v-if="isLoading" class="space-y-6">
              <div class="flex items-center gap-4">
                <span class="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></span>
                <div class="space-y-2">
                  <div class="h-5 w-52 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
                  <div class="h-4 w-36 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                </div>
              </div>
              <div class="h-3 w-full rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
              <div class="h-3 w-2/3 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
              <div class="h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
            </div>
  
            <!-- ===== Perfil ===== -->
            <form v-else @submit.prevent="saveProfile" novalidate class="space-y-10">
              <!-- Identidad (franja sólida, sin tarjetas) -->
              <section aria-label="Identidad" class="id-row">
                <div class="id-avatar" aria-hidden="true">{{ initials(userProfile.full_name) }}</div>
                <div>
                  <h2 class="id-name">{{ userProfile.full_name }}</h2>
                  <p class="id-meta">
                    DNI: <button type="button" class="id-dni" @click="copyDni" :aria-label="`Copiar DNI ${userProfile.dni}`">
                      {{ userProfile.dni }}
                      <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M4 4a2 2 0 012-2h5a2 2 0 012 2v1h1a2 2 0 012 2v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-1H6a2 2 0 01-2-2V4z"/>
                      </svg>
                    </button>
                  </p>
                </div>
              </section>
  
              <!-- Información Personal (solo lectura) -->
              <section aria-labelledby="sec-datos" class="spec-block">
                <div class="spec-title-wrap">
                  <div class="spec-bullet"></div>
                  <h3 id="sec-datos" class="spec-title">Información Personal</h3>
                </div>
  
                <div class="spec-row">
                  <div class="spec-label">
                    <label for="full_name" class="lbl">Nombre Completo</label>
                    <p class="hint">Este dato lo gestiona la administración.</p>
                  </div>
                  <div class="spec-field">
                    <input id="full_name" type="text" v-model="userProfile.full_name" class="input" disabled />
                  </div>
                </div>
  
                <div class="spec-row">
                  <div class="spec-label">
                    <label for="dni" class="lbl">DNI</label>
                    <p class="hint">No editable.</p>
                  </div>
                  <div class="spec-field">
                    <div class="flex gap-2">
                      <input id="dni" type="text" v-model="userProfile.dni" class="input" disabled />
                      <button type="button" class="btn-ghost" @click="copyDni">Copiar</button>
                    </div>
                  </div>
                </div>
              </section>
  
              <!-- Contacto (editable) -->
              <section aria-labelledby="sec-contacto" class="spec-block">
                <div class="spec-title-wrap">
                  <div class="spec-bullet"></div>
                  <h3 id="sec-contacto" class="spec-title">Información de Contacto</h3>
                </div>
  
                <div class="spec-row">
                  <div class="spec-label">
                    <label for="email" class="lbl">Correo Electrónico</label>
                    <p class="hint">Usado para notificaciones y recuperación.</p>
                  </div>
                  <div class="spec-field">
                    <input
                      id="email"
                      type="email"
                      v-model.trim="userProfile.email"
                      class="input"
                      :class="{'input-invalid': emailError}"
                      autocomplete="email"
                      inputmode="email"
                      placeholder="tucorreo@ejemplo.com"
                      @blur="touch.email = true"
                      aria-describedby="email_help"
                      aria-invalid="emailError ? 'true' : 'false'"
                    />
                    <p id="email_help" class="err" v-if="emailError">Ingresa un correo válido.</p>
                  </div>
                </div>
  
                <div class="spec-row">
                  <div class="spec-label">
                    <label for="phone" class="lbl">Teléfono</label>
                    <p class="hint">Para comunicación directa en caso de emergencia.</p>
                  </div>
                  <div class="spec-field">
                    <input
                      id="phone"
                      type="tel"
                      v-model.trim="userProfile.phone"
                      class="input"
                      :class="{'input-invalid': phoneError}"
                      autocomplete="tel"
                      inputmode="numeric"
                      pattern="[0-9]{6,15}"
                      placeholder="999999999"
                      @blur="touch.phone = true"
                      aria-describedby="phone_help"
                      aria-invalid="phoneError ? 'true' : 'false'"
                    />
                    <p id="phone_help" class="err" v-if="phoneError">Solo números (6–15 dígitos).</p>
                  </div>
                </div>
              </section>
  
              <!-- Seguridad (atajo, sin romper BD) -->
              <section aria-labelledby="sec-seguridad" class="spec-block">
                <div class="spec-title-wrap">
                  <div class="spec-bullet"></div>
                  <h3 id="sec-seguridad" class="spec-title">Seguridad</h3>
                </div>
  
                <div class="spec-row">
                  <div class="spec-label">
                    <span class="lbl">Contraseña</span>
                    <p class="hint">Se cambia desde la sección de seguridad.</p>
                  </div>
                  <div class="spec-field">
                    <div class="inline-actions">
                      <button type="button" class="btn-outline" @click="goToSecurity">Cambiar contraseña</button>
                      <button type="button" class="btn-ghost" @click="sendRecovery">Enviar correo de recuperación</button>
                    </div>
                  </div>
                </div>
              </section>
  
              <!-- Barra de acciones pegada (sin tarjetas) -->
              <div class="actions">
                <button type="button" class="btn-ghost" @click="resetLocal" :disabled="isSaving">Descartar cambios</button>
                <button type="submit" class="btn-primary" :disabled="isSaving || hasErrors">
                  {{ isSaving ? 'Guardando…' : 'Guardar Cambios' }}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useUserStore } from '@/stores/user'
  import Sidebar from './Sidebar.vue'
  
  const userStore = useUserStore()
  const userProfile = ref({ full_name: '', email: '', phone: '', dni: '' })
  const snapshot = ref(null) // para descartar cambios
  const isLoading = ref(true)
  const isSaving = ref(false)
  
  /* ===== Carga (no tocamos tu BD; respeta tu flujo) ===== */
  const fetchProfile = async () => {
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 500))
      userProfile.value = {
        full_name: userStore.user?.full_name || 'Efran Guzman',
        email: userStore.user?.sub || 'efran@example.com',
        phone: '987654321',
        dni: '71234567'
      }
      snapshot.value = JSON.parse(JSON.stringify(userProfile.value))
    } catch (e) {
      console.error('Error al cargar el perfil:', e)
    } finally {
      isLoading.value = false
    }
  }
  
  /* ===== Guardado (sin romper tu backend) ===== */
  const saveProfile = async () => {
    // Validación mínima
    touch.value = { email: true, phone: true }
    if (hasErrors.value) return
  
    isSaving.value = true
    try {
      await new Promise(r => setTimeout(r, 1000))
      snapshot.value = JSON.parse(JSON.stringify(userProfile.value))
      alert('Perfil guardado con éxito!')
    } catch (e) {
      alert('Hubo un error al guardar.')
    } finally {
      isSaving.value = false
    }
  }
  
  /* ===== Acciones auxiliares ===== */
  const resetLocal = () => {
    if (!snapshot.value) return
    userProfile.value = JSON.parse(JSON.stringify(snapshot.value))
    touch.value = { email: false, phone: false }
  }
  const copyDni = async () => {
    try {
      await navigator.clipboard.writeText(userProfile.value.dni || '')
      // feedback simple sin libs
      window.dispatchEvent(new CustomEvent('toast', { detail: { text: 'DNI copiado' } }))
    } catch { /* noop */ }
  }
  const goToSecurity = () => {
    // Redirige a tu ruta real de seguridad si la tienes:
    // router.push('/security')
    alert('Abre la sección de Seguridad para cambiar tu contraseña.')
  }
  const sendRecovery = () => {
    // Aquí iría tu llamada real a la API de recuperación
    alert('Se envió un correo de recuperación (simulado).')
  }
  
  /* ===== Helpers visuales/validados ===== */
  const initials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(/\s+/)
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase()
  }
  
  const touch = ref({ email: false, phone: false })
  const emailError = computed(() => {
    if (!touch.value.email) return false
    const v = (userProfile.value.email || '').trim()
    // Regex simple y permisivo
    return !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
  })
  const phoneError = computed(() => {
    if (!touch.value.phone) return false
    const v = (userProfile.value.phone || '').trim()
    return !/^[0-9]{6,15}$/.test(v)
  })
  const hasErrors = computed(() => emailError.value || phoneError.value)
  
  onMounted(fetchProfile)
  </script>
  
  <style scoped>
  /* ===== Identidad ===== */
  .id-row { @apply flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-800; }
  .id-avatar {
    @apply h-16 w-16 rounded-full flex items-center justify-center text-white text-xl font-black select-none;
    background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
  }
  .id-name { @apply text-2xl font-extrabold text-gray-900 dark:text-gray-100; }
  .id-meta { @apply text-sm text-gray-600 dark:text-gray-400; }
  .id-dni { @apply inline-flex items-center rounded px-1.5 py-0.5 font-mono text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition; }
  
  /* ===== Bloque estilo “spec sheet” (sin tarjetas) ===== */
  .spec-title-wrap { @apply mt-8 mb-2 flex items-center gap-3; }
  .spec-bullet { @apply h-2.5 w-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500; }
  .spec-title { @apply text-lg font-extrabold text-gray-900 dark:text-gray-100 tracking-tight; }
  
  .spec-row { @apply grid grid-cols-1 md:grid-cols-12 items-start gap-4 py-5 border-t border-gray-200 dark:border-gray-800; }
  .spec-row:first-of-type { @apply border-t-0; }
  .spec-label { @apply md:col-span-4; }
  .spec-field { @apply md:col-span-8; }
  .lbl { @apply block text-sm font-semibold text-gray-900 dark:text-gray-100; }
  .hint { @apply mt-1 text-xs text-gray-600 dark:text-gray-400; }
  
  /* Inputs sólidos, sin tarjeta */
  .input {
    @apply block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600
           dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100;
  }
  .input:disabled { @apply bg-gray-100 dark:bg-gray-800 cursor-not-allowed; }
  .input-invalid { @apply border-red-500 focus-visible:ring-red-500; }
  .err { @apply mt-1 text-xs font-medium text-red-600 dark:text-red-400; }
  
  /* Botones */
  .btn-primary {
    @apply inline-flex items-center rounded-md bg-indigo-700 px-4 py-2 text-sm font-semibold text-white
           hover:bg-indigo-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:opacity-60;
  }
  .btn-outline {
    @apply inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-semibold transition
           border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600
           dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800;
  }
  .btn-ghost {
    @apply inline-flex items-center rounded-md px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-100
           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800;
  }
  
  /* Acciones al final del formulario (sin tarjeta) */
  .actions { @apply mt-4 flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-800 pt-6; }
  </style>
  