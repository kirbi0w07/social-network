import type { createProfileData } from "@/types/profile";
import axios from '@/lib/axios'
import { ensureCsrf } from "./AuthService";

export const createProfileService = async (profileData: createProfileData) => {
  try {
    await ensureCsrf()
    return await axios.post('/api/profile', profileData);
  } catch (error) {
    throw(error)
  }
}
