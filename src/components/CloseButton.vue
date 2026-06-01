<template lang="">
  <Icon
    icon="heroicons:x-mark-20-solid"
    width="28"
    color="#374151"
    @click="$emit('close')"
  />
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

  const props = defineProps(['close'])
</script>
<style lang="">

</style>
