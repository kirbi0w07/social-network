import type { User } from "./user"

export interface Notification {
  id: string
  type: string
  notifiable_type: string
  notifiable_id: number
  data: {
    type: string
    message: string
    user: User
  }
  read_at: string | null
  created_at: string
  updated_at: string
}
