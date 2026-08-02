import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { useAuthStore } from '@/stores/auth'

window.Pusher = Pusher

export const createEcho = () => {

  const authStore = useAuthStore()

  console.log('🔐 Echo auth')
  console.log('Usuario:', authStore.user)
  console.log('Token:', authStore.getFullToken)

  return new Echo({
    broadcaster: 'reverb',

    key: import.meta.env.VITE_REVERB_APP_KEY,

    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT),

    wssPort: Number(import.meta.env.VITE_REVERB_PORT),

    forceTLS: false,

    enabledTransports: ['ws', 'wss'],

    authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,

    auth: {
      headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Authorization: authStore.getFullToken,
      },
    },
  })
}
