<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/solid'
</script>

<template>
<div class="border-l-4 border-red-700 bg-red-50 dark:bg-red-200 p-4 mb-6">
  <div class="flex">
    <div class="flex-shrink-0">
      <XCircleIcon class="h-5 w-5 text-red-700" aria-hidden="true" />
    </div>
    <div class="ml-3">
      <p class="text-sm text-red-700">
        <slot></slot>
      </p>
    </div>
  </div>
</div>
</template>
