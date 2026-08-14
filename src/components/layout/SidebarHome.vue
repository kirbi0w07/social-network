<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SidebarHeader from '@/components/sidebar/SidebarHeader.vue'
// import SidebarQuickActions from '@/components/sidebar/SidebarQuickActions.vue'
import SidebarListMenu from '@/components/sidebar/SidebarListMenu.vue'

import { useAuthStore } from '@/stores/auth'
import { useWindowSize } from '../composables/useWindowSize'
import BellNotification from '../BellNotification.vue'
const authStore = useAuthStore()

const { iconWidth, windowWidth } = useWindowSize()
const emit = defineEmits(['close'])
</script>

<template>
  <aside class="
    fixed
    top-0
    left-0
    h-screen
    w-full
    flex
    flex-col
    bg-white
    z-[99]
    md:fixed
    md:w-[220px]
    xl:w-[280px]
    md:shrink-0
    md:border-r
    md:border-slate-300
    md:shadow-none
  ">
    <!-- Toggle Sidebar-->
    <div class="w-full flex flex-col">
      <div class="md:hidden flex gap-2 items-center justify-end py-1 border-b border-slate-300">
        <Icon icon="heroicons:x-mark-20-solid" width="28" color="#374151" @click="emit('close')" />
      </div>

      <div class="w-full flex items-center justify-between px-2 py-2 border-b border-slate-300">
        <span class="py-2 font-semibold hidden md:inline">
          Notifications
        </span>

        <BellNotification v-if="windowWidth >= 768" />
      </div>

      <SidebarHeader />
      <SidebarListMenu />
    </div>


    <section class="mt-auto p-2">
      <div class="flex items-center w-fit rounded-md p-1 cursor-pointer" @click="authStore.logout">
        <Icon icon="heroicons:arrow-left-start-on-rectangle" :width="iconWidth" color="#374151" />

        <p class="md:text-2xl">
          Logout
        </p>
      </div>
    </section>
  </aside>
</template>

<style scoped></style>
