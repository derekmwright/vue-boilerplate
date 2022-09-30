<script setup lang="ts">
import { inject, ref } from 'vue'
import { Auth } from 'aws-amplify'
import { useRouter } from 'vue-router'
import InputField from '@/components/UIElements/InputField.vue'
import PrimaryButton from '@/components/UIElements/PrimaryButton.vue'
import BasicForm from '@/components/UIElements/BasicForm.vue'
import Card from '@/components/UIElements/Card.vue'
import ErrorBanner from '@/components/UIElements/ErrorBanner.vue'
import LoginContent from '@/components/LoginElements/LoginContent.vue'
import Fade from '@/components/Transitions/Fade.vue'
import { NotificationOpts, sendNotification, notification } from '../../models/notification'
import { validateEmail, validatePassword } from '../../validations'

const login = ref({
  email: '',
  password: '',
})

const errors = ref<string[]>([])
const router = useRouter()
const notify = inject(notification) as sendNotification

const signIn = async () => {
  if (validate()) {
    try {
      await Auth.signIn(login.value.email, login.value.password)
      if (errors.value.length) {
        errors.value = []
      }
      const notifyOpts: NotificationOpts = {
        show: true,
        title: 'Signed in',
        message: 'You have been successfully signed in to the app.',
        icon: {},
      }
      notify(notifyOpts)
      router.push('dashboard')
    } catch (e: unknown) {
      errors.value.push((e as Error).message)
    }
  }
}

const emailErrs = ref<Array<string>>([])
const passErrs = ref<Array<string>>([])

const validate = (): boolean => {
  emailErrs.value = validateEmail(login.value.email)
  passErrs.value = validatePassword(login.value.password)

  if (emailErrs.value.length != 0 || passErrs.value.length != 0) {
    return false
  }

  return true
}
</script>

<template>
  <LoginContent title="Login to the site">
    <Card>
      <Fade>
        <ErrorBanner v-if="errors.length" :errors="errors" />
      </Fade>
      <BasicForm id="login" @submit.preventDefault="signIn()">
        <InputField v-model="login.email" id="email" name="email" input-type="email" autocomplete="email" :errors="emailErrs">Email</InputField>

        <InputField v-model="login.password" id="password" name="password" input-type="password" autocomplete="current-password" :errors="passErrs">Password</InputField>

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
