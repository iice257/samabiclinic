"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { toast } from "sonner"

interface LikeButtonProps {
  postId: string
  initialLikes: number
}

export function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]")
    if (likedPosts.includes(postId)) {
      setIsLiked(true)
    }
  }, [postId])

  const handleLike = async () => {
    if (isLiked) {
      toast.info("You have already liked this post.")
      return
    }

    const { error } = await supabase.from("blog_likes").insert({ post_id: postId })

    if (error) {
      toast.error("Failed to like post. Please try again.")
      console.error("Detailed error liking post:", JSON.stringify(error, null, 2))
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
      const likedPosts = JSON.parse(localStorage.getItem("liked_posts") || "[]")
      localStorage.setItem("liked_posts", JSON.stringify([...likedPosts, postId]))
      toast.success("Thanks for your feedback!")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLike} disabled={isLiked}>
      <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
      <span>{likes}</span>
    </Button>
  )
}
