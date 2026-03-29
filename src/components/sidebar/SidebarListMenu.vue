<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SidebarListMenuItem from '@/components/sidebar/SidebarListMenuItem.vue'
</script>

<template>
  <section class="border-t border-gray-400 pt-4">
    <ul class="border border-neutral-800 divide-y divide-neutral-800 overflow-hidden">
      <SidebarListMenuItem icon="heroicons:user-group-16-solid" name="Groups" />
      <SidebarListMenuItem icon="heroicons:user-group-16-solid" name="Groups" />
      <SidebarListMenuItem icon="heroicons:user-group-16-solid" name="Groups" />
    </ul>
  </section>
</template>

<style scoped></style>
