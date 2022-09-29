<script setup lang="ts">
import { ref } from 'vue'
import LoginContent from '@/components/LoginElements/LoginContent.vue'
import Card from '@/components/UIElements/Card.vue'
import InputField from '@/components/UIElements/InputField.vue'
import PrimaryButton from '@/components/UIElements/PrimaryButton.vue'
import BasicForm from '@/components/UIElements/BasicForm.vue'

const login = {
  email: ref(''),
  password: ref(''),
  confirm_password: ref(''),
}

const signUp = () => {
  console.log(login)
}
</script>

<template>
  <LoginContent title="Sign up for a new account">
    <Card>
      <BasicForm>
        <InputField v-model="login.email.value" id="email" name="email" input-type="email" autocomplete="email">Email</InputField>

        <InputField v-model="login.password.value" id="password" name="password" input-type="password" autocomplete="">Password</InputField>

        <InputField v-model="login.confirm_password.value" id="confirm_password" name="confirm_password" input-type="password" autocomplete="">Confirm Password</InputField>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <RouterLink :to="{name: 'login'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Already a user? Login</RouterLink>
          </div>
          <div class="text-sm">
            <RouterLink :to="{name: 'forgot'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Forgot your password?</RouterLink>
          </div>
        </div>

        <PrimaryButton :full-width="true" @click.preventDefault="signUp()">Sign Up</PrimaryButton>
      </BasicForm>
    </Card>
  </LoginContent>
</template>
