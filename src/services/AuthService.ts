import axios from '@/lib/axios'
import type { SigninData } from '@/types/signin';
import type { SignupCredentials, SignupData } from '@/types/signup';
import type { UserWithPassword } from '@/types/user';

let csrfLoaded = false

export const ensureCsrf = async () => {
    if(!csrfLoaded) {
        const token =  await axios.get('/sanctum/csrf-cookie');
        csrfLoaded = true
        console.log('csrftoken', token)
    }
}

export const loginService = async (loginData: SigninData) => {
    await ensureCsrf()
    const data = await axios.post('/login', loginData)
}
export const registerService = async (registerData: SignupCredentials) => {
    try {
      await ensureCsrf()
      const response = await axios.post('/register', registerData)
      console.log(response)
      if (response.data?.errors || response.data?.message) {
        throw new Error(
          response.data.message || 'Error registrando usuario'
        )
      }
    } catch (error) {
      throw(error)
    }
}
