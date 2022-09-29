<script setup lang="ts">

const props = defineProps({
  text: String,
  fullWidth: {
    type: Boolean,
    default: false,
  },
})

defineEmits<{
  (event: 'click'): void
  }>()

const widthClasses = (prop: Boolean) => {
  return prop ? "flex w-full justify-center" : "inline-flex items-center"
}
</script>

<template>
  <button
      :class="widthClasses(fullWidth) + ' rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'"
      type="button"
      @click="$emit('click')"
    >
    {{ text }}
    </button>
</template>