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
import FadeGroup from '../../components/Transitions/FadeGroup.vue'

const send = async () => {
  try {
    await Auth.forgotPassword(login.email.value)
    login.needVerify.value = true
  } catch(e: unknown) {
    console.log((e as Error).message)
  }
}

const code = async () => {
  if (login.email.value == '') {
    errors.hasErrors.value = true
    errors.message.value = 'Enter your email address before proceeding'
  } else {
    errors.hasErrors.value = false
    errors.message.value = ''
    login.needVerify.value = true
  }
}

const verify = () => {
  login.updatePass.value = true
  login.needVerify.value = false
}

const update = async () => {
  try {
    await Auth.forgotPasswordSubmit(
      login.email.value,
      login.code.value,
      login.password.value,
    )
    console.log('yay, now nav!')
    router.push('login')
  } catch (e: unknown) {
    const err = (e as Error)

    login.password.value = ''
    login.confirmPassword.value = ''

    errors.hasErrors.value = true
    errors.message.value = err.message

    switch(err.name) {
      case 'CodeMismatchException': {
        login.needVerify.value = true
        login.updatePass.value = false
        login.code.value = ''
      }
      default: {
        login.needVerify.value = false
        login.updatePass.value = false
        login.code.value = ''
      }
    }
  }
}

const errors = {
  hasErrors: ref(false),
  message: ref(''),
}

const login = {
  email: ref(''),
  needVerify: ref(false),
  updatePass: ref(false),
  code: ref(''),
  password: ref(''),
  confirmPassword: ref(''),
}
</script>

<template>
  <LoginContent title="Reset your password">
    <Card>
      <Fade>
        <ErrorBanner v-if="errors.hasErrors.value">{{ errors.message.value }}</ErrorBanner>
      </Fade>
      <BasicForm>
        <Fade>
          <InputField v-if="!login.needVerify.value && !login.updatePass.value" v-model="login.email.value" id="email" name="email" input-type="email" autocomplete="email">Email</InputField>
        </Fade>

        <Fade>
          <InputField v-if="login.needVerify.value" v-model="login.code.value" id="code" name="code" input-type="text" autocomplete="">Verification Code</InputField>
        </Fade>

        <FadeGroup>
          <InputField v-if="login.updatePass.value" v-model="login.password.value" id="password" name="password" input-type="password" autocomplete="">Password</InputField>
          <InputField v-if="login.updatePass.value" v-model="login.confirmPassword.value" id="confirmPassword" name="confirmPassword" input-type="password" autocomplete="">Confirm Password</InputField>
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
          <PrimaryButton v-if="!login.needVerify.value && !login.updatePass.value" :full-width="true" @click.preventDefault="send()">Send Reset</PrimaryButton>
          <PrimaryButton v-if="!login.needVerify.value && !login.updatePass.value" :full-width="true" @click.preventDefault="code()">Enter Code</PrimaryButton>
        </FadeGroup>
        <Fade>
          <PrimaryButton v-if="login.needVerify.value" :full-width="true" @click.preventDefault="verify()">Verify</PrimaryButton>
        </Fade>
        <Fade>
          <PrimaryButton v-if="login.updatePass.value" :full-width="true" @click.preventDefault="update()">Update Password</PrimaryButton>
        </Fade>
      </BasicForm>
    </Card>
  </LoginContent>
</template>
