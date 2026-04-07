import { defineStore } from "pinia";
import type { User, UserWithPassword } from "@/types/user";
import { computed, ref } from "vue";
import { mockUsers } from "@/data/users";
import { loginService, logoutService, registerService } from "@/services/AuthService";
import type { SigninData } from "@/types/signin";
import type { SignupCredentials } from "@/types/signup";
import type { createProfileData } from "@/types/profile";
import { createProfileService } from "@/services/ProfileService";
import axios from "@/lib/axios";
import router from "@/router";
export const useAuthStore = defineStore('auth', () => {
const user = ref<User | null>(null)
const authenticated = ref(false)

const isAuthenticated = computed(() => !!token.value)
const currentUser = computed(() => user.value)
const getFullToken = computed(() => {
        return token.value ? `Bearer ${token.value}` : null;
    });

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
  user.value = data.user
  return data
}

const storeProfile = async (profileData: createProfileData) => {
  try {
    await createProfileService(profileData);
  } catch (error) {
    console.log(error)
  }
}

const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
        console.error("Error al avisar al servidor", error);
    } finally {
        user.value = null;
        token.value = null;
        if (typeof authenticated.value !== 'undefined') {
            authenticated.value = false;
        }

        localStorage.removeItem('social-network-token');
        delete axios.defaults.headers.common['Authorization'];

        router.push({ name: 'SignIn' });
    }
};
const goToMyProfile = () => {
  router.push({ name: 'Profile' })
}

const getUser = async () => {
    if (!token.value) return;

    try {
        const { data } = await axios.get('/api/user');
        user.value = data;
        authenticated.value = true;
    } catch (error) {
        logout();
    }
};

return {
  currentUser,
  isAuthenticated,
  getFullToken,
  token,
  loginUser,
  registerUser,
  storeProfile,
  logout,
  goToMyProfile,
  getUser,
}
})
