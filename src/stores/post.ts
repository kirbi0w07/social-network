import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import { ref, computed } from "vue"
import type { Profile } from "@/types/profile"
import axios from "@/lib/axios"
import { getRecentPostsService, reactToPostServie, commentAPostService, getPostsByUserIdService } from "@/services/PostService"
import type { Post, TempPost } from "@/types/post"

export const usePostStore = defineStore('post', () => {
  const authStore = useAuthStore()
  const isCreatingPost = ref(false)
  const recentPosts = ref<Post[]>([])
  const profilePosts = ref<Post[]>([])

  const tempPost = ref<TempPost | null>(null)

  const addPost = (newPost: Post) => {
    recentPosts.value.unshift(newPost)
    isCreatingPost.value = false
    tempPost.value = null
  }
  const getRecentPosts = async () => {
    return await getRecentPostsService()
  }

  const getPostsByUserId = async (id: number) => {
    return await getPostsByUserIdService(id)
  }

  const startCreatingTempPost = (previewData: TempPost) => {
    isCreatingPost.value = true
    tempPost.value = previewData

    console.log("Temp post created:", tempPost.value)
    console.log("Is creating post:", isCreatingPost.value)
  }
  const rectToPost = async (postId: number, type: string) => {
    const post = recentPosts.value.find(p => p.id === postId)
    if (!post) return

    const currentReactionType = post.user_reaction?.type || null
    const currentCount = Number(post.reactions_count)
    post.last_type = type
    let nextCount = currentCount
    let nextReaction = null

    if (currentReactionType === type) {
      nextCount = Math.max(0, currentCount - 1)
      nextReaction = null
    } else {
      nextCount = currentReactionType === null ? currentCount + 1 : currentCount
      nextReaction = { type }
    }

    updatePostReaction(postId, nextReaction!, nextCount)

    try {
      const { data } = await reactToPostServie(postId, type)

      if (data.user_reaction) post.last_type = data.user_reaction.type

      updatePostReaction(
        postId,
        data.user_reaction,
        Number(data.reactions_count)
      )
    } catch (error) {
      updatePostReaction(postId, post.user_reaction!, currentCount)
      throw error
    }
  }

  const rectToComment = async (comment: any, type: string) => {
    // Guardamos el estado actual por si el servidor falla (Rollback)
    const currentReactionType = comment.user_reaction?.type || null
    const currentCount = Number(comment.reactions_count)

    comment.last_type = type
    let nextCount = currentCount
    let nextReaction = null

    // Lógica matemática optimista
    if (currentReactionType === type) {
      nextCount = Math.max(0, currentCount - 1)
      nextReaction = null
    } else {
      nextCount = currentReactionType === null ? currentCount + 1 : currentCount
      nextReaction = { type }
    }

    // MODIFICACIÓN DIRECTA: Al cambiar esto aquí, se actualiza automáticamente
    // en el componente de Vue gracias a las referencias de JS
    comment.user_reaction = nextReaction
    comment.reactions_count = nextCount

    try {
      const { data } = await reactToCommentService(comment.id, type)

      if (data.user_reaction) comment.last_type = data.user_reaction.type

      // Sincronizamos con el backend
      comment.user_reaction = data.user_reaction
      comment.reactions_count = Number(data.reactions_count)

    } catch (error) {
      // Si falla, hacemos rollback directo al objeto
      comment.user_reaction = currentReactionType ? { type: currentReactionType } : null
      comment.reactions_count = currentCount
      throw error
    }
  }

  const updatePostReaction = (postId: number, user_reaction: { type: string }, reactions_count: number) => {
    const post = recentPosts.value.find(p => p.id === postId);

    if (post) {
      post.user_reaction = user_reaction
      post.reactions_count = reactions_count
    }
  }

  const commentAPost = async (postId: number, comment: string) => {
    return await commentAPostService(postId, comment)
  }

  return { recentPosts, isCreatingPost, tempPost, profilePosts, getRecentPosts, addPost, startCreatingTempPost, rectToPost, updatePostReaction, commentAPost, rectToComment, getPostsByUserId }
})


