import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BlogPostsList } from "@/components/admin/blog-posts-list"

export const metadata: Metadata = {
  title: "Manage Blog Posts | Samabi Admin",
  description: "Manage blog posts for Samabi Functional Medicine",
}

export default function AdminBlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-primary text-4xl font-bold mb-2 mt-6">Blog Posts</h1>
          <p className="text-muted-foreground mb-6">Manage and publish blog posts for your website</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>
      <BlogPostsList />
    </div>
  )
}
