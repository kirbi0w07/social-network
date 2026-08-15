<script setup lang="ts">
import SidebarListMenuItem from '@/components/sidebar/SidebarListMenuItem.vue'
</script>

<template>
  <section class="border-t border-gray-400 pt-4">
    <ul class="overflow-hidden cursor-pointer">
      <SidebarListMenuItem icon="heroicons:home-16-solid" name="Home" to="/" />
      <SidebarListMenuItem icon="heroicons:user-16-solid" name="My profile" to="/my-profile" />
      <SidebarListMenuItem icon="heroicons:users-16-solid" name="Seek friends" to="/search" />
      <SidebarListMenuItem icon="heroicons:users-16-solid" name="Chats" to="messages" />
      <SidebarListMenuItem icon="heroicons:cog-16-solid" name="Settings" to="/settings" />
    </ul>
  </section>
</template>

<style scoped></style>
