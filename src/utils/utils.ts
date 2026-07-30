import type { User } from "@/types/user"
import { useRouter } from "vue-router"
const router = useRouter()

export const redirectProfile = (user: User, authUser: User, routeName: string) => {
  // si se encuentra ya en la ruta MyProfile retorna
  if (routeName === "MyProfile") return

  // si el username de los props es el mismo que el de el usuario autenticado se redirige a my profile
  if (authUser?.profile?.username === user?.profile?.username) {
    router.push('/my-profile')
  } else {
    //en caso de que sea otro usuario se redirige a users
    router.push(`/users/${user?.profile.username}`)
  }
}
