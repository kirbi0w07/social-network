import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NotificationType = 'success' | 'alert' | 'error'

export interface Notification {
    id: number
    type: NotificationType
    message: string
}

export const useNotifyAlertStore = defineStore('notifyAlert', () => {
    const notifications = ref<Notification[]>([])

    const addNotification = (
        type: NotificationType,
        message: string
    ) => {
        notifications.value.push({
            id: Date.now(),
            type,
            message
        })
    }

    const removeNotification = (id: number) => {
        notifications.value = notifications.value.filter(
            notification => notification.id !== id
        )
    }

    return {
        notifications,
        addNotification,
        removeNotification
    }
})