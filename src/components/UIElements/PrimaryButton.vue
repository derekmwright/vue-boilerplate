<script setup lang="ts">
/**
 * Primary Button
 */
const props = defineProps({
  fullWidth: {
    type: Boolean,
    default: false,
  },
  leadingIcon: {},
  trailingIcon: {},
})

defineEmits<{
  (event: 'click'): void
}>()

const cssClasses = (fullWidth: boolean): string => {
  const width = fullWidth ? "flex w-full justify-center" : "inline-flex items-center"
  const borders = 'border border-transparent'
  const colors = 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
  const dark_colors = 'dark:focus:ring-indigo-500'
  const text = 'text-sm font-medium text-white'
  const padding = 'px-4 py-2'
  const effects = 'shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2'
  return `${width} ${borders} ${colors} ${dark_colors} ${text} ${padding} ${effects}`
}
</script>

<template>
  <button
      :class="`${cssClasses(fullWidth)}`"
      type="button"
      @click="$emit('click')"
    >
    <component :is="leadingIcon" class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
    <slot></slot>
    <component :is="trailingIcon" class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
    </button>
</template>
