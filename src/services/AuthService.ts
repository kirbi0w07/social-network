import axios from '@/lib/axios'
import type { SigninData } from '@/types/signin';
import type { SignupCredentials } from '@/types/signup';


export const loginService = async (loginData: SigninData) => {
    try {
      const response = await axios.post('/api/login', loginData)
      return response
    } catch (error: any) {
      if(error.response) {
        return Promise.reject(error.response.data)
      }
      return Promise.reject({ message: 'Error de conexión' })
    }
}
export const registerService = async (registerData: SignupCredentials) => {
    try {
      const response = await axios.post('/api/register', registerData)
      return response

    } catch (error: any) {
      if(error.response) {
        return Promise.reject(error.response.data)
      }
      return Promise.reject({ message: 'Error de conexión' })
    }
}
