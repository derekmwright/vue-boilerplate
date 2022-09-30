<script setup lang="ts">
import { Auth } from 'aws-amplify';
import { useRouter } from 'vue-router';
import PrimaryButton from '../components/UIElements/PrimaryButton.vue';

const router = useRouter()

const logout = async () => {
  try {
    await Auth.signOut()
    await router.push({ name: 'login' })
  } catch (e: unknown) {
    console.log((e as Error).message)
  }
}
</script>

<template>
  <div>
  Dashboard Page
  <PrimaryButton @click="logout">Logout</PrimaryButton>
  </div>
</template>
