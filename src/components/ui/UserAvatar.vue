<template>
  <div v-if="props.user" :class="props.customClass || 'w-7 h-7 rounded-full object-cover bg-slate-100'">
    <img :src="props.user.profile?.current_avatar?.full_url || defaultAvatar" :alt="`${fullName}`"
      :title="`${fullName}`" :class="props.customClass || 'w-7 h-7 rounded-full object-cover bg-slate-100'"
      @click="redirectProfile" />
  </div>
  <div v-else
    :class="props.customClass ? props.customClass + ' bg-gray-200 animate-pulse' : 'w-7 h-7 rounded-full bg-slate-200 animate-pulse'">
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types/user';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const props = defineProps<{
  user?: User | null,
  customClass?: string
  goProfile?: boolean | null
}>()
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const fullName = computed(() =>
  props.user ? `${props.user.name} ${props.user.last_name}` : ''
);

const defaultAvatar = computed(() => {
  if (!props.user) return '';
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(fullName.value)}`;
});

const redirectProfile = () => {
  // si se encuentra ya en la ruta MyProfile retorna
  if (!props.goProfile || route.name === "MyProfile") return

  // si el username de los props es el mismo que el de el usuario autenticado se redirige a my profile
  if (authStore.user?.profile?.username === props.user?.profile?.username) {
    router.push('/my-profile')
  } else {
    //en caso de que sea otro usuario se redirige a users
    router.push(`/users/${props.user?.profile.username}`)
  }
}
</script>

<style lang=""></style>
