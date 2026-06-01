<template lang="">
    <article class='min-w-full'>
      <div class='flex mb-5 pl-2'>
        <UserAvatar :user='user'/>
        <div class='ml-2 w-full'>
          <p class='text-sm font-semibold'>{{user.name}} {{user.last_name}}</p>
          <p>{{props.comment.comment}}</p>
          <div class='flex justify-between pr-5'>
            <p>Reply</p>
            <div>
              botones
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
