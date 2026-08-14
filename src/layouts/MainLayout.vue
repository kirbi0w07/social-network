<template lang="">
    <div
  class="
  layout
  flex
  flex-col
  h-screen
  w-full
  xl:w-[90%]
  lg:w-3/4
  xl:max-w-[1400px]
  mx-auto
"
    >
      <main class="flex-1 relative overflow-y-auto">
        <RouterView/>
      </main>
      <NavbarMain/>
    </div>

    <RealtimeNotification/>
    <AlertNotification />


</template>
<script lang="ts" setup>
import NavbarMain from '@/components/layout/NavbarMain.vue';
import RealtimeNotification from '@/components/RealtimeNotification.vue';
import { listenForNotifications } from '@/services/Realtime';
import { useNotificationStore } from '@/stores/notifications';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { useNotifyAlertStore } from '@/stores/notifyAlert'
import AlertNotification from '@/components/AlertNotification.vue';

const notifyAlertStore = useNotifyAlertStore()

const { notifications } = storeToRefs(notifyAlertStore)

const notificationStore = useNotificationStore();

onMounted(() => {
  notificationStore.getNotifications();
  listenForNotifications();


});
</script>
<style lang="">

</style>
