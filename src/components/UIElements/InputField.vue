<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/solid'

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
    required: true,
  },
  placeholder: {
    type: String,
  },
  autocomplete: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    default: '',
    required: true,
  },
  errors: {
    type: Array<string>,
    default: Array<string>(),
  }
})

defineEmits<{
  (event: 'update:modelValue'): void,
}>()

const labelClasses = (): string => {
  return 'block text-sm font-medium text-gray-700 dark:text-zinc-400'
}

const inputClasses = (errors: Array<string>): string => {
  const classes = 'block w-full appearance-none border placeholder-zinc-400 dark:placeholder-zinc-700 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200 sm:text-sm px-3 py-2 shadow-sm focus:outline-none'
  const errClasses = 'block w-full border-red-300 dark:border-red-700 pr-10 text-red-900 dark:text-red-400 placeholder-red-300 dark:placeholder-red-900 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm dark:bg-zinc-900'
  if (errors.length) {
    return errClasses
  }
  return classes
}
</script>

<template>
  <div>
    <label :for="id" :class="labelClasses()"><slot></slot></label>
    <div class="relative mt-1 shadow-sm">
      <input
        :id="id"
        :name="name"
        :value="modelValue"
        :type="inputType"
        :autocomplete="autocomplete"
        :required="required"
        :placeholder="placeholder"
        :class="inputClasses(errors)"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <div v-if="errors.length" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500 dark:text-red-700" aria-hidden="true" />
      </div>
    </div>
    <p v-for="error in errors" class="mt-2 text-sm text-red-600 dark:text-red-700" id="email-error">{{ error }}</p>
  </div>
</template>
