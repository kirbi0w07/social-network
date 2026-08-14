<template>
  <div class="w-full min-h-screen">

    <!-- DESKTOP: sidebar + contenido -->
    <div class="hidden md:flex w-full min-h-screen">

      <!-- SIDEBAR -->
      <div class="md:w-[220px] xl:w-[280px]  shrink-0">
        <SidebarHome />
      </div>

      <!-- CONTENIDO -->
      <div class="flex-1 min-w-0">

        <NavbarHome />

        <div class="flex flex-col items-stretch pb-8">
          <WhatsInMind />

          <!--   -->

          <PostSection :posts="postStore.recentPosts" :show-creating="true" />
        </div>

      </div>
    </div>


    <!-- MOBILE / MD -->
    <div class="md:hidden">

      <!-- NAV -->
      <NavbarHome @toggle-sidebar="toggleSidebar" />

      <!-- SIDEBAR MOBILE -->
      <transition name="aside">
        <SidebarHome v-if="showSidebar" @close="toggleSidebar" />
      </transition>

      <!-- CONTENIDO -->
      <div class="flex flex-col items-stretch pb-8">

        <WhatsInMind />

        <AddHistory />

        <PostSection :posts="postStore.recentPosts" :show-creating="true" />

      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import NavbarHome from '@/components/layout/NavbarHome.vue'
import WhatsInMind from '@/components/home/WhatsInMind.vue'
import AddHistory from '@/components/home/AddHistory.vue'
import PostSection from '@/components/PostSection.vue'
import SidebarHome from '@/components/layout/SidebarHome.vue'

import { onMounted, ref } from 'vue'
import { usePostStore } from '@/stores/post'

const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const postStore = usePostStore()

onMounted(async () => {
  const { data } = await postStore.getRecentPosts()

  postStore.recentPosts = data.posts
})

</script>

<style scoped>
.aside-enter-active,
.aside-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.aside-enter-from,
.aside-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.aside-enter-to,
.aside-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
