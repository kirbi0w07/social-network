import { defineStore } from "pinia";
import type { User, UserWithPassword } from "@/types/user";
import { ref } from "vue";
import { mockUsers } from "@/data/users";
export const useAuthStore = defineStore('auth', () => {
const user = ref<User | null>(null)
const userIsAuth = ref(false)

const login = (email: string, password: string) => {
const userFinded =  mockUsers.find((user: UserWithPassword) => user.email == email && user.password == password)
if(userFinded) {
  user.value = userFinded
  userIsAuth.value = true
  console.log(user.value)
}
}

const logout = () => {
  user.value = null
  userIsAuth.value = false
}

return {
  user,
  login,
  logout
}
})
