import axios from "@/lib/axios"


export const addFriendService = async (user_id: string) => {
  try {
    return await axios.post('/api/add_friend', { user_id });
  } catch (error) {
    throw (error)
  }
}

export const acceptFriendRequestService = async (user_id: string) => {
  try {
    return await axios.post('/api/accept_friend_request', { user_id });
  } catch (error) {
    throw (error)
  }
}

export const rejectFriendRequestService = async (user_id: string) => {
  try {
    return await axios.post('/api/reject_friend_request', { user_id });
  } catch (error) {
    throw (error)
  }

}

