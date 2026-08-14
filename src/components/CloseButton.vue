<template lang="">
  <Icon
    icon="heroicons:x-mark-20-solid"
    :width="iconWidth"
    color="#374151"
    @click="$emit('close')"
  />
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useWindowSize } from './composables/useWindowSize';

const props = defineProps(['close'])

const { iconWidth } = useWindowSize()
</script>
<style lang="">

</style>
