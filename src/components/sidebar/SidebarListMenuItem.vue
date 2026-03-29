<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps(['icon', 'name'])
</script>

<template>
  <li class="flex px-2 items-center justify-between gap-2">
    <div class="flex items-center gap-2">
      <Icon :icon="props.icon" width="38" color="#374151" />
      <span class="font-medium">{{ props.name }}</span>
    </div>
    <Icon icon="heroicons:chevron-down-20-solid" width="38" color="#374151" />
  </li>
</template>

<style scoped></style>
