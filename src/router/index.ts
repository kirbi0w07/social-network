import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthStore } from '@/stores/auth'
import AuthView from '@/views/auth/AuthView.vue'
import SettingsView from '@/views/SettingsView.vue'
import SignInView from '@/views/auth/SignInView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import HomeView from '@/views/HomeView.vue'
import MessagesView from '@/views/MessagesView.vue'
import ProfileView from '@/views/ProfileView.vue'
import SearchView from '@/views/SearchView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        // Público
        { path: '', component: HomeView, name: 'Home' },

        // Públicas: perfiles y búsqueda
        { path: 'users/:username', component: ProfileView, name: 'Profile' },

        // Privadas
        {
          path: 'my-profile',
          component: ProfileView,
          name: 'MyProfile',
          meta: { requiresAuth: true },
        },
        {
          path: 'messages',
          component: MessagesView,
          meta: { requiresAuth: true },
        },
        {
          path: 'settings',
          component: SettingsView,
          meta: { requiresAuth: true },
        },
        { path: 'search', component: SearchView, name: 'Search', meta: { requiresAuth: true } },
      ],
    },

    {
      path: '/auth',
      component: AuthView,
      children: [
        { path: '', redirect: '/auth/sign-in' },
        { path: 'sign-in', component: SignInView, name: 'SignIn' },
        { path: 'sign-up', component: SignUpView, name: 'SignUp' },
      ],
    },

    { path: '/welcome', component: WelcomeView },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (
    !authStore.isAuthenticated &&
    to.matched.some(record => record.meta.requiresAuth)
  ) {
    return {
      name: 'SignIn',
      query: { redirect: to.fullPath },
    }
  }

  if (
    authStore.isAuthenticated &&
    to.path.startsWith('/auth')
  ) {
    return { name: 'Home' }
  }

  return true
})

export default router
