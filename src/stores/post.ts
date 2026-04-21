import { defineStore } from "pinia"
import { useAuthStore } from "./auth"
import { ref,computed } from "vue"
import type { Profile } from "@/types/profile"
import axios from "@/lib/axios"
import { getRecentPostsService, reactToPostServie } from "@/services/PostService"
import type { Post, TempPost } from "@/types/post"

export const usePostStore = defineStore('post', () => {
    const authStore = useAuthStore()
    const isCreatingPost = ref(false)
    const recentPosts = ref<Post[]>([])
    const tempPost = ref<TempPost | null>(null)

    const addPost = (newPost:Post) => {
      recentPosts.value.unshift(newPost)
      isCreatingPost.value = false
      tempPost.value = null
    }
    const getRecentPosts = async () => {
      return await getRecentPostsService()
    }

    const startCreatingTempPost = (previewData: TempPost) => {
        isCreatingPost.value = true
        tempPost.value = previewData
    }
      const rectToPost = async (postId: number, type: string) => {
      const post = recentPosts.value.find(p => p.id === postId)
      if (!post) return

      const currentReactionType = post.user_reaction?.type || null
      const currentCount = Number(post.reactions_count)
      post .last_type = type
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

    const updatePostReaction = (postId: number,user_reaction: {type: string}, reactions_count: number) => {
     const post = recentPosts.value.find(p => p.id === postId);

    if (post) {
        post.user_reaction = user_reaction
        post.reactions_count = reactions_count
    }
    }

    return {recentPosts,isCreatingPost, tempPost, getRecentPosts, addPost, startCreatingTempPost,rectToPost, updatePostReaction}
    })
