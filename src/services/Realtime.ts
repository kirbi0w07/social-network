// import { createEcho } from '@/services/EchoService'
import { useAuthStore } from '@/stores/auth'
// import { useNotificationStore } from '@/stores/notifications'

import { createEcho } from '@/services/EchoService'
import { useRealtimeNotificationStore } from '@/stores/realtimeNotification'
import { useNotificationStore } from '@/stores/notifications'
// import { useAuthStore } from '@/stores/auth'

export const listenForNotifications = () => {

  const authStore = useAuthStore()
  const notificationStore = useNotificationStore()
  const realtimeNotificationStore = useRealtimeNotificationStore()
  if (!authStore.user) {
    console.log('❌ No hay usuario autenticado')
    return
  }

  console.log('🔌 Creando conexión Echo...')
  console.log('👤 Usuario:', authStore.user.id)

  const echo = createEcho()

  console.log(
    '📡 Escuchando:',
    `notifications.${authStore.user.id}`
  )

  echo
    .private(`notifications.${authStore.user.id}`)
    .listen('.friend.request.created', (event) => {

      console.log('🔥🔥🔥 EVENTO RECIBIDO POR REVERB')
      console.log(event)

      notificationStore.addNotification(event.notification)

      realtimeNotificationStore.addRealtimeNotification(event.notification)

    })
    .listen('.friend.request.accepted', (event) => {

      console.log('🔥🔥🔥 EVENTO RECIBIDO POR REVERB')
      console.log(event)

      notificationStore.addNotification(event.notification)

      realtimeNotificationStore.addRealtimeNotification(event.notification)

    })
}
