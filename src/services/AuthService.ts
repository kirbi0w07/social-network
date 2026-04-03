import axios from '@/lib/axios'
import type { SigninData } from '@/types/signin';
import type { SignupData } from '@/types/signup';

let csrfLoaded = false

export const ensureCsrf = async () => {
    if(!csrfLoaded) {
        const token =  await axios.get('/sanctum/csrf-cookie');
        csrfLoaded = true
        console.log('csrftoken', token)
    }
}

export const loginService = async (loginData: SigninData) => {
    ensureCsrf()
    const data = await axios.post('/login', loginData)
}
export const registerService = async (registerData: SignupData) => {
    ensureCsrf()
    const data = await axios.post('/login', registerData)
}