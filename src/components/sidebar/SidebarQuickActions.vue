<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <section class="border-t border-slate-300 pt-4">
    <ul class="grid grid-cols-2 gap-4 px-2">
      <li class="flex justify-center border border-slate-300 rounded-lg center">
        <Icon icon="heroicons:user-group-16-solid" width="48" color="#374151" />
      </li>
      <li class="flex justify-center border border-slate-300 rounded-lg">
        <Icon icon="heroicons:user-group-16-solid" width="48" color="#374151" />
      </li>
      <li class="flex justify-center border border-slate-300 rounded-lg">
        <Icon icon="heroicons:user-group-16-solid" width="48" color="#374151" />
      </li>
      <li class="flex justify-center border border-slate-300 rounded-lg">
        <Icon icon="heroicons:user-group-16-solid" width="48" color="#374151" />
      </li>
    </ul>
    <div class="w-full flex justify-center items-center py-6">
      <p class="bg-neutral-400 rounded-sm text-white w-[70%] py-1 text-center">See more</p>
    </div>
  </section>
</template>

<style scoped></style>
