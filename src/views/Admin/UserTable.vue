<template>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Nombre Completo</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Estado</th>
            <th scope="col" class="relative px-6 py-3"><span class="sr-only">Acciones</span></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
          <tr v-if="users.length === 0">
            <td colspan="4" class="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
              No se encontraron usuarios en esta categoría.
            </td>
          </tr>
          <tr v-for="user in users" :key="user.id">
            <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{{ user.full_name }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm">
              <span class="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/50 dark:text-green-300">Activo</span>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
              <button @click="$emit('edit', user)" class="font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Editar</button>
              <button @click="$emit('delete', user.id)" class="ml-4 font-semibold text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  defineProps({
    users: {
      type: Array,
      required: true,
    },
  });
  
  defineEmits(['edit', 'delete']);
  </script>