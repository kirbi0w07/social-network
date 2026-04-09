<template>
    <div v-if="props.user" :class="props.customClass || 'w-7 h-7 rounded-full object-cover bg-slate-100'">
        <img  :src="props.user.profile?.current_avatar?.full_url || defaultAvatar" 
        :alt="`${fullName}`"
        :title="`${fullName}`" 
        :class="props.customClass"
    />
    </div>
    <div v-else :class="props.customClass ? props.customClass + ' bg-gray-200 animate-pulse' : 'w-7 h-7 rounded-full bg-slate-200 animate-pulse'"></div>
</template>

<script lang="ts" setup>
import type { User } from '@/types/user';
import { computed } from 'vue';

const props = defineProps<{
    user?: User | null,
    customClass?: string
}>()


const fullName = computed(() => 
    props.user ? `${props.user.name} ${props.user.last_name}` : ''
);

const defaultAvatar = computed(() => {
    if (!props.user) return '';
    return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(fullName.value)}`;
});
</script>

<style lang=""></style>
