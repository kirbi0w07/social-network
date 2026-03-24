<template>
    <div class="flex flex-col items-center pb-8">
        
        <!-- <section class="flex justify-between bg-white min-w-11/12 mb-6 py-2 px-6 shadow shadow-slate-200 rounded-2xl">
            <span class="text-slate-400">Search...</span>
            <Icon icon="heroicons:magnifying-glass" width="24" color="#b2b2b2" />
        </section> -->

        <!-- Section nav -->
        <section class="w-full flex justify-between mb-1 bg-white">
            <div class="flex gap-2 pl-2 py-2 items-center">
                <Icon icon="heroicons:bars-3" width="24" color="#374151" /> <!-- 374151, b2b2b2 -->
                <h1 class="">Social Network</h1>
            </div>
            <div class="flex items-center gap-2 pr-2 py-2 ">
                <Icon icon="heroicons:plus-small" width="24" color="#374151" />
                <Icon icon="heroicons:magnifying-glass" width="24" color="#374151" />
                <Icon icon="heroicons:chat-bubble-oval-left-ellipsis" width="24" color="#374151" />
            </div>
        </section>

        <!-- Section what's on your mind -->
        <section class="flex gap-2 items-center bg-white w-full pl-2 pr-2 pt-3 pb-4">
            <img src="../assets/@lilithBlackheim.jfif" alt="@lilithBlackheim" title="@lilithBlackheim"
                class="w-7 h-7 rounded-full object-cover"
            /> 
            <div class="flex flex-1 py-1 text-slate-900 rounded-2xl border border-slate-200">
                <p class="px-4">What's on your mind?</p>
            </div>
            <div class="flex justify-center items-center">
                <Icon icon="heroicons:photo" width="24" color="#374151" />
            </div>
        </section>

        <!-- history Section -->
        <section class="text-center py-4 mb-1 w-full bg-white">
            <h2>HISTORY SECTION</h2>
        </section>

        <!-- Posts Section -->
        <section class="bg-white">
            <article>
                <header class="flex justify-between p-2 text-slate-900">
                    <div class="flex items-center gap-1">
                        <img src="../assets/@lilithBlackheim.jfif" alt="@lilithBlackheim" title="@lilithBlackheim"
                            class="w-7 h-7 rounded-full object-cover" />
                        <div class="flex flex-col">
                            <p class="font-medium text-sm">@lilithBlackheim</p>
                            <p class="text-xs text-slate-700">1h</p>
                        </div>

                    </div>
                    
                </header>
                <p>Los mas enamorados del mundo mundial 👩‍❤️‍👨</p>
                <footer>
                    <button>like</button>
                    <button>comment</button>
                    <button>share</button>
                </footer>
            </article>
        </section>
    </div>

</template>
<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>
<style lang=""></style>
