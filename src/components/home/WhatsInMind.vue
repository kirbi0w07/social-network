<template>
  <article class="flex gap-2 items-center bg-white w-full pl-2 pr-2 pt-3 pb-4">
    
    <UserAvatar :user="user" customClass="w-7 h-7 rounded-full object-cover bg-slate-300 border border-slate-50"/>
    <div class="flex flex-1 py-1 text-slate-900 rounded-2xl border border-slate-200">
      <p class="px-4" @click="toggleWhatsOnMindForm">What's on your mind?</p>
    </div>
    <div class="flex justify-center items-center">
      <Icon icon="heroicons:photo" width="24" color="#374151" />
    </div>
  </article>

  <!-- FORMULARIO CRAR POST -->
  <transition name="whatsonmind">
    <form v-if="showWhatsOnMindForm" class="flex flex-col top-0 fixed w-full h-screen bg-white">
      <div class="grid gap-2 grid-cols-3 items-center justify-between  px-2 pt-4 pb-1 border-b border-slate-300">
        <Icon icon="heroicons:x-mark-20-solid" width="28" color="#374151" @click="toggleWhatsOnMindForm" :class="hideHeader ? 'opacity-0': ''"/>
        <p class="text-sm font-medium justify-self-center">{{ hideHeader ? 'Add text' : 'New Post' }}</p>
        <Icon v-if="!hideHeader" icon="heroicons:ellipsis-horizontal" width="24" color="#374151" class="justify-self-end" />
        <button v-else @click="hideHeader = false" class="justify-self-end">Done</button>
      </div>

      <header class="flex items-center gap-2 px-2 overflow-hidden transition-all duration-100"
        :class="hideHeader ? 'max-h-0 py-0 opacity-0' : 'max-h-20 py-4'">
        <UserAvatar :user customClass="w-10 h-10 rounded-full object-cover" />
        <p v-if="user">{{ user.name }} {{ user.last_name }}</p>
        <!-- text loading bounce -->
        <div v-else class="h-4 w-32 bg-slate-200 animate-pulse rounded-md"></div>
      </header>

      <textarea type="text" placeholder="What's on your mind?" @focus="onFocusTextarea" v-model="postContent"
        class="flex-1 outline-0 px-2"></textarea>

        <!-- media preview -->
        <div class="flex gap-4 mt-4">
          <div v-if="selectedMedia.length > 0">
            <div 
              v-for="(item, index) in selectedMedia" 
              :key="item.id" 
              class="relative flex px-1 group aspect-video rounded-lg overflow-hidden bg-gray-100"
            >
              <img 
                v-if="item.type === 'image'" 
                :src="item.previewUrl" 
                class="w-full h-full object-contain" 
              />
        
              <video 
                v-else 
                :src="item.previewUrl" 
                class="w-full h-full object-cover"
              ></video>
        
              <Icon icon="heroicons:x-mark-20-solid" width="20" height="20" class="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 cursor-pointer" @click="removeMedia(index)" />
            </div>
          </div>
    
          <button 
          v-if="selectedMedia.length > 0"
            type="button"
            @click="triggerFileSelect"
            class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span class="text-gray-500 text-2xl">+</span>
          </button>
        </div>
      <ul class="p-4 gap-2 justify-around border-b border-slate-300">
        <li v-if="!selectedMedia.length" @click="triggerFileSelect" class="flex flex-col justify-center  items-center shadow shadow-slate-300 rounded-lg w-fit px-4 py-2">
          <Icon icon="heroicons:photo" width="18" color="#0f172b" />
          <p class="text-[12px] text-slate-900">Gallery</p>
        </li>
      </ul>
      <div class="flex items-center gap-2 p-2">
        <ul class="flex-1">
          options
        </ul>
        <button

          class="px-4 py-1 bg-blue-500 text-white rounded disabled:bg-slate-400 disabled:text-slate-900">Post</button>
    </div>
    </form>
  </transition>

  <!-- input file hidden -->
    <input 
    type="file" 
    ref="fileInput" 
    class="hidden" 
    multiple
    accept="image/*, video/*" 
    @change="handleFileChange"
    />
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue'
import { ref } from 'vue';
import UserAvatar from '../ui/UserAvatar.vue';
import type { MediaFile } from '@/types/post';
const { user } = useAuthStore()

const postContent = ref('')

// const emit = defineEmits(['close'])
const showWhatsOnMindForm = ref(false)
const hideHeader = ref(false)

//post media variables
const fileInput = ref<HTMLInputElement | null>(null);
const selectedMedia = ref<MediaFile[]>([]);

const triggerFileSelect = () => {
  fileInput.value?.click();
};

const toggleWhatsOnMindForm = () => {
  showWhatsOnMindForm.value = !showWhatsOnMindForm.value
}

const onFocusTextarea = (e: FocusEvent) => {
  if (e.target instanceof HTMLTextAreaElement) {
    hideHeader.value = true
  }
}

const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files) return;

    const files = Array.from(target.files);

    files.forEach(file => {
    const isVideo = file.type.startsWith('video/');
    
    const media: MediaFile = {
      id: crypto.randomUUID(), // Genera un ID único
      file: file,
      previewUrl: URL.createObjectURL(file), // Crea la URL para el <img> o <video>
      type: isVideo ? 'video' : 'image'
    };

    selectedMedia.value.push(media);
  });

  // Limpiar el input para que permita seleccionar el mismo archivo de nuevo si se borró
  target.value = '';

}
// Importante: Limpiar memoria al eliminar una preview
const removeMedia = (index: number) => {
  if(selectedMedia.value[index]) {
    URL.revokeObjectURL(selectedMedia.value[index].previewUrl);
    selectedMedia.value.splice(index, 1);
  }
};

// const onBlurTextarea = () => {
//   hideHeader.value = false
// }
</script>

<style scoped>
.whatsonmind-enter-active,
.whatsonmind-leave-active {
  transition:
    transform 0.2s ease;
}

.whatsonmind-enter-from {
  transform: translatey(100%);

}

.whatsonmind-enter-to {
  transform: translatey(0);
}

.whatsonmind-leave-to {
  transform: translatey(100%);

}
</style>
