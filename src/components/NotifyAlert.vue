```vue
<script setup lang="ts">
import { watch } from 'vue'
import { useNotifyAlertStore } from '@/stores/notifyAlert'

const notifyAlertStore = useNotifyAlertStore()

const notificationDuration = 4000

watch(
  () => notifyAlertStore.notifications,
  (notifications) => {
    notifications.forEach((notification) => {
      setTimeout(() => {
        notifyAlertStore.removeNotification(notification.id)
      }, notificationDuration)
    })
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 w-[350px]">
    <TransitionGroup name="notify">
      <div v-for="notification in notifyAlertStore.notifications" :key="notification.id"
        class="rounded-lg shadow-lg px-4 py-3 text-white" :class="{
          'bg-green-500': notification.type === 'success',
          'bg-yellow-500': notification.type === 'alert',
          'bg-red-500': notification.type === 'error'
        }">
        <div class="flex items-center justify-between gap-3">
          <span class="text-sm font-medium">
            {{ notification.message }}
          </span>

          <button type="button" @click="notifyAlertStore.removeNotification(notification.id)"
            class="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notify-enter-active,
.notify-leave-active {
  transition: all 0.3s ease;
}

.notify-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notify-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```
