<template>
    <div class="p-4 sm:p-6 lg:p-8">
      
      <div v-if="!activePanel" class="transition-opacity duration-300 ease-in-out">
        
        <header class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Bienvenido, <span class="text-blue-600 dark:text-blue-400">{{ userFullName }}</span>
            </h1>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Resumen general del sistema académico.
            </p>
          </div>
          <button 
            @click="handleLogout"
            class="group flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-700 dark:hover:bg-gray-700">
            <svg class="h-5 w-5 text-gray-500 transition-colors group-hover:text-red-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            Cerrar Sesión
          </button>
        </header>
  
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="stat in stats" :key="stat.name" class="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <div class="p-5">
              <div class="flex items-center gap-4">
                <div :class="stat.iconBg" class="flex h-12 w-12 items-center justify-center rounded-lg">
                  <component :is="stat.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ stat.name }}</p>
                  <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ stat.value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="widget lg:col-span-2">
            <h3 class="widget-title">Acciones Rápidas</h3>
            <div class="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <button v-for="action in quickActions" :key="action.name" @click="openPanel(action.panelId)" :class="action.style" class="action-button">
                <component :is="action.icon" class="h-5 w-5" aria-hidden="true" />
                <span>{{ action.name }}</span>
              </button>
            </div>
          </div>
          <div class="widget">
            <h3 class="widget-title">Actividad Reciente</h3>
            <ul role="list" class="divide-y divide-gray-200 p-5 dark:divide-gray-800">
              <li v-for="item in recentActivity" :key="item.id" class="flex items-center gap-4 py-3">
                <div :class="item.iconBg" class="flex h-10 w-10 flex-none items-center justify-center rounded-lg">
                  <component :is="item.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div class="flex-auto text-sm">
                  <p class="font-medium text-gray-900 dark:text-white">{{ item.text }}</p>
                  <p class="text-gray-500 dark:text-gray-400">{{ item.time }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  
      <div v-else class="transition-opacity duration-300 ease-in-out">
        
        <header class="mb-6 flex items-center gap-4">
          <button @click="activePanel = null" class="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ currentPanelTitle }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Gestiona la sección correspondiente.</p>
          </div>
        </header>
  
        <div v-if="activePanel === 'users'" class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div class="border-b border-gray-200 dark:border-gray-700">
            <nav class="-mb-px flex gap-6 px-6" aria-label="Tabs">
              <button v-for="tab in userTabs" :key="tab.id" @click="activeUserTab = tab.id" 
                      :class="[activeUserTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300', 'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium']">
                {{ tab.name }}
              </button>
            </nav>
          </div>
          <div class="p-6">
            <div class="mb-4 flex items-center justify-between">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Mostrando {{ activeUserTab === 'students' ? students.length : teachers.length }} registros.
              </p>
              <button @click="openAddModal" class="action-button inline-flex w-auto bg-blue-500 px-5 hover:bg-blue-600">
                <UserPlusIcon class="h-5 w-5" />
                <span>Agregar {{ activeUserTab === 'students' ? 'Estudiante' : 'Docente' }}</span>
              </button>
            </div>
            <UserTable :users="activeUserTab === 'students' ? students : teachers" @edit="openEditModal" @delete="deleteUser" />
          </div>
        </div>
  
        <div v-if="activePanel === 'courses'" class="placeholder-panel">Formulario de Nuevo Curso</div>
        <div v-if="activePanel === 'enrollments'" class="placeholder-panel">Gestión de Matrículas</div>
        <div v-if="activePanel === 'announcements'" class="placeholder-panel">Enviar Anuncio Global</div>
      </div>
  
      <div v-if="isModalOpen" @click.self="isModalOpen = false" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity">
        <div class="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-800">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ modalTitle }}</h3>
          
          <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
              <input v-model="currentUser.full_name" type="text" id="fullName" class="mt-1 block w-full input-style" required>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input v-model="currentUser.email" type="email" id="email" class="mt-1 block w-full input-style" required>
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Contraseña <span v-if="isEditing" class="text-xs text-gray-400">(dejar en blanco para no cambiar)</span></label>
              <input v-model="currentUser.password" type="password" id="password" class="mt-1 block w-full input-style" :required="!isEditing">
            </div>
            <div class="mt-8 flex justify-end gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
              <button type="button" @click="isModalOpen = false" class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700">Cancelar</button>
              <button type="submit" class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { 
    UsersIcon, AcademicCapIcon, BookOpenIcon, UserPlusIcon,
    Cog8ToothIcon, DocumentTextIcon, MegaphoneIcon
  } from '@heroicons/vue/24/outline';
  import UserTable from './UserTable.vue';
  
  const router = useRouter();
  const userStore = useUserStore();
  
  // --- ESTADO ---
  const activePanel = ref(null);
  const users = ref([]);
  const isModalOpen = ref(false);
  const isEditing = ref(false);
  const currentUser = ref({ id: null, full_name: '', email: '', password: '', role: 'student' });
  const activeUserTab = ref('students');
  
  // --- COMPUTED PROPERTIES ---
  const userFullName = computed(() => userStore.user?.full_name || 'Admin');
  const modalTitle = computed(() => isEditing.value ? 'Editar Usuario' : 'Agregar Nuevo Usuario');
  const students = computed(() => users.value.filter(u => u.role === 'student'));
  const teachers = computed(() => users.value.filter(u => u.role === 'teacher'));
  const currentPanelTitle = computed(() => {
      if (!activePanel.value) return '';
      const action = quickActions.find(a => a.panelId === activePanel.value);
      return action ? action.name : 'Panel';
  });
  
  // --- LÓGICA CRUD ---
  const openAddModal = () => {
    isEditing.value = false;
    const defaultRole = activeUserTab.value === 'students' ? 'student' : 'teacher';
    currentUser.value = { id: null, full_name: '', email: '', password: '', role: defaultRole };
    isModalOpen.value = true;
  };
  
  const openEditModal = (user) => {
    isEditing.value = true;
    currentUser.value = { ...user, password: '' };
    isModalOpen.value = true;
  };
  
  const handleSubmit = async () => {
    // Aquí iría tu lógica para llamar a la API
    console.log('Enviando:', currentUser.value);
    isModalOpen.value = false;
    fetchUsers();
  };
  
  const deleteUser = async (userId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      console.log('Eliminando:', userId);
      fetchUsers();
    }
  };
  
  // --- OBTENCIÓN DE DATOS ---
  const fetchUsers = async () => {
    console.log('Obteniendo usuarios...');
    // Simulación de llamada a API
    users.value = [
      { id: 'uuid-1', full_name: 'Ana García', email: 'ana.garcia@example.com', role: 'student' },
      { id: 'uuid-2', full_name: 'Carlos Ruiz', email: 'carlos.ruiz@example.com', role: 'teacher' },
      { id: 'uuid-3', full_name: 'Luisa Fernandez', email: 'luisa.f@example.com', role: 'student' },
      { id: 'uuid-4', full_name: 'Pedro Martinez', email: 'pedro.m@example.com', role: 'teacher' },
    ];
  };
  
  const openPanel = (panelId) => {
    activePanel.value = panelId;
    if (panelId === 'users') {
      fetchUsers();
    }
  };
  
  const handleLogout = () => {
    userStore.logout();
    router.push('/login');
  };
  
  // --- DATOS PARA EL TEMPLATE ---
  const userTabs = [
    { id: 'students', name: 'Estudiantes' },
    { id: 'teachers', name: 'Docentes' },
  ];
  
  const stats = [
    { name: 'Total Estudiantes', value: '1,250', icon: UsersIcon, iconBg: 'bg-blue-500' },
    { name: 'Total Docentes', value: '85', icon: AcademicCapIcon, iconBg: 'bg-teal-500' },
    { name: 'Cursos Activos', value: '150', icon: BookOpenIcon, iconBg: 'bg-indigo-500' },
    { name: 'Registros Hoy', value: '12', icon: UserPlusIcon, iconBg: 'bg-orange-500' },
  ];
  
  const quickActions = [
    { name: 'Gestionar Usuarios', panelId: 'users', icon: Cog8ToothIcon, style: 'bg-blue-500 hover:bg-blue-600' },
    { name: 'Crear Nuevo Curso', panelId: 'courses', icon: BookOpenIcon, style: 'bg-indigo-500 hover:bg-indigo-600' },
    { name: 'Ver Matrículas', panelId: 'enrollments', icon: DocumentTextIcon, style: 'bg-teal-500 hover:bg-teal-600' },
    { name: 'Enviar Anuncio Global', panelId: 'announcements', icon: MegaphoneIcon, style: 'bg-orange-500 hover:bg-orange-600' },
  ];
  
  const recentActivity = [
    { id: 1, text: "Docente 'Carlos Ruiz' registrado.", time: 'Hace 30 minutos', icon: UserPlusIcon, iconBg: 'bg-green-500' },
    { id: 2, text: "Curso 'Cálculo II' creado.", time: 'Hace 2 horas', icon: BookOpenIcon, iconBg: 'bg-indigo-500' },
  ];
  </script>
  
  <style scoped>
  .widget {
    @apply overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900;
  }
  .widget-title {
    @apply border-b border-gray-200 px-5 py-3 text-lg font-medium text-gray-900 dark:border-gray-800 dark:text-white;
  }
  .action-button {
    @apply flex w-full items-center justify-center gap-3 rounded-lg py-3 px-4 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg;
  }
  .input-style {
    @apply w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white;
  }
  .placeholder-panel {
    @apply rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 text-lg font-semibold;
  }
  </style>