<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useWindowSize } from '../composables/useWindowSize';
import { useRouter } from 'vue-router';

const { listItemIconWidth } = useWindowSize()
const props = defineProps(['icon', 'name', 'to'])
const router = useRouter()
</script>

<template>
  <li @click="() => router.push(props.to)" class="flex px-2 items-center justify-between gap-2">
    <div class="flex items-center gap-2">
      <Icon :icon="props.icon" :width="listItemIconWidth" color="#374151" />
      <span class="font-medium md:text-2xl">{{ props.name }}</span>
    </div>
  </li>
</template>

<style scoped></style>
