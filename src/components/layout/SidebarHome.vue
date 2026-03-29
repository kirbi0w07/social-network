<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SidebarHeader from '@/components/sidebar/SidebarHeader.vue'
import SidebarQuickActions from '@/components/sidebar/SidebarQuickActions.vue'
import SidebarListMenu from '@/components/sidebar/SidebarListMenu.vue'

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
  </aside>
</template>

<style scoped></style>
