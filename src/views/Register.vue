<template>
  <main class="relative isolate min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">

    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(203,213,225,0.2)_1px,transparent_1px),linear-gradient(0deg,rgba(203,213,225,0.2)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>

    <a href="#register-form" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:shadow-lg">{{ t('skip') }}</a>

    <div class="flex h-screen flex-col">

      <header class="w-full shrink-0">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
          <router-link to="/login" class="inline-flex items-center gap-2 text-sm font-semibold">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            {{ t('loginTop') }}
          </router-link>
          <div class="text-sm font-semibold">{{ t('system') }}</div>
        </div>
      </header>

      <div class="flex-1 lg:overflow-y-hidden">
        <div class="relative mx-auto grid h-full max-w-7xl grid-cols-1 lg:grid-cols-2">

          <aside class="hidden lg:sticky lg:top-0 lg:flex lg:h-full lg:flex-col lg:justify-between lg:px-8 lg:py-12">
            <div class="text-3xl font-black tracking-tight">LARA<span class="text-sky-500">.</span></div>
            <figure>
              <blockquote class="text-2xl font-semibold leading-relaxed">“{{ t('quote.body') }}”</blockquote>
              <figcaption class="mt-4 text-sm text-slate-600 dark:text-slate-400">— {{ t('quote.author') }}</figcaption>
            </figure>
          </aside>

          <section class="flex flex-col justify-center px-6 py-8 sm:px-8 lg:px-12">
            <div class="w-full max-w-md">
              <header>
                <h1 class="text-3xl font-extrabold tracking-tight">{{ t('registerTitle') }}</h1>
                <p class="mt-1 text-slate-600 dark:text-slate-400">{{ t('registerSubtitle') }}</p>
              </header>

              <form id="register-form" @submit.prevent="handleRegister" class="mt-6 space-y-5">
                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label for="fullName" class="text-sm font-medium">{{ t('fullName') }}</label>
                    <input id="fullName" ref="fullNameInput" v-model="fullName" @blur="validateField('fullName')"
                           type="text" autocomplete="name" required
                           :class="['mt-1 block w-full rounded-md border py-2 px-3 text-sm shadow-sm', fullNameError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700']" />
                    <p v-if="fullNameError" class="mt-1 text-xs text-red-500">{{ fullNameError }}</p>
                  </div>
                  <div>
                    <label for="username" class="text-sm font-medium">{{ t('username') }}</label>
                    <input id="username" ref="usernameInput" v-model="username" @blur="validateField('username')"
                           type="text" autocomplete="username" required
                           :class="['mt-1 block w-full rounded-md border py-2 px-3 text-sm shadow-sm', usernameError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700']" />
                    <p v-if="usernameError" class="mt-1 text-xs text-red-500">{{ usernameError }}</p>
                  </div>
                </div>

                <div>
                  <label for="email" class="text-sm font-medium">{{ t('email') }}</label>
                  <input id="email" ref="emailInput" v-model="email" @blur="validateField('email')"
                         type="email" autocomplete="email" required
                         :class="['mt-1 block w-full rounded-md border py-2 px-3 text-sm shadow-sm', emailError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700']" />
                  <p v-if="emailError" class="mt-1 text-xs text-red-500">{{ emailError }}</p>
                </div>

                <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label for="password" class="text-sm font-medium">{{ t('password') }}</label>
                    <div class="relative mt-1">
                      <input id="password" ref="passwordInput" v-model="password" @blur="validateField('password')" :type="showPassword ? 'text' : 'password'" autocomplete="new-password" required
                             :class="['block w-full rounded-md border py-2 px-3 text-sm shadow-sm', passwordError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700']" />
                      <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-slate-500">{{ showPassword ? t('hide') : t('show') }}</button>
                    </div>
                     <p v-if="passwordError" class="mt-1 text-xs text-red-500">{{ passwordError }}</p>
                  </div>
                  <div>
                    <label for="confirm" class="text-sm font-medium">{{ t('confirmPassword') }}</label>
                    <div class="relative mt-1">
                      <input id="confirm" ref="confirmInput" v-model="confirm" @blur="validateField('confirm')" :type="showConfirm ? 'text' : 'password'" autocomplete="new-password" required
                             :class="['block w-full rounded-md border py-2 px-3 text-sm shadow-sm', confirmError ? 'border-red-500' : 'border-slate-300 dark:border-slate-700']" />
                       <button type="button" @click="showConfirm = !showConfirm" class="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-slate-500">{{ showConfirm ? t('hide') : t('show') }}</button>
                    </div>
                     <p v-if="confirmError" class="mt-1 text-xs text-red-500">{{ confirmError }}</p>
                  </div>
                </div>
                
                <div>
                    <div class="h-1 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                      <div class="h-1 rounded-full transition-all" :class="strengthBarClass" :style="{ width: strength + '%' }"></div>
                    </div>
                    <div class="mt-2 flex items-start">
                      <div class="flex h-5 items-center">
                        <input id="accept-policies" type="checkbox" v-model="acceptPolicies" class="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                      </div>
                      <label for="accept-policies" class="ml-3 text-sm">
                        {{ t('accept') }} <a href="#" class="font-medium text-sky-600 hover:underline">{{ t('terms') }}</a>.
                      </label>
                    </div>
                </div>

                <div v-if="errorSummary.length" class="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
                  <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ t('fixErrors') }}</p>
                </div>
                
                <div>
                  <button type="submit" :disabled="isLoading || !acceptPolicies" class="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2.5 px-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 disabled:opacity-50">
                    <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    {{ isLoading ? t('verifying') : t('createAccount') }}
                  </button>
                </div>
              </form>

              <p class="mt-6 text-center text-sm">
                {{ t('haveAccount') }}
                <router-link to="/login" class="font-medium text-sky-600 hover:underline">{{ t('loginHere') }}</router-link>
              </p>
            </div>
          </section>
        </div>
      </div>

      <footer class="w-full shrink-0">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-3 sm:flex-row lg:px-8">
          <p class="text-sm text-slate-500">&copy; {{ new Date().getFullYear() }} LARA. {{ t('rights') }}</p>
          <div class="flex items-center gap-4 text-sm">
            <a href="#" class="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">{{ t('support') }}</a>
            <span class="text-slate-300 dark:text-slate-700">|</span>
            <div class="relative">
              <select v-model="lang" @change="persistLang" class="appearance-none bg-transparent py-1 pl-2 pr-7 text-sm text-slate-600 focus:outline-none focus:ring-0 dark:text-slate-400">
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
              <svg class="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </div>
            <button @click="toggleTheme" class="text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200" :aria-label="themeTitle">
              <svg v-if="theme==='light'" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
              <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
            </button>
          </div>
        </div>
      </footer>
    </div>
  </main>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

/* =========================
   I18N
   ========================= */
const lang = ref('es')
const messages = {
    es: {
      skip:'Saltar al contenido principal', system:'Portal Académico', rights:'Todos los derechos reservados.',
      quote:{ body:'La educación es el arma más poderosa que puedes usar para cambiar el mundo.', author:'Nelson Mandela' },
      support:'Sorte Técnico', version:'Versión', theme:'Tema',
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
   SUBMIT HANDLER
   ========================= */
const handleRegister = async () => {
  if (!validateAll()) {
    await nextTick();
    if (fullNameError.value) fullNameInput.value?.focus();
    else if (emailError.value) emailInput.value?.focus();
    else if (usernameError.value) usernameInput.value?.focus();
    else if (passwordError.value) passwordInput.value?.focus();
    else if (confirmError.value) confirmInput.value?.focus();
    return;
  }
  isLoading.value = true;
  
  try {
    const API_URL = 'http://localhost:8000/users';

    const userData = {
      full_name: fullName.value,
      email: email.value,
      password: password.value,
    };

    const response = await axios.post(API_URL, userData);

    console.log('Usuario registrado:', response.data);
    alert(`¡Cuenta creada para ${fullName.value}! Serás redirigido para iniciar sesión.`);
    router.push('/login');

  } catch (error) {
    if (error.response) {
      emailError.value = error.response.data.detail || 'Ocurrió un error en el servidor.';
      console.error('Error del servidor:', error.response.data);
    } else {
      emailError.value = 'No se pudo conectar con el servidor. Inténtalo más tarde.';
      console.error('Error de red:', error);
    }
  } finally {
    isLoading.value = false;
  }
};

/* =========================
   LIFECYCLE & HELPERS
   ========================= */
onMounted(()=>{
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  theme.value = savedTheme; applyTheme()
  const savedLang = localStorage.getItem('lang')
  if (savedLang) { lang.value = savedLang; document.documentElement.lang = savedLang }
})
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
</style>