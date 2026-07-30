import axios from "@/lib/axios"
import { isAxiosError } from "axios"

export const searchDataService = (search: string) => {
  try {
    const response = axios.post('/api/search', { search })
    return response
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject({ message: 'Error de conexión' })
  }
}
