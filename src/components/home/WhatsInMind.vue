<template>
  <article class="flex gap-2 items-center bg-white w-full pl-2 pr-2 pt-3 pb-4">
    <img src="../../assets/@lilithBlackheim.jfif" alt="@lilithBlackheim" title="@lilithBlackheim" 
      class="w-7 h-7 rounded-full object-cover" />
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
        <img src="../../assets/@lilithBlackheim.jfif" alt="@lilithBlackheim" title="@lilithBlackheim"
          class="w-10 h-10 rounded-full object-cover" />
        <p>@lilithBlackhein</p>
      </header>

      <textarea type="text" placeholder="What's on your mind?" @focus="onFocusTextarea"
        class="flex-1 outline-0 px-2"></textarea>
      <ul class="p-4 gap-2 justify-around border-b border-slate-300">
        <li class="flex flex-col justify-center  items-center shadow shadow-slate-300 rounded-lg w-fit px-4 py-2">
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
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue';

// const emit = defineEmits(['close'])
const showWhatsOnMindForm = ref(false)
const hideHeader = ref(false)
const toggleWhatsOnMindForm = () => {
  showWhatsOnMindForm.value = !showWhatsOnMindForm.value
}

const onFocusTextarea = (e: FocusEvent) => {
  if (e.target instanceof HTMLTextAreaElement) {
    hideHeader.value = true
  }
}

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
