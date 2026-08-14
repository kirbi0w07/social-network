<script setup lang="ts">
interface Notification {
  type: 'success' | 'alert' | 'error'
  message: string
}

const props = defineProps<{
  notifyAlert?: Notification | null
}>()

const notificationClasses = {
  success: 'border-l-4 border-green-500',
  alert: 'border-l-4 border-orange-500',
  error: 'border-l-4 border-red-500'
}
</script>

<template>
  <div v-if="props.notifyAlert" class="absolute top-8 right-4 flex items-center gap-2 rounded-md bg-slate-100 p-2"
    :class="notificationClasses[props.notifyAlert.type]">
    <p>{{ props.notifyAlert.message }}</p>

    <Icon icon="heroicons:photo" width="24" color="#374151" />
  </div>
</template>
