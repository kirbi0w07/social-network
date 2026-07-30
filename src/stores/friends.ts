import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { acceptFriendRequestService, addFriendService, rejectFriendRequestService } from '@/services/FriendService'
import { useNotificationStore } from './notifications'

export const useFriendsStore = defineStore('friends', () => {
  const notificationStore = useNotificationStore()

  const addFriend = async (userId: string) => {
    const { data } = await addFriendService(userId)
    if (data.success) {
      notificationStore.notify(
        'Friend request sent successfully!',
        'success'
      )
      return data.friendship.status
    } else {
      notificationStore.notify(
        'Failed to send friend request.',
        'error'
      )
    }
  }

  const acceptFriend = async (userId: string) => {
    const { data } = await acceptFriendRequestService(userId)
    if (data.success) {
      notificationStore.notify(
        'Friend request accepted successfully!',
        'success'
      )
      return data.friendship_button
    } else {
      notificationStore.notify(
        'Failed to accept friend request.',
        'error'
      )
    }
  }

  const rejectFriend = async (userId: string) => {
    const { data } = await rejectFriendRequestService(userId)
    if (data.success) {
      notificationStore.notify(
        'Friend request rejected successfully!',
        'success'
      )
      return data.friendship_button
    } else {
      notificationStore.notify(
        'Failed to reject friend request.',
        'error'
      )
    }
  }

  return { addFriend, acceptFriend, rejectFriend }


})
