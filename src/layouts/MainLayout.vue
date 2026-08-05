<template lang="">
    <div class="layout flex flex-col h-screen md:w-[80%] lg:w-3/4 mx-auto">
      <main class="flex-1 relative overflow-y-auto">
        <RouterView/>
      </main>
      <NavbarMain/>
    </div>

    <!-- Notification Alert -->
    <NotifyAlert />
    <RealtimeNotification/>

</template>
<script lang="ts" setup>
import NavbarMain from '@/components/layout/NavbarMain.vue';
import NotifyAlert from '@/components/NotifyAlert.vue';
import RealtimeNotification from '@/components/RealtimeNotification.vue';
import { listenForNotifications } from '@/services/Realtime';
import { useNotificationStore } from '@/stores/notifications';
import { onMounted } from 'vue';

const notificationStore = useNotificationStore();

onMounted(() => {
  notificationStore.getNotifications();
  listenForNotifications();


});
</script>
<style lang="">

</style>
