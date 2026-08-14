import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import { ref, computed } from "vue"
import type { Profile } from "@/types/profile"
import axios from "@/lib/axios"
import { uploadCoverPictureService, uploadProfilePictureService } from "@/services/ProfileService"
import { useNotifyAlertStore } from "./notifyAlert"

export const useProfileStore = defineStore('profile', () => {
  const authStore = useAuthStore()
  const notifyAlertStore = useNotifyAlertStore()

  const uploadProfilePicture = async (file: File) => {
    try {
      const { data } = await uploadProfilePictureService(file)
      if (authStore.user) {
        authStore.user!.profile = data.profile
      }
    } catch (error) {
      console.error("Error al subir la foto de perfil", error);
      notifyAlertStore.addNotification("error", error?.response?.data?.message || "Error al subir la foto de perfil");
    }
  }
  const uploadCoverPicture = async (file: File) => {
    try {
      const { data } = await uploadCoverPictureService(file)
      if (authStore.user) {
        authStore.user!.profile = data.profile
      }
    } catch (error) {
      console.error("Error al subir la foto de perfil", error);
      notifyAlertStore.addNotification("error", error?.response?.data?.message || "Error al subir la foto de perfil");
      throw error
    }
  }

  return { uploadProfilePicture, uploadCoverPicture }
})
