// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' // Asegúrate de que 'path' esté importado

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    historyApiFallback: true,
    // --- INICIO: Añade esta sección de proxy ---
    proxy: {
      '/api': { // Cuando una petición empiece con '/api'
        target: 'http://localhost:8000', // Reenvíala a tu backend de FastAPI
        changeOrigin: true, // Cambia el origen de la petición a 'http://localhost:8000'
        rewrite: (path) => path.replace(/^\/api/, '/api/v1'), // IMPORTANTE: Reemplaza '/api' por '/api/v1' para que coincida con tus rutas de FastAPI
      },
      // Si sirves imágenes u otros archivos estáticos desde tu backend, añade un proxy para ellos también
      '/uploads': { // Por ejemplo, si tus imágenes subidas están en /uploads
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
    // --- FIN: Añade esta sección de proxy ---
  }
})