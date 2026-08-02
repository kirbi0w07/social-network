import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification } from '@/types/notification'

export const useRealtimeNotificationStore = defineStore(
  'realtimeNotification',
  () => {

    const realtimeNotification = ref<Notification | null>(null)

    let timeout: ReturnType<typeof setTimeout> | null = null

    const addRealtimeNotification = (
      notification: Notification
    ) => {

      realtimeNotification.value = notification

      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = setTimeout(() => {
        realtimeNotification.value = null
        timeout = null
      }, 5000)
    }

    const clearRealtimeNotification = () => {
      realtimeNotification.value = null

      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
    }

    return {
      realtimeNotification,
      addRealtimeNotification,
      clearRealtimeNotification
    }
  }
)
