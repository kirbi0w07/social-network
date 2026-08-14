<template lang="">
  <main  class="
  layout
  flex
  flex-col
  h-screen
  w-full
  md:w-[90%]
  lg:w-3/4
  xl:max-w-[1400px]
  mx-auto
  bg-white
">
    <h1 class='text-center pt-10 font-extrabold text-2xl text-slate-900 md:text-5xl'>My Social Network</h1>
    <div class='mx-5 mt-10'>
      <router-view></router-view>
    </div>
  </main>
</template>
<script setup lang="ts">

</script>
<style lang="">

</style>
