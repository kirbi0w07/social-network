<template lang="html">
  <div class="relative">
    <Icon @click="notificationStore.showAsideNotification = true" icon="heroicons:bell" width="24" color="#374151"
      class="cursor-pointer" />

    <!-- red alert circle -->
    <div v-if="notificationStore.notifications.length > 0"
      class="bg-red-500 rounded-full w-3 h-3 absolute top-0 left-0"> {{ notificationStore.notifications.length }}
    </div>
  </div>

  <!-- notification aside -->
  <aside>
    <transition name="aside">
      <div v-if="notificationStore.showAsideNotification"
        class="fixed top-0 right-0 w-screen h-screen bg-white shadow-lg z-50 py-4 overflow-y-auto">
        <CloseButton @click="notificationStore.showAsideNotification = false" />
        <h2 class="text-lg font-semibold mb-4">Notifications</h2>
        <ul>
          <li @click="notificationClick(notification)" v-for="(notification, index) in notificationStore.notifications"
            :key="index" class="mb-2 p-2 border border-slate-300 border-r-0 border-l-0 w-full rounded">
            <div class="flex items-center">
              <div class="flex items-center">
                <UserAvatar :user="notification.data.user" />
                <span class="ml-2 font-semibold">{{ notification.data.user.name }}</span>
              </div>

              <span class="ml-2 text-sm text-gray-500">{{ dayjs(notification.created_at).fromNow() }}</span>
            </div>
            <span class="ml-2">{{ notification.data.message }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </aside>
</template>
<script setup lang="ts">
import { useNotificationStore } from '@/stores/notifications';
import { Icon } from '@iconify/vue'
import CloseButton from './CloseButton.vue';
import UserAvatar from './ui/UserAvatar.vue';
import dayjs from '@/utils/dayjs'
import { useRouter } from 'vue-router';
import type { Notification } from '@/types/notification.ts';
const notificationStore = useNotificationStore()
const router = useRouter()
const notificationClick = (notification: Notification) => {
  //if is type App\Notifications\FriendRequestNotification, redirect to profile of user

  if (notification.type === 'App\\Notifications\\FriendRequestNotification') {
    router.push(`/users/${notification.data.user.profile.username}`)
  }
};
</script>

<style lang="css">
.aside-enter-active,
.aside-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.aside-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.aside-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.aside-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
