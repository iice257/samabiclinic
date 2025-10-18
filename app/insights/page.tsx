"use client"

import { useState, useEffect } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  image: string
}

export default function InsightsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("status", "post")
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

    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="mb-6 text-balance font-bold text-4xl text-foreground md:text-5xl lg:text-6xl">
              Insights for a Healthier You
            </h1>
            <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-lg md:text-xl leading-relaxed">
              Evidence-based articles on functional medicine, nutrition, and holistic wellness from our expert team.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? [...Array(6)].map((_, i) => (
                  <Card key={i} className="h-full overflow-hidden">
                    <Skeleton className="aspect-[16/10] w-full" />
                    <div className="p-6">
                      <Skeleton className="h-4 w-1/4 mb-3" />
                      <Skeleton className="h-6 w-3/4 mb-3" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-6 w-1/4" />
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </div>
                  </Card>
                ))
              : posts.length > 0
              ? posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/insights/${post.slug}`}
                    className="group animate-in fade-in slide-in-from-bottom-4 duration-1000"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="h-full overflow-hidden border-border/50 bg-card transition-all  hover:shadow-xl hover:-translate-y-2">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary/90 backdrop-blur-sm">{post.category}</Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-4 text-muted-foreground text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <h3 className="mb-3 font-semibold text-foreground text-lg leading-tight transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                        <p className="mb-4 text-muted-foreground text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <p className="text-muted-foreground text-xs">By {post.author}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              : (
                <div className="col-span-3 text-center">
                  <p className="text-muted-foreground mb-4">Nothing has been posted yet.</p>
                  <Button asChild>
                    <Link href="/admin/blog/new">Create Post</Link>
                  </Button>
                </div>
              )}
          </div>
        </div>
      </section>
    </main>
  )
}