<template lang="">
    <main class="bg-white">
        <!-- cover picture -->
        <section class="w-full h-40 bg-slate-300">
            <img src="../assets/@lilithBlackheim.jfif" alt="@lilithBlackheim" title="@lilithBlackheim" class="w-full h-full object-cover"/>
        </section>
        <section class="relative w-full h-20 bg-white rounded-2xl -mt-5">
            <div class="flex items-center relative">
                <!-- profile picture -->
                <div class=" w-20 h-20 rounded-full border-4 border-slate-50 -mt-6 ml-2">
                    <UserAvatar :user="user" @click="showProfilePicturesOptions = !showProfilePicturesOptions"  customClass="relative w-full h-full object-cover rounded-full bg-slate-300" />
                    <Icon icon="heroicons:photo-solid" width="24" color="#374151" @click="showProfilePicturesOptions = !showProfilePicturesOptions" class="absolute bottom-0 left-13 bg-slate-200 p-1 rounded-full border border-white" />
                </div>
                <p class="font-medium">{{ user.name }} {{ user.last_name }}</p>
            </div>
        </section>
        <!-- Section what's on your mind -->
        <WhatsInMind />
    </main>
    <!-- profile picture aside chose profile, see profile, view history -->
    <div v-if="showProfilePicturesOptions" @click="showProfilePicturesOptions = false" class="fixed inset-0 z-40">
    </div>
    <transition name="showProfilePicturesOptions">
        <section v-if="showProfilePicturesOptions" class="absolute w-full h-fit bg-white rounded-2xl bottom-10 py-2 z-50">
    <ul class="flex flex-col gap-4 border-b border-slate-200 divide-y divide-slate-200" >
        <li class="flex items-center pl-3 py-2 gap-x-2" @click="changeProfilePicture" >
            <Icon icon="heroicons:photo-solid" width="34" color="#374151" class="bg-slate-200 rounded-full p-2" />
            <p class="flex-1">Chose profile picture</p></li>
        <li class="flex items-center pl-3 py-2 gap-x-2" :class="[isSeeProfileDisabled ?? 'opacity-40 cursor-not-allowed grayscale']" @click="togglePictureModal">
            <Icon icon="heroicons:photo-solid" width="34" color="#374151" class="bg-slate-200 rounded-full p-2" />
            <p class="flex-1">See profile</p>
        </li>
        <li class="flex items-center pl-3 py-2 gap-x-2"><Icon icon="heroicons:photo-solid" width="34" color="#374151" class="bg-slate-200 rounded-full p-2" />
            <p class="flex-1">View history</p>
        </li>
    </ul>
</section>
    </transition>


    <!-- input file hidden -->
    <input
    type="file"
    ref="fileInput"
    class="hidden"
    accept="image/*"
    @change="handleFileChange"
    />

    <!-- modal view picture -->
    <section v-if="showPictureModal" class="absolute top-0 left-0 w-full h-screen bg-slate-900/50 z-50">
        <div @click="showPictureModal = false"  class="w-full h-full flex justify-center items-center">
            <div @click.stop class="relative w-full max-w-4xl px-4 z-[60]">
                <swiper
                    :modules="modules"
                    :slides-per-view="1"
                    :space-between="10"
                    navigation
                    :pagination="{ clickable: true }"
                    class="rounded-lg overflow-hidden"
                >
                    <swiper-slide
                    v-for="picture in user.profile.profile_pictures.toReversed()"
                    :key="picture.id"
                    class="flex justify-center items-center bg-black/20 aspect-[4/3]"
                    >
                    <img
                        :src="picture.full_url"
                        class="w-full h-full object-contain mx-auto"
                        @click.stop
                    />
                    </swiper-slide>
                </swiper>

                <!-- <button
                    @click="showPictureModal = false"
                    class="absolute -top-10 right-4 text-white text-3xl font-bold hover:text-gray-300"
                >
                    &times;
                </button> -->
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';
import { Icon } from '@iconify/vue'
import { ref } from 'vue';
import WhatsInMind from '@/components/home/WhatsInMind.vue'

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import UserAvatar from '@/components/ui/UserAvatar.vue';

const modules = [Navigation, Pagination];
const fileInput = ref<HTMLInputElement | null>(null)

const { user } = useAuthStore()
const { uploadProfilePicture } = useProfileStore()

const showProfilePicturesOptions = ref(false)
const showPictureModal = ref(false)

const isSeeProfileDisabled = (() => !user?.profile.profile_pictures.length)

const togglePictureModal = () => {
    showPictureModal.value = !showPictureModal.value
    showProfilePicturesOptions.value = false
}

const changeProfilePicture = () => {
    showProfilePicturesOptions.value = false
    openSelector()
}

const openSelector = () => {
    fileInput.value?.click()
}

const handleFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        const file = target.files[0]
        console.log("Archivo seleccionado:", file.name)
        await uploadFilePicture(file)
    }
}


const uploadFilePicture = async (file: File) => {
    await uploadProfilePicture(file)
}

</script>
<style>
/* Personalización de colores de Swiper para que resalten en el fondo oscuro */
:root {
    --swiper-navigation-color: #fff;
    --swiper-pagination-color: #fff;
    }

    .swiper-button-next, .swiper-button-prev {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}

.showProfilePicturesOptions-enter-active,
.showProfilePicturesOptions-leave-active {
    transition:
    transform 0.1s ease-in-out;
}

.showProfilePicturesOptions-enter-from {
    transform: translatey(100%);

}

.showProfilePicturesOptions-enter-to {
    transform: translatey(0);
}

.showProfilePicturesOptions-leave-to {
    transform: translatey(100%);

}
</style>
