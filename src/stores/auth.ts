import { defineStore } from "pinia";
import type { User } from "@/types/user";
import { computed, ref } from "vue";
import { mockUsers } from "@/data/users";
import { loginService, logoutService, registerService } from "@/services/AuthService";
import type { SigninData } from "@/types/signin";
import type { SignupCredentials } from "@/types/signup";
import axios from "@/lib/axios";
import router from "@/router";
import { useNotifyAlertStore } from "./notifyAlert";
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const authenticated = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)
  const getFullToken = computed(() => {
    return token.value ? `Bearer ${token.value}` : null;
  });
  const notifyAlertStore = useNotifyAlertStore();
  const token = ref<string | null>(localStorage.getItem('social-network-token'))

  const loginUser = async (credentials: SigninData) => {
    try {
      const { data } = await loginService(credentials);
      token.value = data.token
      authenticated.value = true
      user.value = data.user
      localStorage.setItem('social-network-token', data.token)
      return data
    } catch (error) {
      console.log(error);
      notifyAlertStore.addNotification("error", error.message || "Error al iniciar sesión");

    }
  }
  const registerUser = async (credentials: SignupCredentials) => {
    try {
      const { data } = await registerService(credentials);
      token.value = data.token
      authenticated.value = true
      localStorage.setItem('social-network-token', data.token)
      user.value = data.user
      return data
    } catch (error) {
      notifyAlertStore.addNotification("error", error.response?.data?.message || "Error al registrar usuario");
    }
  }

  // const storeProfile = async (profileData: createProfileData) => {
  //   try {
  //     await createProfileService(profileData);
  //   } catch (error) {
  //     notifyAlertStore.addNotification("error", error.response?.data?.message || "Error al guardar el perfil");
  //   }
  // }

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      notifyAlertStore.addNotification("error", error.response?.data?.message || "Error al cerrar sesión");
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
      const { data } = await axios.get('/api/me');
      user.value = data;
      authenticated.value = true;
    } catch (error) {
      logout();
    }
  };

  return {
    user,
    currentUser,
    isAuthenticated,
    getFullToken,
    token,
    loginUser,
    registerUser,
    // storeProfile,
    logout,
    goToMyProfile,
    getUser,
  }
})
