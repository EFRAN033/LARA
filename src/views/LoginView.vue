<template>
  <div class="shell compact">
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
          <RouterLink to="/login" class="nav-link">{{ t('login') }}</RouterLink>
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

    <!-- ===== CONTENIDO (sin min-h-screen; usamos content-grid) ===== -->
    <div class="content-grid mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-[0.85fr_1.75fr]">
      <!-- IZQUIERDA -->
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

      <!-- DERECHA -->
      <main id="main" class="right-pane">
        <div class="right-stack">
          <section class="form-edge">
            <header class="headline">
              <h2>{{ t('welcome') }}</h2>
              <p>{{ t('subtitle') }}</p>
            </header>

            <div class="section-kicker">
              <span class="bar"></span><span>Acceso</span>
            </div>

            <form class="form" @submit.prevent="handleLogin" novalidate>
              <Transition name="fade">
                <div v-if="errorSummary.length" class="error-inline" role="alert" aria-live="polite">
                  {{ t('fixErrors') }}
                </div>
              </Transition>

              <!-- USERNAME -->
              <div class="field">
                <label for="username" class="label">{{ t('userOrEmail') }}</label>
                <div class="input-wrap group">
                  <span class="icon" aria-hidden="true">
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7 9a7 7 0 1 1 14 0H3Z" clip-rule="evenodd"/></svg>
                  </span>
                  <input
                    id="username"
                    ref="usernameInput"
                    v-model.trim="username"
                    :class="['input inp-lg', { 'input--error': usernameError }]"
                    type="text"
                    inputmode="email"
                    autocomplete="username"
                    @blur="validateField('username')"
                    :aria-invalid="!!usernameError"
                    :aria-describedby="usernameError ? 'username-error' : undefined"
                    placeholder="tucorreo@ejemplo.com"
                  />
                  <span class="underline" aria-hidden="true"></span>
                </div>
                <Transition name="fade"><p v-if="usernameError" id="username-error" class="hint--error">{{ usernameError }}</p></Transition>
              </div>

              <!-- PASSWORD -->
              <div class="field">
                <div class="label-row">
                  <label for="password" class="label">{{ t('password') }}</label>
                  <RouterLink to="/register" class="link link-inline">{{ t('goRegister') }}</RouterLink>
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
                    autocomplete="current-password"
                    placeholder="••••••••"
                    @keyup="onPasswordKeyup"
                    @blur="validateField('password')"
                    :aria-invalid="!!passwordError"
                    :aria-describedby="passwordError ? 'password-error' : undefined"
                  />
                  <button type="button" @click="togglePassword" class="toggle" :title="showPassword ? t('hide') : t('show')">
                    <svg v-if="!showPassword" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/></svg>
                    <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3.707 2.293a1 1 0 0 0-1.414 1.414l14 14a1 1 0 0 0 1.414-1.414z"/></svg>
                  </button>
                  <Transition name="fade"><span v-if="capsLockOn" class="caps">{{ t('caps') }}</span></Transition>
                  <span class="underline" aria-hidden="true"></span>
                </div>
                <Transition name="fade"><p v-if="passwordError" id="password-error" class="hint--error">{{ passwordError }}</p></Transition>
              </div>

              <!-- STRENGTH -->
              <div class="strength">
                <div class="track"><div class="fill" :class="strengthBarClass" :style="{ width: strength + '%' }"></div></div>
              </div>

              <!-- REMEMBER -->
              <div class="options">
                <label class="check">
                  <input type="checkbox" v-model="remember" class="cbox" />
                  <span>{{ t('remember') }}</span>
                </label>
              </div>

              <!-- CTA -->
              <div class="submit">
                <div class="grid gap-2 sm:grid-cols-2">
                  <button type="submit" :disabled="isLoading || !acceptPolicies" class="cta cta-lg">
                    <svg v-if="isLoading" class="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" />
                    </svg>
                    <span>{{ isLoading ? t('verifying') : t('login') }}</span>
                  </button>

                  <RouterLink to="/register" class="cta-outline cta-lg" role="button">
                    {{ t('registerNow') }}
                  </RouterLink>
                </div>
              </div>

              <!-- TERMS -->
              <div class="policies">
                <label class="check text-xs">
                  <input type="checkbox" v-model="acceptPolicies" class="cbox-sm" />
                  <span>{{ t('accept') }} <a href="#" class="link !text-xs">{{ t('terms') }}</a>.</span>
                </label>
                <Transition name="fade"><p v-if="!acceptPolicies" class="policy-hint">{{ t('acceptHint') }}</p></Transition>
              </div>

              <p class="footnote">
                {{ t('noAccount') }}
                <RouterLink to="/register" class="link">{{ t('create') }}</RouterLink>
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

/* I18N */
const lang = ref('es')
const messages = {
  es: {
    skip:'Saltar al contenido principal', system:'Portal Académico', rights:'Todos los derechos reservados.',
    quote:{ body:'La educación es el arma más poderosa que puedes usar para cambiar el mundo.', author:'Nelson Mandela' },
    support:'Soporte Técnico', version:'Versión', theme:'Tema', welcome:'Bienvenido de nuevo',
    subtitle:'Ingresa a tu cuenta para continuar', fixErrors:'Por favor, corrige los errores para continuar.',
    userOrEmail:'Usuario o Correo', password:'Contraseña', show:'Mostrar', hide:'Ocultar',
    forgot:'¿Olvidaste tu contraseña?', caps:'Mayúsculas activadas', remember:'Recordarme',
    accept:'He leído y acepto los', terms:'Términos y Política de Privacidad',
    verifying:'Verificando…', login:'Ingresar al Portal', noAccount:'¿No tienes una cuenta?', create:'Regístrate aquí',
    goRegister:'Crear cuenta', registerNow:'Crear cuenta',
    acceptHint:'Debes aceptar los términos para poder ingresar.'
  },
  en: {
    skip:'Skip to main content', system:'Academic Portal', rights:'All rights reserved.',
    quote:{ body:'Education is the most powerful weapon which you can use to change the world.', author:'Nelson Mandela' },
    support:'Technical Support', version:'Version', theme:'Theme', welcome:'Welcome Back',
    subtitle:'Sign in to your account to continue', fixErrors:'Please fix the errors to continue.',
    userOrEmail:'Username or Email', password:'Password', show:'Show', hide:'Hide',
    forgot:'Forgot password?', caps:'Caps Lock is on', remember:'Remember me',
    accept:'I have read and agree to the', terms:'Terms and Privacy Policy',
    verifying:'Verifying…', login:'Sign in to Portal', noAccount:"Don't have an account?", create:'Sign up here',
    goRegister:'Create account', registerNow:'Create account',
    acceptHint:'You must accept the terms to sign in.'
  }
}
const t = (key)=> key.split('.').reduce((o,k)=>(o?o[k]:key), messages[lang.value])
const persistLang = () => { localStorage.setItem('lang', lang.value); document.documentElement.lang = lang.value }

/* THEME */
const theme = ref('light')
const themeTitle = computed(()=> theme.value==='light' ? 'Activar modo oscuro' : 'Activar modo claro')
const toggleTheme = ()=> { theme.value = theme.value==='light' ? 'dark' : 'light'; applyTheme() }
function applyTheme(){ document.documentElement.classList.toggle('dark', theme.value==='dark'); localStorage.setItem('theme', theme.value) }

/* FORM STATE */
const isLoading=ref(false), showPassword=ref(false), capsLockOn=ref(false)
const remember=ref(true), acceptPolicies=ref(false), username=ref(''), password=ref('')
const usernameError=ref(''), passwordError=ref('')
const usernameInput=ref(null), passwordInput=ref(null)
const errorSummary = computed(()=> [usernameError.value, passwordError.value].filter(Boolean))
const togglePassword = ()=> { showPassword.value = !showPassword.value }
const onPasswordKeyup = (e)=> { capsLockOn.value = e.getModifierState?.('CapsLock') }

/* STRENGTH */
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

/* VALIDATION */
const validateField = (field)=>{
  if (field === 'username') {
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username.value)
    const isUser  = /^[a-zA-Z0-9._-]{4,}$/.test(username.value)
    if (!username.value) usernameError.value = 'El campo de usuario es obligatorio.'
    else if (!isEmail && !isUser) usernameError.value = 'Formato de usuario o correo inválido.'
    else usernameError.value = ''
  }
  if (field === 'password') {
    if (!password.value) passwordError.value = 'La contraseña es obligatoria.'
    else if (password.value.length < 8) passwordError.value = 'La contraseña debe tener al menos 8 caracteres.'
    else passwordError.value = ''
  }
}
const validateAll = ()=>{ validateField('username'); validateField('password'); return !errorSummary.value.length }

/* SUBMIT */
const handleLogin = async ()=>{
  if (!acceptPolicies.value) return
  if (!validateAll()) {
    await nextTick()
    if (usernameError.value) usernameInput.value?.focus()
    else if (passwordError.value) passwordInput.value?.focus()
    return
  }
  isLoading.value = true
  setTimeout(()=>{
    const map = { admin:'Admin#2025', docente:'Docente#2025' }
    if (map[username.value] === password.value) {
      if (remember.value) localStorage.setItem('lastUser', username.value)
      alert((lang.value==='es' ? '¡Acceso concedido para ' : 'Access granted for ') + username.value + '!')
    } else {
      passwordError.value = 'Las credenciales proporcionadas son incorrectas.'
    }
    isLoading.value = false
  }, 1000)
}

/* ON MOUNT */
onMounted(()=>{
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  theme.value = savedTheme
  applyTheme()

  const savedLang = localStorage.getItem('lang')
  if (savedLang) { lang.value = savedLang; document.documentElement.lang = savedLang }

  const lastUser = localStorage.getItem('lastUser')
  if (lastUser) username.value = lastUser
})
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ===== BASE ===== */
@layer base {
  .shell {
    @apply text-slate-800 antialiased dark:text-slate-100;
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
  .compact .header-container { @apply h-14 px-3 sm:px-5; } /* 56px */

  .brand-link { @apply inline-flex items-center gap-2 text-slate-900 dark:text-white; }
  .brand-mark { @apply inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 text-white; }
  .compact .brand-mark { @apply h-8 w-8; }
  .brand-name { @apply text-base font-bold tracking-tight; }
  .compact .brand-name { @apply text-[15px]; }
  .brand-system { @apply hidden sm:inline text-[12px] text-slate-500 dark:text-slate-400; }

  .site-nav { @apply hidden md:flex items-center gap-2; }
  .nav-link { @apply px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white; }
  .nav-cta { @apply inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110; }
  .compact .nav-link, .compact .nav-cta { @apply px-2.5 py-1.5 text-[13px]; }

  .header-actions { @apply flex items-center gap-3; }
  .select { @apply cursor-pointer bg-transparent outline-none border border-slate-300 dark:border-slate-600 rounded-md px-2 py-1 text-sm; }
  .lang { @apply hidden sm:flex items-center gap-1.5 text-slate-500 dark:text-slate-400; }
  .icon-btn { @apply rounded-full p-1.5 text-slate-500 transition hover:text-slate-800 hover:bg-slate-200/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50; }

  /* ===== Layout sin scroll vertical ===== */
  .content-grid { min-height: calc(100svh - 64px); }   /* header default 64px */
  .compact .content-grid { min-height: calc(100svh - 56px); } /* header compacto 56px */

  /* Izquierda (editorial) */
  .left-rail { @apply relative hidden lg:block border-r border-slate-200/70 dark:border-slate-800/70; background: linear-gradient(180deg, rgba(37,99,235,0.05), rgba(79,70,229,0.05)); }
  .brand-ribbon { position:absolute; inset:-8rem -4rem -8rem auto; width:40%; background:linear-gradient(135deg,#2563eb,#4f46e5 60%,#7c3aed); transform:skewX(-18deg); opacity:.25; filter:saturate(1.1); pointer-events:none; }
  .dark .brand-ribbon{opacity:.22;}
  .texture{ @apply absolute inset-0 opacity-20; background-image: radial-gradient(12rem 12rem at 20% 10%, currentColor 1px, transparent 1px); background-size:28px 28px; pointer-events:none; }
  .rail-content{ @apply relative z-10 h-full flex flex-col justify-between p-12 xl:p-14; }
  .compact .rail-content{ @apply p-8 xl:p-10; }

  .brand-text .title{ @apply block text-2xl font-extrabold tracking-tight; }
  .brand-text .subtitle{ @apply block text-sm text-slate-500 dark:text-slate-400; }

  .quote{ @apply mt-12 text-lg leading-relaxed text-slate-700 dark:text-slate-300 max-w-xl; }
  .compact .quote{ @apply mt-6 text-[15px] leading-relaxed; }
  /* Clamp para no crecer verticalmente */
  .compact .quote .body{ display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
  .quote .author{ @apply mt-3 block text-sm text-slate-500 dark:text-slate-400; }

  .meta{ @apply text-[13px] text-slate-600 dark:text-slate-400; }
  .kicker{ @apply flex items-center gap-2 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[11px] mt-8; }
  .compact .kicker{ @apply mt-5; }
  .kicker .line{ @apply inline-block h-px w-10 bg-current; }
  .meta-link{ @apply hover:underline; }

  /* Derecha */
  .right-pane{ @apply flex items-start sm:items-center justify-center p-6 sm:p-10; }
  .compact .right-pane{ @apply p-3 sm:p-6; }

  .right-stack{ width:100%; max-width:56rem; }
  @media (min-width: 1280px){ .right-stack{ max-width:64rem; } }
  .compact .right-stack{ max-width:60rem; }

  .headline{ @apply pb-5 border-b border-slate-200/70 dark:border-slate-700/70; }
  .headline h2{ @apply text-[30px] sm:text-[34px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight; }
  .headline p{ @apply mt-1 text-sm text-slate-500 dark:text-slate-400; }
  .compact .headline{ @apply pb-3; }
  .compact .headline h2{ @apply text-[26px] sm:text-[28px]; }
  .compact .headline p{ @apply text-[13px]; }

  .section-kicker{ @apply mt-5 flex items-center gap-2 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500; }
  .section-kicker .bar{ @apply inline-block h-[2px] w-8 bg-blue-600 dark:bg-blue-400; }
  .compact .section-kicker{ @apply mt-3; }

  .form-edge{ @apply mt-2 pl-6 relative; }
  .form-edge::before{ content:""; @apply absolute left-0 top-0 h-full bg-gradient-to-b from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400; width:4px; }
  .form{ @apply mt-4; }

  .error-inline{ @apply text-sm font-medium text-red-600 dark:text-red-400; }

  .field{ margin-top:1.15rem; }
  .compact .field{ margin-top:.5rem; }

  .label-row{ @apply flex items-center justify-between; }
  .label{ @apply text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300; }
  .compact .label{ @apply text-[13px]; }

  .input-wrap{ position:relative; margin-top:.25rem; }
  .icon{ position:absolute; inset:0 auto 0 0; width:2.75rem; display:flex; align-items:center; justify-content:center; }
  .inp-lg{ font-size:16px; line-height:1.5; min-height:44px; }
  .compact .inp-lg{ min-height:38px; font-size:15px; }

  .input{
    @apply w-full bg-transparent border-0 border-b border-slate-300/80 dark:border-slate-600/80 px-4 text-[15px] outline-none transition placeholder:text-slate-400 dark:placeholder:text-slate-500;
    padding-left:2.75rem;
  }
  .input:focus{ @apply border-blue-600 dark:border-blue-400; }
  .input--error{ @apply border-red-500/70 focus:border-red-500/70; }
  .compact .input{ @apply px-3; padding-left:2.5rem; }

  .underline{
    position:absolute; left:0; right:0; bottom:-1px; height:2px; transform-origin:left; transform:scaleX(0);
    background:linear-gradient(90deg,#2563eb,#4f46e5,#7c3aed); transition:transform .28s ease;
  }
  .group:focus-within .underline{ transform:scaleX(1); }

  .toggle{ @apply absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500 transition hover:text-slate-800 dark:hover:text-slate-200; }
  .compact .toggle{ @apply px-3; }
  .caps{ @apply absolute -bottom-5 right-0 text-xs text-amber-600 dark:text-amber-400; }
  .compact .caps{ @apply -bottom-4 text-[11px]; }

  .hint--error{ @apply mt-1.5 text-xs text-red-600 dark:text-red-400; }

  .strength{ @apply pt-1; }
  .track{ height:6px; width:100%; overflow:hidden; border-radius:9999px; background:rgba(148,163,184,.35); }
  .dark .track{ background:rgba(71,85,105,.6); }
  .fill{ @apply h-full transition-all duration-300; }
  .compact .track{ height:4px; }

  .link-inline{ white-space:nowrap; }
  @media (max-width:640px){ .link-inline{ white-space:normal; } }

  .options{ @apply mt-4 flex items-center justify-between; }
  .compact .options{ @apply mt-3; }

  .check{ @apply flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 select-none; }
  .cbox,.cbox-sm{ accent-color:#2563eb; }
  .cbox{ @apply h-4 w-4 cursor-pointer rounded border-slate-400 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800; }
  .cbox-sm{ @apply h-3.5 w-3.5 cursor-pointer rounded-sm border-slate-400 text-blue-600 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-800; }

  .submit{ @apply mt-4; }
  .compact .submit{ @apply mt-3; }
  .cta{ @apply inline-flex w-full items-center justify-center px-4 py-2.5 text-sm font-semibold text-white outline-none transition disabled:cursor-not-allowed; background:linear-gradient(90deg,#2563eb,#4f46e5); }
  .cta-lg{ height:48px; font-weight:700; letter-spacing:.2px; }
  .compact .cta-lg{ height:38px; }

  .cta:hover{ filter:brightness(1.05); }
  .cta:disabled{ opacity:.75; }
  .cta:focus-visible{ @apply ring-2 ring-blue-500/40 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900; }

  .cta-outline{
    @apply inline-flex w-full items-center justify-center px-4 py-2.5 text-sm font-semibold outline-none transition rounded;
    @apply border border-slate-300 text-slate-700 bg-white hover:bg-slate-50;
    @apply dark:border-slate-600 dark:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700;
    text-align:center;
  }
  .compact .cta-outline{ @apply py-2; }

  .policies{ @apply mt-4; }
  .compact .policies{ @apply mt-2; }
  .policy-hint{ @apply mt-2 text-left text-xs text-slate-500; }

  .footnote{ @apply mt-8 text-left text-sm text-slate-600 dark:text-slate-400; }
  .compact .footnote{ @apply mt-5; }
  .link{ @apply font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-2 hover:underline; }
}

/* ===== TRANSICIONES ===== */
.fade-enter-active, .fade-leave-active{ transition:opacity .18s ease, transform .18s ease; }
.fade-enter-from, .fade-leave-to{ opacity:0; transform:translateY(-4px); }
</style>
