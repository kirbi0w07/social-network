export interface User {
  id: string,
  username: string,
  name: string,
  email: string,
  avatar: string,
  bio?: string,
  followers: number,
  following: number,
  posts: number,
  birthday: string,
  createdAt: string,
}
