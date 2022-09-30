<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-36 w-auto" src="https://via.placeholder.com/192" alt="Company Name" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-500">{{ title }}</h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <slot></slot>
    </div>
  </div>
</template>
