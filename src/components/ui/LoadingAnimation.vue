<script setup>
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()

const { isLoading, message } = storeToRefs(loadingStore)
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner-lg"></div>

        <span class="md:text-2xl">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(3px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;

  color: #333;
  font-size: 14px;
  font-weight: 500;
}

.spinner {
  width: 42px;
  height: 42px;

  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
