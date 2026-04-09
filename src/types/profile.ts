export interface Profile {
  id: number,
  user_id: number,
  bio?: string,
  birthday: Date,
  gender: string,
  username?: string,
  full_url?: string
  created_at: Date,
  updated_at: Date,
  current_avatar: CurrentAvatar,
  profile_pictures: CurrentAvatar[]
}

export interface CurrentAvatar {
  id: number
  profile_id: number
  path: string
  is_current: string
  created_at: string
  updated_at: string
  full_url: string
}