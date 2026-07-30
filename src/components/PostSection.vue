<template lang="">
  <section class="bg-white mb-1">

    <div
      v-if="showCreating && postStore.isCreatingPost"
      class="relative border border-dashed border-slate-400 rounded-lg"
    >
      <div class="group animate-pulse opacity-30">
        <PostCard :post="postStore.tempPost" />
      </div>

      <p
        class="font-semibold text-slate-600 absolute inset-0 flex items-center justify-center"
      >
        Posting...
      </p>
    </div>

    <PostCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />

  </section>
</template>
<script lang="ts" setup>
import { usePostStore } from '@/stores/post';
import PostCard from './PostCard.vue';
import type { Post } from '@/types/post';

const postStore = usePostStore()


defineProps<{
  posts: Post[],
  showCreating?: boolean
}>()
</script>
<style lang="">

</style>
