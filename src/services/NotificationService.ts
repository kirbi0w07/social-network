import axios from "@/lib/axios"

export const getNotificationsService = async () => {
  try {
    return await axios.get('/api/notifications');
  } catch (error) {
    throw (error)
  }
}
