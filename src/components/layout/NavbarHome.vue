<template>
  <nav class="w-full flex justify-between mb-1 bg-white md:p-2">

    <div class="flex gap-2 pl-2 py-2 items-center">

      <Icon icon="heroicons:bars-3" :width="iconWidth" color="#374151" class="cursor-pointer md:hidden"
        @click="emit('toggle-sidebar')" />

      <h1 class="md:text-xl">
        Social Network
      </h1>

    </div>

    <div class="flex items-center gap-2 pr-2 py-2 md:hidden">

      <!-- <Icon icon="heroicons:plus-small" :width="iconWidth" color="#374151" /> -->

      <BellNotification v-if="windowWidth < 768" />

    </div>

  </nav>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import BellNotification from '../BellNotification.vue'
import { useWindowSize } from '../composables/useWindowSize'

const { iconWidth, windowWidth } = useWindowSize()

const emit = defineEmits<{
  'toggle-sidebar': []
}>()
</script>
