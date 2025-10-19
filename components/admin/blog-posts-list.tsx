"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

interface BlogPost {
  id: string
  title: string
  slug: string
  author: string
  category: string
  status: string
  created_at: string
}

export function BlogPostsList() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, slug, author, category, status, created_at")
        .order("created_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error("Error fetching posts:", error)
      toast.error("Failed to load blog posts")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (error) throw error
      toast.success("Post deleted successfully")
      fetchPosts()
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("Failed to delete post")
    }
  }

  const toggleExpanded = (postId: string) => {
    const newExpanded = new Set(expandedPosts)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedPosts(newExpanded)
  }

if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Skeleton className="h-4 w-4" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground mb-4">No blog posts yet</p>
          <Button asChild>
            <Link href="/admin/blog/new">Create your first post</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <button onClick={() => toggleExpanded(post.id)} className="p-1 hover:bg-muted rounded">
                  {expandedPosts.has(post.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-sm text-muted-foreground">
                      - {post.status === "draft" ? "draft" : "published"}
                    </span>
                  </div>
                  {expandedPosts.has(post.id) && (
                    <div className="mt-2 text-sm text-muted-foreground space-y-1">
                      <p>Author: {post.author}</p>
                      <p>Category: {post.category}</p>
                      <p>Created: {new Date(post.created_at).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/blog/edit/${post.slug}`}>
                    <Edit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
