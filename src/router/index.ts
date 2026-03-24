import MainLayout from '@/layouts/MainLayout.vue'
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
      children: [
        {path: '', component: HomeView},
        {path: '/profile', component: ProfileView},
        {path: '/messages', component: MessagesView},
        // {path: '/search', component: HomeView},
      ]
    },
    {path: '/welcome', component: WelcomeView},
  ],
})

export default router
