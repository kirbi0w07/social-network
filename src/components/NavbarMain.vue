<template lang="">
    <nav class="flex gap-2 justify-around fixed bottom-0 bg-white py-2 w-full">
        <router-link to="/">
            <Icon icon="heroicons:home-16-solid" width="24" color="#374151"/>
        </router-link> 
        <router-link to="/profile">
            <Icon icon="heroicons:user-circle-16-solid" width="24" color="#374151"/>
        </router-link> 
        <router-link to="/messages">
            <Icon icon="heroicons:chat-bubble-oval-left-ellipsis-solid" width="24" color="#374151" />
        </router-link> 
        <router-link to="/search">
    <Icon icon="heroicons:magnifying-glass-16-solid" width="24" color="#374151" class="-scale-x-100"/>
        </router-link> 
    </nav>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue'

</script>
<style lang="">

</style>