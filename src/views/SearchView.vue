<template lang="">
  <div class="flex flex-col items-center justify-center w-full">
    <section class="flex items-center justify-between border-2 border-slate-700 rounded-lg w-[90%] mt-12 py-2">
      <form @submit.prevent="search" class="w-full">
        <input class="flex-1 outline-none px-2 py-1 w-full" type="text" placeholder="Search a friend" v-model="searchText" @enter="search"/>
      </form>
      <Icon class="mr-4" icon="heroicons:magnifying-glass" width="30" color="#5f6a7c" />
    </section>

    <!-- search list -->
    <section class="w-full px-5 mt-10">
      <article class="flex items-center justify-between py-4 px-4 border-b border-slate-400" v-for="(user, index) in usersSearched" :key="index">
        <div class="flex">
          <UserAvatar :user="user" :alt="user" :title="user" customClass="w-14 h-14 rounded-full object-cover bg-slate-100 cursor-pointer" goProfile/>
        <p class="ml-4 text-lg font-semibold cursor-pointer" @click="redirectProfile(user)">{{user.profile.username}}</p>
        </div>
        <!-- Mi perfil -->
<button
  v-if="user.id === userStore.user.id"
  type="button"
  class="text-md font-bold px-2 py-1 bg-sky-700 rounded-md text-white cursor-pointer"
  @click="redirectProfile(user)"
>
  My Profile
</button>

<!-- Sin relación -->
<button
  v-else-if="user.friendship_button === 'add'"
  type="button"
  class="text-md font-bold px-2 py-1 bg-sky-700 rounded-md text-white hover:bg-sky-800 cursor-pointer"
  @click="sendFriendRequest(user)"
>
  Add Friend
</button>

<!-- Solicitud enviada -->
<button
  v-else-if="user.friendship_button === 'pending'"
  type="button"
  class="text-md font-bold px-2 py-1 bg-amber-500 rounded-md text-white cursor-default"
  disabled
>
  Pending
</button>

<!-- Solicitud recibida -->
<div
  v-else-if="user.friendship_button === 'accept'"
  class="flex"
>
  <button
    type="button"
    class="text-md font-bold px-2 py-1 bg-green-600 rounded-md text-white cursor-pointer"
    @click="acceptFriendRequest(user)"
  >
    Accept
  </button>

  <button
    type="button"
    class="text-md font-bold px-2 py-1 bg-red-600 rounded-md text-white cursor-pointer ml-2"
    @click="rejectFriendMethod(user)"
  >
    Reject
  </button>
</div>

<!-- Ya son amigos -->
<button
  v-else-if="user.friendship_button === 'friends'"
  type="button"
  class="text-md font-bold px-2 py-1 bg-slate-600 rounded-md text-white"
  @click="redirectProfile(user)"
>
  Friends
</button>
      </article>
    </section>
  </div>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { searchDataService } from '@/services/SearchService';
import UserAvatar from '@/components/ui/UserAvatar.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { User } from '@/types/user';
import { useFriendsStore } from '@/stores/friends';

const searchText = ref('')
const usersSearched = ref(null)
const router = useRouter()
const route = useRoute()
const userStore = useAuthStore()
const { addFriend, acceptFriend, rejectFriend } = useFriendsStore()
const search = async () => {
  const data = await searchDataService(searchText.value)
  usersSearched.value = data.data.users
}

const redirectProfile = (user: User) => {
  // si se encuentra ya en la ruta MyProfile retorna
  if (route.name === "MyProfile") return

  // si el username de los props es el mismo que el de el usuario autenticado se redirige a my profile
  if (userStore.user?.profile?.username === user?.profile?.username) {
    router.push('/my-profile')
  } else {
    //en caso de que sea otro usuario se redirige a users
    router.push(`/users/${user?.profile.username}`)
  }
}

const sendFriendRequest = async (user: User) => {
  const status = await addFriend(String(user.id))

  user.friendship_button = status
}

const acceptFriendRequest = async (user: User) => {
  const status = await acceptFriend(String(user.id))

  user.friendship_button = status
}

const rejectFriendMethod = async (user: User) => {
  const status = await rejectFriend(String(user.id))

  user.friendship_button = status
}



</script>
<style lang="">

</style>
