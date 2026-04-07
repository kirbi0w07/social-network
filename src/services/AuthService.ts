import axios from '@/lib/axios'
import type { SigninData } from '@/types/signin';
import type { SignupCredentials } from '@/types/signup';
import { isAxiosError } from 'axios';


export const loginService = async (loginData: SigninData) => {
    try {
      const response = await axios.post('/api/login', loginData)
      return response
    } catch (error: unknown) {
      if(isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data)
      }
      return Promise.reject({ message: 'Error de conexión' })
    }
}
export const registerService = async (registerData: SignupCredentials) => {
    try {
      const response = await axios.post('/api/register', registerData)
      return response

    } catch (error: unknown) {
      if(isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data)
      }
      return Promise.reject({ message: 'Error de conexión' })
    }
}

export const logoutService = async () => {
  try {
    const response = await axios.post('/api/logout')
    return response
  } catch (error: unknown) {
    if(isAxiosError(error) && error.response) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject({ message: 'Error de conexión' })
  }
}
