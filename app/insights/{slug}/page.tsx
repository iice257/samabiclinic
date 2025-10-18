import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BlogPostClient } from "./BlogPostClient"

export const revalidate = 3600

export async function generateStaticParams() {
  const supabase = createClient()
  const { data: posts } = await supabase.from("blog_posts").select("slug").eq("status", "post")
  return posts?.map((post) => ({ slug: post.slug })) || []
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt, author, created_at")
    .eq("slug", params.slug)
    .eq("status", "post")
    .single()

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author],
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("status", "post")
    .single()

  if (error || !post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
