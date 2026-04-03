import { defineStore } from "pinia";
import type { User, UserWithPassword } from "@/types/user";
import { computed, ref } from "vue";
import { mockUsers } from "@/data/users";
import { loginService, registerService } from "@/services/AuthService";
import type { SigninData } from "@/types/signin";
import type { SignupData } from "@/types/signup";

export const useAuthStore = defineStore('auth', () => {
const user = ref<User | null>(null)
const authenticated = ref(false)

const isAuthenticated = computed(() => authenticated.value)
const currentUser = computed(() => user.value)
const login = async (credentials: SigninData) => {
  const user = await loginService(credentials);
  console.log('user logged?', user)
}
const register = async (credentials: SignupData) => {
  const user = await registerService(credentials);
  console.log('user register?', user)
}

const logout = () => {
  user.value = null
  authenticated.value = false
}

return {
  currentUser,
  isAuthenticated,
  login,
  register,
  logout
}
})
