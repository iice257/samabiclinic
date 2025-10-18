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
  Save,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

type Newsletter = Tables<"newsletters">
interface NewsletterEditorFormProps {
  newsletter?: Newsletter
}

export function NewsletterEditorForm({ newsletter }: NewsletterEditorFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [formData, setFormData] = useState({
    subject: newsletter?.subject || "",
    excerpt: newsletter?.excerpt || "",
    content: newsletter?.content || "",
    author: newsletter?.author || "",
    category: newsletter?.category || "",
    tags: Array.isArray(newsletter?.tags) ? newsletter.tags.join(", ") : "",
    image: newsletter?.image || "",
  })

  const isEditing = !!newsletter

  useEffect(() => {
    if (newsletter) {
      setFormData({
        subject: newsletter.subject,
        excerpt: newsletter.excerpt,
        content: newsletter.content,
        author: newsletter.author,
        category: newsletter.category,
        tags: Array.isArray(newsletter.tags) ? newsletter.tags.join(", ") : "",
        image: newsletter.image || "",
      })
    }
  }, [newsletter])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = createClient()

      const newsletterData = {
        subject: formData.subject,
        content: formData.content,
        // These fields are for UI consistency only and are not being saved to the database
        // You would need to update your Supabase table definition and API calls to store them
        excerpt: formData.excerpt,
        author: formData.author,
        category: formData.category,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
        image: formData.image,
      }

      let error
      if (isEditing) {
        const { error: updateError } = await supabase.from("newsletters").update(newsletterData).eq("id", newsletter.id)
        error = updateError
      } else {
        const { error: insertError } = await supabase.from("newsletters").insert(newsletterData)
        error = insertError
      }

      if (error) throw error

      const message = isEditing
        ? "Newsletter updated successfully!"
        : "Newsletter created successfully!"

      toast.success(message)
      router.push("/admin/newsletters")
      router.refresh()
    } catch (error) {
      console.error("Error saving newsletter:", error)
      toast.error("Failed to save newsletter. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Enter newsletter subject"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Brief summary of the newsletter"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Author name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Health, Wellness, etc."
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
              placeholder="nutrition, exercise, mindfulness"
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

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your newsletter content here..."
              rows={15}
              className="font-mono text-sm"
              required
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button type="submit" disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isEditing ? "Update Newsletter" : "Create Newsletter"}
        </Button>
      </div>
    </form>
  )
}
