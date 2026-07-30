<template lang="">
     <div class="w-full h-screen fixed top-10 left-0 bg-slate-800/45">
      <section class="flex flex-col h-[calc(100vh-5rem)] bg-white rounded-t-2xl  overflow-y-scroll">
      <header class="p-3 flex justify-between">
        <p class="font-bold text-slate-700">Reactions {{props.post.reactions_count}}</p>
        <CloseButton @close="$emit('toggleOpen')"/>
      </header>
      <div class="flex-1">
        <CommentCard v-for="(comment, index) in comments" :key="index" :comment='comment'/>
      </div>
      <footer class="p-2 flex items-center">
      <textarea
              type="text"
              placeholder="What's on your mind?"
              class="w-full outline-0 resize-none bg-slate-200 rounded-xl h-12 px-2 pt-1"
              v-model="commentContent"
            ></textarea>
           <button type="button" @click="handleSendComment(props.post.id, commentContent)" class="bg-blue-500 rounded-lg px-2 py-1 ml-2">
             <Icon icon="heroicons:paper-airplane-solid" width="28" height="28" color="#f1f1f1"/>
           </button>
      </footer>
     </section>
     </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue'
import CloseButton from './CloseButton.vue';
import CommentCard from './CommentCard.vue';
import { usePostStore } from '@/stores/post';
import { getCommentsOfPostService } from '@/services/PostService'
const postStore = usePostStore()
const commentContent = ref('')
const comments = ref<String[]>([])
const props = defineProps(['post'])
defineEmits(['toggleOpen'])

const handleSendComment = async (postId: number, comment: string) => {
  const data = await postStore.commentAPost(postId, comment)
  // Insertamos el objeto 'comment' que viene directo desde la respuesta de Laravel
  if (data && data.data.comment) {
    comments.value.push(data.data.comment)
  }
  commentContent.value = '' // Limpiamos el input en el frontend
}
const getCommentsOfPost = async (postId: number) => {
  const { data } = await getCommentsOfPostService(postId)
  comments.value = data.comments
}

onMounted(() => {
  getCommentsOfPost(props.post.id)
})
</script>
<style lang="">

</style>
