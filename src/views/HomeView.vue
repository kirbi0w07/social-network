<template>
  <div class="w-full min-h-screen">

    <div class="flex flex-col items-stretch pb-8">

      <WhatsInMind />

      <!-- <AddHistory /> -->

      <PostSection :posts="postStore.recentPosts" :show-creating="true" />

    </div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import WhatsInMind from '@/components/home/WhatsInMind.vue'
import AddHistory from '@/components/home/AddHistory.vue'
import PostSection from '@/components/PostSection.vue'

import { usePostStore } from '@/stores/post'

const postStore = usePostStore()

onMounted(async () => {
  const { data } = await postStore.getRecentPosts()

  postStore.recentPosts = data.posts
})
</script>
