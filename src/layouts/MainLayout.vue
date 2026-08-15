<template>
  <div class="
      layout
      flex
      flex-col
      h-screen
      w-full
      xl:w-[90%]
      lg:w-3/4
      xl:max-w-[1400px]
      mx-auto
    ">

    <!-- NAVBAR SUPERIOR -->
    <NavbarHome @toggle-sidebar="showSidebar = !showSidebar" />

    <!-- SIDEBAR + CONTENIDO -->
    <main class="flex flex-1 min-h-0">

      <!-- SIDEBAR -->
      <SidebarHome v-if="windowWidth >= 768 || showSidebar" @close="showSidebar = false" />

      <!-- CONTENIDO DE LAS RUTAS -->
      <section class="flex-1 min-w-0 overflow-y-auto">
        <RouterView />
      </section>

    </main>

    <!-- NAVBAR INFERIOR MOBILE -->
    <NavbarMain />

  </div>

  <RealtimeNotification />
  <AlertNotification />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import NavbarHome from '@/components/layout/NavbarHome.vue'
import NavbarMain from '@/components/layout/NavbarMain.vue'
import SidebarHome from '@/components/layout/SidebarHome.vue'

import RealtimeNotification from '@/components/RealtimeNotification.vue'
import AlertNotification from '@/components/AlertNotification.vue'

import { useNotificationStore } from '@/stores/notifications'
import { listenForNotifications } from '@/services/Realtime'

import { useWindowSize } from '@/components/composables/useWindowSize'

const { windowWidth } = useWindowSize()

const showSidebar = ref(false)

const notificationStore = useNotificationStore()

onMounted(() => {
  notificationStore.getNotifications()
  listenForNotifications()
})
</script>

<style scoped></style>
