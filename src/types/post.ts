import type { User } from "./user";

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
  id: number,
  user_id: number,
  body: string,
  media: MediaFile[],
  user: User,
  last_type: string,
  user_reaction: {
    type: string,
  } | null,
  privacy: string,
  comments_count: number,
  reactions_count: number,
  created_at: string,
  updated_at: string,
}

export interface TempPost {
  body: string,
  user: User | null,
  media?: MediaFile[],

}
export interface PostResponse {
  success: boolean,
  posts: Post[],
}
