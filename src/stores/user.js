import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // --- STATE ---
  // Inicializa el token desde localStorage para mantener la sesión al recargar
  const token = ref(localStorage.getItem('access_token') || null)

  // --- GETTERS ---
  const isLoggedIn = ref(!!token.value)

  // --- ACTIONS ---
  function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('access_token', newToken)
      isLoggedIn.value = true
    } else {
      localStorage.removeItem('access_token')
      isLoggedIn.value = false
    }
  }

  function logout() {
    setToken(null)
  }

  return { token, isLoggedIn, setToken, logout }
})