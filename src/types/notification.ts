import type { User } from "./user"

export interface Notification {
  id: string
  type: string
  notifiable_type: string
  notifiable_id: number

  data: {
    type: 'friend_request'
    user: User
    message: string
  }

  read_at: string | null
  created_at: string
  updated_at: string
}
