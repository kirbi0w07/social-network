export interface PostAuthor {
  id: string
  username: string
  avatar: string
}

export interface MediaItem {
  type: 'image' | 'video',
  url: string
}

export interface Post {
  id: string,
  title: string,
  content: string,
  media: MediaItem,
  reactionsCount: number,
  commentsCount: number,
  createdAt: string,
  author: PostAuthor,
}
