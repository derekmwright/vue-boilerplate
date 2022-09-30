<script setup lang="ts">
import { Auth } from 'aws-amplify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import LoginContent from '@/components/LoginElements/LoginContent.vue'
import BasicForm from '../../components/UIElements/BasicForm.vue'
import Card from '../../components/UIElements/Card.vue'
import InputField from '../../components/UIElements/InputField.vue'
import PrimaryButton from '../../components/UIElements/PrimaryButton.vue'

const username = localStorage.getItem('username') as string
const code = ref('')
const router = useRouter()

const verify = async () => {
  try {
    await Auth.confirmSignUp(username, code.value)
    router.push('login')
  } catch (e: unknown) {
    const err = e as Error
    console.log(err.name, err.message)
  }
}
</script>

<template>
  <LoginContent title="Sign up for a new account">
    <Card>
      <BasicForm id="register">
        <InputField v-model="code" id="code" name="code" autocomplete="code">Verification Code</InputField>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <RouterLink :to="{name: 'login'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Already a user? Login</RouterLink>
          </div>
          <div class="text-sm">
            <RouterLink :to="{name: 'forgot'}" class="font-medium text-indigo-600 dark:text-indigo-500 dark:hover:text-indigo-400 hover:text-indigo-500">Forgot your password?</RouterLink>
          </div>
        </div>

        <PrimaryButton :full-width="true" @click.preventDefault="verify">Verify Code</PrimaryButton>
      </BasicForm>
    </Card>
  </LoginContent>
</template>
