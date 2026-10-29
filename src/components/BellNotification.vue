<template lang="html">
  <div class="relative w-fit shrink-0">
    <Icon v-if="user" @click="notificationStore.showAsideNotification = true" icon="heroicons:bell" :width="iconWidth"
      color="#374151" class="cursor-pointer" />
    <Icon v-else @click="goLogin" icon="heroicons:bell" :width="iconWidth" color="#374151" class="cursor-pointer" />



    <div v-if="notificationStore.notifications.length > 0"
      class="absolute -top-1 -right-1 min-w-3 h-3 px-1 flex items-center justify-center bg-red-500 rounded-full text-[8px] text-white">
      {{ notificationStore.notifications.length }}
    </div>
  </div>

  <!-- notification aside -->
  <aside>
    <transition name="aside">
      <div v-if="notificationStore.showAsideNotification" class="fixed top-0 left-0 right-0 h-screen bg-white shadow-lg z-50 py-4 overflow-y-auto  w-full
      xl:w-[90%]
      lg:w-3/4
      xl:max-w-[1400px]
      mx-auto">
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
import { useWindowSize } from '@/components/composables/useWindowSize';
import type { Notification } from '@/types/notification.ts';
import { useAuthStore } from '@/stores/auth.ts';

const { iconWidth } = useWindowSize()
const notificationStore = useNotificationStore()
const { user } = useAuthStore()
const router = useRouter()
const notificationClick = (notification: Notification) => {
  //if is type App\Notifications\FriendRequestNotification, redirect to profile of user

  if (notification.type === 'App\\Notifications\\FriendRequestNotification') {
    router.push(`/users/${notification.data.user.profile.username}`)
  }
};

const goLogin = () => {
  router.push({ name: 'SignIn' })
}
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
