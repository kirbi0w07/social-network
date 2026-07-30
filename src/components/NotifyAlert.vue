<script setup lang="ts">
import { useNotificationStore } from '../stores/notifications'

const notificationStore = useNotificationStore()
</script>

<template>
  <Transition name="fade">
    <div v-if="notificationStore.show" class="fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg" :class="{
      'bg-blue-500 text-white':
        notificationStore.type === 'success',
      'bg-red-500 text-white':
        notificationStore.type === 'error'
    }">
      {{ notificationStore.message }}
    </div>
  </Transition>
</template>
