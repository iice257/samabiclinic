"use client"

import type { Tables } from "@/lib/supabase/database.types"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { LikeButton } from "@/components/blog/like-button"
import { CommentSection } from "@/components/blog/comment-section"
import { NewsletterPopup } from "@/components/layout/newsletter-popup"

  const handleCommentSubmitted = () => {
    setShowNewsletterPopup(true)
  }

      {showNewsletterPopup && <NewsletterPopup onClose={() => setShowNewsletterPopup(false)} />}

type BlogPost = Tables<"blog_posts">

interface BlogPostClientProps {
  post: BlogPost
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const [likes, setLikes] = useState(0)
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchLikes = async () => {
      const { count, error } = await supabase
        .from("blog_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", post.id)

      if (!error) {
        setLikes(count ?? 0)
      }
    }
    fetchLikes()
  }, [post.id, supabase])

  const handleCommentSubmitted = () => {
    // setShowNewsletterPopup(true) // Will be enabled later
  }

  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Link
              href="/insights"
              className="group mb-6 inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Insights
            </Link>
            <div className="mb-4">
              <Badge className="bg-primary">{post.category}</Badge>
            </div>
            <h1 className="mb-6 text-balance font-bold text-3xl text-foreground md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {/* A simple read time calculation */}
                <span>{Math.ceil(post.content.split(" ").length / 200)} min read</span>
              </div>
              <div>By {post.author}</div>
            </div>
          </div>
        </div>
      </section>

      {post.image && (
        <section className="px-4 py-8">
          <div className="container mx-auto max-w-4xl">
            <div className="relative aspect-[21/9] overflow-hidden rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
          </div>
        </section>
      )}

      <article className="px-4 py-8 md:py-12">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <LikeButton postId={post.id} initialLikes={likes} />
          </div>

          <div className="mt-12">
            <CommentSection postId={post.id} onCommentSubmitted={handleCommentSubmitted} />
          </div>
        </div>
      </article>

      {/* {showNewsletterPopup && <NewsletterPopup onClose={() => setShowNewsletterPopup(false)} />} */}
    </main>
  )
}
