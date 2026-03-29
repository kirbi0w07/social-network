export interface PostAuthor {
  id: string
  username: string
  avatar: string
}

export interface Post {
  id: string,
  title: string,
  content: string,
  reactionsCount: number,
  commentsCount: number,
  createdAt: string,
  author: PostAuthor,
}
