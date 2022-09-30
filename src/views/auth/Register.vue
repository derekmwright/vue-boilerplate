<script setup lang="ts">
import { Auth } from 'aws-amplify'
import { ref } from 'vue'
import { validateEmail, validateNewPassword } from '../../validations'
import LoginContent from '@/components/LoginElements/LoginContent.vue'
import Card from '@/components/UIElements/Card.vue'
import InputField from '@/components/UIElements/InputField.vue'
import PrimaryButton from '@/components/UIElements/PrimaryButton.vue'
import BasicForm from '@/components/UIElements/BasicForm.vue'
import { SignUpParams } from '@aws-amplify/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ref({
  submitAttempt: false,
  email: '',
  password: '',
  confirmPassword: '',
})

const signUp = async (): Promise<void> => {
  login.value.submitAttempt = true
  if (validate()) {
    const params: SignUpParams = {
      username: login.value.email,
      password: login.value.password,
    }
    try {
      await Auth.signUp(params)
      localStorage.setItem('username', login.value.email)
      router.push('verify')
    } catch (e: unknown) {
      const err = e as Error
      console.log(err.name, err.message)
    }
  }
}

// Confirm Password validation
const confirm = (): boolean => {
  confPassErrs.value = []

  if (login.value.password != login.value.confirmPassword) {
    confPassErrs.value.push("Passwords must match")
    return false
  }
  return true
}

// Verify as input occurs, should be done AFTER a submit is attempted so we dont throw errors at the user before theyve
// entered their information for the first time.
const inputEmailValidate = () => {
  emailErrs.value = validateEmail(login.value.email)
}

const inputPasswordValidate = () => {
  passErrs.value = validateNewPassword(login.value.password)
  confirm()
}

// Run all validation functions
const validate = (): boolean => {
  emailErrs.value = validateEmail(login.value.email)
  passErrs.value = validateNewPassword(login.value.password)

  confirm()

  if (emailErrs.value.length != 0 || passErrs.value.length != 0 || confPassErrs.value.length != 0) {
    return false
  }

  return true
}

const emailErrs = ref<Array<string>>([])
const passErrs = ref<Array<string>>([])
const confPassErrs = ref<Array<string>>([])
</script>

<template>
  <LoginContent title="Sign up for a new account">
    <Card>
      <BasicForm id="register">
        <InputField v-model="login.email" id="email" name="email" input-type="email" autocomplete="email" :errors="emailErrs" placeholder="johndoe@example.com" @input="login.submitAttempt ? inputEmailValidate() : ()=>{}">Email</InputField>

        <InputField v-model="login.password" id="password" name="password" input-type="password" autocomplete="" :errors="passErrs" @input="login.submitAttempt ? inputPasswordValidate() : ()=>{}">Password</InputField>

        <InputField v-model="login.confirmPassword" id="confirm_password" name="confirm_password" input-type="password" autocomplete="" :errors="confPassErrs" @input="confirm()">Confirm Password</InputField>

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
