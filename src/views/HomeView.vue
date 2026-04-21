<template>
  <div class="flex flex-col items-center pb-8">
    <!-- <section class="flex justify-between bg-white min-w-11/12 mb-6 py-2 px-6 shadow shadow-slate-200 rounded-2xl">
            <span class="text-slate-400">Search...</span>
            <Icon icon="heroicons:magnifying-glass" width="24" color="#b2b2b2" />
        </section> -->
    <!-- Section nav -->
    <NavbarHome />

    <!-- Section what's on your mind -->
    <WhatsInMind />

    <!-- history Section -->
    <AddHistory />

    <!-- Posts Section -->
    <section
    class="bg-white mb-1">
      <div v-if="postStore.isCreatingPost" class="relative border border-dashed border-slate-400 rounded-lg">
        <div class="group animate-pulse opacity-30">
          <PostCard :post="postStore.tempPost"/>
        </div>
         <p class="font-semibold text-slate-600 absolute inset-0 flex items-center justify-center">Posting...</p>
      </div>
      <PostCard v-for="(post, index) in postStore.recentPosts" :key="index" :post/>
   </section>
  </div>
</template>
<script lang="ts" setup>
import NavbarHome from '@/components/layout/NavbarHome.vue'
import WhatsInMind from '@/components/home/WhatsInMind.vue'
import AddHistory from '@/components/home/AddHistory.vue'
import PostCard from '@/components/PostCard.vue'
import { onMounted, ref } from 'vue'
import { usePostStore } from '@/stores/post'
import type { Post } from '@/types/post'
const postStore = usePostStore()
onMounted(async () => {
 const {data} =  await postStore.getRecentPosts()
 postStore.recentPosts = data.posts
})
</script>
<style lang=""></style>
