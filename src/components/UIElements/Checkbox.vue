<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: 'off',
    required: true,
  }
})

defineEmits<{
  (event: 'update:modelValue'): void,
}>()
</script>

<template>
  <div class="flex items-center">
    <input
      :id="id"
      :name="name"
      type="checkbox"
      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:bg-zinc-900 dark:border-zinc-700"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <label :for="id" class="ml-2 block text-sm text-gray-900 dark:text-zinc-400"><slot></slot></label>
  </div>
</template>
