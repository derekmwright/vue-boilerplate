<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  }
})

defineEmits<{
  (event: 'submit'): void,
}>()
</script>

<template>
<form id="" v-on:keypress.enter="$emit('submit')" class="space-y-6">
  <slot></slot>
</form>
</template>
