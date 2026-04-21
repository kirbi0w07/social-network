import axios from "@/lib/axios"
import type { PostResponse } from "@/types/post";

export const createPostService = async (body: string, files: File[]) => {
  try {
    const formData = new FormData();
    formData.append('body', body);

    files.forEach((file) => {
      // Usamos el archivo directamente, asegurándonos de que sea el binario
      formData.append('media[]', file);
    });

    // Usa la misma estructura que te funcionó en el perfil
    return await axios.post('/api/post', formData)
  } catch (error) {
    throw error;
  }
}

export const getRecentPostsService = async () => {
  return await axios.get<PostResponse>('/api/post');
}

export const reactToPostServie = async (postId: number, type: string) => {
  return await axios.post(`/api/post/${postId}/react`, {post_id: postId, type})
}
