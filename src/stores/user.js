import { defineStore } from 'pinia';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000';

// Configuración global de Axios para incluir el token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Axios Interceptor: Token añadido a la cabecera de la petición."); // DEBUG
  } else {
    console.log("Axios Interceptor: No se encontró token en localStorage para añadir a la cabecera."); // DEBUG
  }
  return config;
}, error => {
  return Promise.reject(error);
});


export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('access_token') || null,
    user: JSON.parse(localStorage.getItem('user')) || {
      id: null,
      fullName: '',
      email: '',
      profilePicture: 'https://source.unsplash.com/300x300/?portrait,person',
      phone: null,
      address: null,
      dateOfBirth: null,
      gender: null,
      occupation: null,
      bio: null,
      agreed_terms: false,
      created_at: null,
    },
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user && !!state.user.id,
    userFullName: (state) => state.user?.fullName || null,
    userFirstName: (state) => {
      if (!state.user?.fullName) return null;
      return state.user.fullName.split(' ')[0];
    },
    userInitials: (state) => {
      if (!state.user?.fullName) return '';
      const names = state.user.fullName.split(' ');
      if (names.length === 1) return names[0][0].toUpperCase();
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    },
    getUserProfile: (state) => state.user,
  },

  actions: {
    _processUserData(data) {
      const processedData = {
        id: data.id || null,
        fullName: data.full_name || data.fullName || '',
        email: data.email || '',
        profilePicture: data.profile_picture || data.profilePicture || 'https://source.unsplash.com/300x300/?portrait,person',
        phone: data.phone || null,
        address: data.address || null,
        dateOfBirth: data.date_of_birth ? new Date(data.date_of_birth + 'T00:00:00').toLocaleDateString() : null,
        gender: data.gender || null,
        occupation: data.occupation || null,
        bio: data.bio || null,
        agreed_terms: data.agreed_terms || false,
        created_at: data.created_at || null,
      };
      return processedData;
    },

    async login(credentials) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        
        const accessToken = response.data.access_token;
        this.token = accessToken;
        localStorage.setItem('access_token', accessToken);
        console.log("Login (userStore): Token guardado en Pinia y localStorage."); // DEBUG

        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        const userId = payload.user_id;

        if (!userId) {
            throw new Error("El ID de usuario no se encontró en el token JWT.");
        }

        await this.fetchUserProfile(userId);
        console.log("Login (userStore): Perfil de usuario cargado y guardado en userStore.user."); // DEBUG
        
        return true;
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error en el inicio de sesión. Verifica tus credenciales.';
        console.error('Error de login (userStore):', err);
        this.clearUser();
        return false;
      } finally {
        this.loading = false;
      }
    },

    async fetchUserProfile(userId) {
      console.log("fetchUserProfile (userStore): Intentando cargar perfil para userId:", userId); // DEBUG
      if (!userId) {
        if (this.token) {
          try {
            const base64Url = this.token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            userId = payload.user_id;
            console.log("fetchUserProfile (userStore): userId decodificado del token:", userId); // DEBUG
          } catch (e) {
            console.error("fetchUserProfile (userStore): Error decodificando token para user ID:", e);
            this.error = "Token inválido para obtener ID de usuario.";
            this.clearUser();
            return;
          }
        }
        if (!userId) {
            this.error = 'No se proporcionó un ID de usuario válido para cargar el perfil.';
            console.error("fetchUserProfile (userStore): No se pudo obtener userId."); // DEBUG
            return;
        }
      }

      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`${API_BASE_URL}/profile/${userId}`);
        const userData = this._processUserData(response.data);
        
        this.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        console.log("fetchUserProfile (userStore): Perfil cargado y guardado:", this.user); // DEBUG
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error al cargar el perfil. Puede que la sesión haya expirado.';
        console.error('fetchUserProfile (userStore): Error al cargar perfil:', err);
        if (err.response?.status === 401) {
          this.clearUser();
          console.log("fetchUserProfile (userStore): 401 recibido, limpiando usuario."); // DEBUG
        }
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(userId, updateData) {
      this.loading = true;
      this.error = null;
      try {
        const dataToSend = { ...updateData };
        if (dataToSend.fullName) {
          dataToSend.full_name = dataToSend.fullName;
          delete dataToSend.fullName;
        }
        if (dataToSend.dateOfBirth) {
            const d = new Date(dataToSend.dateOfBirth);
            dataToSend.date_of_birth = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
            delete dataToSend.dateOfBirth;
        }

        const response = await axios.put(`${API_BASE_URL}/profile/${userId}`, dataToSend);
        const updatedUserData = this._processUserData(response.data);
        
        this.user = updatedUserData;
        localStorage.setItem('user', JSON.stringify(updatedUserData));
        console.log("updateProfile (userStore): Perfil actualizado y guardado:", this.user); // DEBUG

        return true;
      } catch (err) {
        this.error = err.response?.data?.detail || 'Error al actualizar el perfil.';
        console.error('updateProfile (userStore): Error al actualizar perfil:', err);
        if (err.response?.status === 401) {
          this.clearUser();
        }
        return false;
      } finally {
        this.loading = false;
      }
    },

    clearUser() {
      console.log("clearUser (userStore): Limpiando estado de usuario y localStorage."); // DEBUG
      this.user = {
        id: null,
        fullName: '',
        email: '',
        profilePicture: 'https://source.unsplash.com/300x300/?portrait,person',
        phone: null,
        address: null,
        dateOfBirth: null,
        gender: null,
        occupation: null,
        bio: null,
        agreed_terms: false,
        created_at: null,
      };
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      this.token = null;
    },

    // Acción para inicializar el estado del usuario al cargar la aplicación
    // Por ejemplo, llamada desde App.vue o main.js
    async initializeUser() {
      console.log("initializeUser (userStore): Iniciando rehidratación de usuario."); // DEBUG
      const storedToken = localStorage.getItem('access_token');
      const storedUser = localStorage.getItem('user');
      console.log("initializeUser (userStore): storedToken en localStorage:", storedToken ? 'presente' : 'ausente'); // DEBUG
      console.log("initializeUser (userStore): storedUser en localStorage:", storedUser ? 'presente' : 'ausente'); // DEBUG

      if (storedToken && storedUser) {
        this.token = storedToken;
        this.user = JSON.parse(storedUser);
        console.log("initializeUser (userStore): Token y usuario cargados en Pinia desde localStorage."); // DEBUG
        try {
            // Intentamos decodificar el token para obtener el user_id y luego el perfil
            const base64Url = storedToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            const userId = payload.user_id;
            console.log("initializeUser (userStore): userId decodificado del token:", userId); // DEBUG

            if (userId) {
                await this.fetchUserProfile(userId);
                console.log("initializeUser (userStore): fetchUserProfile completado después de rehidratación."); // DEBUG
            } else {
                console.warn("initializeUser (userStore): Token no contiene user_id. Cerrando sesión.");
                this.clearUser();
            }
        } catch (e) {
            console.error("initializeUser (userStore): Error al inicializar usuario desde token (token inválido o problema de red):", e);
            this.clearUser(); // Limpiar si el token es inválido o el perfil no se carga
        }
      } else {
        console.log("initializeUser (userStore): No se encontró token o usuario en localStorage, limpiando estado."); // DEBUG
        this.clearUser();
      }
    }
  },
});