export interface PostAuthor {
  id: string
  username: string
  avatar: string
}

export interface MediaFile {
  id: string; 
  file: File;
  previewUrl: string;
  type: 'image' | 'video';
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
