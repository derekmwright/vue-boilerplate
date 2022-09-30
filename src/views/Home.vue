<script setup lang="ts">
import { useRouter } from 'vue-router';
import PrimaryButton from '../components/UIElements/PrimaryButton.vue';

const router = useRouter()

const login = () => {
  router.push({name: 'login'})
}
</script>

<template>
<div>
  Marketing Page
  <PrimaryButton @click="login">Login</PrimaryButton>
</div>
</template>
