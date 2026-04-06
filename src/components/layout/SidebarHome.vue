<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SidebarHeader from '@/components/sidebar/SidebarHeader.vue'
import SidebarQuickActions from '@/components/sidebar/SidebarQuickActions.vue'
import SidebarListMenu from '@/components/sidebar/SidebarListMenu.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const emit = defineEmits(['close'])
</script>

<template>
  <aside class="fixed h-screen w-full bg-white">
    <!-- Toggle Sidebar-->
    <div class="flex gap-2 items-center justify-end px-4 pt-4 pb-1 border-b border-slate-300">
      <Icon icon="heroicons:x-mark-20-solid" width="28" color="#374151" @click="emit('close')" />
    </div>
    <SidebarHeader />
    <SidebarQuickActions/>
    <SidebarListMenu/>
    <section class="p-2" @click="authStore.logout">
      <div class="flex items-center w-fit bg-slate-200 rounded-md p-1">
        <Icon icon="heroicons:arrow-left-start-on-rectangle" width="28" color="#374151" />
        <p>Logout</p>
      </div>
    </section>
  </aside>
</template>

<style scoped></style>
