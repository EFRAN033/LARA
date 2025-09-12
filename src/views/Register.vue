<template>
    <div class="shell">
      <a href="#main" class="sr-only-focusable">{{ t('skip') }}</a>
  
      <!-- ===== HEADER GLOBAL ===== -->
      <header class="site-header">
        <div class="header-container">
          <!-- Brand -->
          <RouterLink to="/login" class="brand-link group">
            <span class="brand-mark">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 2 2 7l10 5 10-5-10-5Z"></path>
                <path d="M2 12l10 5 10-5"></path>
                <path d="M2 17l10 5 10-5"></path>
              </svg>
            </span>
            <span class="brand-name">I.E. 20798</span>
            <span class="brand-system">{{ t('system') }}</span>
          </RouterLink>
  
          <!-- Nav -->
          <nav class="site-nav" aria-label="Principal">
            <RouterLink to="/login" class="nav-link">{{ t('loginTop') }}</RouterLink>
            <RouterLink to="/register" class="nav-cta">{{ t('registerNow') }}</RouterLink>
          </nav>
  
          <!-- Actions -->
          <div class="header-actions">
            <div class="lang">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m4 16l4-4m0 0l4-4m-4 4H3m16 0a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
              <select id="lang-select" v-model="lang" @change="persistLang" class="select">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
  
            <button type="button" @click="toggleTheme" class="icon-btn" :title="themeTitle">
              <span class="sr-only">{{ t('theme') }}</span>
              <svg v-if="theme==='light'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"/>
              </svg>
              <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>
  
      <!-- ===== LAYOUT ===== -->
      <div class="mx-auto min-h-screen max-w-6xl grid grid-cols-1 lg:grid-cols-[0.85fr_1.75fr]">
        <!-- IZQUIERDA (editorial) -->
        <aside class="left-rail">
          <div class="brand-ribbon" aria-hidden="true"></div>
          <div class="texture" aria-hidden="true"></div>
  
          <div class="rail-content">
            <a href="#" class="brand-link group">
              <span class="brand-mark">
                <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M12 2 2 7l10 5 10-5-10-5Z"></path>
                  <path d="M2 12l10 5 10-5"></path>
                  <path d="M2 17l10 5 10-5"></path>
                </svg>
              </span>
              <span class="brand-text">
                <span class="title">I.E. 20798</span>
                <span class="subtitle">{{ t('system') }}</span>
              </span>
            </a>
  
            <blockquote class="quote">
              <span class="body">“{{ t('quote.body') }}”</span>
              <cite class="author">— {{ t('quote.author') }}</cite>
            </blockquote>
  
            <div class="meta">
              <div class="kicker"><span class="line"></span><span>Institucional</span></div>
              <p>© {{ new Date().getFullYear() }} I.E. 20798. {{ t('rights') }}</p>
              <p>
                <a href="#" class="meta-link">{{ t('support') }}</a> ·
                <a href="#" class="meta-link">{{ t('version') }} v1.6</a>
              </p>
            </div>
          </div>
        </aside>
  
        <!-- DERECHA (form ancho) -->
        <main id="main" class="right-pane">
          <div class="right-stack">
            <!-- CABECERA y FORMULARIO -->
            <section class="form-edge">
              <header class="headline">
                <h2>{{ t('registerTitle') }}</h2>
                <p>{{ t('registerSubtitle') }}</p>
              </header>
  
              <div class="section-kicker">
                <span class="bar"></span><span>{{ t('registerSection') }}</span>
              </div>
  
              <form class="form" @submit.prevent="handleRegister" novalidate>
                <Transition name="fade">
                  <div v-if="errorSummary.length" class="error-inline" role="alert" aria-live="polite">
                    {{ t('fixErrors') }}
                  </div>
                </Transition>
  
                <!-- NOMBRE COMPLETO -->
                <div class="field">
                  <label for="fullName" class="label">{{ t('fullName') }}</label>
                  <div class="input-wrap group">
                    <span class="icon" aria-hidden="true">
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 8a7 7 0 0 0-14 0Z"/></svg>
                    </span>
                    <input
                      id="fullName"
                      ref="fullNameInput"
                      v-model.trim="fullName"
                      :class="['input inp-lg', { 'input--error': fullNameError }]"
                      type="text"
                      autocomplete="name"
                      @blur="validateField('fullName')"
                      :aria-invalid="!!fullNameError"
                      :aria-describedby="fullNameError ? 'fullName-error' : undefined"
                      placeholder="Nombre y apellidos"
                    />
                    <span class="underline" aria-hidden="true"></span>
                  </div>
                  <Transition name="fade"><p v-if="fullNameError" id="fullName-error" class="hint--error">{{ fullNameError }}</p></Transition>
                </div>
  
                <!-- EMAIL -->
                <div class="field">
                  <label for="email" class="label">{{ t('email') }}</label>
                  <div class="input-wrap group">
                    <span class="icon" aria-hidden="true">
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>
                    </span>
                    <input
                      id="email"
                      ref="emailInput"
                      v-model.trim="email"
                      :class="['input inp-lg', { 'input--error': emailError }]"
                      type="email"
                      autocomplete="email"
                      @blur="validateField('email')"
                      :aria-invalid="!!emailError"
                      :aria-describedby="emailError ? 'email-error' : undefined"
                      placeholder="tucorreo@ejemplo.com"
                    />
                    <span class="underline" aria-hidden="true"></span>
                  </div>
                  <Transition name="fade"><p v-if="emailError" id="email-error" class="hint--error">{{ emailError }}</p></Transition>
                </div>
  
                <!-- USUARIO -->
                <div class="field">
                  <label for="username" class="label">{{ t('username') }}</label>
                  <div class="input-wrap group">
                    <span class="icon" aria-hidden="true">
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z"/><path d="M4 20a8 8 0 0 1 16 0Z"/></svg>
                    </span>
                    <input
                      id="username"
                      ref="usernameInput"
                      v-model.trim="username"
                      :class="['input inp-lg', { 'input--error': usernameError }]"
                      type="text"
                      autocomplete="username"
                      inputmode="text"
                      @blur="validateField('username')"
                      :aria-invalid="!!usernameError"
                      :aria-describedby="usernameError ? 'username-error' : undefined"
                      placeholder="tu.usuario"
                    />
                    <span class="underline" aria-hidden="true"></span>
                  </div>
                  <Transition name="fade"><p v-if="usernameError" id="username-error" class="hint--error">{{ usernameError }}</p></Transition>
                </div>
  
                <!-- PASSWORD -->
                <div class="field">
                  <div class="label-row">
                    <label for="password" class="label">{{ t('password') }}</label>
                    <span class="text-[11px] text-slate-500 dark:text-slate-400">{{ t('passwordHint') }}</span>
                  </div>
                  <div class="input-wrap group">
                    <span class="icon" aria-hidden="true">
                      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5 9V7a5 5 0 0 1 10 0v2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Zm8-2v2H7V7a3 3 0 0 1 6 0Z" clip-rule="evenodd"/></svg>
                    </span>
                    <input
                      id="password"
                      ref="passwordInput"
                      v-model="password"
                      :class="['input inp-lg pr-12', { 'input--error': passwordError }]"
                      :type="showPassword ? 'text' : 'password'"
                      autocomplete="new-password"
                      placeholder="••••••••"
                      @keyup="(e)=> (capsLockPass.value = e.getModifierState?.('CapsLock'))"
                      @blur="validateField('password')"
                      :aria-invalid="!!passwordError"
                      :aria-describedby="passwordError ? 'password-error' : undefined"
                    />
                    <button type="button" @click="showPassword=!showPassword" class="toggle" :title="showPassword ? t('hide') : t('show')">
                      <svg v-if="!showPassword" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>
                      <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 0 0-1.414 1.414l14 14a1 1 0 0 0 1.414-1.414z"/></svg>
                    </button>
                    <Transition name="fade"><span v-if="capsLockPass.value" class="caps">{{ t('caps') }}</span></Transition>
                    <span class="underline" aria-hidden="true"></span>
                  </div>
                  <Transition name="fade"><p v-if="passwordError" id="password-error" class="hint--error">{{ passwordError }}</p></Transition>
                </div>
  
                <!-- CONFIRM PASSWORD -->
                <div class="field">
                  <label for="confirm" class="label">{{ t('confirmPassword') }}</label>
                  <div class="input-wrap group">
                    <span class="icon" aria-hidden="true">
                      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 3a9 9 0 0 0-9 9v4l2 3h14l2-3v-4a9 9 0 0 0-9-9Z"/></svg>
                    </span>
                    <input
                      id="confirm"
                      ref="confirmInput"
                      v-model="confirm"
                      :class="['input inp-lg pr-12', { 'input--error': confirmError }]"
                      :type="showConfirm ? 'text' : 'password'"
                      autocomplete="new-password"
                      placeholder="••••••••"
                      @keyup="(e)=> (capsLockConfirm.value = e.getModifierState?.('CapsLock'))"
                      @blur="validateField('confirm')"
                      :aria-invalid="!!confirmError"
                      :aria-describedby="confirmError ? 'confirm-error' : undefined"
                    />
                    <button type="button" @click="showConfirm=!showConfirm" class="toggle" :title="showConfirm ? t('hide') : t('show')">
                      <svg v-if="!showConfirm" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>
                      <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 0 0-1.414 1.414l14 14a1 1 0 0 0 1.414-1.414z"/></svg>
                    </button>
                    <Transition name="fade"><span v-if="capsLockConfirm.value" class="caps">{{ t('caps') }}</span></Transition>
                    <span class="underline" aria-hidden="true"></span>
                  </div>
                  <Transition name="fade"><p v-if="confirmError" id="confirm-error" class="hint--error">{{ confirmError }}</p></Transition>
                </div>
  
                <!-- STRENGTH -->
                <div class="strength">
                  <div class="track"><div class="fill" :class="strengthBarClass" :style="{ width: strength + '%' }"></div></div>
                </div>
  
                <!-- TÉRMINOS -->
                <div class="policies">
                  <label class="check text-sm">
                    <input type="checkbox" v-model="acceptPolicies" class="cbox" />
                    <span>{{ t('accept') }} <a href="#" class="link !text-xs">{{ t('terms') }}</a>.</span>
                  </label>
                  <Transition name="fade"><p v-if="!acceptPolicies" class="policy-hint">{{ t('acceptHint') }}</p></Transition>
                </div>
  
                <!-- CTA -->
                <div class="submit">
                  <button type="submit" :disabled="isLoading || !acceptPolicies" class="cta cta-lg">
                    <svg v-if="isLoading" class="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
                    </svg>
                    <span>{{ isLoading ? t('verifying') : t('createAccount') }}</span>
                  </button>
                </div>
  
                <!-- FOOTER -->
                <p class="footnote">
                  {{ t('haveAccount') }}
                  <RouterLink to="/login" class="link">{{ t('loginHere') }}</RouterLink>
                </p>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed, onMounted, nextTick } from 'vue'
  
  /* =========================
     I18N
     ========================= */
  const lang = ref('es')
  const messages = {
    es: {
      skip:'Saltar al contenido principal', system:'Portal Académico', rights:'Todos los derechos reservados.',
      quote:{ body:'La educación es el arma más poderosa que puedes usar para cambiar el mundo.', author:'Nelson Mandela' },
      support:'Soporte Técnico', version:'Versión', theme:'Tema',
      /* Header nav */
      loginTop:'Iniciar sesión', registerNow:'Crear cuenta',
  
      registerTitle:'Crea tu cuenta',
      registerSubtitle:'Completa los datos para registrarte',
      registerSection:'Registro',
  
      fullName:'Nombre completo',
      email:'Correo electrónico',
      username:'Usuario',
      password:'Contraseña',
      confirmPassword:'Confirmar contraseña',
  
      show:'Mostrar', hide:'Ocultar', caps:'Mayúsculas activadas',
      passwordHint:'Mín. 8 caracteres con combinación segura',
  
      accept:'He leído y acepto los', terms:'Términos y Política de Privacidad',
      verifying:'Procesando…', createAccount:'Crear cuenta',
      haveAccount:'¿Ya tienes una cuenta?', loginHere:'Inicia sesión aquí',
  
      fixErrors:'Por favor, corrige los errores para continuar.',
      errors:{
        fullName:{ required:'El nombre es obligatorio.', minLength:'Ingresa al menos 3 caracteres.' },
        email:{ required:'El correo es obligatorio.', invalid:'Formato de correo inválido.' },
        username:{ required:'El usuario es obligatorio.', invalid:'Mín. 4 caracteres (letras, números, . _ -).' },
        password:{ required:'La contraseña es obligatoria.', minLength:'Debe tener al menos 8 caracteres.' },
        confirm:{ required:'Confirma tu contraseña.', mismatch:'Las contraseñas no coinciden.' }
      },
      acceptHint:'Debes aceptar los términos para poder continuar.'
    },
    en: {
      skip:'Skip to main content', system:'Academic Portal', rights:'All rights reserved.',
      quote:{ body:'Education is the most powerful weapon which you can use to change the world.', author:'Nelson Mandela' },
      support:'Technical Support', version:'Version', theme:'Theme',
      /* Header nav */
      loginTop:'Sign in', registerNow:'Create account',
  
      registerTitle:'Create your account',
      registerSubtitle:'Fill in your details to sign up',
      registerSection:'Registration',
  
      fullName:'Full name',
      email:'Email address',
      username:'Username',
      password:'Password',
      confirmPassword:'Confirm password',
  
      show:'Show', hide:'Hide', caps:'Caps Lock is on',
      passwordHint:'Min 8 chars with mixed complexity',
  
      accept:'I have read and agree to the', terms:'Terms and Privacy Policy',
      verifying:'Processing…', createAccount:'Create account',
      haveAccount:'Already have an account?', loginHere:'Sign in here',
  
      fixErrors:'Please fix the errors to continue.',
      errors:{
        fullName:{ required:'Name is required.', minLength:'Please enter at least 3 characters.' },
        email:{ required:'Email is required.', invalid:'Invalid email format.' },
        username:{ required:'Username is required.', invalid:'Min 4 characters (letters, numbers, . _ -).' },
        password:{ required:'Password is required.', minLength:'Must be at least 8 characters.' },
        confirm:{ required:'Please confirm your password.', mismatch:'Passwords do not match.' }
      },
      acceptHint:'You must accept the terms to continue.'
    }
  }
  const t = (key)=> key.split('.').reduce((o,k)=>(o?o[k]:key), messages[lang.value])
  const persistLang = () => { localStorage.setItem('lang', lang.value); document.documentElement.lang = lang.value }
  
  /* =========================
     THEME
     ========================= */
  const theme = ref('light')
  const themeTitle = computed(()=> theme.value==='light' ? 'Activar modo oscuro' : 'Activar modo claro')
  const toggleTheme = ()=> { theme.value = theme.value==='light' ? 'dark' : 'light'; applyTheme() }
  function applyTheme(){ document.documentElement.classList.toggle('dark', theme.value==='dark'); localStorage.setItem('theme', theme.value) }
  
  /* =========================
     FORM STATE
     ========================= */
  const isLoading = ref(false)
  const fullName = ref(''), email = ref(''), username = ref(''), password = ref(''), confirm = ref('')
  const showPassword = ref(false), showConfirm = ref(false)
  const capsLockPass = ref(false), capsLockConfirm = ref(false)
  
  const fullNameError = ref(''), emailError = ref(''), usernameError = ref(''), passwordError = ref(''), confirmError = ref('')
  const fullNameInput = ref(null), emailInput = ref(null), usernameInput = ref(null), passwordInput = ref(null), confirmInput = ref(null)
  
  const acceptPolicies = ref(false)
  const errorSummary = computed(()=> [fullNameError.value, emailError.value, usernameError.value, passwordError.value, confirmError.value].filter(Boolean))
  
  /* =========================
     PASSWORD STRENGTH
     ========================= */
  const strength = ref(0)
  const strengthBarClass = computed(()=> strength.value<35 ? 'bg-red-500' : strength.value<70 ? 'bg-amber-500' : 'bg-green-500')
  watch(password, (val)=>{
    let s = 0
    if (!val) { strength.value = 0; return }
    s += val.length * 4
    if (/\d/.test(val)) s += 10
    if (/[a-z]/.test(val)) s += 10
    if (/[A-Z]/.test(val)) s += 10
    if (/[^A-Za-z0-9]/.test(val)) s += 15
    strength.value = Math.min(s, 100)
  })
  
  /* =========================
     VALIDATION
     ========================= */
  const validateField = (field)=>{
    if (field==='fullName') {
      if (!fullName.value) fullNameError.value = t('errors.fullName.required')
      else if (fullName.value.length < 3) fullNameError.value = t('errors.fullName.minLength')
      else fullNameError.value = ''
    }
    if (field==='email') {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
      if (!email.value) emailError.value = t('errors.email.required')
      else if (!isEmail) emailError.value = t('errors.email.invalid')
      else emailError.value = ''
    }
    if (field==='username') {
      const isUser = /^[a-zA-Z0-9._-]{4,}$/.test(username.value)
      if (!username.value) usernameError.value = t('errors.username.required')
      else if (!isUser) usernameError.value = t('errors.username.invalid')
      else usernameError.value = ''
    }
    if (field==='password') {
      if (!password.value) passwordError.value = t('errors.password.required')
      else if (password.value.length < 8) passwordError.value = t('errors.password.minLength')
      else passwordError.value = ''
    }
    if (field==='confirm') {
      if (!confirm.value) confirmError.value = t('errors.confirm.required')
      else if (confirm.value !== password.value) confirmError.value = t('errors.confirm.mismatch')
      else confirmError.value = ''
    }
  }
  
  const validateAll = ()=>{
    validateField('fullName'); validateField('email'); validateField('username'); validateField('password'); validateField('confirm')
    return !errorSummary.value.length && acceptPolicies.value
  }
  
  /* =========================
     SUBMIT
     ========================= */
  const handleRegister = async ()=>{
    if (!validateAll()) {
      await nextTick()
      if (fullNameError.value) fullNameInput.value?.focus()
      else if (emailError.value) emailInput.value?.focus()
      else if (usernameError.value) usernameInput.value?.focus()
      else if (passwordError.value) passwordInput.value?.focus()
      else if (confirmError.value) confirmInput.value?.focus()
      return
    }
    isLoading.value = true
    setTimeout(()=>{
      localStorage.setItem('lastUser', username.value || email.value)
      alert((lang.value==='es'
        ? `¡Cuenta creada para ${fullName.value || username.value}!`
        : `Account created for ${fullName.value || username.value}!`))
      isLoading.value = false
    }, 900)
  }
  
  /* =========================
     ON MOUNT
     ========================= */
  onMounted(()=>{
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    theme.value = savedTheme; applyTheme()
  
    const savedLang = localStorage.getItem('lang')
    if (savedLang) { lang.value = savedLang; document.documentElement.lang = savedLang }
  })
  </script>
  
  <style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  /* ===== BASE ===== */
  @layer base {
    .shell {
      @apply min-h-screen text-slate-800 antialiased dark:text-slate-100;
      background:
        linear-gradient(0deg, rgba(15,23,42,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px);
      background-size: 26px 26px;
    }
    .dark .shell {
      background:
        linear-gradient(0deg, rgba(148,163,184,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px);
      background-size: 26px 26px;
      @apply bg-slate-900;
    }
    .sr-only-focusable { @apply sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg; }
  }
  
  /* ===== COMPONENTS ===== */
  @layer components {
    /* ===== Header ===== */
    .site-header { @apply sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/60 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/60; }
    .header-container { @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between; }
    .brand-link { @apply inline-flex items-center gap-2 text-slate-900 dark:text-white; }
    .brand-mark { @apply inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white; }
    .brand-name { @apply text-base font-bold tracking-tight; }
    .brand-system { @apply hidden sm:inline text-[12px] text-slate-500 dark:text-slate-400; }
  
    .site-nav { @apply hidden md:flex items-center gap-2; }
    .nav-link { @apply px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white; }
    .nav-cta { @apply inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110; }
  
    .header-actions { @apply flex items-center gap-3; }
    .select { @apply cursor-pointer bg-transparent outline-none border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm; }
    .lang { @apply hidden sm:flex items-center gap-1.5 text-slate-500 dark:text-slate-400; }
    .icon-btn { @apply rounded-full p-1.5 text-slate-500 transition hover:text-slate-800 hover:bg-slate-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50; }
  
    /* Izquierda (editorial) */
    .left-rail { @apply relative hidden lg:block border-r border-slate-200/70 dark:border-slate-800/70; background: linear-gradient(180deg, rgba(37,99,235,0.05), rgba(79,70,229,0.05)); }
    .brand-ribbon { position:absolute; inset:-8rem -4rem -8rem auto; width:40%; background:linear-gradient(135deg,#2563eb,#4f46e5 60%,#7c3aed); transform:skewX(-18deg); opacity:.25; filter:saturate(1.1); pointer-events:none; }
    .dark .brand-ribbon{opacity:.22;}
    .texture{ @apply absolute inset-0 opacity-20; background-image: radial-gradient(12rem 12rem at 20% 10%, currentColor 1px, transparent 1px); background-size:28px 28px; pointer-events:none; }
    .rail-content{ @apply relative z-10 h-full flex flex-col justify-between p-12 xl:p-14; }
  
    .brand-text .title{ @apply block text-2xl font-extrabold tracking-tight; }
    .brand-text .subtitle{ @apply block text-sm text-slate-500 dark:text-slate-400; }
  
    .quote{ @apply mt-12 text-lg leading-relaxed text-slate-700 dark:text-slate-300 max-w-xl; }
    .quote .body{ @apply font-serif italic; }
    .quote .author{ @apply mt-3 block text-sm text-slate-500 dark:text-slate-400; }
  
    .meta{ @apply text-[13px] text-slate-600 dark:text-slate-400; }
    .kicker{ @apply flex items-center gap-2 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px] mt-8; }
    .kicker .line{ @apply inline-block h-px w-10 bg-current; }
    .meta-link{ @apply hover:underline; }
  
    /* Derecha */
    .right-pane{ @apply flex items-start sm:items-center justify-center p-6 sm:p-10; }
  
    /* Wrapper ancho del form y cabecera */
    .right-stack{ width:100%; max-width:64rem; }
    @media (min-width: 1280px){ .right-stack{ max-width:72rem; } }
  
    .headline{ @apply pb-5 border-b border-slate-200/70 dark:border-slate-700/70; }
    .headline h2{ @apply text-[30px] sm:text-[34px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight; }
    .headline p{ @apply mt-1 text-sm text-slate-500 dark:text-slate-400; }
  
    .section-kicker{ @apply mt-5 flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500; }
    .section-kicker .bar{ @apply inline-block h-[2px] w-8 bg-blue-600 dark:bg-blue-400; }
  
    .form-edge{ @apply mt-2 pl-6 relative; }
    .form-edge::before{ content:""; @apply absolute left-0 top-0 h-full bg-gradient-to-b from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400; width:4px; }
    .form{ @apply mt-4; }
  
    .error-inline{ @apply text-sm font-medium text-red-600 dark:text-red-400; }
  
    .field{ margin-top:1.15rem; }
    .label-row{ @apply flex items-center justify-between; }
    .label{ @apply text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300; }
  
    .input-wrap{ position:relative; margin-top:.25rem; }
    .icon{ position:absolute; inset:0 auto 0 0; width:2.75rem; display:flex; align-items:center; justify-content:center; }
    .inp-lg{ font-size:16px; line-height:1.5; min-height:44px; }
    .input{
      @apply w-full bg-transparent border-0 border-b border-slate-300/80 dark:border-slate-600/80 px-4 text-[15px] outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500;
      padding-left:2.75rem;
    }
    .input:focus{ @apply border-blue-600 dark:border-blue-400; }
    .input--error{ @apply border-red-500/70 focus:border-red-500/70; }
  
    .underline{
      position:absolute; left:0; right:0; bottom:-1px; height:2px; transform-origin:left; transform:scaleX(0);
      background:linear-gradient(90deg,#2563eb,#4f46e5,#7c3aed); transition:transform .28s ease;
    }
    .group:focus-within .underline{ transform:scaleX(1); }
  
    .toggle{ @apply absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500 transition hover:text-slate-800 dark:hover:text-slate-200; }
    .caps{ @apply absolute -bottom-5 right-0 text-xs text-amber-600 dark:text-amber-400; }
  
    .hint--error{ @apply mt-1.5 text-xs text-red-600 dark:text-red-400; }
  
    .strength{ @apply pt-1; }
    .track{ height:6px; width:100%; overflow:hidden; border-radius:9999px; background:rgba(148,163,184,.35); }
    .dark .track{ background:rgba(71,85,105,.6); }
    .fill{ @apply h-full transition-all duration-300; }
  
    .check{ @apply flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 select-none; }
    .cbox{ @apply h-4 w-4 cursor-pointer rounded border-slate-400 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800; }
  
    .submit{ @apply mt-4; }
    .cta{ @apply inline-flex w-full items-center justify-center px-4 py-2.5 text-sm font-semibold text-white outline-none transition disabled:cursor-not-allowed; background:linear-gradient(90deg,#2563eb,#4f46e5); }
    .cta-lg{ height:48px; font-weight:700; letter-spacing:.2px; }
    .cta:hover{ filter:brightness(1.05); }
    .cta:disabled{ opacity:.75; }
    .cta:focus-visible{ @apply ring-2 ring-blue-500/40 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900; }
  
    .policies{ @apply mt-2; }
    .policy-hint{ @apply mt-2 text-left text-xs text-slate-500; }
  
    .footnote{ @apply mt-8 text-left text-sm text-slate-600 dark:text-slate-400; }
    .link{ @apply font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-2 hover:underline; }
  }
  
  /* ===== TRANSICIONES ===== */
  .fade-enter-active, .fade-leave-active{ transition:opacity .18s ease, transform .18s ease; }
  .fade-enter-from, .fade-leave-to{ opacity:0; transform:translateY(-4px); }
  </style>
  