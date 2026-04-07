<template lang="">
    <main class="bg-white">
        <section class="w-full h-40 bg-slate-300">
            <img src="../assets/@lilithBlackheim.jfif" alt="@lilithBlackheim" title="@lilithBlackheim" class="w-full h-full object-cover"/>
        </section>
        <section class="relative w-full h-20 bg-white rounded-2xl -mt-5">
            <div class="flex items-center relative">
                <div class=" w-20 h-20 rounded-full border-4 border-white -mt-6 ml-2">
                    <img src="../assets/@lilithBlackheim.jfif" alt="@lilithBlackheim" title="@lilithBlackheim" @click="showProfilePicturesOptions = !showProfilePicturesOptions"  class="relative w-full h-full object-cover rounded-full" />
                    <Icon icon="heroicons:photo-solid" width="24" color="#374151" class="absolute bottom-0 left-13 bg-slate-200 p-1 rounded-full border border-white" />
                </div>
                <p class="font-medium">Lilith Blackheim</p>
            </div>
        </section>
        
    </main>
    <!-- profile picture aside chose profile, see profile, view history -->
    <div v-if="showProfilePicturesOptions" @click="showProfilePicturesOptions = false" class="fixed inset-0 z-40">
    </div>
    <section v-if="showProfilePicturesOptions" class="absolute w-full h-fit bg-white rounded-2xl bottom-10 py-2 z-50">
    <ul class="flex flex-col gap-4 border-b border-slate-200 divide-y divide-slate-200" >
        <li class="flex items-center pl-3 py-2 gap-x-2" @click="changeProfilePicture" >
            <Icon icon="heroicons:photo-solid" width="34" color="#374151" class="bg-slate-200 rounded-full p-2" />
            <p class="flex-1">Chose profile picture</p></li>
        <li class="flex items-center pl-3 py-2 gap-x-2"><Icon icon="heroicons:photo-solid" width="34" color="#374151" class="bg-slate-200 rounded-full p-2" />
            <p class="flex-1">See profile</p>
        </li>
        <li class="flex items-center pl-3 py-2 gap-x-2"><Icon icon="heroicons:photo-solid" width="34" color="#374151" class="bg-slate-200 rounded-full p-2" />
            <p class="flex-1">View history</p>
        </li>
    </ul>
</section>

    

    <!-- input file hidden -->
    <input 
    type="file" 
    ref="fileInput" 
    class="hidden" 
    accept="image/*" 
    @change="handleFileChange"
    />
</template>
<script setup lang="ts">
import { upluadProfilePictureService } from '@/services/ProfileService';
import { useAuthStore } from '@/stores/auth';
import { Icon } from '@iconify/vue'
import { ref } from 'vue';
const authStore = useAuthStore()
const fileInput = ref<HTMLInputElement | null>(null)
const showProfilePicturesOptions = ref(false)

const changeProfilePicture = () => {
    showProfilePicturesOptions.value = false
    openSelector()}

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

const uploadFilePicture = async(file: File) => {
    const {data} = await upluadProfilePictureService(file)

}

</script>
<style lang="">

</style>