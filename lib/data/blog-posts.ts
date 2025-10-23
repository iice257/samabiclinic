import type { Tables } from "@/lib/supabase/database.types"
import { createClient } from "@/lib/supabase/server";


export type BlogPost = Tables<"blog_posts">

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "post")
    .single()

  if (error) {
    console.error("Error fetching single blog post:", error)
    return null
  }
  return data
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "post")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching all blog posts:", error)
    return []
  }
  return data || []
}
