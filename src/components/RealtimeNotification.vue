<script setup lang="ts">
import { useRealtimeNotificationStore } from '@/stores/realtimeNotification'
import UserAvatar from './ui/UserAvatar.vue';
import { useAuthStore } from '@/stores/auth';

const notificationStore = useRealtimeNotificationStore()

const { user } = useAuthStore()

const close = () => {
  notificationStore.clearRealtimeNotification()
}
</script>

<template>

  <Transition name="slide">

    <div v-if="notificationStore.realtimeNotification"
      class="fixed bottom-5 right-5 z-[9999] w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4">

      <div class="flex items-start gap-3">
        <div>
          <UserAvatar :user="notificationStore.realtimeNotification.data.user"
            :alt="notificationStore.realtimeNotification.data.user"
            :title="notificationStore.realtimeNotification.data.user" />
          <p>{{ notificationStore.realtimeNotification.data.user.name }} {{
            notificationStore.realtimeNotification.data.user.last_name}}</p>
        </div>

        <div class="flex-1">

          <p class="font-semibold text-gray-800">
            Nueva notificación
          </p>

          <p class="text-sm text-gray-600">
            {{ notificationStore.realtimeNotification.data.message }}
          </p>

        </div>

        <button @click="close" class="text-gray-400 hover:text-gray-700 text-xl">
          ×
        </button>

      </div>

    </div>

  </Transition>

</template>
