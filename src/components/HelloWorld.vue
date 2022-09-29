<script setup lang="ts">
import { ref } from 'vue'
import PrimaryButton from './UIElements/PrimaryButton.vue'
import { EnvelopeIcon } from '@heroicons/vue/24/solid'

const count = ref(0)
</script>

<template>
  <div class="container-fluid">
    <PrimaryButton :text="'Login '+count" :trailing-icon="EnvelopeIcon" :full-width=true @click="count++"  />
    <PrimaryButton :text="'Login '+count" :leading-icon="EnvelopeIcon" @click="count++" />
  </div>
</template>
