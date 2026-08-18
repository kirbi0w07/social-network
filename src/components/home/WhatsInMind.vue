<template>
  <article class="flex gap-2 items-center bg-white w-full pl-2 pr-2 pt-3 pb-4">
    <UserAvatar :user="user"
      customClass="w-7 h-7 rounded-full object-cover bg-slate-300 border border-slate-50 md:w-12 md:h-12" goProfile />

    <div class="flex flex-1 py-1 text-slate-900 rounded-2xl border border-slate-200">
      <p class="px-4 md:py-2 md:text-xl" @click="toggleWhatsOnMindForm">
        What's on your mind?
      </p>
    </div>

    <div class="flex justify-center items-center">
      <Icon @click="toggleWhatsOnMindForm" icon="heroicons:photo" :width="iconWidth" color="#374151"
        class="cursor-pointer" />
    </div>
  </article>

  <Teleport to="body">
    <transition name="whatsonmind">
      <form v-if="showWhatsOnMindForm" class="fixed inset-0 z-[99] w-screen h-dvh min-h-0 bg-white grid overflow-hidden"
        style="grid-template-rows: auto auto minmax(0, 1fr) auto auto;">
        <div class="grid gap-2 grid-cols-3 items-center justify-between px-2 pt-4 pb-1 border-b border-slate-300">
          <Icon icon="heroicons:x-mark-20-solid" :width="iconWidth" color="#374151" @click="toggleWhatsOnMindForm"
            :class="hideHeader ? 'opacity-0' : 'cursor-pointer'" />

          <p class="text-sm font-medium justify-self-center md:text-2xl">
            {{ hideHeader ? 'Add text' : 'New Post' }}
          </p>

          <Icon v-if="!hideHeader" icon="heroicons:ellipsis-horizontal" :width="iconWidth" color="#374151"
            class="justify-self-end" />

          <button v-else type="button" @click="hideHeader = false" class="justify-self-end cursor-pointer md:pr-4">
            Done
          </button>
        </div>

        <header class="flex items-center gap-2 px-2 overflow-hidden transition-all duration-100" :class="hideHeader
          ? 'max-h-0 py-0 opacity-0'
          : 'max-h-20 py-4'
          ">
          <UserAvatar :user="user" customClass="w-10 h-10 rounded-full object-cover md:w-12 md:h-12" goProfile />

          <p v-if="user" class="md:text-xl">
            {{ user.name }} {{ user.last_name }}
          </p>

          <div v-else class="h-4 w-32 md:w-48 md:h-4 bg-slate-200 animate-pulse rounded-md"></div>
        </header>

        <div class="min-h-0 overflow-y-auto flex flex-col">
          <div class="flex-1 min-h-0 px-2">
            <textarea v-model="postContent" placeholder="What's on your mind?" @focus="onFocusTextarea"
              class="block w-full h-full min-h-[200px] outline-none resize-none md:text-2xl"></textarea>
          </div>

          <div class="grid grid-cols-[1fr_auto] items-stretch px-2 pb-2 shrink-0">
            <div v-if="selectedMedia.length > 0" class="flex overflow-x-auto gap-2">
              <div v-for="(item, index) in selectedMedia" :key="item.id"
                class="relative flex-none w-48 group aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img v-if="item.type === 'image'" :src="item.previewUrl" class="w-full h-full object-contain" />

                <video v-else :src="item.previewUrl" class="w-full h-full object-cover"></video>

                <Icon icon="heroicons:x-mark-20-solid" :width="iconWidth" :height="iconWidth"
                  class="absolute top-1 right-3 bg-black/50 text-white rounded-full p-1 cursor-pointer"
                  @click="removeMedia(index)" />
              </div>
            </div>

            <button v-if="selectedMedia.length > 0" type="button" @click="triggerFileSelect"
              class="flex-none flex items-center justify-center ml-2 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-20">
              <span class="text-gray-500 text-xl">+</span>
            </button>
          </div>
        </div>

        <ul class="p-4 border-t border-b border-slate-300 bg-white">
          <li v-if="!selectedMedia.length" @click="triggerFileSelect"
            class="flex flex-col justify-center items-center shadow shadow-slate-300 rounded-lg w-fit px-4 py-2 cursor-pointer">
            <Icon icon="heroicons:photo" :width="iconWidth" color="#0f172b" />

            <p class="text-[12px] text-slate-900">
              Gallery
            </p>
          </li>
        </ul>

        <div
          class="flex items-center gap-2 p-2 border-t border-slate-300 bg-white pb-[max(env(safe-area-inset-bottom),8px)]">
          <ul class="flex-1">
            options
          </ul>

          <button type="button" @click="post"
            class="px-4 py-1 mr-4 bg-blue-500 text-white rounded disabled:bg-slate-400 disabled:text-slate-900 md:text-2xl md:px-4 md:py-2 cursor-pointer">
            Post
          </button>
        </div>
      </form>
    </transition>
  </Teleport>

  <input type="file" ref="fileInput" class="hidden" multiple accept="image/*, video/*" @change="handleFileChange" />
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { Icon } from '@iconify/vue'
import { ref, toRaw } from 'vue'
import UserAvatar from '../ui/UserAvatar.vue'
import type { MediaFile, TempPost } from '@/types/post'
import { createPostService } from '@/services/PostService'
import { usePostStore } from '@/stores/post'
import { useWindowSize } from '../composables/useWindowSize.ts'
import { useNotifyAlertStore } from '@/stores/notifyAlert.ts'

const { user } = useAuthStore()
const postStore = usePostStore()
const postContent = ref('')

const { iconWidth } = useWindowSize()

const allowedTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/avif',
  'image/heic',
  'image/heif',
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
  'video/mpeg',
  'video/ogg',
  'video/3gpp',
]
const notifyAlertStore = useNotifyAlertStore()
const showWhatsOnMindForm = ref(false)
const hideHeader = ref(false)

const fileInput = ref<HTMLInputElement | null>(null)
const selectedMedia = ref<MediaFile[]>([])

const triggerFileSelect = () => {
  fileInput.value?.click()
}

const toggleWhatsOnMindForm = () => {
  showWhatsOnMindForm.value = !showWhatsOnMindForm.value

  if (!showWhatsOnMindForm.value) {
    hideHeader.value = false
  }
}

const onFocusTextarea = (e: FocusEvent) => {
  if (e.target instanceof HTMLTextAreaElement) {
    hideHeader.value = true
  }
}

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement

  if (!target.files) return

  const files = Array.from(target.files)

  files.forEach(file => {
    if (!allowedTypes.includes(file.type)) {
      alert(`"${file.name}" no es un formato permitido.`)
      return
    }

    const isVideo = file.type.startsWith('video/')

    const media: MediaFile = {
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      type: isVideo ? 'video' : 'image'
    }

    selectedMedia.value.push(media)
  })

  target.value = ''
}

const removeMedia = (index: number) => {
  if (selectedMedia.value[index]) {
    URL.revokeObjectURL(selectedMedia.value[index].previewUrl)
    selectedMedia.value.splice(index, 1)
  }
}

const post = async () => {
  try {
    const cleanFiles = selectedMedia.value.map(item => {
      return toRaw(item.file)
    })

    const content = postContent.value

    toggleWhatsOnMindForm()

    selectedMedia.value.forEach(item => {
      URL.revokeObjectURL(item.previewUrl)
    })

    selectedMedia.value = []
    postContent.value = ''

    const tempPost: TempPost = {
      body: content,
      user: user,
    }

    postStore.startCreatingTempPost(tempPost)

    const { data } = await createPostService(content, cleanFiles)

    postStore.addPost(data.post)
  } catch (error) {
    notifyAlertStore.addNotification("error", error?.response?.data?.message || "Error al crear el post")
    postStore.tempPost = null
    postStore.isCreatingPost = false

  }
}
</script>

<style scoped>
.whatsonmind-enter-active,
.whatsonmind-leave-active {
  transition: transform 0.2s ease;
}

.whatsonmind-enter-from {
  transform: translateY(100%);
}

.whatsonmind-enter-to {
  transform: translateY(0);
}

.whatsonmind-leave-to {
  transform: translateY(100%);
}
</style>
