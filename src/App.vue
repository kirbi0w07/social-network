<script setup lang="ts">
import NotifyAlert from './components/NotifyAlert.vue';
import LoadingAnimation from './components/ui/LoadingAnimation.vue';
</script>

<template>
  <LoadingAnimation />
  <NotifyAlert />
  <RouterView />
</template>

<style scoped></style>
