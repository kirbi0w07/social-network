<template lang="">
  <div class="pb-10">
    <button @click="previousStep" :disabled="step <= 1" class="w-fit px-2 py-1 rounded-md bg-slate-900 disabled:bg-slate-400 md:px-6 md:py-3">
      <Icon icon="heroicons:arrow-left-16-solid" :width="iconWidth" color="#fff" />
    </button>
  </div>
  <h2 class='mb-4 text-center font-bold text-xl text-slate-900 md:text-4xl'>Sign Up</h2>
  <form>
    <!-- STEP 1 -->
    <div class='flex flex-col gap-3' v-if="step === 1">
      <small class="md:text-2xl">Welcome to the form for create an account. To start a create your account please write your<span class="font-bold"> real name.</span></small>
      <h3 class="font-bold md:text-3xl pb-6">What's your name?</h3>
      <BaseInput label='Name' v-model="signUpData.name" id='name' name='name' placeholder='E.g. John' :error='errorsSignUpData.name'/>
      <BaseInput label='Last Name' v-model="signUpData.last_name" id='last_name' name='lastName' placeholder='E.g. wick' :error='errorsSignUpData.last_name'/>

      <p class='text-center md:text-2xl mb-2'>have an account? <small class='text-blue-700 md:text-2xl'><router-link to='/auth/sign-in'>Sign In</router-link></small></p>
      <BaseButton type='button' @click='nextStep'>Next step</BaseButton>
    </div>

    <!-- STEP 2 -->
    <div class='flex flex-col' v-if="step === 2">
      <h3 class="font-bold md:text-3xl">Create your username</h3>
      <small class="md:text-2xl">Choose a unique username for your account.</small>
      <BaseInput label='Username' v-model="signUpData.username" id='username' name='username' placeholder='E.g. john_wick' :error='errorsSignUpData.username'/>
      <br/>
      <BaseButton type='button' @click='nextStep'>Next step</BaseButton>
    </div>
    <!-- STEP 3 -->
    <div class='flex flex-col gap-3' v-if="step === 3">
      <h3 class="font-bold md:text-3xl">When were you born?</h3>
      <small class="md:text-2xl">you can change the privacity of your birthday later.</small>
      <div class="flex flex-col">
        <label class='px-2 text-sm font-bold w-fit md:text-2xl'>Day</label>
        <select class='rounded-md bg-slate-100 p-2 outline-0 md:p-4 md:text-2xl' v-model.number="signUpData.birthDate.day">
          <option v-for="d in 31" :key="d" :value="d">{{d}}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class='px-2 text-sm font-bold w-fit md:text-2xl'>Month</label>
        <select class='rounded-md bg-slate-100 p-2 outline-0 md:p-4 md:text-2xl' v-model="signUpData.birthDate.month">
          <option v-for="m in months" :key="m.value" :value="m.value">{{m.name}}</option>
        </select>
      </div>
      <div class="flex flex-col">
        <label class='px-2 text-sm font-bold w-fit md:text-2xl'>Year</label>
        <select class='rounded-md bg-slate-100 p-2 outline-0 md:p-4 md:text-2xl' v-model.number="signUpData.birthDate.year">
          <option v-for="y in 100" :key="y" :value="currentYear - y">
            {{ currentYear - y }}
          </option>
        </select>
      </div>
      <p v-if="errorsSignUpData.birthDate" class="text-red-600 px-2 py-1 mb-2">{{errorsSignUpData.birthDate}}</p>
      <BaseButton type='button' @click='nextStep'>Next step</BaseButton>
    </div>

    <!-- STEP 4 -->
    <div class='flex flex-col gap-3' v-if="step === 4">
      <h3 class="font-bold md:text-3xl">Which genre do you identify with?</h3>
      <small class="md:text-2xl">You can change who can see your gender on your profile later.</small>
      <div class="flex gap-2">
        <input  type="radio" id="man" name="gender" value="male" v-model="signUpData.gender"/>
        <label class="font-medium md:text-3xl" for="man">Man</label>
      </div>
      <div class="flex gap-2">
        <input type="radio" id="woman" name="gender" value="female" v-model="signUpData.gender"/>
        <label class="font-medium md:text-3xl" for="woman">Woman</label>
      </div>
      <div class="flex gap-2">
        <input type="radio" id="other" name="gender" value="other" v-model="signUpData.gender"/>
        <label class="font-medium md:text-3xl" for="other">Other</label>
      </div>
      <div class="flex gap-2 mb-2">
        <input type="radio" id="I’d rather not say" name="gender" value="prefer_not_to_say" v-model="signUpData.gender"/>
        <label class="font-medium md:text-3xl" for="I’d rather not say">I’d rather not say</label>
      </div>
      <p v-if="errorsSignUpData.gender" class="text-red-600 px-2 py-1">{{errorsSignUpData.gender}}</p>
      <BaseButton type='button' @click='nextStep'>Next step</BaseButton>
    </div>

    <!-- STEP 5 -->
    <div class='flex flex-col gap-3' v-if="step === 5">
      <h3 class="font-bold md:text-3xl">What's your email adress?</h3>
      <small class="md:text-2xl">Enter an email address to verify your account. It will not appear on your profile.</small>
      <BaseInput id='email' type='email' name='email' label='Email' placeholder='E.g. user@mail.com' v-model="signUpData.email" :error="errorsSignUpData.email"/>
      <br/>
      <BaseButton type='button' @click='nextStep'>Next step</BaseButton>
    </div>

    <!-- STEP 6 -->
    <div class='flex flex-col gap-3' v-if="step === 6">
      <h3 class="font-bold md:text-3xl">Chose a secure password</h3>

      <BaseInput id='password' type='password' name='Password' label='Password' placeholder='Password' v-model="signUpData.password" :error="errorsSignUpData.password"/>
      <BaseInput id='confirm_password' type='password' name='Confirm Password' label='Confirm Password' placeholder='Confirm Password' v-model="signUpData.confirm_password" :error="errorsSignUpData.password"/>
      <br/>
          <BaseButton type='button' @click='signUp'>Create account</BaseButton>
    </div>

  </form>

</template>
<script setup lang="ts">
import { type ErrorsSignupData, type SignupCredentials, type SignupData } from '@/types/signup';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { Icon } from '@iconify/vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import LoadingAnimation from '@/components/ui/LoadingAnimation.vue';
import { useLoadingStore } from '@/stores/loading';
import { useWindowSize } from '@/components/composables/useWindowSize';

const loadingStore = useLoadingStore()
const { iconWidth } = useWindowSize()

const router = useRouter()
const authStore = useAuthStore()
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
  username: '',
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

watch(() => signUpData.value.username, (newValue) => {
  if (newValue) {
    // Reemplazamos cualquier espacio por nada ''
    // o por un guion bajo '_' si prefieres forzar ese estilo
    signUpData.value.username = newValue.replace(/\s/g, '').toLowerCase();
  }
});

const validateStep = (() => {
  errorsSignUpData.value = {}
  if (step.value === 1) {

    const { name, last_name } = signUpData.value
    if (!name) {
      errorsSignUpData.value.name = 'Name is required'
      return false
    }
    if (!last_name) {
      errorsSignUpData.value.last_name = 'Last name is required'
      return false
    }
  }

  if (step.value === 2) {
    const { username } = signUpData.value;

    if (!username) {
      errorsSignUpData.value.username = 'Username is required';
      return false;
    }

    // Regex que solo permite letras, números, guiones bajos y puntos
    const usernameRegex = /^[a-zA-Z0-9._]+$/;

    if (!usernameRegex.test(username)) {
      errorsSignUpData.value.username = 'Username cannot contain spaces or special characters';
      return false;
    }
  }

  if (step.value === 3) {
    const { day, month, year } = signUpData.value.birthDate
    if (!day || !month || !year) {
      errorsSignUpData.value.birthDate = 'Select your birthday date'
      return false
    }
    const date = new Date(year, month - 1, day)

    const isValid =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day

    if (!isValid) {
      errorsSignUpData.value.birthDate = 'Invalid date'
      return false
    }
  }

  if (step.value === 4) {

    const { gender } = signUpData.value
    if (!gender) {
      errorsSignUpData.value.gender = 'Gender is required'
      return false
    }
  }

  if (step.value === 5) {
    const { email } = signUpData.value
    if (!email) {
      errorsSignUpData.value.email = "Email is required"
      return false
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!emailRegex.test(email)) {
      errorsSignUpData.value.email = "Invalid email format. Please use only letters, numbers, dots, and hyphens."
      return false
    }
  }
  return true
})

const nextStep = (() => {
  if (!validateStep()) return
  step.value++
})

const previousStep = (() => {
  step.value--
})

const validatePassword = (() => {
  const { password, confirm_password } = signUpData.value
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/
  if (!password) {
    errorsSignUpData.value.password = "Invalid password"
    return false
  }
  if (!confirm_password) {
    errorsSignUpData.value.password = "Invalid password"
    return false
  }
  if (!passwordRegex.test(password)) {
    errorsSignUpData.value.password = "The password must contain at least one uppercase letter and one special character."
    return false
  }
  if (password !== confirm_password) {
    errorsSignUpData.value.password = "Invalid password not match"
    return false
  }
  return true
})


// const validateSignUpData = (() => {
//   if (Object.values(signUpData.value).some(value => !value)) {
//     return
//   }
// })

const createUserFromSignup = ((): SignupCredentials => {
  const data = signUpData.value
  const birthDate = new Date(data.birthDate.year!, data.birthDate.month! - 1, data.birthDate.day!)
  const formattedBirthday = birthDate.toISOString().split('T')[0]
  return {
    name: data.name,
    last_name: data.last_name,
    username: data.username,
    email: data.email,
    password: data.password,
    password_confirmation: data.confirm_password,
    birthday: formattedBirthday as unknown as Date,
    gender: data.gender,
  }
})
const signUp = async () => {
  loadingStore.show('Loading...')

  try {
    if (!validatePassword()) {
      return
    }

    const signupCredentials: SignupCredentials =
      createUserFromSignup()

    console.log(signupCredentials)

    await authStore.registerUser(signupCredentials)

    router.push({ name: 'Home' })
  } catch (error) {
    console.error('Signup error:', error)
  } finally {
    loadingStore.hide()
  }
}



</script>
<style lang="">

</style>
