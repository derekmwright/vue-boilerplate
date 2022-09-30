<script setup lang="ts">
import { ref } from 'vue'
import { Auth } from 'aws-amplify'
import { useRouter } from 'vue-router'
import InputField from '@/components/UIElements/InputField.vue'
import PrimaryButton from '@/components/UIElements/PrimaryButton.vue'
import BasicForm from '@/components/UIElements/BasicForm.vue'
import Card from '@/components/UIElements/Card.vue'
import ErrorBanner from '@/components/UIElements/ErrorBanner.vue'
import LoginContent from '../../components/LoginElements/LoginContent.vue'

const login = {
  email: ref(''),
  password: ref(''),
}

const errors = {
  hasErrors: ref(false),
  message: ref(''),
}

const router = useRouter()

const signIn = async () => {
  try {
    const auth = await Auth.signIn(login.email.value, login.password.value)
    if (errors.hasErrors.value) {
      errors.hasErrors.value = false
      errors.message.value = ''
    }
    router.push('dashboard')
  } catch(e: unknown) {
    errors.message.value = (e as Error).message
    errors.hasErrors.value = true
  }
}
</script>

<template>
  <LoginContent title="Login to the site">
    <Card>
      <Transition
        enter-active-class="duration-300 ease-out"
        enter-from-class="transform opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="transform opacity-0"
      >
        <ErrorBanner v-if="errors.hasErrors.value">{{ errors.message.value }}</ErrorBanner>
      </Transition>
      <BasicForm>
        <InputField v-model="login.email.value" id="email" name="email" input-type="email" autocomplete="email">Email</InputField>

        <InputField v-model="login.password.value" id="password" name="password" input-type="password" autocomplete="current-password">Password</InputField>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <RouterLink :to="{name: 'register'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">New User? Sign Up</RouterLink>
          </div>
          <div class="text-sm">
            <RouterLink :to="{name: 'forgot'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Forgot your password?</RouterLink>
          </div>
        </div>

        <PrimaryButton :full-width="true" @click.preventDefault="signIn()">Sign In</PrimaryButton>
      </BasicForm>
    </Card>
  </LoginContent>
</template>
