import axios from '@/lib/axios'

export const getProfileService = async (id: number) => {
  try {
    return await axios.get(`/api/profile/${id}`);
  } catch (error) {
    throw (error)
  }
}

export const uploadProfilePictureService = async (file: File) => {
  try {
    const formData = new FormData();

    formData.append('profile_picture', file);
    return await axios.post('/api/profile_pictures', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    throw (error)
  }
}
export const uploadCoverPictureService = async (file: File) => {
  try {
    const formData = new FormData();

    formData.append('cover_picture', file);
    return await axios.post('/api/cover_picture', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    throw (error)
  }
}
