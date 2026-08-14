<template lang="">
    <article class='min-w-full'>
      <div class='flex mb-5 pl-2'>
        <UserAvatar :user='user' goProfile customClass="w-12 h-12 rounded-full object-cover bg-slate-300 border border-slate-50 md:w-17 md:h-17" />
        <div class='ml-2 w-full'>
          <p class='text-sm font-semibold md:text-2xl'>{{user.name}} {{user.last_name}}</p>
          <p class='md:text-2xl'>{{props.comment.comment}}</p>
          <div class='flex justify-between pr-5'>
            <p class='md:text-2xl'>Reply</p>
            <div>

            </div>
          </div>
        </div>
      </div>

    </article>
</template>
<script setup lang="ts">
import UserAvatar from './ui/UserAvatar.vue';
import { useAuthStore } from '@/stores/auth';

const { user } = useAuthStore()
const props = defineProps(['comment'])



</script>
<style lang="">

</style>
