<template lang="">
 <nav class="flex shrink-0 bg-white w-full z-50 md:hidden">
    <router-link
        to="/"
        class="flex-1 flex justify-center items-center py-2"
    >
        <Icon
            icon="heroicons:home-16-solid"
            :width="iconWidth"
            color="#374151"
        />
    </router-link>

    <router-link
        to="/my-profile"
        class="flex-1 flex justify-center items-center py-2"
    >
        <Icon
            icon="heroicons:user-circle-16-solid"
            :width="iconWidth"
            color="#374151"
        />
    </router-link>

    <router-link
        to="/messages"
        class="flex-1 flex justify-center items-center py-2"
    >
        <Icon
            icon="heroicons:chat-bubble-oval-left-ellipsis-solid"
            :width="iconWidth"
            color="#374151"
        />
    </router-link>

    <router-link
        to="/search"
        class="flex-1 flex justify-center items-center py-2"
    >
        <Icon
            icon="heroicons:magnifying-glass-16-solid"
            :width="iconWidth"
            color="#374151"
            class="-scale-x-100"
        />
    </router-link>
</nav>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useWindowSize } from '../composables/useWindowSize';

const { iconWidth } = useWindowSize()
</script>
<style lang="">

</style>
