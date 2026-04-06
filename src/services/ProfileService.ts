import type { createProfileData } from "@/types/profile";
import axios from '@/lib/axios'

export const createProfileService = async (profileData: createProfileData) => {
  try {
    return await axios.post('/api/profile', profileData);
  } catch (error) {
    throw(error)
  }

}
export const upluadProfilePictureService = async (file: File) => {
  try {
    return await axios.post('/api/profile_pictures/store', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    throw(error)
  }
}
