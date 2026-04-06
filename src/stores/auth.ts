import { defineStore } from "pinia";
import type { User, UserWithPassword } from "@/types/user";
import { computed, ref } from "vue";
import { mockUsers } from "@/data/users";
import { loginService, registerService } from "@/services/AuthService";
import type { SigninData } from "@/types/signin";
import type { SignupCredentials } from "@/types/signup";
import type { createProfileData } from "@/types/profile";
import { createProfileService } from "@/services/ProfileService";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {
const user = ref<User | null>(null)
const authenticated = ref(false)

const router = useRouter()

const isAuthenticated = computed(() => !!token.value)
const currentUser = computed(() => user.value)

const token = ref<string | null>(localStorage.getItem('social-network-token'))
const loginUser = async (credentials: SigninData) => {
  const {data} = await loginService(credentials);
  token.value = data.token
  authenticated.value = true
  user.value = data.user
  localStorage.setItem('social-network-token', data.token)
  return data
}
const registerUser = async (credentials: SignupCredentials) => {
  const {data} = await registerService(credentials);
  token.value = data.token
  authenticated.value = true
  localStorage.setItem('social-network-token', data.token)
  return data
}

const storeProfile = async (profileData: createProfileData) => {
  try {
    await createProfileService(profileData);
  } catch (error) {
    console.log(error)
  }
}

const logout = () => {
  user.value = null
  authenticated.value = false
  token.value = null
  localStorage.removeItem('social-network-token')
  router.push({ name: 'SignIn' })
}

const goToMyProfile = () => {
  router.push({ name: 'Profile' })
}

return {
  currentUser,
  isAuthenticated,
  token,
  loginUser,
  registerUser,
  storeProfile,
  logout,
  goToMyProfile,
}
})
