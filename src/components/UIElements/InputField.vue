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
  inputType: {
    type: String,
    required: true
  },
  autocomplete: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: String,
    default: '',
    required: true,
  }
})

defineEmits<{
  (event: 'update:modelValue'): void,
}>()

const labelClasses = (): string => {
  const appearance = 'block'
  const text = 'text-sm font-medium'
  const colors = 'text-gray-700'
  const dark_colors = 'dark:text-zinc-400'
  return `${appearance} ${text} ${colors} ${dark_colors}`
}

const inputClasses = (): string => {
  const appearance = 'block w-full appearance-none border '
  const border = 'border'
  const colors = 'placeholder-gray-400 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
  const dark_colors = 'dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200'
  const text = 'sm:text-sm'
  const padding = 'px-3 py-2'
  const effects = 'shadow-sm focus:outline-none'
  return `${appearance} ${border} ${colors} ${dark_colors} ${text} ${padding} ${effects}`
}
</script>

<template>
  <div>
    <label :for="id" :class="labelClasses()"><slot></slot></label>
    <div class="mt-1">
      <input
        :id="id"
        :name="name"
        :value="modelValue"
        :type="inputType"
        :autocomplete="autocomplete"
        :required="required"
        :class="inputClasses()"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>
