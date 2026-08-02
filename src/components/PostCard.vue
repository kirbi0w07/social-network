<script setup lang="ts">
import { Icon } from '@iconify/vue'
import UserAvatar from './ui/UserAvatar.vue';
import { ref } from 'vue';
import { usePostStore } from '@/stores/post';
import CommentAPost from './CommentAPost.vue';
import ReactionButton from './ui/ReactionButton.vue';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
const modules = [Navigation, Pagination];
const postStore = usePostStore()
const props = defineProps(['post'])

const selectedMediaIndex = ref(0)
const showCommentSection = ref(false)
const showPostMedia = ref(false)




const reactToPost = async (postId: number, type: 'like' | 'love' | 'smile' | 'fire') => {
  await postStore.rectToPost(postId, type)
}

const toggleCommentSection = () => {
  showCommentSection.value = !showCommentSection.value
}

const togglePostMedia = (index: number = 0) => {
  selectedMediaIndex.value = index
  showPostMedia.value = !showPostMedia.value
}

</script>

<template>
  <article class="w-full">
    <header class="flex justify-between p-2 text-slate-900">
      <div class="flex items-center gap-1">
        <UserAvatar :user="post.user" :alt="post.user" :title="post.user" />
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

      <section>
        <!-- 1 imagen -->
        <div v-if="post?.media?.length === 1" class="py-2">
          <img :src="post.media[0].file_url" alt="" @click="togglePostMedia()"
            class="w-full max-h-[600px] object-cover rounded-lg cursor-pointer" />
        </div>


        <!-- 2 imágenes -->
        <div v-else-if="post?.media?.length === 2" class="grid grid-cols-2 gap-1 py-2">
          <div v-for="(media, index) in post.media" :key="media.id" class="relative aspect-square overflow-hidden">
            <img :src="media.file_url" alt="" @click="togglePostMedia(Number(index))"
              class="w-full h-full object-cover rounded-lg cursor-pointer" />
          </div>
        </div>


        <!-- 3 o más imágenes -->
        <div v-else-if="post?.media?.length >= 3" class="grid grid-cols-2 gap-1 py-2">

          <!-- Imagen grande -->
          <div class="row-span-2 relative overflow-hidden">
            <img :src="post.media[0].file_url" alt="" @click="togglePostMedia()"
              class="w-full h-full object-cover rounded-lg cursor-pointer" />
          </div>


          <!-- Imagen pequeña superior -->
          <div class="relative aspect-square overflow-hidden">
            <img :src="post.media[1].file_url" alt="" @click="togglePostMedia(1)"
              class="w-full h-full object-cover rounded-lg cursor-pointer" />
          </div>


          <!-- Imagen pequeña inferior + contador -->
          <div class="relative aspect-square overflow-hidden">

            <img :src="post.media[2].file_url" alt="" @click="togglePostMedia(2)"
              class="w-full h-full object-cover rounded-lg cursor-pointer" />

            <!-- +N -->
            <div v-if="post.media.length > 3" @click="togglePostMedia(2)"
              class="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer rounded-lg">
              <span class="text-white text-3xl font-bold">
                +{{ post.media.length - 3 }}
              </span>
            </div>

          </div>

        </div>
      </section>
    </div>
    <!-- modal ver fotos -->
    <!-- modal ver fotos -->
    <section v-if="showPostMedia" class="fixed inset-0 z-[99] w-screen h-screen bg-slate-900/50">
      <!-- Fondo: al hacer clic aquí se cierra -->
      <div @click="showPostMedia = false" class="w-full h-full flex justify-center items-center">

        <!-- Contenido: el clic NO llega al padre -->
        <div @click.stop class="relative w-[90%] max-w-4xl px-4 z-[60]">

          <swiper :modules="modules" :slides-per-view="1" :space-between="10" navigation
            :initial-slide="selectedMediaIndex" :pagination="{ clickable: true }" class="rounded-lg overflow-hidden">

            <swiper-slide v-for="picture in post.media" :key="picture.id"
              class="flex justify-center items-center bg-black/20 aspect-[4/3]">

              <img :src="picture.file_url" class="w-full h-full object-contain mx-auto" />

            </swiper-slide>

          </swiper>

        </div>
      </div>
    </section>

    <footer class="flex py-4">
      <div class="flex flex-1 justify-around gap-2">
        <div class="relative">
          <ReactionButton :post="props.post" @react="(type) => reactToPost(post.id, type)" />
        </div>
        <button class="flex items-center gap-1" @click="toggleCommentSection">
          <Icon icon="heroicons:chat-bubble-bottom-center-text" width="24" color="#374151" />
          <span>{{ post.comments_count }}</span>
        </button>
        <button class="flex items-center gap-1">
          <Icon icon="heroicons:arrow-top-right-on-square-solid" width="24" color="#374151" />
          <span>123</span>
        </button>
      </div>
    </footer>
  </article>

  <!-- comment a post section -->
  <Teleport to="body">
    <Transition name="commentSection">
      <CommentAPost v-if="showCommentSection" @toggleOpen="toggleCommentSection" :post="props.post" />
    </Transition>
  </Teleport>

</template>

<style scoped>
.commentSection-enter-active,
.commentSection-leave-active {
  transition:
    transform 0.2s ease-in-out;
}

.commentSection-enter-from {
  transform: translatey(100%);

}

.commentSection-enter-to {
  transform: translatey(0);
}

.commentSection-leave-to {
  transform: translatey(100%);

}

:root {
  --swiper-navigation-color: #fff;
  --swiper-pagination-color: #fff;
}

.swiper-button-next,
.swiper-button-prev {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}
</style>
