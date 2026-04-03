import { defineStore } from "pinia";
import type { User, UserWithPassword } from "@/types/user";
import { computed, ref } from "vue";
import { mockUsers } from "@/data/users";
import { loginService, registerService } from "@/services/AuthService";
import type { SigninData } from "@/types/signin";
import type { SignupCredentials } from "@/types/signup";
import type { createProfileData } from "@/types/profile";
import { createProfileService } from "@/services/ProfileService";

export const useAuthStore = defineStore('auth', () => {
const user = ref<User | null>(null)
const authenticated = ref(false)

const isAuthenticated = computed(() => authenticated.value)
const currentUser = computed(() => user.value)
const loginUser = async (credentials: SignupCredentials) => {
  const user = await loginService(credentials);
  console.log('user logged?', user)
}
const registerUser = async (credentials: SignupCredentials) => {
  const user = await registerService(credentials);

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
}

return {
  currentUser,
  isAuthenticated,
  loginUser,
  registerUser,
  storeProfile,
  logout
}
})
