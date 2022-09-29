<script setup lang="ts">
import InputField from '@/components/UIElements/InputField.vue'
import PrimaryButton from '@/components/UIElements/PrimaryButton.vue'
import BasicForm from '@/components/UIElements/BasicForm.vue'
import Checkbox from '@/components/UIElements/Checkbox.vue'
import Card from '@/components/UIElements/Card.vue'
import { Auth } from 'aws-amplify'
import { ref } from 'vue'
import ErrorBanner from '@/components/UIElements/ErrorBanner.vue'
import { useRouter } from 'vue-router'

const login = {
  email: '',
  password: '',
  remember: 'off',
}

let errors = ref({
  hasErrors: false,
  message: '',
})

const router = useRouter()

const signIn = async () => {
  try {
    const auth = await Auth.signIn(login.email, login.password)
    if (errors.value.hasErrors) {
      errors.value.hasErrors = false
      errors.value.message = ''
    }
    router.push('dashboard')
  } catch(e: unknown) {
    errors.value.message = (e as Error).message
    errors.value.hasErrors = true
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-48 w-auto" src="https://via.placeholder.com/192" alt="Company Name" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-500">Sign in to your account</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Card>
        <Transition
          enter-active-class="duration-300 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="transform opacity-0"
        >
          <ErrorBanner v-if="errors.hasErrors">{{ errors.message }}</ErrorBanner>
        </Transition>
        <BasicForm>
          <InputField v-model="login.email" id="email" name="email" input-type="email" autocomplete="email">Email</InputField>

          <InputField v-model="login.password" id="password" name="password" input-type="password" autocomplete="current-password">Password</InputField>

          <div class="flex items-center justify-between">
            <Checkbox v-model="login.remember" id="remember-me" name="remember-me">Remember Me</Checkbox>

            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </div>

          <PrimaryButton :full-width="true" @click.preventDefault="signIn()">Sign In</PrimaryButton>
        </BasicForm>
      </Card>
    </div>
  </div>
</template>
