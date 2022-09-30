<script setup lang="ts">
import { ref } from 'vue'
import { router } from '../../router'
import { Auth } from 'aws-amplify'

import Card from '@/components/UIElements/Card.vue'
import BasicForm from '@/components/UIElements/BasicForm.vue'
import LoginContent from '@/components/LoginElements/LoginContent.vue'
import InputField from '@/components/UIElements/InputField.vue'
import PrimaryButton from '@/components/UIElements/PrimaryButton.vue'
import Fade from '@/components/Transitions/Fade.vue'
import ErrorBanner from '@/components/UIElements/ErrorBanner.vue'
import FadeGroup from '@/components/Transitions/FadeGroup.vue'

const send = async () => {
  try {
    await Auth.forgotPassword(login.value.email)
    login.value.needVerify = true
  } catch(e: unknown) {
    console.log((e as Error).message)
  }
}

const code = async () => {
  if (login.value.email == '') {
    errors.value.hasErrors = true
    errors.value.message = 'Enter your email address before proceeding'
  } else {
    errors.value.hasErrors = false
    errors.value.message = ''
    login.value.needVerify = true
  }
}

const verify = () => {
  login.value.updatePass = true
  login.value.needVerify = false
}

const update = async () => {
  try {
    await Auth.forgotPasswordSubmit(
      login.value.email,
      login.value.code,
      login.value.password,
    )
    console.log('yay, now nav!')
    router.push('login')
  } catch (e: unknown) {
    const err = e as Error

    login.value.password = ''
    login.value.confirmPassword = ''

    errors.value.hasErrors = true
    errors.value.message = err.message

    switch(err.name) {
      case 'CodeMismatchException': {
        login.value.needVerify = true
        login.value.updatePass = false
        login.value.code = ''
      }
      default: {
        login.value.needVerify = false
        login.value.updatePass = false
        login.value.code = ''
      }
    }
  }
}

const errors = ref({
  hasErrors: false,
  message: '',
})

const login = ref({
  email: '',
  needVerify: false,
  updatePass: false,
  code: '',
  password: '',
  confirmPassword: '',
})
</script>

<template>
  <LoginContent title="Reset your password">
    <Card>
      <Fade>
        <ErrorBanner v-if="errors.hasErrors">{{ errors.message }}</ErrorBanner>
      </Fade>
      <BasicForm>
        <Fade>
          <InputField v-if="!login.needVerify && !login.updatePass" v-model="login.email" id="email" name="email" input-type="email" autocomplete="email">Email</InputField>
        </Fade>

        <Fade>
          <InputField v-if="login.needVerify" v-model="login.code" id="code" name="code" input-type="text" autocomplete="">Verification Code</InputField>
        </Fade>

        <FadeGroup>
          <InputField v-if="login.updatePass" v-model="login.password" id="password" name="password" input-type="password" autocomplete="">Password</InputField>
          <InputField v-if="login.updatePass" v-model="login.confirmPassword" id="confirmPassword" name="confirmPassword" input-type="password" autocomplete="">Confirm Password</InputField>
        </FadeGroup>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <RouterLink :to="{name: 'login'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Already a user? Login</RouterLink>
          </div>
          <div class="text-sm">
            <RouterLink :to="{name: 'register'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">New User? Sign Up</RouterLink>
          </div>
        </div>

        <FadeGroup>
          <PrimaryButton v-if="!login.needVerify && !login.updatePass" :full-width="true" @click.preventDefault="send">Send Reset</PrimaryButton>
          <PrimaryButton v-if="!login.needVerify && !login.updatePass" :full-width="true" @click.preventDefault="code">Enter Code</PrimaryButton>
        </FadeGroup>
        <Fade>
          <PrimaryButton v-if="login.needVerify" :full-width="true" @click.preventDefault="verify">Verify</PrimaryButton>
        </Fade>
        <Fade>
          <PrimaryButton v-if="login.updatePass" :full-width="true" @click.preventDefault="update">Update Password</PrimaryButton>
        </Fade>
      </BasicForm>
    </Card>
  </LoginContent>
</template>
