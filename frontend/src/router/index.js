import { createRouter, createWebHistory } from 'vue-router';

// Core layout and main page components
import MainPage from '../views/MainPage.vue';
import Footer from '../views/Footer.vue';
import Header from '../views/Header.vue';
import HeroSection from '../views/HeroSection.vue';
import ProductFeed from '../views/ProductFeed.vue';

// Your custom navigation view components
import AboutUsView from '../views/AboutUsView.vue';    // Corresponds to 'Nosotros'
import PublishView from '../views/PublishView.vue';  // Corresponds to 'Publicar'
import EventsView from '../views/EventsView.vue';    // Corresponds to 'Eventos'
// Note: You didn't list NewView.vue in your 'ls' output, but it was included previously.
// If 'NewView.vue' does not exist, you should remove this line and its route.
// For now, I'll keep it commented out as a reminder:
// import NewView from '../views/NewView.vue';          // Corresponds to 'Nuevo'
import InboxView from '../views/InboxView.vue';      // Corresponds to 'Buzón'

// --- Nuevas importaciones para Login y Register ---
import LoginView from '../views/Login.vue';      // Asegúrate de que esta ruta sea correcta
import RegisterView from '../views/Register.vue'; // Asegúrate de que esta ruta sea correcta
// --- Fin de nuevas importaciones ---

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: {
      title: 'Inicio | KambiaPe'
    }
  },
  // Existing structural routes
  {
    path: '/header',
    name: 'header',
    component: Header,
    meta: {
      title: 'Header | KambiaPe'
    }
  },
  {
    path: '/footer',
    name: 'footer',
    component: Footer,
    meta: {
      title: 'Footer | KambiaPe'
    }
  },
  {
    path: '/hero-section',
    name: 'hero-section',
    component: HeroSection,
    meta: {
      title: 'Hero Section | KambiaPe'
    }
  },
  {
    path: '/productos',
    name: 'products',
    component: ProductFeed,
    meta: {
      title: 'Productos | KambiaPe'
    }
  },
  // New routes for your navigation items
  {
    path: '/nosotros', // Path for 'Nosotros'
    name: 'about',
    component: AboutUsView,
    meta: {
      title: 'Nosotros | KambiaPe'
    }
  },
  {
    path: '/publicar', // Path for 'Publicar'
    name: 'publish',
    component: PublishView,
    meta: {
      title: 'Publicar | KambiaPe'
    }
  },
  {
    path: '/eventos', // Path for 'Eventos'
    name: 'events',
    component: EventsView,
    meta: {
      title: 'Eventos | KambiaPe'
    }
  },
  // If you decide to add 'NewView.vue' later, uncomment this section
  /*
  {
    path: '/nuevo', // Path for 'Nuevo'
    name: 'new',
    component: NewView,
    meta: {
      title: 'Nuevo | KambiaPe'
    }
  },
  */
  {
    path: '/buzon', // Path for 'Buzón'
    name: 'inbox',
    component: InboxView,
    meta: {
      title: 'Buzón | KambiaPe'
    }
  },
  // --- Nuevas rutas para Login y Register ---
  {
    path: '/login', // Ruta para el formulario de inicio de sesión
    name: 'Login',
    component: LoginView,
    meta: {
      title: 'Iniciar Sesión | KambiaPe'
    }
  },
  {
    path: '/register', // Ruta para el formulario de registro
    name: 'Register',
    component: RegisterView,
    meta: {
      title: 'Registrarse | KambiaPe'
    }
  },
  // --- Fin de nuevas rutas ---

  // Catch-all route for unmatched paths, redirects to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // This ensures smooth scrolling to anchors or maintains scroll position
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100 // Offset for fixed header, adjust as needed
      };
    } else if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 }; // Scroll to top by default
  }
});

// Global navigation guard to update document title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'KambiaPe';
  next(); // Continue to the next navigation step
});

export default router;