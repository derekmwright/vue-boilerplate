<script setup lang="ts">
import { Auth } from 'aws-amplify'
import Card from '../../components/UIElements/Card.vue'
import BasicForm from '../../components/UIElements/BasicForm.vue'
import LoginContent from '../../components/LoginElements/LoginContent.vue'
import InputField from '../../components/UIElements/InputField.vue'
import PrimaryButton from '../../components/UIElements/PrimaryButton.vue'
import { ref } from 'vue'

const send = async () => {
  try {
    await Auth.forgotPassword(login.email.value)
    login.needVerify.value = true
  } catch(e: unknown) {
    console.log((e as Error).message)
  }
}

const enterVerify = () => {
  login.needVerify.value = true
  console.log(login)
}

const login = {
  email: ref(''),
  needVerify: ref(false),
  code: ref(''),
}
</script>

<template>
  <LoginContent title="Reset your password">
    <Card>
      <BasicForm>
        <InputField v-if="!login.needVerify.value" v-model="login.email.value" id="email" name="email" input-type="email" autocomplete="email">Email</InputField>

        <InputField v-if="login.needVerify.value" v-model="login.code.value" id="code" name="code" input-type="code" autocomplete="">Verification Code</InputField>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <RouterLink :to="{name: 'login'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Already a user? Login</RouterLink>
          </div>
          <div class="text-sm">
            <RouterLink :to="{name: 'register'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">New User? Sign Up</RouterLink>
          </div>
        </div>

        <PrimaryButton :full-width="true" @click.preventDefault="send()">Send Reset</PrimaryButton>
        <PrimaryButton :full-width="true" @click.preventDefault="enterVerify()">Enter Verification Code</PrimaryButton>
      </BasicForm>
    </Card>
  </LoginContent>
</template>
