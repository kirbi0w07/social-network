<template lang="">
  <div class="flex flex-col">
    <label :for="props.id" class='px-2 text-sm font-bold w-fit'>{{props.label}}</label>
    <input :type='type' :placeholder='props.placeholder' :name='props.name' :id='props.id' :value="props.modelValue" @input="emit('update:modelValue', $event.target.value)" class='rounded- bg-slate-100 p-2 outline-0'>
    <p v-if="error" class="text-red-600 px-2 py-1">{{error}}</p>
  </div>
</template>
<script setup lang="ts">
  const props = withDefaults(defineProps<{
  label?: string
  modelValue?: string
  placeholder?: string
  name?: string
  id?: string
  error?: string
  type?: string
  }>(), {
    type: 'text'
  })
  const emit = defineEmits(['update:modelValue'])
</script>
<style lang="">

</style>
