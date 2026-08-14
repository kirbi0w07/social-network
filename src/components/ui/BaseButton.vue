<template>
  <div class="w-full flex items-center justify-center">
    <button
      :type="type"
      class="bg-slate-900 text-white rounded-md p-2 font-bold w-3xs md:w-xs md:text-2xl md:p-4"
      @click="$emit('click')"
    >
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit'
}>(), {
  type: 'button'
})

defineEmits<{
  click: []
}>()
</script>