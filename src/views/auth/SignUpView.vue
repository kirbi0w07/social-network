<template lang="">
  <h2 class='mb-4 text-center font-bold text-xl text-slate-900'>Sign Up</h2>
  <form>
    <!-- STEP 1 -->
    <div class='flex flex-col gap-3' v-if="step === 1">
      <small>Welcome to the form for create an account. To start a create your account please write your<span class="font-bold"> real name.</span></small>
      <h3 class="font-bold">What's your name?</h3>
      <BaseInput label='Name' v-model="signUpData.name" id='name' name='name' placeholder='Name' :error='errorsSignUpData.name'/>
      <BaseInput label='Last Name' v-model="signUpData.last_name" id='last_name' name='lastName' placeholder='Last Name' :error='errorsSignUpData.last_name'/>

      <p class='text-center'>have an account? <small class='text-blue-700'><router-link to='/auth/sign-in'>Sign In</router-link></small></p>
      <button type='button' class='bg-slate-900 text-white font-bold text-sm rounded py-3 mt-4' @click='nextStep'>Next step</button>
    </div>

    <!-- STEP 2 -->
    <div class='flex flex-col gap-3' v-if="step === 2">
      <h3 class="font-bold">When were you born?</h3>
      <small>you can change the privacity of your birthday later.</small>
      <div class="flex flex-col">
        <label class='px-2 text-sm font-bold w-fit'>Day</label>
        <select class='rounded-md bg-slate-100 p-2 outline-0' v-model.number="signUpData.birthDate.day">
          <option v-for="d in 31" :key="d" :value="d">{{d}}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class='px-2 text-sm font-bold w-fit'>Month</label>
        <select class='rounded-md bg-slate-100 p-2 outline-0' v-model="signUpData.birthDate.month">
          <option v-for="m in months" :key="m.value" :value="m.value">{{m.name}}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class='px-2 text-sm font-bold w-fit'>Year</label>
        <select class='rounded-md bg-slate-100 p-2 outline-0' v-model.number="signUpData.birthDate.year">
          <option v-for="y in 100" :key="y" :value="currentYear - y">
            {{ currentYear - y }}
          </option>
        </select>
      </div>
      <p v-if="errorsSignUpData.birthDate" class="text-red-600 px-2 py-1">{{errorsSignUpData.birthDate}}</p>
      <button type='button' class='bg-slate-900 text-white font-bold text-sm rounded py-3 mt-4' @click='nextStep'>Next step</button>
    </div>

    <!-- STEP 3 -->
    <div class='flex flex-col gap-3' v-if="step === 3">
      <h3 class="font-bold">Which genre do you identify with?</h3>
      <small>You can change who can see your gender on your profile later.</small>
      <div class="flex gap-2">
        <input  type="radio" id="man" name="gender" value="man" v-model="signUpData.gender"/>
        <label class="font-medium" for="man">Man</label>
      </div>
      <div class="flex gap-2">
        <input type="radio" id="woman" name="gender" value="woman" v-model="signUpData.gender"/>
        <label class="font-medium" for="woman">Woman</label>
      </div>
      <div class="flex gap-2">
        <input type="radio" id="other" name="gender" value="other" v-model="signUpData.gender"/>
        <label class="font-medium" for="other">Other</label>
      </div>
      <div class="flex gap-2">
        <input type="radio" id="I’d rather not say" name="gender" value="I’d_rather_not_say" v-model="signUpData.gender"/>
        <label class="font-medium" for="I’d rather not say">I’d rather not say</label>
      </div>
      <p v-if="errorsSignUpData.gender" class="text-red-600 px-2 py-1">{{errorsSignUpData.gender}}</p>
      <button type='button' class='bg-slate-900 text-white font-bold text-sm rounded py-3 mt-4' @click='nextStep'>Next step</button>
    </div>

    <!-- STEP 4 -->
    <div class='flex flex-col gap-3' v-if="step === 4">
      <h3 class="font-bold">What's your email adress?</h3>
      <small>Enter an email address to verify your account. It will not appear on your profile.</small>
      <BaseInput id='email' type='email' name='email' label='Email' placeholder='Email'/>
      <button type='button' class='bg-slate-900 text-white font-bold text-sm rounded py-3 mt-4' @click='nextStep'>Next step</button>
    </div>

    <!-- STEP 5 -->
    <div class='flex flex-col gap-3' v-if="step === 5">
      <h3 class="font-bold">Chose a secure password</h3>

      <div class="flex flex-col">
        <label for="password" class='px-2 text-sm font-bold w-fit'>Password</label>
        <input type='password' v-model="signUpData.password" placeholder='Password' name='password' id='password' class='rounded-md bg-slate-100 p-2 outline-0'>
      </div>
      <div class="flex flex-col">
        <label for="confirm_password" class='px-2 text-sm font-bold w-fit'>Confirm password</label>
        <input type='password' v-model="signUpData.confirm_password" placeholder='Confirm password' name='confirm_password' id='confirm_password' class='rounded-md bg-slate-100 p-2 outline-0'>
      </div>
          <button type='button' class='bg-slate-900 text-white font-bold text-sm rounded py-3 mt-4' @click='signUp'>Create account</button>
    </div>

  </form>

</template>
<script setup lang="ts">
import {type ErrorsSignupData, type SignupData } from '@/types/signup';
import { ref } from 'vue';
import BaseInput from '@/components/ui/BaseInput.vue';
const months = [
  { name: 'January', value: 1 },
  { name: 'February', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'August', value: 8 },
  { name: 'September', value: 9 },
  { name: 'October', value: 10 },
  { name: 'November', value: 11 },
  { name: 'December', value: 12 },
]
const currentYear = new Date().getFullYear()
const step = ref(1)

const signUpData = ref<SignupData>({
  name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
  birthDate: {
    day: null,
    month: null,
    year: null,
  },
  gender: '',
})

const errorsSignUpData = ref<ErrorsSignupData>({})

const validateStep = (() => {
  errorsSignUpData.value = {}
  if(step.value === 1) {

    const {name, last_name} = signUpData.value
    if(!name){
      errorsSignUpData.value.name = 'Name is required'
      return false
    }
    if(!last_name){
      errorsSignUpData.value.last_name = 'Last name is required'
      return false
    }
  }

  if(step.value === 2) {
    const {day, month, year} = signUpData.value.birthDate
  if (!day || !month || !year) {
    errorsSignUpData.value.birthDate = 'Select your birthday date'
    return false
  }
    const date = new Date(year, month -1, day)

    const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    
  if (!isValid) {
    errorsSignUpData.value.birthDate = 'Invalid date'
    return false
  }
  }

  if(step.value === 3) {

    const {gender} = signUpData.value
    if(!gender){
      errorsSignUpData.value.gender = 'Gender is required'
      return false
    }
  }
  return true
})

const nextStep = (() => {
    if(!validateStep())return
  step.value++
})

const validateSignUpData = (() => {
  if (Object.values(signUpData.value).some(value => !value)) {
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
