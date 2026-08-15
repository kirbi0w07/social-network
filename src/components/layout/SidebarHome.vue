<script setup lang="ts">
import { Icon } from '@iconify/vue'

import SidebarHeader from '@/components/sidebar/SidebarHeader.vue'
import SidebarListMenu from '@/components/sidebar/SidebarListMenu.vue'
import BellNotification from '../BellNotification.vue'

import { useAuthStore } from '@/stores/auth'
import { useWindowSize } from '../composables/useWindowSize'

const authStore = useAuthStore()

const { iconWidth, windowWidth } = useWindowSize()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <aside class="
    fixed
    top-0
    left-0
    w-full
    h-screen
    flex
    flex-col
    bg-white
    z-[99]

    md:static
    md:w-[220px]
    xl:w-[280px]
    md:shrink-0
    md:border-r
    md:border-slate-300
    md:shadow-none
  ">

    <!-- HEADER / CONTROLES -->
    <div class="w-full flex flex-col">

      <!-- CERRAR EN MOBILE -->
      <div class="
          md:hidden
          flex
          items-center
          justify-end
          py-1
          px-2
          border-b
          border-slate-300
        ">
        <Icon icon="heroicons:x-mark-20-solid" width="28" color="#374151" class="cursor-pointer"
          @click="emit('close')" />
      </div>

      <!-- NOTIFICACIONES -->
      <div class="
          w-full
          flex
          items-center
          justify-between
          px-2
          py-2
          border-b
          border-slate-300
        ">
        <span class="py-2 font-semibold hidden md:inline">
          Notifications
        </span>

        <BellNotification v-if="windowWidth >= 768" />
      </div>

      <!-- PERFIL -->
      <SidebarHeader />

      <!-- MENU -->
      <SidebarListMenu />

    </div>

    <!-- LOGOUT -->
    <section class="mt-auto p-2">
      <div class="
          flex
          items-center
          w-fit
          rounded-md
          p-1
          cursor-pointer
        " @click="authStore.logout">
        <Icon icon="heroicons:arrow-left-start-on-rectangle" :width="iconWidth" color="#374151" />

        <p class="md:text-2xl">
          Logout
        </p>
      </div>
    </section>

  </aside>
</template>

<style scoped></style>
