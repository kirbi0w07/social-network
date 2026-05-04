<template lang="">
    <div class="layout flex flex-col h-screen">
      <main class="flex-1 relative overflow-y-auto">
        <RouterView/>
      </main>
      <NavbarMain/>
    </div>
</template>
<script lang="ts" setup>
import NavbarMain from '@/components/layout/NavbarMain.vue';
</script>
<style lang="">

</style>
