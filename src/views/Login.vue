<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <header class="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <router-link to="/" class="flex items-center space-x-2 group">
            <div class="w-8 h-8 rounded-full bg-gradient-to-r from-[#d7037b] to-[#9e0154] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900 group-hover:text-[#d7037b] transition-colors">
              Kambia<span class="text-[#9e0154]">Pe</span>
            </span>
          </router-link>

          <nav class="hidden md:flex items-center space-x-8">
            <router-link to="/about" class="text-sm font-medium text-gray-500 hover:text-[#d7037b] transition-colors">
              ¿Qué es KambiaPe?
            </router-link>
            <router-link to="/pricing" class="text-sm font-medium text-gray-500 hover:text-[#d7037b] transition-colors">
              Planes
            </router-link>
            <router-link to="/contact" class="text-sm font-medium text-gray-500 hover:text-[#d7037b] transition-colors">
              Contacto
            </router-link>
          </nav>

          <div class="flex items-center space-x-4">
            <router-link to="/login" class="text-sm font-medium text-[#d7037b] hover:text-[#9e0154] transition-colors">
              Iniciar sesión
            </router-link>
            <router-link to="/register" class="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] hover:from-[#c5026f] hover:to-[#8b014a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b] transition-all">
              Regístrate gratis
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 sm:px-6 py-12">
      <div class="max-w-md mx-auto">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div class="p-8 sm:p-10">
            <div class="text-center mb-8">
              <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-[#d7037b] to-[#9e0154] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 class="text-3xl font-extrabold text-gray-900">Bienvenido de vuelta</h2>
              <p class="mt-2 text-sm text-gray-600">
                ¿No tienes una cuenta?
                <router-link to="/register" class="font-medium text-[#d7037b] hover:text-[#9e0154] transition-colors">
                  Regístrate aquí
                </router-link>
              </p>
            </div>

            <form @submit.prevent="handleLogin" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
                <div class="mt-1 relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    v-model="email"
                    @input="validateEmail"
                    :class="{'border-green-500': emailValid, 'border-red-500': emailError}"
                    class="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b] transition-all"
                    placeholder="tu@email.com"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg v-if="emailValid" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <svg v-if="emailError" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p v-if="emailError" class="mt-1 text-sm text-red-600">{{ emailError }}</p>
              </div>

              <div>
                <div class="flex justify-between items-center">
                  <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
                  <router-link to="/forgot-password" class="text-sm font-medium text-[#d7037b] hover:text-[#9e0154] transition-colors">
                    ¿Olvidaste tu contraseña?
                  </router-link>
                </div>
                <div class="mt-1 relative">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    name="password"
                    autocomplete="current-password"
                    required
                    v-model="password"
                    @input="validatePassword"
                    :class="{'border-green-500': passwordValid, 'border-red-500': passwordError}"
                    class="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-[#d7037b] focus:border-[#d7037b] transition-all"
                    placeholder="••••••••"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button type="button" @click="showPassword = !showPassword" class="text-gray-400 hover:text-gray-500 focus:outline-none">
                      <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div v-if="passwordStrength.visible" class="mt-2">
                  <div class="flex items-center space-x-2">
                    <div class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        :class="passwordStrength.color"
                        class="h-full rounded-full transition-all duration-500"
                        :style="{width: passwordStrength.width}"
                      ></div>
                    </div>
                    <span class="text-xs font-medium" :class="passwordStrength.textColor">
                      {{ passwordStrength.text }}
                    </span>
                  </div>
                </div>
                <p v-if="passwordError" class="mt-1 text-sm text-red-600">{{ passwordError }}</p>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    v-model="rememberMe"
                    class="h-4 w-4 text-[#d7037b] focus:ring-[#d7037b] border-gray-300 rounded"
                  />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                    Recordar mi sesión
                  </label>
                </div>
              </div>

              <div
                v-if="errorMessage"
                class="rounded-md bg-red-50 p-4 transition-all duration-300"
              >
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">
                      Error al iniciar sesión
                    </h3>
                    <div class="mt-2 text-sm text-red-700">
                      <p>{{ errorMessage }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  :disabled="isLoading || !formValid"
                  :class="{'opacity-75 cursor-not-allowed': isLoading || !formValid, 'hover:shadow-lg': formValid}"
                  class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#d7037b] to-[#9e0154] hover:from-[#c5026f] hover:to-[#8b014a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d7037b] transition-all duration-300"
                >
                  <span v-if="!isLoading">Iniciar sesión</span>
                  <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="container mx-auto px-6 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-lg font-bold text-gray-900">
              Kambia<span class="text-[#d7037b]">Pe</span>
            </router-link>
            <p class="text-sm text-gray-500">
              &copy; {{ new Date().getFullYear() }} KambiaPe. Todos los derechos reservados.
            </p>
          </div>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <router-link to="/privacy" class="text-sm text-gray-500 hover:text-[#d7037b] transition-colors">
              Privacidad
            </router-link>
            <router-link to="/terms" class="text-sm text-gray-500 hover:text-[#d7037b] transition-colors">
              Términos
            </router-link>
            <router-link to="/contact" class="text-sm text-gray-500 hover:text-[#d7037b] transition-colors">
              Contacto
            </router-link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
// Importa el store de usuario de Pinia
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router'; // Importa useRouter para la navegación

export default {
  name: 'PremiumLoginView',
  // `setup` es la forma recomendada en Vue 3 para acceder a composición APIs como Pinia
  setup() {
    const userStore = useUserStore(); // Inicializa el store
    const router = useRouter(); // Inicializa el router

    // Retorna lo que necesitas exponer al resto del componente (template o `data`/`methods`)
    return { userStore, router };
  },
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      errorMessage: '',
      emailValid: false,
      emailError: '',
      passwordValid: false,
      passwordError: '',
      formValid: false,
      animated: false
    };
  },
  computed: {
    passwordStrength() {
      if (!this.password) return { visible: false, width: '0%', text: '', color: '', textColor: '' };

      const strength = {
        0: { width: '20%', text: 'Débil', color: 'bg-red-500', textColor: 'text-red-500' },
        1: { width: '40%', text: 'Regular', color: 'bg-yellow-500', textColor: 'text-yellow-500' },
        2: { width: '60%', text: 'Buena', color: 'bg-blue-500', textColor: 'text-blue-500' },
        3: { width: '80%', text: 'Fuerte', color: 'bg-green-400', textColor: 'text-green-500' },
        4: { width: '100%', text: 'Excelente', color: 'bg-green-500', textColor: 'text-green-600' }
      };

      // Calculador de fuerza de contraseña simple
      let score = 0;
      if (this.password.length >= 8) score++;
      if (this.password.match(/[A-Z]/)) score++;
      if (this.password.match(/[0-9]/)) score++;
      if (this.password.match(/[^A-Za-z0-9]/)) score++;

      return {
        visible: true,
        ...strength[Math.min(score, 4)]
      };
    }
  },
  watch: {
    email() {
      this.validateEmail();
      this.checkFormValidity();
    },
    password() {
      this.validatePassword();
      this.checkFormValidity();
    }
  },
  mounted() {
    setTimeout(() => {
      this.animated = true;
    }, 100);

    // Cargar email guardado si "recordar sesión" estaba activado
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
      this.validateEmail(); // Validar al cargar para actualizar el estado del formulario
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailValid = false;
        this.emailError = '';
      } else if (!emailRegex.test(this.email)) {
        this.emailValid = false;
        this.emailError = 'Por favor ingresa un correo electrónico válido';
      } else {
        this.emailValid = true;
        this.emailError = '';
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordValid = false;
        this.passwordError = '';
      } else if (this.password.length < 6) {
        this.passwordValid = false;
        this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
      } else {
        this.passwordValid = true;
        this.passwordError = '';
      }
    },
    checkFormValidity() {
      this.formValid = this.emailValid && this.passwordValid;
    },
    async handleLogin() {
      this.errorMessage = '';
      this.isLoading = true;

      // Validación del lado del cliente antes de enviar la solicitud
      if (!this.emailValid || !this.passwordValid) {
        this.errorMessage = 'Por favor, corrige los errores en el formulario.';
        this.isLoading = false;
        return; // Detiene la ejecución si el formulario no es válido
      }

      try {
        // *** CAMBIO CLAVE AQUÍ: Llama a la acción 'login' de tu store de Pinia ***
        // Esta acción ya se encarga de la petición HTTP, el procesamiento de datos y la actualización del estado.
        const success = await this.userStore.login({
          email: this.email,
          password: this.password,
        });

        if (success) {
          console.log('Inicio de sesión exitoso gestionado por Pinia.');

          // Guarda email si "recordar sesión" está activado
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }

          // Redirigir al dashboard o página de inicio
          this.router.push('/dashboard');
        } else {
          // Si la acción 'login' del store devuelve false (hubo un error manejado en el store)
          // El mensaje de error ya debería estar en this.userStore.error
          this.errorMessage = this.userStore.error || 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.';
          console.error('Error de inicio de sesión desde el store:', this.userStore.error);
        }
      } catch (error) {
        // Esto captura errores si la llamada a 'this.userStore.login' falla por razones inesperadas
        this.errorMessage = 'Ocurrió un error inesperado al intentar iniciar sesión.';
        console.error('Error inesperado al llamar al store de Pinia:', error);
      } finally {
        this.isLoading = false; // Desactivar el estado de carga
      }
    }
  }
};
</script>

<style>
/* Animaciones personalizadas */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Estilos globales para transiciones */
* {
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
}

/* Mejoras de accesibilidad */
:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(215, 3, 123, 0.3);
}

/* Efecto de carga para el botón de submit */
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>