import type { Metadata } from "next"
import { NewsletterEditorForm } from "@/components/admin/newsletter-editor-form"

export const metadata: Metadata = {
  title: "Create New Newsletter | Samabi Admin",
  description: "Create a new newsletter for Samabi Functional Medicine",
}

export default function NewNewsletterPage() {
  return (
    <div className="container mx-auto py-4 px-4 md:py-10 md:px-4 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl text-muted-foreground font-bold mb-2">Create New Newsletter</h1>
        <p className="text-muted-foreground">Write and send a new newsletter to your subscribers</p>
      </div>
      <NewsletterEditorForm />
    </div>
  )
}
