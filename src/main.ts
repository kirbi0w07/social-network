import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/global.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

if (import.meta.env.DEV) {
    app.config.globalProperties.__VUE_DEVTOOLS_GLOBAL_HOOK__ = false
}

app.use(createPinia())
app.use(router)
app.mount('#app')

