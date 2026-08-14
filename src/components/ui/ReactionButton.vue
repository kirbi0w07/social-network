<template lang="">
  <button type="button" @click="openReactionOpts" class="flex flex-1 justify-center items-center gap-1 cursor-pointer">
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
          <div ref="reactionMenu" tabindex="-1" v-if="showReactionOpts" @blur="openReactionOpts" @mousedown.prevent class="absolute w-max flex bg-white shadow shadow-slate-300 p-1 z-50"
          :style="{ right: props.positionRight }"
          >
            <button v-for="(data, type) in REACTION_TYPES" :key="type" @click="handleReactionClick(type)" class="px-2 hover:scale-125 transition-transform">
              <Icon :icon="data.icon" width="24" color="#374151"/>
            </button>
          </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { nextTick, ref } from 'vue';

const props = defineProps({
  post: { type: Object, required: true },
  withDislike: { type: Boolean },
  positionRight: { type: String }
});

const emit = defineEmits(['react']);

const reactionMenu = ref<HTMLElement | null>(null);
const REACTION_TYPES = {
  like: { icon: 'heroicons:hand-thumb-up', icon_fill: 'heroicons:hand-thumb-up-solid', label: 'Like' },
  love: { icon: 'heroicons:heart', icon_fill: 'heroicons:heart-solid', label: 'Love' },
  smile: { icon: 'heroicons:face-smile', icon_fill: 'heroicons:face-smile-solid', label: 'Smile' },
  fire: { icon: 'heroicons:fire', icon_fill: 'heroicons:fire-solid', label: 'Fire' },
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

const handleReactionClick = (type: ReactionType) => {
  showReactionOpts.value = false;
  emit('react', type); // <-- Enviamos el tipo (ej. 'love') hacia arriba
};
</script>
<style lang="">

</style>
