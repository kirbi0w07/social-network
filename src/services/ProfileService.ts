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
    const formData = new FormData();

    formData.append('profile_picture', file);
    return await axios.post('/api/profile_pictures', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    throw(error)
  }
}
