<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans antialiased text-gray-900">
    <Header />

    <main class="relative z-10">
      <!--Eventos que transforman-->
      <section
        class="relative isolate overflow-hidden bg-white text-gray-900"
        aria-label="Sección principal de eventos"
         >
        <!-- Fondo: imagen + gradiente radial + malla -->
        <div class="absolute inset-0 -z-10">
          <div
            class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-25"
            aria-hidden="true"
          ></div>
          <div
            class="absolute inset-0 bg-gradient-to-br from-white/90 via-white/75 to-[#9e0154]/20"
            aria-hidden="true"
          ></div>
          <div
            class="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(#d7037b_1px,transparent_1px)] [background-size:18px_18px]"
            aria-hidden="true"
          ></div>
          <div
            class="absolute -top-20 -right-24 h-80 w-80 rounded-full bg-[#9e0154]/20 blur-3xl"
            aria-hidden="true"
          ></div>
        </div>

        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div class="grid items-center gap-10 md:grid-cols-2">
            <!-- Columna izquierda -->
            <header class="space-y-6">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm font-semibold text-[#9e0154] backdrop-blur-md shadow-sm"
              >
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path stroke="currentColor" stroke-width="1.5" d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.65-7 10-7 10Z"/>
                  <path stroke="currentColor" stroke-width="1.5" d="M15.5 12.5l-2.2.7a3 3 0 0 1-2.6-.34l-1.2-.8M7 15h2.2c.6 0 1.2.2 1.7.6l.7.6c.5.4 1.1.6 1.7.6H16"/>
                </svg>
                <span class="tracking-wide">JUNTOS CREAMOS IMPACTO</span>
              </div>

              <h1 class="font-serif text-4xl leading-tight md:text-6xl">
                Eventos que
                <span class="relative whitespace-nowrap">
                  <span class="relative z-10 text-[#9e0154]">Transforman</span>
                  <span
                    aria-hidden="true"
                    class="absolute -bottom-1 left-0 right-0 h-3 rounded-md bg-[#d7037b]/25"
                  ></span>
                </span>
              </h1>

              <p class="max-w-xl text-lg text-gray-700 md:text-xl">
                Conectamos corazones solidarios a través de experiencias significativas en todo el Perú.
                Súmate a una comunidad que convierte la intención en acción.
              </p>

              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <router-link
                  to="/premium"
                  class="group inline-flex items-center justify-center rounded-full px-7 py-4 font-semibold text-white shadow-lg bg-gradient-to-r from-[#9e0154] to-[#d7037b] transition
                        hover:brightness-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d7037b]"
                >
                  <svg class="mr-2 h-5 w-5 transition group-hover:scale-110" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 17l-5.878 3.09 1.123-6.545L2.49 8.91l6.562-.953L12 2l2.948 5.957 6.562.953-4.755 4.635 1.123 6.545z"
                          stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                  </svg>
                  Unirme a Premium
                </router-link>

                <button
                  @click="scrollToEvents"
                  class="inline-flex items-center justify-center rounded-full border-2 border-[#9e0154] px-7 py-4 font-semibold text-[#9e0154] transition
                        hover:bg-[#9e0154]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d7037b]"
                >
                  <svg class="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M8 7V3m8 4V3M4 11h16M5 21h14a2 2 0 0 0 2-2v-9H3v9a2 2 0 0 0 2 2Z"
                          stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  Ver Eventos
                </button>
              </div>

              <dl class="mt-6 grid grid-cols-3 gap-4 max-w-lg">
                <div class="rounded-2xl bg-white/70 backdrop-blur-md p-4 text-center shadow-sm">
                  <dt class="text-xs text-gray-600">Voluntarios</dt>
                  <dd class="text-2xl font-bold">8k+</dd>
                </div>
                <div class="rounded-2xl bg-white/70 backdrop-blur-md p-4 text-center shadow-sm">
                  <dt class="text-xs text-gray-600">Eventos</dt>
                  <dd class="text-2xl font-bold">450+</dd>
                </div>
                <div class="rounded-2xl bg-white/70 backdrop-blur-md p-4 text-center shadow-sm">
                  <dt class="text-xs text-gray-600">Ciudades</dt>
                  <dd class="text-2xl font-bold">20+</dd>
                </div>
              </dl>
            </header>

            <!-- Columna derecha -->
            <div class="relative">
              <article
                class="relative rounded-3xl bg-white/80 backdrop-blur-md shadow-xl ring-1 ring-black/5 p-6 sm:p-8"
              >
                <div class="flex items-start justify-between gap-4">
                  <h2 class="text-xl font-semibold">Próximo evento destacado</h2>
                  <span class="inline-flex items-center rounded-full bg-[#9e0154]/10 px-3 py-1 text-xs font-semibold text-[#9e0154]">
                    Nuevo
                  </span>
                </div>
                <p class="mt-2 text-sm text-gray-600">
                  Voluntariado de invierno · Lima · 12 de septiembre
                </p>

                <div class="mt-4 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2400&auto=format&fit=crop"
                    alt="Personas colaborando en una actividad solidaria"
                    class="aspect-[16/9] w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <ul class="mt-6 space-y-3 text-sm text-gray-700">
                  <li class="flex items-center gap-2">
                    <span class="inline-block h-2 w-2 rounded-full bg-[#9e0154]" aria-hidden="true"></span>
                    Cupos limitados · Registro gratuito
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="inline-block h-2 w-2 rounded-full bg-[#9e0154]" aria-hidden="true"></span>
                    Certificado de participación
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="inline-block h-2 w-2 rounded-full bg-[#9e0154]" aria-hidden="true"></span>
                    Accesible + apto para principiantes
                  </li>
                </ul>

                <div class="mt-6 flex flex-wrap gap-3">
                  <router-link
                    to="/eventos/voluntariado-invierno"
                    class="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:translate-y-[-2px] hover:shadow-md
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-900"
                  >
                    Inscribirme
                  </router-link>

                  <router-link
                    to="/eventos"
                    class="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-300"
                  >
                    Explorar todos
                  </router-link>
                </div>
              </article>

              <div class="pointer-events-none absolute -right-4 -top-4 hidden md:block">
                <div class="rounded-2xl bg-white/80 backdrop-blur-md px-4 py-2 text-xs font-semibold text-gray-800 shadow-md ring-1 ring-black/5">
                  +120 nuevas inscripciones
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!--Eventos que transforman-->

      <!--Explora eventos-->
     <!-- Sección 2 – Explorá por causas (Layout marketplace con sidebar sticky + feed editorial) -->
<section id="events" class="relative bg-white py-16 sm:py-24" aria-label="Explorar eventos por causa">
  <!-- Marca/ornamentos: grilla radial sutil -->
  <div
    class="pointer-events-none absolute inset-0 -z-10 opacity-10 [background-image:radial-gradient(#d7037b_1px,transparent_1.5px)] [background-size:18px_18px]"
    aria-hidden="true"
  ></div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <!-- Cabecera con tabs de causas -->
    <header class="mb-10 sm:mb-14">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-sm font-semibold tracking-wide text-[#9e0154]">Explora & Actúa</p>
          <h2 class="mt-1 text-3xl font-bold text-gray-900 sm:text-4xl">Encuentra tu causa</h2>
          <p class="mt-2 max-w-2xl text-gray-600">
            Filtra por impacto y descubre acciones concretas cerca de ti.
          </p>
        </div>

        <!-- Tabs / Causas principales -->
        <nav class="flex flex-wrap gap-2" aria-label="Categorías principales">
          <button
            v-for="cause in topCauses"
            :key="cause"
            @click="selectCause(cause)"
            :aria-pressed="activeCause === cause"
            :class="[
              'rounded-full px-4 py-2 text-sm font-medium transition',
              activeCause === cause
                ? 'bg-[#9e0154] text-white shadow'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            ]"
          >
            {{ cause }}
          </button>
        </nav>
      </div>
    </header>

    <!-- GRID 12 cols: Sidebar (sticky) + Feed -->
    <div class="grid grid-cols-12 gap-8 lg:gap-10">
      <!-- Sidebar sticky -->
      <aside class="col-span-12 md:col-span-4 lg:col-span-3">
        <div class="sticky top-24 space-y-6">
          <!-- Buscador -->
          <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <label for="search" class="mb-2 block text-sm font-semibold text-gray-800">Buscar</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                v-model="searchQuery"
                @input="onSearchInput"
                type="search"
                autocomplete="off"
                placeholder="Ciudad, tema, organización…"
                class="block w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#d7037b]"
                aria-label="Buscar eventos"
              />
            </div>
          </div>

          <!-- Filtros avanzados -->
          <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 class="text-sm font-semibold text-gray-800">Filtros</h3>
            <div class="mt-4 space-y-4">
              <!-- Chiplist temática -->
              <div>
                <p class="mb-2 text-xs font-medium text-gray-600">Temas</p>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="tag in filters"
                    :key="tag"
                    @click="toggleFilter(tag)"
                    :aria-pressed="activeFilters.includes(tag)"
                    :class="[
                      'rounded-full px-3 py-1.5 text-xs font-medium transition',
                      activeFilters.includes(tag)
                        ? 'bg-[#d7037b] text-white shadow'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-white'
                    ]"
                  >
                    {{ tag }}
                  </button>
                </div>
              </div>

              <!-- Switches -->
              <div class="grid grid-cols-2 gap-3">
                <label class="flex items-center gap-2 text-xs text-gray-700">
                  <input type="checkbox" v-model="onlyFree" class="h-4 w-4 rounded border-gray-300 text-[#9e0154] focus:ring-[#d7037b]" />
                  Solo gratuitos
                </label>
                <label class="flex items-center gap-2 text-xs text-gray-700">
                  <input type="checkbox" v-model="accessible" class="h-4 w-4 rounded border-gray-300 text-[#9e0154] focus:ring-[#d7037b]" />
                  Accesibles
                </label>
              </div>

              <!-- Rango de fecha (chips) -->
              <div>
                <p class="mb-2 text-xs font-medium text-gray-600">Cuándo</p>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="r in dateRanges"
                    :key="r.value"
                    @click="setDateRange(r.value)"
                    :aria-pressed="activeDateRange === r.value"
                    :class="[
                      'rounded-full px-3 py-1.5 text-xs font-medium transition',
                      activeDateRange === r.value
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50'
                    ]"
                  >
                    {{ r.label }}
                  </button>
                </div>
              </div>

              <!-- Ubicación rápida -->
              <div>
                <p class="mb-2 text-xs font-medium text-gray-600">Cerca de</p>
                <div class="flex gap-2">
                  <input
                    v-model="nearbyCity"
                    type="text"
                    placeholder="Ej: Lima, Cusco"
                    class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#d7037b]"
                    aria-label="Ciudad cercana"
                  />
                  <button
                    @click="applyNearby"
                    class="rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Resumen de filtros activos -->
          <div v-if="activeFilters.length || searchQuery || activeDateRange || nearbyCity"
               class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-semibold text-gray-800">Activos</h4>
              <button @click="resetFilters" class="text-xs font-medium text-[#d7037b] hover:text-[#9e0154]">
                Limpiar
              </button>
            </div>
            <div class="mt-3 flex flex-wrap gap-2">
              <span
                v-if="searchQuery"
                class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
              >
                Buscar: “{{ searchQuery }}”
              </span>
              <span
                v-if="activeDateRange"
                class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
              >
                Fecha: {{ activeDateRange }}
              </span>
              <span
                v-if="nearbyCity"
                class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
              >
                Cerca de: {{ nearbyCity }}
              </span>
              <span
                v-for="t in activeFilters"
                :key="t"
                class="inline-flex items-center gap-1 rounded-full bg-[#fdf2f8] px-2.5 py-1 text-xs text-[#d7037b]"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Feed editorial -->
      <main class="col-span-12 md:col-span-8 lg:col-span-9">
        <!-- Héroe destacado dentro del feed -->
        <article v-if="featuredEvent" class="relative mb-8 overflow-hidden rounded-3xl">
          <img
            :src="featuredEvent.imageUrl"
            :alt="featuredEvent.name"
            class="h-64 w-full object-cover sm:h-80 lg:h-96"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <span class="mb-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              Evento destacado
            </span>
            <h3 class="max-w-3xl text-2xl font-bold text-white sm:text-3xl">
              {{ featuredEvent.name }}
            </h3>
            <div class="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/90">
              <div class="flex items-center">
                <MapPinIcon class="mr-1.5 h-4 w-4" />
                <span>{{ featuredEvent.location }}</span>
              </div>
              <div class="flex items-center">
                <CalendarIcon class="mr-1.5 h-4 w-4" />
                <span>{{ featuredEvent.date }}</span>
              </div>
              <div class="flex items-center">
                <ClockIcon class="mr-1.5 h-4 w-4" />
                <span>{{ featuredEvent.time }}</span>
              </div>
            </div>
            <div class="mt-4 flex gap-3">
              <button
                v-if="isPremium"
                @click="joinEvent(featuredEvent.id)"
                class="inline-flex items-center rounded-full bg-[#9e0154] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                Participar
              </button>
              <router-link
                v-else
                to="/premium"
                class="inline-flex items-center rounded-full bg-[#d7037b] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
              >
                Desbloquear
              </router-link>
              <router-link
                :to="`/eventos/${featuredEvent.slug}`"
                class="inline-flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm transition hover:bg-white"
              >
                Ver detalles
              </router-link>
            </div>
          </div>
        </article>

        <!-- Bloques por causa (secciones dentro del feed) -->
        <section
          v-for="block in sectionedEvents"
          :key="block.cause"
          class="mb-12"
          aria-labelledby="heading-{{ block.cause }}"
        >
          <div class="mb-4 flex items-center justify-between">
            <h3 :id="'heading-' + block.cause" class="text-xl font-bold text-gray-900">
              {{ block.cause }}
            </h3>
            <router-link
              :to="`/eventos?cause=${encodeURIComponent(block.cause)}`"
              class="text-sm font-semibold text-[#9e0154] hover:text-[#d7037b]"
            >
              Ver todos
            </router-link>
          </div>

          <!-- Masonry responsivo con tarjetas “ticket” -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="event in block.items"
              :key="event.id"
              class="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <!-- Encabezado visual -->
              <div class="relative h-40 overflow-hidden">
                <img
                  :src="event.imageUrl || 'https://via.placeholder.com/800x500?text=Evento+KambiaPe'"
                  :alt="event.name"
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <!-- Chip featured -->
                <div v-if="event.featured" class="absolute right-4 top-4">
                  <span class="inline-flex items-center rounded-full bg-[#d7037b] px-3 py-1 text-xs font-bold text-white shadow">
                    <StarIcon class="mr-1 h-3 w-3" /> Destacado
                  </span>
                </div>
              </div>

              <!-- Cuerpo -->
              <div class="p-5">
                <!-- Etiquetas -->
                <div class="mb-2 flex flex-wrap gap-2">
                  <span
                    v-for="(tag, i) in event.tags"
                    :key="i"
                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
                    :class="i === 0 ? 'bg-[#fdf2f8] text-[#d7037b]' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ tag }}
                  </span>
                </div>

                <!-- Título -->
                <h4 class="line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-[#9e0154]">
                  {{ event.name }}
                </h4>

                <!-- Metas -->
                <div class="mt-2 flex flex-wrap items-center gap-x-3 text-sm text-gray-500">
                  <span class="flex items-center">
                    <MapPinIcon class="mr-1.5 h-4 w-4" />
                    {{ event.location }}
                  </span>
                  <span aria-hidden="true">•</span>
                  <span class="flex items-center">
                    <CalendarIcon class="mr-1.5 h-4 w-4" />
                    {{ event.date }}
                  </span>
                  <span class="hidden md:inline" aria-hidden="true">•</span>
                  <span class="hidden md:inline flex items-center">
                    <ClockIcon class="mr-1.5 h-4 w-4" />
                    {{ event.time }}
                  </span>
                </div>

                <!-- Descripción breve -->
                <p class="mt-3 line-clamp-2 text-sm text-gray-600">
                  {{ event.description }}
                </p>

                <!-- Organizadores -->
                <div class="mt-4 flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="-space-x-2 flex items-center">
                      <img
                        v-for="i in Math.min(event.organizers.length, 3)"
                        :key="i"
                        :src="`https://i.pravatar.cc/150?img=${i + 30}`"
                        class="h-7 w-7 rounded-full border-2 border-white"
                        :alt="`Organizador ${i}`"
                        loading="lazy"
                      />
                    </div>
                    <span class="ml-2 text-[12px] text-gray-500">
                      {{ event.organizers.slice(0, 2).join(', ') }}<span v-if="event.organizers.length > 2"> +{{ event.organizers.length - 2 }}</span>
                    </span>
                  </div>

                  <!-- Like/interés -->
                  <div class="flex items-center text-xs text-gray-500">
                    <HeartOutlineIcon class="mr-1.5 h-4 w-4 text-[#d7037b]" />
                    {{ event.likes }}
                  </div>
                </div>
              </div>

              <!-- Pie tipo “ticket” con perforación -->
              <div class="flex items-center justify-between border-t border-dashed border-gray-200 bg-gray-50/60 px-5 py-3">
                <div class="flex items-center text-xs text-gray-600">
                  <img
                    :src="event.qr || 'https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=KambiaPe'"
                    alt=""
                    class="mr-2 h-6 w-6 rounded"
                    loading="lazy"
                  />
                  <span>Código rápido</span>
                </div>

                <div class="flex items-center gap-2">
                  <button
                    v-if="isPremium"
                    @click="joinEvent(event.id)"
                    class="inline-flex items-center rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
                  >
                    Participar
                  </button>
                  <router-link
                    v-else
                    to="/premium"
                    class="inline-flex items-center rounded-full bg-[#9e0154] px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-110"
                  >
                    Desbloquear
                  </router-link>
                  <router-link
                    :to="`/eventos/${event.slug}`"
                    class="inline-flex items-center rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-50"
                  >
                    Detalles
                  </router-link>
                </div>
              </div>

              <!-- Perforaciones laterales -->
              <div class="pointer-events-none absolute inset-y-0 left-0 my-6 w-2 bg-gradient-to-b from-transparent via-gray-200 to-transparent [mask-image:radial-gradient(circle,black_2px,transparent_2.5px)] [mask-size:6px_12px] [mask-repeat:repeat-y]"></div>
              <div class="pointer-events-none absolute inset-y-0 right-0 my-6 w-2 bg-gradient-to-b from-transparent via-gray-200 to-transparent [mask-image:radial-gradient(circle,black_2px,transparent_2.5px)] [mask-size:6px_12px] [mask-repeat:repeat-y]"></div>
            </article>
          </div>
        </section>

        <!-- Empty state -->
        <div v-if="filteredEvents.length === 0" class="py-20 text-center">
          <div class="mx-auto mb-6 h-20 w-20 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-gray-900">No encontramos eventos</h3>
          <p class="mx-auto max-w-md text-gray-500">No hay coincidencias con tus criterios. Ajusta filtros o intenta otra búsqueda.</p>
          <button
            @click="resetFilters"
            class="mt-6 inline-flex items-center rounded-md bg-[#d7037b] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#9e0154] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#d7037b]"
          >
            <ArrowPathIcon class="mr-2 h-4 w-4" />
            Reiniciar filtros
          </button>
        </div>

        <!-- Paginación -->
        <div
          v-if="filteredEvents.length > 0"
          class="mt-12 flex items-center justify-between border-t border-gray-200 pt-8"
        >
          <button
            class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Anterior
          </button>

          <nav class="hidden sm:block" role="navigation" aria-label="Paginación de eventos">
            <ul class="inline-flex -space-x-px overflow-hidden rounded-md border border-gray-300 shadow-sm">
              <li v-for="page in totalPages" :key="page">
                <button
                  @click="currentPage = page"
                  :aria-current="page === currentPage ? 'page' : undefined"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 text-sm font-medium border-l border-gray-300 first:border-l-0 focus-visible:outline-none',
                    page === currentPage
                      ? 'z-10 bg-[#d7037b] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </li>
            </ul>
          </nav>

          <button
            class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  </div>
</section>
      <!--Explora eventos-->
    </main>

    <TransitionRoot as="template" :show="showPremiumModal">
      <Dialog as="div" class="relative z-50" @close="showPremiumModal = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#fdf2f8] sm:mx-0 sm:h-10 sm:w-10">
                      <StarIcon class="h-6 w-6 text-[#d7037b]" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">Beneficios Premium</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Como miembro Premium de KambiaPe, disfrutarás de:
                        </p>
                        <ul class="mt-3 space-y-2 text-sm text-gray-500">
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Acceso prioritario a todos los eventos solidarios</span>
                          </li>
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Participación en eventos exclusivos para miembros Premium</span>
                          </li>
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Descuentos especiales en colaboraciones con aliados</span>
                          </li>
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Certificados digitales de participación</span>
                          </li>
                          <li class="flex items-start">
                            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span>Reportes de impacto personalizado</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <router-link
                    to="/premium"
                    type="button"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#d7037b] to-[#9e0154] px-4 py-2 text-base font-medium text-white shadow-sm hover:from-[#9e0154] hover:to-[#d7037b] transition-all sm:ml-3 sm:w-auto sm:text-sm"
                    @click="showPremiumModal = false"
                  >
                    Ver Planes Premium
                  </router-link>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    @click="showPremiumModal = false"
                  >
                    Cerrar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <Footer />
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import Header from './Header.vue';
import Footer from './Footer.vue'; // Import the Footer component
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  CalendarIcon, 
  LockClosedIcon, 
  ArrowRightIcon, 
  HandRaisedIcon,
  FaceSmileIcon,
  StarIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  HeartIcon as HeartOutlineIcon, // Renombrado para evitar conflicto con HandHeartIcon
  ArrowPathIcon,
  SparklesIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline';
import { 
  HeartIcon as HandHeartIcon, // Renombrado para evitar conflicto con HeartOutlineIcon
  StarIcon as StarSolidIcon // No utilizado directamente en template, pero mantenido por si acaso
} from '@heroicons/vue/24/solid';
import { 
  Dialog, 
  DialogPanel, 
  DialogTitle, 
  TransitionChild, 
  TransitionRoot 
} from '@headlessui/vue';

/* ==========================
   Estado global sección
========================== */
// Modal premium
const showPremiumModal = ref(false);

// Estado premium (mock)
const isPremium = ref(false); // Cambia a true para probar la vista premium

// Búsqueda y filtros avanzados
const searchQuery = ref('');
const topCauses = ref(['Salud', 'Educación', 'Ambiente', 'Inclusión', 'Animales', 'Cultura']);
const activeCause = ref(''); // tab de causa activa

// Chips de filtro (temas/etiquetas). Incluye "Todos" por compatibilidad con tu lógica previa.
const filters = ref(['Todos', 'Recolección', 'Capacitación', 'Donación', 'Limpieza', 'Mentoría', 'Cocina', 'Primeros Auxilios', 'Cultura']);
const activeFilters = ref(['Todos']);

const onlyFree = ref(false);
const accessibleFilter = ref(false);
const dateRanges = ref([
  { label: 'Este fin de semana', value: 'weekend' },
  { label: 'Próximos 7 días', value: '7d' },
  { label: 'Este mes', value: 'month' },
  { label: 'Todos', value: 'all' },
]);
const activeDateRange = ref('all');
const nearbyCity = ref('');

// Paginación
const currentPage = ref(1);
const eventsPerPage = 6;

/* ==========================
   Datos (mock) eventos
   Nota: date -> para mostrar
         dateISO -> para filtrar
========================== */
const events = ref([
  { 
    id: 1, 
    cause: 'Educación',
    name: 'Donación de Útiles para Niños de Cusco', 
    date: '15 de Julio, 2025', 
    dateISO: '2025-07-15',
    time: '9:00 AM - 2:00 PM',
    description: 'Recolección y entrega de material escolar a comunidades rurales en los Andes de Cusco. Un día para dibujar sonrisas y apoyar la educación en zonas alejadas.',
    location: 'Cusco',
    imageUrl: 'https://images.unsplash.com/photo-1579782531093-68d830b533b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Donación', 'Educación', 'Niños'],
    participants: 42,
    likes: 87,
    organizers: ['Fundación Aprendiendo Juntos'],
    featured: true,
    price: 0,
    accessible: true,
    slug: 'donacion-utiles-cusco',
    qr: ''
  },
  { 
    id: 2, 
    cause: 'Comunidad',
    name: 'Apoyo a Ollas Comunes de Ventanilla', 
    date: '1 de Agosto, 2025', 
    dateISO: '2025-08-01',
    time: '8:00 AM - 4:00 PM',
    description: 'Jornada de apoyo en ollas comunes, brindando alimentos y víveres esenciales a familias. Ayúdanos a preparar y servir comidas.',
    location: 'Ventanilla',
    imageUrl: 'https://images.unsplash.com/photo-1627993046200-ee710b1a0d8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Cocina', 'Comunidad', 'Donación'],
    participants: 35,
    likes: 64,
    organizers: ['Ollas Comunes Unidos'],
    featured: false,
    price: 0,
    accessible: true,
    slug: 'ollas-comunes-ventanilla',
    qr: ''
  },
  { 
    id: 3, 
    cause: 'Ambiente',
    name: 'Reforestación en la Selva Central', 
    date: '10 de Septiembre, 2025', 
    dateISO: '2025-09-10',
    time: '7:00 AM - 1:00 PM',
    description: 'Campaña de reforestación en Chanchamayo: plantaremos especies nativas y aprenderemos sobre conservación.',
    location: 'Chanchamayo',
    imageUrl: 'https://images.unsplash.com/photo-1610492801453-2b225c52c2c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Recolección', 'Limpieza', 'Sostenibilidad'],
    participants: 28,
    likes: 53,
    organizers: ['EcoPerú', 'Municipalidad de Chanchamayo'],
    featured: true,
    price: 0,
    accessible: false,
    slug: 'reforestacion-selva-central',
    qr: ''
  },
  { 
    id: 4, 
    cause: 'Inclusión',
    name: 'Visita y Entrega en Asilo de Arequipa', 
    date: '5 de Octubre, 2025',
    dateISO: '2025-10-05', 
    time: '10:00 AM - 3:00 PM',
    description: 'Compartiremos un día con adultos mayores, llevando donaciones y actividades recreativas.',
    location: 'Arequipa',
    imageUrl: 'https://images.unsplash.com/photo-1627049870344-e224e7828c46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Donación', 'Solidaridad'],
    participants: 19,
    likes: 41,
    organizers: ['Hogar San Vicente'],
    featured: false,
    price: 0,
    accessible: true,
    slug: 'visita-asilo-arequipa',
    qr: ''
  },
  { 
    id: 5, 
    cause: 'Salud',
    name: 'Taller de Nutrición en Villa El Salvador', 
    date: '12 de Agosto, 2025', 
    dateISO: '2025-08-12',
    time: '2:00 PM - 5:00 PM',
    description: 'Taller práctico de nutrición infantil para madres. Incluye entrega de canastas.',
    location: 'Villa El Salvador',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Capacitación', 'Salud'],
    participants: 15,
    likes: 32,
    organizers: ['Nutriendo Perú'],
    featured: false,
    price: 0,
    accessible: true,
    slug: 'taller-nutricion-ves',
    qr: ''
  },
  { 
    id: 6, 
    cause: 'Animales',
    name: 'Rescate y Rehabilitación de Animales', 
    date: '22 de Septiembre, 2025', 
    dateISO: '2025-09-22',
    time: '9:00 AM - 6:00 PM',
    description: 'Jornada de rescate, atención veterinaria y adopciones responsables.',
    location: 'Miraflores',
    imageUrl: 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Donación', 'Recolección', 'Animales'],
    participants: 23,
    likes: 56,
    organizers: ['Patitas Perú'],
    featured: true,
    price: 0,
    accessible: true,
    slug: 'rescate-animales-miraflores',
    qr: ''
  },
  { 
    id: 7, 
    cause: 'Ambiente',
    name: 'Limpieza de Playas Costa Verde', 
    date: '30 de Julio, 2025', 
    dateISO: '2025-07-30',
    time: '8:00 AM - 12:00 PM',
    description: 'Campaña de limpieza para reducir contaminación plástica en la Costa Verde.',
    location: 'Lima',
    imageUrl: 'https://images.unsplash.com/photo-1519046967733-a3ad230059c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Limpieza', 'Voluntariado', 'Recolección'],
    participants: 50,
    likes: 95,
    organizers: ['Conservación Marina Perú'],
    featured: false,
    price: 0,
    accessible: true,
    slug: 'limpieza-playas-costa-verde',
    qr: ''
  },
  { 
    id: 8, 
    cause: 'Cultura',
    name: 'Charlas de Conciencia Ciudadana', 
    date: '8 de Agosto, 2025', 
    dateISO: '2025-08-08',
    time: '3:00 PM - 6:00 PM',
    description: 'Derechos y deberes ciudadanos para fomentar participación activa.',
    location: 'Comas',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Capacitación', 'Cultura', 'Comunidad'],
    participants: 20,
    likes: 40,
    organizers: ['Vecinos Unidos por Comas'],
    featured: false,
    price: 0,
    accessible: true,
    slug: 'charlas-conciencia-comas',
    qr: ''
  },
  { 
    id: 9, 
    cause: 'Salud',
    name: 'Campaña de Salud Gratuita en Puno', 
    date: '1 de Noviembre, 2025', 
    dateISO: '2025-11-01',
    time: '8:00 AM - 5:00 PM',
    description: 'Atención médica general, despistaje y entrega de medicamentos básicos.',
    location: 'Puno',
    imageUrl: 'https://images.unsplash.com/photo-1582759714856-11f2780650d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Salud', 'Donación'],
    participants: 30,
    likes: 70,
    organizers: ['Médicos Solidarios'],
    featured: true,
    price: 0,
    accessible: true,
    slug: 'campana-salud-puno',
    qr: ''
  },
  { 
    id: 10, 
    cause: 'Educación',
    name: 'Apoyo Escolar para Niños de Ayacucho', 
    date: '20 de Septiembre, 2025', 
    dateISO: '2025-09-20',
    time: '9:00 AM - 1:00 PM',
    description: 'Refuerzo en matemáticas y comunicación para primaria.',
    location: 'Ayacucho',
    imageUrl: 'https://images.unsplash.com/photo-1529712490130-9b6d6f2e8f1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Mentoría', 'Educación', 'Capacitación'],
    participants: 18,
    likes: 35,
    organizers: ['Maestros sin Fronteras'],
    featured: false,
    price: 0,
    accessible: true,
    slug: 'apoyo-escolar-ayacucho',
    qr: ''
  },
  { 
    id: 11, 
    cause: 'Animales',
    name: 'Caminata Canina Solidaria en Barranco', 
    date: '10 de Octubre, 2025', 
    dateISO: '2025-10-10',
    time: '10:00 AM - 1:00 PM',
    description: 'Paseo con perros rescatados para promover adopción y recaudar fondos.',
    location: 'Barranco',
    imageUrl: 'https://images.unsplash.com/photo-1596700864319-f538e1e7e4a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Animales', 'Cultura'],
    participants: 25,
    likes: 60,
    organizers: ['Adopta un Amigo'],
    featured: false,
    price: 0,
    accessible: true,
    slug: 'caminata-canina-barranco',
    qr: ''
  },
  { 
    id: 12, 
    cause: 'Ambiente',
    name: 'Biohuertos en Colegios Rurales de Cajamarca', 
    date: '5 de Noviembre, 2025', 
    dateISO: '2025-11-05',
    time: '8:00 AM - 4:00 PM',
    description: 'Creación de biohuertos escolares para educación ambiental y alimentación.',
    location: 'Cajamarca',
    imageUrl: 'https://images.unsplash.com/photo-1534066597-e85d99723223?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    tags: ['Sostenibilidad', 'Capacitación', 'Recolección'],
    participants: 22,
    likes: 48,
    organizers: ['Sembrando Futuro'],
    featured: true,
    price: 0,
    accessible: true,
    slug: 'biohuertos-cajamarca',
    qr: ''
  },
]);

/* ==========================
   Helpers de fecha / lógica
========================== */
const parseISO = (s) => new Date(s + 'T00:00:00');
const today = () => new Date();
const isWeekend = (d) => [0, 6].includes(d.getDay());
const withinNextDays = (iso, n) => {
  const now = today();
  const target = parseISO(iso);
  const diff = (target - now) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= n;
};
const isThisMonth = (iso) => {
  const now = today();
  const dt = parseISO(iso);
  return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
};

/* ==========================
   Acciones de filtros
========================== */
const toggleFilter = (filter) => {
  // Compatibilidad con "Todos"
  if (filter === 'Todos') {
    activeFilters.value = ['Todos'];
  } else {
    const idx = activeFilters.value.indexOf(filter);
    if (idx > -1) activeFilters.value.splice(idx, 1);
    else {
      const allIdx = activeFilters.value.indexOf('Todos');
      if (allIdx > -1) activeFilters.value.splice(allIdx, 1);
      activeFilters.value.push(filter);
    }
    if (activeFilters.value.length === 0) activeFilters.value = ['Todos'];
  }
  currentPage.value = 1;
};

const setDateRange = (v) => {
  activeDateRange.value = v;
  currentPage.value = 1;
};

const selectCause = (c) => {
  activeCause.value = activeCause.value === c ? '' : c;
  currentPage.value = 1;
};

const onSearchInput = () => {
  currentPage.value = 1;
};

const applyNearby = () => {
  currentPage.value = 1;
};

const resetFilters = () => {
  searchQuery.value = '';
  activeFilters.value = ['Todos'];
  activeCause.value = '';
  onlyFree.value = false;
  accessibleFilter.value = false;
  activeDateRange.value = 'all';
  nearbyCity.value = '';
  currentPage.value = 1;
};

/* ==========================
   CTA / UX helpers
========================== */
const joinEvent = (eventId) => {
  alert(`¡Genial! Te has unido al evento ID: ${eventId}. Revisa tu correo para más detalles.`);
};

const scrollToEvents = () => {
  const eventsSection = document.getElementById('events');
  if (eventsSection) eventsSection.scrollIntoView({ behavior: 'smooth' });
};

/* ==========================
   Filtrado / Agrupado / Paginación
========================== */
// Filtro base (aplica causa, búsqueda, chips, gratis, accesible, fecha, cerca de…)
function filteredEventsAll() {
  return events.value.filter((e) => {
    // Causa (tab)
    if (activeCause.value && e.cause !== activeCause.value) return false;

    // Búsqueda textual
    const q = searchQuery.value.trim().toLowerCase();
    if (q) {
      const hay =
        e.name.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.organizers.join(' ').toLowerCase().includes(q);
      if (!hay) return false;
    }

    // Chips de filtro (tags)
    if (!activeFilters.value.includes('Todos')) {
      const ok = activeFilters.value.every((t) => e.tags.includes(t));
      if (!ok) return false;
    }

    // Gratis / Accesibles
    if (onlyFree.value && e.price > 0) return false;
    if (accessibleFilter.value && !e.accessible) return false;

    // Fecha
    if (activeDateRange.value !== 'all') {
      if (activeDateRange.value === 'weekend') {
        if (!isWeekend(parseISO(e.dateISO))) return false;
      } else if (activeDateRange.value === '7d') {
        if (!withinNextDays(e.dateISO, 7)) return false;
      } else if (activeDateRange.value === 'month') {
        if (!isThisMonth(e.dateISO)) return false;
      }
    }

    // Cerca de
    if (nearbyCity.value.trim()) {
      const c = nearbyCity.value.trim().toLowerCase();
      if (!e.location.toLowerCase().includes(c)) return false;
    }

    return true;
  });
}

// Evento destacado que respete filtros globales (si existe)
const featuredEvent = computed(() => {
  return filteredEventsAll().find((e) => e.featured) || null;
});

// Secciones por causa (para feed editorial). Excluye el destacado.
const sectionedEvents = computed(() => {
  const pool = filteredEventsAll().filter((e) => !e.featured);
  const byCause = {};
  for (const e of pool) {
    if (!byCause[e.cause]) byCause[e.cause] = [];
    byCause[e.cause].push(e);
  }
  const order = [
    ...topCauses.value,
    ...Object.keys(byCause).filter((c) => !topCauses.value.includes(c)),
  ];
  return order
    .filter((c) => byCause[c]?.length)
    .map((c) => ({ cause: c, items: byCause[c] }));
});

// Lista plana para la grilla “clásica” (si la usás en otra vista)
const filteredEvents = computed(() => filteredEventsAll());

// Paginación plana (para la grilla clásica o para el bloque "paginatedEvents" existente)
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage;
  return filteredEvents.value.slice(start, start + eventsPerPage);
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredEvents.value.length / eventsPerPage)));

// Asegura que currentPage siempre sea válido
watch([filteredEvents], () => {
  if (currentPage.value > totalPages.value) currentPage.value = 1;
});
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}
.animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
.animate-fade-in-up.delay-200 { animation-delay: 0.2s; }

@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
.animate-pulse-slow {
  animation: pulse-slow 3s infinite;
}

/* Efecto de recorte de texto para descripciones */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transiciones suaves para hover */
.transition-slow {
  transition: all 0.5s ease;
}

/* Efecto de gradiente animado */
.bg-gradient-animate {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Mejoras de accesibilidad para focus */
button:focus, a:focus {
  outline: 2px solid #d7037b;
  outline-offset: 2px;
}
</style>