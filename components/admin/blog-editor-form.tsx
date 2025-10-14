"use client"

import type React from "react"
import type { Tables } from "@/lib/supabase/database.types"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import ReactMarkdown from "react-markdown"
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  ImageIcon,
  Save,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

type BlogPost = Tables<"blog_posts">
interface BlogEditorFormProps {
  post?: BlogPost
}

export function BlogEditorForm({ post }: BlogEditorFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    author: post?.author || "",
    category: post?.category || "",
    tags: Array.isArray(post?.tags) ? post.tags.join(", ") : "",
    image: post?.image || "",
  })

  const isEditing = !!post

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
        image: post.image || "",
      })
    }
  }, [post])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === "title" && !isEditing) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = formData.content.substring(start, end)
    let newText = ""
    let cursorOffset = 0

    switch (format) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`
        cursorOffset = selectedText ? newText.length : 2
        break
      case "italic":
        newText = `*${selectedText || "italic text"}*`
        cursorOffset = selectedText ? newText.length : 1
        break
      case "underline":
        newText = `<u>${selectedText || "underlined text"}</u>`
        cursorOffset = selectedText ? newText.length : 3
        break
      case "h1":
        newText = `\n# ${selectedText || "Heading 1"}\n`
        cursorOffset = selectedText ? newText.length : 3
        break
      case "h2":
        newText = `\n## ${selectedText || "Heading 2"}\n`
        cursorOffset = selectedText ? newText.length : 4
        break
      case "h3":
        newText = `\n### ${selectedText || "Heading 3"}\n`
        cursorOffset = selectedText ? newText.length : 5
        break
      case "ul":
        newText = `\n- ${selectedText || "List item"}\n`
        cursorOffset = selectedText ? newText.length : 3
        break
      case "ol":
        newText = `\n1. ${selectedText || "List item"}\n`
        cursorOffset = selectedText ? newText.length : 4
        break
      case "link":
        newText = `[${selectedText || "link text"}](url)`
        cursorOffset = selectedText ? newText.length - 5 : 1
        break
      case "image":
        newText = `![${selectedText || "alt text"}](image-url)`
        cursorOffset = selectedText ? newText.length - 11 : 2
        break
    }

    const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end)
    setFormData((prev) => ({ ...prev, content: newContent }))

    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + cursorOffset, start + cursorOffset)
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)

      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        tags: tagsArray,
        image: formData.image,
        published: publish,
      }

      let error
      if (isEditing) {
        const { error: updateError } = await supabase.from("blog_posts").update(postData).eq("id", post.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase.from("blog_posts").insert(postData)
        error = insertError
      }

      if (error) throw error

      toast.success(
        isEditing
          ? `Post ${publish ? "published" : "updated"} successfully!`
          : `Draft saved successfully!`
      )
      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error saving blog post:", error)
      toast.error("Failed to save blog post. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter blog post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              placeholder="auto-generated-from-title"
              required
              readOnly={isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief summary of the blog post"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Dr. Vincent"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Gut Health, Hormones, etc."
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="nutrition, wellness, health"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="/path-to-image.jpg"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="content">Content *</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </Button>
          </div>

          {!isPreview && (
            <div className="flex flex-wrap gap-1 p-2 border rounded-lg bg-muted/30">
              <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("h1")} title="Heading 1">
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("h2")} title="Heading 2">
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("h3")} title="Heading 3">
                <Heading3 className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("bold")} title="Bold">
                <Bold className="h-4 w-4" />
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("italic")} title="Italic">
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting("underline")}
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("ul")} title="Bullet List">
                <List className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting("ol")}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <div className="w-px h-6 bg-border mx-1" />
              <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("link")} title="Insert Link">
                <LinkIcon className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => insertFormatting("image")}
                title="Insert Image"
              >
                <ImageIcon className="h-4 w-4" />
              </Button>
            </div>
          )}

          {isPreview ? (
            <div className="prose prose-sm max-w-none p-4 border rounded-lg min-h-[400px] bg-background">
              <ReactMarkdown>{formData.content}</ReactMarkdown>
            </div>
          ) : (
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post content here... Use the toolbar above for formatting."
              rows={20}
              className="font-mono text-sm"
              required
            />
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, false)} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? "Save Changes" : "Save Draft"}
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? isEditing
              ? "Updating..."
              : "Publishing..."
            : isEditing
            ? "Update Post"
            : "Publish Post"}
        </Button>
      </div>
    </form>
  )
}
