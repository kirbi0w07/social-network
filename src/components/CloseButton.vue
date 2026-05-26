<template lang="">
  <Icon
    icon="heroicons:x-mark-20-solid"
    width="28"
    color="#374151"
    @click="props.close"
    :class="hideHeader ? 'opacity-0' : ''"
  />
</template>
<script setup lang="ts">
  const props = defineProps(['close'])
</script>
<style lang="">

</style>
