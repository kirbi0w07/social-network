<template>
  <nav class="w-full flex justify-between mb-1 bg-white">
    <div class="flex gap-2 pl-2 py-2 items-center">
      <Icon icon="heroicons:bars-3" width="24" color="#374151" @click="toggleSidebar" />
      <!-- 374151, b2b2b2 -->
      <h1 class="">Social Network</h1>
    </div>
    <div class="flex items-center gap-2 pr-2 py-2">
      <Icon icon="heroicons:plus-small" width="24" color="#374151" />
      <Icon icon="heroicons:magnifying-glass" width="24" color="#374151" />
      <!-- <Icon icon="heroicons:chat-bubble-oval-left-ellipsis" width="24" color="#374151" /> -->
    </div>
  </nav>
<transition name="aside">
  <sidebarHome v-if="showSidebar" @close="toggleSidebar"/>
</transition>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import SidebarHome from '@/components/layout/SidebarHome.vue'
import { ref } from 'vue'

const showSidebar = ref(false)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
</script>
<style scoped>
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
