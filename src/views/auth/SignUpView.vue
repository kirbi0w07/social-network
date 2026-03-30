<template lang="">
  <form class='flex flex-col gap-3'>
    <h2 class='text-center font-bold text-xl text-slate-900'>Sign Up</h2>
    <label for="name" class='px-2 text-sm font-bold w-fit'>Full name</label>
    <input type='name' label='Name' name='name' id='name' v-model="signUpData.name" class='rounded-md bg-slate-100 p-2 outline-0'>
    <label for="email" class='px-2 text-sm font-bold w-fit'>Email</label>
    <input type='email' v-model="signUpData.email" label='Email' name='email' id='email' class='rounded-md bg-slate-100 p-2 outline-0'>
    <label for="password" class='px-2 text-sm font-bold w-fit'>Password</label>
    <input type='password' v-model="signUpData.password" label='Password' name='password' id='password' class='rounded-md bg-slate-100 p-2 outline-0'>
    <label for="confirm-password" class='px-2 text-sm font-bold w-fit'>Confirm password</label>
    <input type='password' label='confirm-Password' v-model="signUpData.confirmPassword" name='confirm-password' id='confirm-password' class='rounded-md bg-slate-100 p-2 outline-0'>

    <p class='text-center'>have an account? <small class='text-blue-700'><router-link to='/auth/sign-in'>Sign In</router-link></small></p>
    <button type='button' class='bg-slate-900 text-white font-bold text-sm rounded py-3 mt-4' @click='signUp'>Sign Up</button>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const signUpData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const validateSignUpData = (()=> {
  if(Object.values(signUpData.value).some(value => !value)) {
    return
  }
  console.log('si paso')
})
 const signUp = (() => {
  validateSignUpData()
 })
</script>
<style lang="">

</style>
