<template>
  <main class="relative isolate min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">

    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(203,213,225,0.2)_1px,transparent_1px),linear-gradient(0deg,rgba(203,213,225,0.2)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>

    <a href="#login-form" class="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:shadow-lg">{{ t('skip') }}</a>

    <div class="flex h-screen flex-col">

      <header class="w-full shrink-0">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <router-link to="/login" class="inline-flex items-center gap-2 text-sm font-semibold">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            {{ t('loginTop') }}
          </router-link>
          <div class="text-sm font-semibold">{{ t('system') }}</div>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto">
        <div class="relative mx-auto grid min-h-full max-w-7xl grid-cols-1 lg:grid-cols-2">

          <aside class="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:px-8 lg:py-16">
            <div>
              <div class="text-3xl font-black tracking-tight">I.E. <span class="text-sky-500">20798</span></div>
              <p class="mt-2 text-lg font-medium text-slate-700 dark:text-slate-300">Manuel Cayahuallpa Coriguan</p>
              <p class="mt-4 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-700">Formando líderes para el futuro de Imperial, Cañete.</p>
            </div>
            <figure>
              <blockquote class="text-2xl font-semibold leading-relaxed">“{{ t('quote.body') }}”</blockquote>
              <figcaption class="mt-4 text-sm text-slate-600 dark:text-slate-400">— {{ t('quote.author') }}</figcaption>
            </figure>
          </aside>

          <section class="flex flex-col justify-center px-6 py-12 sm:px-8 lg:px-12">
            <div class="w-full max-w-md">
              <header>
                <h1 class="text-3xl font-extrabold tracking-tight">{{ t('loginTitle') }}</h1>
                <p class="mt-2 text-slate-600 dark:text-slate-400">{{ t('loginSubtitle') }}</p>
              </header>

              <form id="login-form" @submit.prevent="handleLogin" class="mt-8 space-y-8">
                <div>
                  <label for="email" class="text-sm font-medium">{{ t('email') }}</label>
                  <input id="email" ref="emailInput" v-model="email" @blur="validateField('email')"
                         type="email" autocomplete="email" required
                         :class="['mt-2 block w-full rounded-md border py-2 px-3 text-sm shadow-sm placeholder:text-slate-400 dark:bg-slate-900',
                                  emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                             : 'border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500']" />
                  <p v-if="emailError" class="mt-1 text-xs text-red-500">{{ emailError }}</p>
                </div>

                <div>
                  <label for="password" class="text-sm font-medium">{{ t('password') }}</label>
                  <div class="relative mt-2">
                    <input id="password" v-model="password" @blur="validateField('password')" @keyup="(e)=>capsLock = e.getModifierState('CapsLock')"
                           :type="showPassword ? 'text' : 'password'" autocomplete="current-password" required
                           :class="['block w-full rounded-md border py-2 px-3 text-sm shadow-sm placeholder:text-slate-400 dark:bg-slate-900',
                                    passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                                                  : 'border-slate-300 dark:border-slate-700 focus:border-sky-500 focus:ring-sky-500']" />
                    <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center px-3 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" :aria-label="showPassword ? t('hide') : t('show')">{{ showPassword ? t('hide') : t('show') }}</button>
                  </div>
                  <div class="mt-1 flex items-center justify-between text-xs">
                    <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
                    <p v-if="capsLock" class="text-amber-600 font-semibold">{{ t('caps') }}</p>
                  </div>
                </div>

                <div v-if="errorSummary.length && !passwordError" class="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                  <div class="flex">
                    <div class="shrink-0">
                      <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" /></svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-red-800 dark:text-red-300">{{ t('fixErrors') }}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <button type="submit" :disabled="isLoading"
                          class="flex w-full justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-semibold text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    {{ isLoading ? t('verifying') : t('signIn') }}
                  </button>
                </div>
              </form>

              </div>
          </section>
        </div>
      </div>

      <footer class="w-full shrink-0">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row lg:px-8">
          <p class="text-sm text-slate-500">&copy; {{ new Date().getFullYear() }} I.E. 20798. {{ t('rights') }}</p>
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
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/user.js';

const router = useRouter();
const userStore = useUserStore();

/* =========================
   I18N
   ========================= */
const lang = ref('es');
const messages = {
    es: {
      skip: 'Saltar al contenido principal', system: 'Portal Académico', rights: 'Todos los derechos reservados.',
      quote: { body: 'La educación es el arma más poderosa que puedes usar para cambiar el mundo.', author: 'Nelson Mandela' },
      support: 'Soporte Técnico', version: 'Versión', theme: 'Tema',
      loginTop: 'Iniciar sesión',
      loginTitle: 'Bienvenido de vuelta',
      loginSubtitle: 'Ingresa a tu cuenta para continuar',
      email: 'Correo electrónico',
      password: 'Contraseña',
      show: 'Mostrar', hide: 'Ocultar', caps: 'Mayúsculas activadas',
      verifying: 'Verificando…', signIn: 'Iniciar sesión',
      fixErrors: 'Por favor, corrige los errores para continuar.',
      errors: {
        email: { required: 'El correo es obligatorio.' },
        password: { required: 'La contraseña es obligatoria.' }
      },
    },
    en: {
      skip: 'Skip to main content', system: 'Academic Portal', rights: 'All rights reserved.',
      quote: { body: 'Education is the most powerful weapon which you can use to change the world.', author: 'Nelson Mandela' },
      support: 'Technical Support', version: 'Version', theme: 'Theme',
      loginTop: 'Sign in',
      loginTitle: 'Welcome back',
      loginSubtitle: 'Sign in to your account to continue',
      email: 'Email address',
      password: 'Password',
      show: 'Show', hide: 'Hide', caps: 'Caps Lock is on',
      verifying: 'Verifying…', signIn: 'Sign in',
      fixErrors: 'Please fix the errors to continue.',
      errors: {
        email: { required: 'Email is required.' },
        password: { required: 'Password is required.' }
      },
    }
};
const t = (key) => key.split('.').reduce((o, k) => (o ? o[k] : key), messages[lang.value]);
const persistLang = () => { localStorage.setItem('lang', lang.value); document.documentElement.lang = lang.value; };

/* =========================
   THEME
   ========================= */
const theme = ref('light');
const themeTitle = computed(() => theme.value === 'light' ? 'Activar modo oscuro' : 'Activar modo claro');
const toggleTheme = () => { theme.value = theme.value === 'light' ? 'dark' : 'light'; applyTheme(); };
function applyTheme() { document.documentElement.classList.toggle('dark', theme.value === 'dark'); localStorage.setItem('theme', theme.value); }

/* =========================
   FORM STATE
   ========================= */
const isLoading = ref(false);
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const capsLock = ref(false);
const emailError = ref('');
const passwordError = ref('');
const emailInput = ref(null);
const errorSummary = computed(() => [emailError.value, passwordError.value].filter(Boolean));

/* =========================
   VALIDATION
   ========================= */
const validateField = (field) => {
  if (field === 'email') {
    emailError.value = !email.value ? t('errors.email.required') : '';
  }
  if (field === 'password') {
    passwordError.value = !password.value ? t('errors.password.required') : '';
  }
};
const validateAll = () => {
  validateField('email');
  validateField('password');
  return !errorSummary.value.length;
};

/* =========================
   SUBMIT HANDLER
   ========================= */
const handleLogin = async () => {
  if (!validateAll()) {
    await nextTick();
    emailInput.value?.focus();
    return;
  }
  isLoading.value = true;
  passwordError.value = '';

  try {
    const API_URL = 'http://localhost:8000/login';

    const params = new URLSearchParams();
    params.append('username', email.value);
    params.append('password', password.value);

    const response = await axios.post(API_URL, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const accessToken = response.data.access_token;
    userStore.setToken(accessToken);

    // --- ✨ LÓGICA DE REDIRECCIÓN DINÁMICA ---
    const role = userStore.userRole;

    if (role === 'admin') {
      router.push('/dashboard');
    } else if (role === 'teacher') {
      router.push('/teacher-dashboard');
    } else if (role === 'student') {
      router.push('/student-dashboard');
    } else {
      console.error('Rol no reconocido:', role);
      router.push('/login');
    }

  } catch (error) {
    if (error.response && error.response.status === 401) {
      passwordError.value = 'Email o contraseña incorrectos.';
    } else if (error.response) {
      passwordError.value = error.response.data.detail || 'Ocurrió un error en el servidor.';
      console.error('Error del servidor:', error.response.data);
    } else {
      passwordError.value = 'No se pudo conectar con el servidor.';
      console.error('Error de red:', error);
    }
  } finally {
    isLoading.value = false;
  }
};

/* =========================
   LIFECYCLE & HELPERS
   ========================= */
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  theme.value = savedTheme;
  applyTheme();
  
  const savedLang = localStorage.getItem('lang');
  if (savedLang) { lang.value = savedLang; document.documentElement.lang = savedLang; }
});
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