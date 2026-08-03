<template lang="">
    <section class="p-4 bg-white">
        <h2 class="text-2xl font-bold">Chats</h2>
    </section>

    <section v-if="!isLoading && messages.length === 0" class="px-4 pt-4 bg-white text-center h-full">
        <p class="text-gray-500">No messages yet.</p>
    </section>
    <section v-else class="p-4">
        <ul>
            <li v-for="message in messages" :key="message.id" class="mb-2 p-2 border border-slate-300 border-r-0 border-l-0 w-full rounded">
                <div class="flex items-center">
                    <div class="flex items-center">
                        <UserAvatar :user="message.sender" />
                        <span class="ml-2 font-semibold">{{ message.sender.name }}</span>
                    </div>

                    <span class="ml-2 text-sm text-gray-500">{{ dayjs(message.created_at).fromNow() }}</span>
                </div>
                <span class="ml-2">{{ message.content }}</span>
            </li>
        </ul>

    </section>
</template>
<script setup lang="ts">
import { useMessageStore } from '@/stores/message';

const { messages } = useMessageStore()


</script>
<style lang="">

</style>
