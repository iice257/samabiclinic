"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Comment {
  id: string
  name: string
  comment: string
  created_at: string
}

interface CommentSectionProps {
  postId: string
  onCommentSubmitted: () => void
}

export function CommentSection({ postId, onCommentSubmitted }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [commenterName, setCommenterName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchComments()
  }, [postId])

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: false })

    if (error) {
      toast.error("Failed to load comments.")
      console.error("Error fetching comments:", error)
    } else {
      setComments(data)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commenterName.trim() || !newComment.trim()) {
      toast.warning("Please enter your name and a comment.")
      return
    }
    setIsLoading(true)

    const { data, error } = await supabase
      .from("blog_comments")
      .insert({ post_id: postId, name: commenterName, comment: newComment })
      .select()
      .single()

    setIsLoading(false)

    if (error) {
      toast.error("Failed to submit comment. Please try again.")
      console.error("Error submitting comment:", error)
    } else {
      toast.success("Comment submitted successfully!")
      setComments([data, ...comments])
      setNewComment("")
      setCommenterName("")
      onCommentSubmitted() // Trigger newsletter popup
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
          <Input
            placeholder="Your Name"
            value={commenterName}
            onChange={(e) => setCommenterName(e.target.value)}
            required
          />
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Comment"}
          </Button>
        </form>

        <div className="space-y-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarFallback>{comment.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{comment.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-1">{comment.comment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
