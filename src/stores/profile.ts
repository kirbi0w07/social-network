import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import { ref,computed } from "vue"
import type { Profile } from "@/types/profile"
import axios from "@/lib/axios"

export const useProfileStore = defineStore('profile', () => {
    const authStore = useAuthStore()
    const profile = ref<Profile | null>(null)

    const userAvatar = computed(() => profile.value?.full_url || '/default-avatar.png')

    const fetchMyProfile = async () => {
        const { data } = await axios.get('/api/profile')
        profile.value = data
    }

    const updateAvatar = (newPath: string) => {
        if (profile.value) profile.value.full_url = newPath
    }

    return { profile, userAvatar, fetchMyProfile, updateAvatar }
})