<script setup lang="ts">
import { Auth } from 'aws-amplify'
import Card from '../../components/UIElements/Card.vue'
import BasicForm from '../../components/UIElements/BasicForm.vue'
import LoginContent from '../../components/LoginElements/LoginContent.vue'
import InputField from '../../components/UIElements/InputField.vue'
import PrimaryButton from '../../components/UIElements/PrimaryButton.vue'
import { ref } from 'vue'
import { router } from '../../router'

const send = async () => {
  try {
    await Auth.forgotPassword(login.email.value)
    login.needVerify.value = true
  } catch(e: unknown) {
    console.log((e as Error).message)
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
    await router.push('login')
  } catch (e: unknown) {
    const err = (e as Error)
    errors.hasErrors.value = true
    errors.message.value = err.message

    switch(err.name) {
      case 'CodeMismatchException': {
        login.needVerify.value = true
        login.updatePass.value = false
      }
      case 'LimitExceededException': {
        login.needVerify.value = false
        login.updatePass.value = false
        login.code.value = ''   
      }
    }
    console.log(err)
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
      <BasicForm>
        <InputField v-if="!login.needVerify.value && !login.updatePass.value" v-model="login.email.value" id="email" name="email" input-type="email" autocomplete="email">Email</InputField>

        <InputField v-if="login.needVerify.value" v-model="login.code.value" id="code" name="code" input-type="text" autocomplete="">Verification Code</InputField>

        <InputField v-if="login.updatePass.value" v-model="login.password.value" id="password" name="password" input-type="password" autocomplete="">Password</InputField>

        <InputField v-if="login.updatePass.value" v-model="login.confirmPassword.value" id="confirmPassword" name="confirmPassword" input-type="password" autocomplete="">Confirm Password</InputField>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <RouterLink :to="{name: 'login'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Already a user? Login</RouterLink>
          </div>
          <div class="text-sm">
            <RouterLink :to="{name: 'register'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">New User? Sign Up</RouterLink>
          </div>
        </div>

        <PrimaryButton v-if="!login.needVerify.value && !login.updatePass.value" :full-width="true" @click.preventDefault="send()">Send Reset</PrimaryButton>
        <PrimaryButton v-if="login.needVerify.value" :full-width="true" @click.preventDefault="verify()">Verify</PrimaryButton>
        <PrimaryButton v-if="login.updatePass.value" :full-width="true" @click.preventDefault="update()">Update Password</PrimaryButton>
      </BasicForm>
    </Card>
  </LoginContent>
</template>
