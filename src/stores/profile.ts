import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import { ref,computed } from "vue"
import type { Profile } from "@/types/profile"
import axios from "@/lib/axios"
import { uploadProfilePictureService } from "@/services/ProfileService"

export const useProfileStore = defineStore('profile', () => {
    const authStore = useAuthStore()


    const uploadProfilePicture = async (file: File) => {
        try {
            const {data} = await uploadProfilePictureService(file)
            if (authStore.user) {
                authStore.user!.profile = data.profile    
            }
        } catch (error) {
            console.error("Error al subir la foto de perfil", error);
        }
    }

    return { uploadProfilePicture }
    })