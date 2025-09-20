<template>
    <div class="flex h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Sidebar intacto -->
      <Sidebar />
  
      <!-- Pane derecho -->
      <div class="flex-1 min-w-0 flex flex-col">
        <!-- ===== Header compacto (mismo tamaño que el ejemplo: py-3) ===== -->
        <header class="sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-3">
            <h1 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Anuncios</h1>
            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Noticias de tus docentes y de la institución.
            </p>
          </div>
        </header>
  
        <!-- ===== Contenido ===== -->
        <main class="flex-1 overflow-y-auto">
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
  
            <!-- Controles mínimos (chips + orden) -->
            <div class="mb-4 flex flex-wrap items-center gap-2">
              <button type="button" :class="['chip', view==='all' ? 'chip-active' : 'chip-idle']" @click="view='all'">Todos</button>
              <button type="button" :class="['chip', view==='unread' ? 'chip-active' : 'chip-idle']" @click="view='unread'">No leídos</button>
              <div class="ml-auto flex items-center gap-2">
                <label for="sort" class="sr-only">Ordenar</label>
                <select id="sort" v-model="sortBy" class="select">
                  <option value="date_desc">Más recientes</option>
                  <option value="date_asc">Más antiguos</option>
                </select>
                <button type="button" class="btn-ghost" @click="markAllRead" :disabled="isLoading">Marcar todo leído</button>
              </div>
            </div>
  
            <!-- Cargando -->
            <div v-if="isLoading" class="space-y-6">
              <div v-for="i in 3" :key="'skel-'+i" class="row">
                <div class="status-glyph skel"></div>
                <div class="flex-1">
                  <div class="swoosh-skel"></div>
                  <div class="mt-3 h-3 w-40 rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                  <div class="mt-2 h-3 w-full max-w-xl rounded bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                </div>
              </div>
            </div>
  
            <!-- Lista simple y bonita (sin tarjetas ni líneas azules) -->
            <section v-else aria-label="Lista de anuncios">
              <div v-if="visible.length" class="space-y-8">
                <article
                  v-for="a in visible"
                  :key="a.id"
                  class="row"
                  :class="{'row-unread': !a.read}"
                >
                  <!-- Glifo de estado (círculo con anillo) -->
                  <div class="status-glyph" :class="glyphClass(a)"></div>
  
                  <!-- Contenido -->
                  <div class="flex-1">
                    <!-- Título con “swoosh” orgánico -->
                    <h2 class="title-wrap">
                      <button class="title-btn" type="button" @click="toggleExpand(a.id)">
                        <span class="title-text">{{ a.title }}</span>
                      </button>
                      <span class="swoosh" :class="swooshClass(a)"></span>
                    </h2>
  
                    <!-- Meta -->
                    <div class="meta">
                      <span>{{ a.author }}</span>
                      <span aria-hidden="true">•</span>
                      <time :datetime="a.date">{{ formatDate(a.date) }}</time>
                      <span v-if="a.course" aria-hidden="true">•</span>
                      <span v-if="a.course">{{ a.course }}</span>
                      <span v-if="!a.read" class="dot dot-amber" title="No leído"></span>
                      <span v-if="a.pinned" class="dot dot-purple" title="Fijado"></span>
                    </div>
  
                    <!-- Texto -->
                    <p class="content">
                      {{ isExpanded(a.id) ? a.content : short(a.content) }}
                      <button
                        v-if="a.content.length > 180"
                        class="link"
                        type="button"
                        @click="toggleExpand(a.id)"
                      >
                        {{ isExpanded(a.id) ? 'Ver menos' : 'Ver más' }}
                      </button>
                    </p>
  
                    <!-- Acciones pequeñas -->
                    <div class="actions">
                      <button class="act-link" type="button" @click="toggleRead(a.id)">
                        {{ a.read ? 'Marcar no leído' : 'Marcar leído' }}
                      </button>
                      <span aria-hidden="true" class="sep">|</span>
                      <button class="act-link" type="button" @click="togglePin(a.id)">
                        {{ a.pinned ? 'Quitar fijado' : 'Fijar' }}
                      </button>
                    </div>
                  </div>
                </article>
              </div>
  
              <div v-else class="empty">
                No hay anuncios para mostrar.
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import Sidebar from './Sidebar.vue'
  
  const announcements = ref([])
  const isLoading = ref(true)
  
  const view = ref('all')         // 'all' | 'unread'
  const sortBy = ref('date_desc') // 'date_desc' | 'date_asc'
  const expanded = ref(new Set())
  
  const short = (txt) => txt.length > 180 ? txt.slice(0, 180) + '…' : txt
  const isExpanded = (id) => expanded.value.has(id)
  const toggleExpand = (id) => {
    const s = new Set(expanded.value)
    s.has(id) ? s.delete(id) : s.add(id)
    expanded.value = s
  }
  
  const filtered = computed(() => view.value === 'unread'
    ? announcements.value.filter(a => !a.read)
    : announcements.value
  )
  
  const visible = computed(() => {
    const arr = [...filtered.value]
    return sortBy.value === 'date_asc'
      ? arr.sort((a,b) => a.date.localeCompare(b.date))
      : arr.sort((a,b) => b.date.localeCompare(a.date))
  })
  
  const toggleRead = (id) => {
    const i = announcements.value.findIndex(a => a.id === id)
    if (i >= 0) announcements.value[i].read = !announcements.value[i].read
  }
  const togglePin = (id) => {
    const i = announcements.value.findIndex(a => a.id === id)
    if (i >= 0) announcements.value[i].pinned = !announcements.value[i].pinned
  }
  const markAllRead = () => {
    announcements.value = announcements.value.map(a => ({ ...a, read: true }))
  }
  
  const formatDate = (iso) => {
    try {
      const d = new Date(iso)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${y}-${m}-${day}`
    } catch { return iso }
  }
  
  /* Carga (simulada; no toca tu BD) */
  const fetchAnnouncements = async () => {
    isLoading.value = true
    try {
      await new Promise(r => setTimeout(r, 700))
      announcements.value = [
        { id: 2, title: 'Recordatorio Examen Parcial', content: 'Este viernes se rinde el parcial de Matemática. Temas: Límites y Derivadas. Llevar DNI y calculadora simple. Llegar 10 minutos antes.', date: '2025-09-18', author: 'Carlos Ruiz', course: 'Matemática Avanzada', read: false, pinned: false },
        { id: 1, title: 'Inicio de Clases 2025-II',   content: 'El segundo semestre inicia el 15 de octubre. Revisa tu horario en “Mis Cursos” y confirma tus secciones.', date: '2025-09-15', author: 'Dirección Académica', read: true, pinned: false },
        { id: 3, title: 'Cambio de Aula',              content: 'Historia del Siglo XX pasa al aula B-204 por mantenimiento en A-102 durante dos semanas.', date: '2025-09-12', author: 'Ana García', course: 'Historia del Siglo XX', read: true, pinned: true },
      ]
    } finally {
      isLoading.value = false
    }
  }
  onMounted(fetchAnnouncements)
  
  /* ===== Clases de UI dinámicas ===== */
  const glyphClass = (a) => {
    if (a.pinned) return 'glyph-purple'
    if (!a.read) return 'glyph-amber'
    return 'glyph-indigo' // indigo como tu sidebar
  }
  const swooshClass = (a) => {
    if (a.pinned) return 'sw-purple'
    if (!a.read) return 'sw-amber'
    return 'sw-indigo'
  }
  </script>
  
  <style scoped>
  /* Chips / select / botones */
  .chip {
    @apply inline-flex items-center rounded-full px-3 py-1.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600;
  }
  .chip-idle { @apply bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700; }
  .chip-active { @apply text-white bg-indigo-600; }
  .select {
    @apply rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800
           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600
           dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100;
  }
  .btn-ghost {
    @apply inline-flex items-center rounded-md px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-100
           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800;
  }
  
  /* Fila limpia */
  .row { @apply flex items-start gap-4; }
  .row + .row { @apply pt-4 border-t border-gray-200 dark:border-gray-800; }
  .row-unread .title-text { @apply underline decoration-2; }
  
  /* Glifo circular con anillo */
  .status-glyph {
    --size: 14px; width: var(--size); height: var(--size);
    border-radius: 999px; position: relative; margin-top: 6px;
  }
  .status-glyph::after {
    content: ""; position: absolute; inset: -5px; border-radius: 999px;
    border: 2px solid currentColor; opacity: .25;
  }
  .glyph-indigo { color: #4f46e5; background: #4f46e5; } /* indigo-600 */
  .glyph-amber  { color: #f59e0b; background: #f59e0b; } /* amber-500 */
  .glyph-purple { color: #7c3aed; background: #7c3aed; } /* purple-600 */
  .skel { @apply bg-gray-300 dark:bg-gray-700 animate-pulse; }
  
  /* Título con “swoosh” orgánico */
  .title-wrap { position: relative; display: inline-block; }
  .title-btn { @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded; }
  .title-text { @apply text-lg sm:text-xl font-extrabold text-gray-900 dark:text-gray-100; }
  .swoosh {
    position: absolute; left: -4px; right: -10px; bottom: -6px; height: 10px;
    border-radius: 999px; filter: blur(0.2px); opacity: .35; pointer-events: none;
    mask-image: radial-gradient(14px 10px at left 50%, black 55%, transparent 60%),
                linear-gradient(to right, black 70%, transparent 100%);
    mask-composite: add;
  }
  .sw-indigo { background: linear-gradient(90deg, #4f46e5 0%, #6366f1 60%); }
  .sw-amber  { background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 60%); }
  .sw-purple { background: linear-gradient(90deg, #7c3aed 0%, #a78bfa 60%); }
  
  /* Meta y texto */
  .meta { @apply mt-2 text-xs text-gray-600 dark:text-gray-400 flex flex-wrap items-center gap-2; }
  .content { @apply mt-3 text-sm leading-6 text-gray-800 dark:text-gray-200; }
  .link { @apply ml-2 text-indigo-700 dark:text-indigo-300 hover:underline; }
  
  /* Dots auxiliares */
  .dot { @apply inline-block h-2.5 w-2.5 rounded-full ml-1; }
  .dot-amber { background: #f59e0b; }
  .dot-purple { background: #7c3aed; }
  
  /* Acciones inline */
  .actions { @apply mt-2 text-xs text-gray-600 dark:text-gray-300; }
  .act-link { @apply underline decoration-1 hover:opacity-80; }
  .sep { @apply mx-1 text-gray-400; }
  
  /* Skeleton especial del título */
  .swoosh-skel {
    position: relative; height: 22px; width: 18rem; border-radius: 6px;
    background: linear-gradient(90deg, rgba(203,213,225,.6), rgba(148,163,184,.4), rgba(203,213,225,.6));
    animation: pulseBg 1.2s ease-in-out infinite;
  }
  @keyframes pulseBg { 0%,100%{opacity:.6}50%{opacity:1} }
  
  /* Accesibilidad */
  .sr-only { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0; }
  </style>
  