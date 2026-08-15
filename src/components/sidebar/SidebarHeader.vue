<script setup lang="ts">
import UserAvatar from '../ui/UserAvatar.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

</script>

<template>
  <header>
    <section class="gap-2 px-4 py-8 flex justify-center">
      <div class="flex flex-1 gap-2 p-2 items-center rounded-xl shadow shadow-slate-200 ">
        <UserAvatar :user="authStore.user"
          customClass="w-12 h-12 rounded-full object-cover bg-slate-300 border border-slate-50 md:w-18 md:h-18"
          goProfile />
        <p class="font-medium text-lg md:text-2xl">{{ authStore.user?.profile?.username }}</p>
      </div>
    </section>
  </header>
</template>

<style scoped></style>
