import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/global.css'
import App from './App.vue'
import router from './router'
import axios from "axios";
import { useAuthStore } from './stores/auth'

const app = createApp(App)
app.use(createPinia())

const authStore = useAuthStore()

if (authStore.token) {
    authStore.getUser().finally(() => {
        app.use(router)
        app.mount('#app')
    })
} else {
    app.use(router)
    app.mount('#app')
}


