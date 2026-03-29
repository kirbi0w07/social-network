<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <article>
    <header class="flex justify-between p-2 text-slate-900">
      <div class="flex items-center gap-1">
        <img
          src="../assets/@lilithBlackheim.jfif"
          alt="@lilithBlackheim"
          title="@lilithBlackheim"
          class="w-7 h-7 rounded-full object-cover"
        />
        <div class="flex flex-col">
          <p class="font-medium text-sm">@lilithBlackheim</p>
          <p class="text-xs text-slate-700">1h</p>
        </div>
      </div>
      <div class="flex gap-4">
        <Icon icon="heroicons:ellipsis-horizontal" width="24" color="#374151" />
        <Icon icon="heroicons:x-mark-solid" width="24" color="#374151" />
      </div>
    </header>
    <div class="px-2">
      <p>Los mas enamorados del mundo mundial 👩‍❤️‍👨</p>
    </div>
    <footer class="flex py-4">
      <div class="flex flex-1 justify-around gap-2">
        <button class="flex items-center gap-1">
          <Icon icon="heroicons:heart" width="24" color="#374151" />
          <span>123</span>
        </button>
        <button class="flex items-center gap-1">
          <Icon icon="heroicons:chat-bubble-bottom-center-text" width="24" color="#374151" />
          <span>123</span>
        </button>
        <button class="flex items-center gap-1">
          <Icon icon="heroicons:arrow-top-right-on-square-solid" width="24" color="#374151" />
          <span>123</span>
        </button>
      </div>
      <!--<div>reactions</div> -->
    </footer>
  </article>
</template>

<style scoped></style>
