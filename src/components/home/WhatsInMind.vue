<template>
  <article class="flex gap-2 items-center bg-white w-full pl-2 pr-2 pt-3 pb-4">
    <img
      src="../../assets/@lilithBlackheim.jfif"
      alt="@lilithBlackheim"
      title="@lilithBlackheim"
      class="w-7 h-7 rounded-full object-cover"
    />
    <div class="flex flex-1 py-1 text-slate-900 rounded-2xl border border-slate-200">
      <p class="px-4">What's on your mind?</p>
    </div>
    <div class="flex justify-center items-center">
      <Icon icon="heroicons:photo" width="24" color="#374151" />
    </div>

    <form class="top-0 fixed w-full h-screen bg-white">
      <header>
        <img
          src="../../assets/@lilithBlackheim.jfif"
          alt="@lilithBlackheim"
          title="@lilithBlackheim"
          class="w-7 h-7 rounded-full object-cover"
        />
        <p>@lilithBlackhein</p>
      </header>
    </form>
  </article>
</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>
<style lang=""></style>
