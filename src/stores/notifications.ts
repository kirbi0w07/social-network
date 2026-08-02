// stores/notification.ts
import { getNotificationsService } from '@/services/NotificationService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {

  const notifications = ref<Notification[]>([])
  const getNotifications = async () => {
    const { data } = await getNotificationsService()
    notifications.value = data.notifications

  }

  const addNotification = (notification: Notification) => {
    notifications.value.unshift(notification)
  }

  const show = ref(false)
  const showAsideNotification = ref(false)
  const message = ref('')
  const type = ref<'success' | 'error'>('success')

  const notify = (
    text: string,
    notificationType: 'success' | 'error'
  ) => {
    message.value = text
    type.value = notificationType
    show.value = true

    setTimeout(() => {
      show.value = false
    }, 3000)
  }


  return {
    show,
    message,
    type,
    notifications,
    showAsideNotification,
    notify,
    getNotifications,
    addNotification,
  }
})
