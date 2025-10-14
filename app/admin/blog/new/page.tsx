import type { Metadata } from "next"
import { BlogEditorForm } from "@/components/admin/blog-editor-form"

export const metadata: Metadata = {
  title: "Create New Blog Post | Samabi Admin",
  description: "Create a new blog post for Samabi Functional Medicine",
}

export default function NewBlogPostPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Blog Post</h1>
        <p className="text-muted-foreground">Write and publish a new blog post for your readers</p>
      </div>
      <BlogEditorForm />
    </div>
  )
}
