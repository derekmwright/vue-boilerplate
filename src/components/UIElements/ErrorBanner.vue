<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  errors: {
    type: Array,
    required: true,
  }
})
</script>

<template>
<div class="border-l-4 border-red-700 bg-red-50 dark:bg-red-200 p-4 mb-6">
  <div class="flex">
    <div class="flex-shrink-0">
      <XCircleIcon class="h-5 w-5 text-red-700" aria-hidden="true" />
    </div>
    <div class="ml-3">
      <div v-if="errors.length > 1">
        <h3 class="text-sm font-bold text-red-700">There were {{ errors.length }} errors with your submission</h3>
        <div class="mt-2 text-sm text-red-700">
          <ul role="list" class="list-disc space-y-1 pl-5">
            <li v-for="error in errors">{{ error }}</li>
          </ul>
        </div>
      </div>
      <p v-if="errors.length == 1" v-for="error in errors" class="text-sm text-red-700">{{ error }}</p>
    </div>
  </div>
</div>
</template>
