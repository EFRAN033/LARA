import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Footer from '../views/Footer.vue';
import Header from '../views/Header.vue';
import HeroSection from '../views/HeroSection.vue';
import ProductFeed from '../views/ProductFeed.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: {
      title: 'Inicio | KambiaPe'
    }
  },
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
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100
      };
    } else if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'KambiaPe';
  next();
});

export default router;