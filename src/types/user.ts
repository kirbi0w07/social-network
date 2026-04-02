export interface User {
  id: string,
  username?: string,
  name: string,
  last_name: string,
  email: string,
  avatar?: string,
  bio?: string,
  followers_count: number,
  following_count: number,
  birthday: Date,
  gender: string,
  createdAt: Date,
}

export type UserWithPassword = User & {
  password: string
}
