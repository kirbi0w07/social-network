<template lang="">
  <form class='flex flex-col gap-3 w-full'>
    <h2 class='text-center font-bold text-xl text-slate-900 md:text-3xl'>Sign In</h2>
    <BaseInput label='Email' name='email' id='email' v-model="signInData.email" type='email' :error="errorsSignInData.email"/>
    <BaseInput label='Password' name='password' id='password' v-model="signInData.password" type='password' :error="errorsSignInData.password"/>

    <p class='text-center md:text-2xl'>don't have an account? <small class='text-blue-700 md:text-2xl'><router-link to='/auth/sign-up'>Sign Up</router-link></small></p>
    <BaseButton @click="signIn">Sign In</BaseButton>
  </form>

  <NotifyAlert />
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import type { ErrorsSigninData, SigninData } from '@/types/signin';
import { ref } from 'vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import NotifyAlert from '@/components/NotifyAlert.vue';
import { useRouter } from 'vue-router';
import { isAxiosError } from 'axios';
import { useLoadingStore } from '@/stores/loading';

const router = useRouter()
const authStore = useAuthStore()
const signInData = ref<SigninData>({
  email: '',
  password: ''
})

const loadingStore = useLoadingStore()

const errorsSignInData = ref<ErrorsSigninData>({})

const validateErrors = () => {
  errorsSignInData.value = {}
  if (!signInData.value.email) {
    errorsSignInData.value.email = 'Email is required'
    return false
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(signInData.value.email)) {
    errorsSignInData.value.email = 'Invalid email format. Please use only letters, numbers, dots, and hyphens.'
    return false
  }
  if (!signInData.value.password) {
    errorsSignInData.value.password = 'Password is required'
    return false
  }

  return true
}

const signIn = async () => {
  try {
    loadingStore.show('Loading...')
    if (!validateErrors()) return;
    await authStore.loginUser(signInData.value)
    router.push({ name: 'Home' })
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      errorsSignInData.value.email = error.message
    }
  } finally {
    loadingStore.hide()
  }
}
</script>
<style lang="">

</style>
