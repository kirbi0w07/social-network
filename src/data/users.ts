import type { User, UserWithPassword } from '@/types/user.ts'

export const mockUsers: UserWithPassword[] = [
  {
  id: '1',
  username: '@lilithBlackheim',
  name: 'Lilith Blackheim',
  email: 'lili&chowi@hotmail.com',
  password: '123456',
  avatar: '../assets/@lilithBlackheim.jfif',
  followers: 0,
  following: 0,
  posts: 0,
  createdAt: '2024-01-10',
  birthday: '1993-02-20',
},
]
