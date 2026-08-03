// stores/notification.ts
import { getNotificationsService } from '@/services/NotificationService'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMessageStore = defineStore('message', () => {

  const messages = ref<[]>([])



  return {
    messages
  }
})
