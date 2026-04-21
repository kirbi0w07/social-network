<script setup lang="ts">
import { Icon } from '@iconify/vue'
import UserAvatar from './ui/UserAvatar.vue';
import { nextTick, ref } from 'vue';
import { usePostStore } from '@/stores/post';
const postStore = usePostStore()
 defineProps(['post'])
const reactionMenu = ref<HTMLElement | null>(null);
 const REACTION_TYPES = {
  like: {icon: 'heroicons:hand-thumb-up', icon_fill: 'heroicons:hand-thumb-up-solid', label: 'Like'},
  love: {icon: 'heroicons:heart', icon_fill: 'heroicons:heart-solid', label: 'Love'},
  smile: {icon: 'heroicons:face-smile', icon_fill: 'heroicons:face-smile-solid', label: 'Smile'},
  fire: {icon: 'heroicons:fire', icon_fill: 'heroicons:fire-solid', label: 'Fire'},
 } as const

  type ReactionType = keyof typeof REACTION_TYPES;
  const showReactionOpts = ref(false)

  const openReactionOpts = async () => {
    showReactionOpts.value = !showReactionOpts.value
    if (showReactionOpts.value) {
    // Esperamos al siguiente tick para que el div exista en el DOM
    await nextTick();
    reactionMenu.value?.focus();
  }
  }

  const reactToPost = async (postId :number, type: ReactionType) => {
    await postStore.rectToPost(postId, type)

  }
</script>

<template>
  <article class="w-screen">
    <header class="flex justify-between p-2 text-slate-900">
      <div class="flex items-center gap-1">
        <UserAvatar :user="post.user" :alt="post.user" :title="post.user"/>
        <div class="flex flex-col">
          <p class="font-medium text-sm">{{ post.user.name }} {{ post.user.last_name }}</p>
          <p class="text-xs text-slate-700">1h</p>
        </div>
      </div>
      <div class="flex gap-4">
        <Icon icon="heroicons:ellipsis-horizontal" width="24" color="#374151" />
        <Icon icon="heroicons:x-mark-solid" width="24" color="#374151" />
      </div>
    </header>
    <div class="px-2">
      <p>{{ post.body }}</p>
    </div>
    <footer class="flex py-4">
      <div class="flex flex-1 justify-around gap-2">
        <div class="relative">
          <button type="button" @click="openReactionOpts" class="flex items-center gap-1">
         <Icon
            :icon="post.user_reaction
              ? REACTION_TYPES[post.user_reaction.type as ReactionType].icon_fill
              : (post.last_type
                  ? REACTION_TYPES[post.last_type as ReactionType].icon
                  : 'heroicons:hand-thumb-up')"
            width="24"
            color="#374151"
         />
          <span>{{post.reactions_count}}</span>
          </button>
          <!-- reaction opts  -->
          <div ref="reactionMenu" tabindex="-1" v-if="showReactionOpts" @blur="openReactionOpts" @mousedown.prevent class="absolute top-10 w-max flex bg-white shadow shadow-slate-300 p-1">
            <button v-for="(data, type) in REACTION_TYPES" :key="type" @click="reactToPost(post.id,type)" class="px-2 hover:scale-125 transition-transform">
              <Icon :icon="data.icon" width="24" color="#374151"/>
            </button>
          </div>
        </div>
        <button class="flex items-center gap-1">
          <Icon icon="heroicons:chat-bubble-bottom-center-text" width="24" color="#374151" />
          <span>{{post.comments_count}}</span>
        </button>
        <button class="flex items-center gap-1">
          <Icon icon="heroicons:arrow-top-right-on-square-solid" width="24" color="#374151" />
          <span>123</span>
        </button>
      </div>

    </footer>
  </article>
</template>

<style scoped></style>
