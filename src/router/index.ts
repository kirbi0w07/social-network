import MainLayout from '@/layouts/MainLayout.vue'
import AuthView from '@/views/auth/AuthView.vue'
import SignInView from '@/views/auth/SignInView.vue'
import SignUpView from '@/views/auth/SignUpView.vue'
import HomeView from '@/views/HomeView.vue'
import MessagesView from '@/views/MessagesView.vue'
import ProfileView from '@/views/ProfileView.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      meta: {requiresAuth: true},
      children: [
        {path: '', component: HomeView, name: 'Home'},
        {path: '/profile', component: ProfileView, name: 'Profile'},
        {path: '/messages', component: MessagesView},
        // {path: '/search', component: HomeView},
      ]
    },
    {path: '/auth',
     component: AuthView,
     children: [
      {path: '', redirect: '/auth/sign-in'},
      {path: 'sign-in', component: SignInView},
      {path: 'sign-up', component: SignUpView},
     ]
    },
    {path: '/welcome', component: WelcomeView},
  ],
})

export default router
